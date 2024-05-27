import { createContext, useState, useEffect, useCallback } from 'react';
import {api} from "../Services/Api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid, View } from 'react-native';

type ContextAuthType = {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any | undefined>>
    Login(email: string | undefined, password: string | undefined): void
    Logout(): void
}

const DEFAULT_VALUE: ContextAuthType = {
    user: undefined,
    setUser: () => { },
    Login: () => { },
    Logout: () => { }
}

const ContextAuth = createContext({ ...DEFAULT_VALUE });

export const AuthProvider: React.FC<Props> = ({ children }) => {

    const [user, setUser] = useState<any | undefined>();
    const [loading, setLoading] = useState<boolean>(true);

    const getStogeContext = useCallback(async () => {
        const storagedToken = await AsyncStorage.getItem('@access_token');
        const storagedUser = await AsyncStorage.getItem('@user');

        if (storagedToken && storagedUser) {
            setUser(JSON.parse(storagedUser));
            api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
        }

        setLoading(false);

    }, [api])

    const Login = async (email: string, password: string) => {
        await api.post('/login', {
            email,
            password
        }).then(async function (response) {
            await AsyncStorage.setItem('@access_token', response.data.access_token);
            const user = JSON.stringify(response.data.user);
            await AsyncStorage.setItem('@user', user);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
            setUser(JSON.parse(user));
        }).catch(function (error) {
            ToastAndroid.show(error?.response?.data?.error ?? "Erro de conexão", ToastAndroid.LONG);
        })
    }

    const Logout = async () => {
        await AsyncStorage.removeItem('@access_token');
        await AsyncStorage.removeItem('@user');
        setUser(undefined);
    }


    useEffect(() => {
        getStogeContext();
    }, [getStogeContext])

    return (
        loading ?
            <View className="w-full h-[100vh] flex justify-center items-center"></View>
            :
            <ContextAuth.Provider value={{ user, setUser, Login, Logout }}>
                {children}
            </ContextAuth.Provider>
    );
}

interface Props {
    children: React.ReactNode;
}

export default ContextAuth