import { createContext, useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useApi from './api';
// import { useTranslation } from 'react-i18next';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // const { i18n } = useTranslation();
    const api = useApi();

    const fetchUserData = async () => {
        try {
            const response = await api.get('/user/');
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.warn('Пользователь не авторизован');
            } else {
                console.error(error);
            }
            throw error; // важно, чтобы `useQuery` знал об ошибке
        }
    };

    const { data: user, isLoading, isError, refetch } = useQuery({
        queryKey: ['userData'],
        queryFn: fetchUserData,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        enabled: true,
    });

    if (isLoading) {
        return null;
    }


    return (
        <UserContext.Provider value={{ user, isLoading, isError, refetch }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
