import { AxiosError } from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppError from "../core/app-error";
import { EMAIL_NOT_VALIDATED, HOME, LANDING_PAGE } from "../core/app-urls";
import {
  api,
  createSession,
  getUserByAccessToken,
  refreshToken,
  sendEmail,
  signupUser,
  verifyEmail
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
  sendValidateEmail: () => Promise<void>;
  sendRecover: (email: string) => Promise<void>;
  updatePassword: (id: number, pswd1: string, pswd2: string) => Promise<void>;
  getUserAuth: () => Promise<void>;
};

interface User {
  id: number;
  photo: string;
  email_validated: boolean;
  email: string;
  name: string;
  nickname: string;
  is_premium: boolean;
  game_ia_generation_count: number;
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

  // useEffect(() => {
  //   const recoveredUser = localStorage.getItem("user");
  //   if (recoveredUser) {
  //     setUser(JSON.parse(recoveredUser));
  //   }
  //   setLoading(false);
  // }, []);

  useEffect(() => {
    const tokensJSON = localStorage.getItem("token");
    const tokens = JSON.parse(tokensJSON!);

    const recoveredUser = localStorage.getItem("user");

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    if (tokens) {
      api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`;
      getUserByAcessToken()
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!!user) {
      setLoading(false)
    } 
}, [user, setUser])

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

      localStorage.setItem("token", JSON.stringify(tokens));

      api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`;

      setUser(loggedUser);
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
          throw new AppError(statusCode, message)
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

  async function getUserByAcessToken() {
    try {
      const response = await getUserByAccessToken();
      const userData = await response.data;

      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
    } catch (e) {
      const error = (await e) as AxiosError;
      console.error(
        `Erro (${error.response?.status}) ao buscar user by access (${error.message})`,
        error
      );
    }
  }

  function logout() {
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
    if (nickname == null || nickname === "") {
      throw new AppError(400, "Preencha o campo de seu nickname, por favor.");
    } else if (name == null || name === "") {
      throw new AppError(400, "Preencha o campo de seu nome, por favor.");
    } else if (email == null || email === "") {
      throw new AppError(400, "Preencha o campo de seu e-mail, por favor.");
    } else if (birthDate == null || birthDate === "") {
      throw new AppError(
        400,
        "Preencha o campo de sua data de nascimento, por favor."
      );
    } else if (password == null || password === "") {
      throw new AppError(400, "Preencha o campo de sua senha, por favor.");
    } else if (confirmPassword == null || confirmPassword === "") {
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

      localStorage.setItem("token", JSON.stringify(tokens));

      api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`;
      setUser(loggedUser)

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
          throw new AppError(statusCode, message)
        }
      }
      throw new AppError(
        400,
        "Erro ao realizar cadastro, tente novamente mais tarde.",
      );

    }
  }

  async function validateEmail(
    access_token: string,
    token: string
  ): Promise<void> {
    try {
      const recoveredToken = localStorage.getItem("token");
      if (recoveredToken) {
        const tokenJSON = JSON.parse(recoveredToken);
        api.defaults.headers.Authorization = `Bearer ${tokenJSON.access_token}`;
        await verifyEmail(token);
        await getUserAuth()
      } else {
        api.defaults.headers.Authorization = `Bearer ${access_token}`;
        await verifyEmail(token);
      }
    } catch (e) {
      const error = (await e) as AxiosError;
      console.log(error);
      if (error.response?.data) {
        const { statusCode, message } = error.response.data as ErrorData;
        if (statusCode && message) {
          throw new AppError( statusCode, message)
        }
      } else {
        throw new AppError( 400, 'Erro ao verificar o e-mail.')
      }
    }
  }

  async function sendValidateEmail(): Promise<void> {
    try {
      const tokensJSON = localStorage.getItem("token");
      const tokens = JSON.parse(tokensJSON!);
      api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`;

      await sendEmail();
    } catch (e) {
      const error = (await e) as AxiosError;
      console.log(error);
    }
  }

  async function sendRecover(email: string) {
    try {
      const tokensJSON = localStorage.getItem("token");
      const tokens = JSON.parse(tokensJSON!);

      const headers = {
        Authorization: `Bearer ${tokens}`,
      };

      const payload = {
        email: email,
      };

      const response = await api.post("/user/send-recover-password-email", payload, { headers });
      console.log("Email enviado com sucesso!");
    } catch (error) {
      const e = (await error) as AxiosError;
      throw e;
    }
  }


  async function updatePassword(id: number, pswd: string, pswd2: string) {
    try {
      const tokensJSON = localStorage.getItem("token");
      const tokens = JSON.parse(tokensJSON!);

      const headers = {
        Authorization: `Bearer ${tokens}`,
        "Content-Type": "application/json",
      };

      const payload = {
        id: id,
        pswd: pswd,
        pswd2: pswd2,
      };

      const response = await api.patch("/user/update-password", payload, {
        headers,
      });
      console.log("Senha alterada com sucesso!");
    } catch (error) {
      console.error("Erro ao alterar a senha:", error);
      alert("ERRO AO ALTERAR A SENHA!");
    }
  }

  async function getUserAuth() {
    try {
      const tokensJSON = localStorage.getItem("token");
      const tokens = JSON.parse(tokensJSON!);
      api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`;

      const response = await getUserByAccessToken()
      const loggedUser = await response.data
      setUser(loggedUser)
      
    } catch(e) {
        const error = (await e) as AxiosError;
        console.error(
          `Erro (${error.response?.status}) ao recuperar usuário:`,
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
          "Erro ao realizar recuperação de usuário.",
        );
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
        sendValidateEmail,
        sendRecover,
        updatePassword,
        getUserAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
