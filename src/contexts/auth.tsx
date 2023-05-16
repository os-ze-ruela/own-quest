import { AxiosError } from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppError from "../core/app-error";
import { EMAIL_NOT_VALIDATED, HOME, LANDING_PAGE } from "../core/app-urls";
import {
  api,
  createSession,
  refreshToken,
  signupUser,
  verifyEmail,
  sendEmail,
} from "../services/api";

type AuthContextType = {
  authenticated: boolean;
  user: User | null;
  loading: boolean;
  validLogin: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  validRegister: (
    name: string,
    nickname: string,
    email: string,
    password: string,
    confirmPassword: string,
    birthDate: string
  ) => Promise<void>;
  register: (
    name: string,
    nickname: string,
    email: string,
    password: string,
    confirmPassword: string,
    birthDate: string
  ) => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => void;
  validateEmail: (access_token: string, token: string) => Promise<void>;
  sendValidateEmail: ()=> Promise<void>;
};

interface User {
  photo: string;
  email_validated: boolean;
  email: string;
  name: string;
  nickname: string;
}

interface Token {
  access_token: string;
  refresh_token: string;
}

interface ErrorData {
  statusCode: number;
  message: string;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }
    setLoading(false);
  }, []);

  async function validLogin(email: string, password: string) {
    if (email === "") {
      throw new AppError(400, "Informe o e-mail da sua conta cadastrada.");
    } else if (password === "") {
      throw new AppError(400, "Informe a senha da sua conta cadastrada.");
    }
  }

  async function login(email: string, password: string) {
    try {
      await validLogin(email, password);
    } catch (e) {
      const error = (await e) as AppError;
      throw error;
    }

    try {
      const response = await createSession(email, password);
      // console.log('createSession response', response)
      const loggedUser = await response.data.user;
      const tokens = await response.data.tokens;

      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("token", JSON.stringify(tokens));

      api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`;

      setUser(loggedUser);
      console.log("set user");
      navigate(HOME);
    } catch (e) {
      const error = (await e) as AxiosError;
      console.error(
        `Erro (${error.response?.status}) ao realizar login:`,
        error
      );
      if (error.response?.data) {
        const { statusCode, message } = error.response.data as ErrorData;
        if (statusCode && message) {
          throw new AppError( statusCode, message)
        }
      }
      throw new AppError(
        400,
        "Erro ao realizar login, tente novamente mais tarde.",
      );
    }
  }

  async function refresh() {
    const tokensJSON = localStorage.getItem("token");
    const tokens = JSON.parse(tokensJSON!);
    // console.log(`refresh for token ${tokens.access_token}`)
    // console.log(`refresh with Bearer ${tokens.refresh_token}`)

    try {
      const response = await refreshToken();
      const newTokens = await response.data.tokens;
      api.defaults.headers.Authorization = `Bearer ${newTokens.access_token}`;
    } catch (e) {
      const error = (await e) as AxiosError;
      console.error(
        `Erro (${error.response?.status}) ao realizar refresh:`,
        error
      );
      if (error.response?.status === 401) {
        api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`;
        throw new AppError(401, "Refresh token inválido");
      }
    }
  }

  function logout() {
    console.log("logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    setUser(null);
    navigate(LANDING_PAGE);
  }

  async function validRegister(
    name: string,
    nickname: string,
    email: string,
    password: string,
    confirmPassword: string,
    birthDate: string
  ) {
    if (nickname === "") {
      throw new AppError(400, "Preencha o campo de seu nickname, por favor.");
    } else if (name === "") {
      throw new AppError(400, "Preencha o campo de seu nome, por favor.");
    } else if (email === "") {
      throw new AppError(400, "Preencha o campo de seu e-mail, por favor.");
    } else if (birthDate === "") {
      throw new AppError(
        400,
        "Preencha o campo de sua data de nascimento, por favor."
      );
    } else if (password === "") {
      throw new AppError(400, "Preencha o campo de sua senha, por favor.");
    } else if (confirmPassword === "") {
      throw new AppError(
        400,
        "Preencha o campo de confirmação da senha, por favor."
      );
    } else if (password !== confirmPassword) {
      throw new AppError(400, "A senha e a confirmação de senha não conferem.");
    }
  }

  async function register(
    name: string,
    nickname: string,
    email: string,
    password: string,
    confirmPassword: string,
    birthDate: string
  ) {
    try {
      await validRegister(
        name,
        nickname,
        email,
        password,
        confirmPassword,
        birthDate
      );
    } catch (e) {
      const error = (await e) as AppError;
      throw error;
    }

    try {
      const response = await signupUser(
        name,
        nickname,
        email,
        password,
        birthDate
      );
      console.log("signup response", response);

      const loggedUser = await response.data.user;
      const tokens = await response.data.tokens;

      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("token", JSON.stringify(tokens));

      api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`;

      navigate(EMAIL_NOT_VALIDATED);
    } catch (e) {
      const error = (await e) as AxiosError;
      console.error(
        `Erro (${error.response?.status}) ao realizar cadastro:`,
        error
      );
      if (error.response?.data) {
        const { statusCode, message } = error.response.data as ErrorData;
        if (statusCode && message) {
          throw new AppError( statusCode, message)
        }
      }
      throw new AppError(
        400,
        "Erro ao realizar cadastro, tente novamente mais tarde.",
      );
        
    }
  }

  async function validateEmail(access_token: string, token: string): Promise<void>{
    try {
        const recoveredToken = localStorage.getItem("token")
        if (recoveredToken) {
          const tokenJSON = JSON.parse(recoveredToken)
          api.defaults.headers.Authorization = `Bearer ${tokenJSON.access_token}`;
          await verifyEmail(token);
          
          const recoveredUser = localStorage.getItem("user");
          if (recoveredUser) {
            let validatedUser = JSON.parse(recoveredUser)
            validatedUser.email_validated = true
            setUser(validatedUser)
            localStorage.setItem("user", JSON.stringify(validatedUser));
          }              
        } else {
          api.defaults.headers.Authorization = `Bearer ${access_token}`;
          await verifyEmail(token);
        }
        // user!.email_validated=true;
    } catch (e) {
      const error = (await e) as AxiosError;
      console.log(error);
    }
  }

  async function sendValidateEmail(): Promise<void> {
    try {
      const tokensJSON = localStorage.getItem('token')
      const tokens = JSON.parse(tokensJSON!)
      api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`

      await sendEmail()
    } catch(e) {
      const error = (await e) as AxiosError;
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        loading,
        validLogin,
        login,
        validRegister,
        register,
        refresh,
        logout,
        validateEmail,
        sendValidateEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
