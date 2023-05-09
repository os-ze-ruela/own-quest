import { AxiosError } from "axios";
import { ReactNode, createContext, useState } from "react";
import AppError from "../core/app-error";
import Category from "../models/Category";
import { api, fetchCategories } from "../services/api";

type CategoryContextType = {
    getCategories: () => Promise<void>,
    categories: Category[],
}

export const CategoryContext = createContext<CategoryContextType>({} as CategoryContextType)

export const CategoryProvider = ({ children }: { children: ReactNode }) => {

    // const navigate = useNavigate()
    const [categories, setCategories] = useState<Category[]>([])


    async function getCategories(): Promise<void> {
        try {

            const tokensJSON = localStorage.getItem('token')
            const tokens = JSON.parse(tokensJSON!)
            api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`

            const response = await fetchCategories()

            const categoriesData = response.data;

            console.log(categoriesData)

            const categoriesAll: Category[] = categoriesData.map((categoryJson: { category: { id: any; color: any; plus18: any; title: any; }; }) => {
                return new Category({ id: categoryJson.category.id, color: categoryJson.category.color, plus18: categoryJson.category.plus18, title: categoryJson.category.title });
            });

            setCategories(categoriesAll);
        } catch (e: any) {
            setCategories([]);

            const error = await e as AxiosError
            console.error(`Erro (${error.response?.status}) ao buscar categories:`, error);
            if (error.response?.status === 400) {
                throw new AppError(400, 'Usuário não encontrado')
            } else if (error.response?.status === 401) {
                throw new AppError(error.response?.status, 'Credenciais Incorretas')
            }
        }
    };

    return (
        <CategoryContext.Provider value={{ getCategories, categories }}>
            {children}
        </CategoryContext.Provider>
    )
}