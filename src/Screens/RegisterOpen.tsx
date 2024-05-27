import React, { useCallback, useState, useContext } from "react";
import { Text, View, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator, Image, ScrollView } from "react-native";
import api from "../Services/Api";
import ImagePicker from 'react-native-image-crop-picker';
import ContextAuth from "../Context/Auth";
const ImagePlaceholder = require("../assets/img/image-placeholder.png");

export const RegisterOpen = () => {

    const { Login } = useContext(ContextAuth);
    const [data, setData] = useState<any>();

    const [loading, setLoading] = useState<boolean>();
    const [imagePicker, setImagePicker] = useState<any>();

    const onChangeTextData = useCallback((key: string, value: string) => {

        setData({ ...data, ...{ [key]: value } });

    }, [data]);

    const handleRegister = useCallback(async () => {

        if (!data?.name) return ToastAndroid.show('Preencha o campo Nome', ToastAndroid.LONG);
        if (!data?.email) return ToastAndroid.show('Preencha o campo E-mail', ToastAndroid.LONG);
        if (!data?.password) return ToastAndroid.show('Preencha o campo Senha', ToastAndroid.LONG);

        if (data?.password !== data?.repeatPassword) {
            ToastAndroid.show('Senhas diferentes', ToastAndroid.LONG);
        } else {
            setLoading(true);

            let formData = new FormData();

            Object.entries(data).map(([key, value]) => {
                formData.append(key, value);
            });

            formData.append('image', {
                uri: imagePicker.path,
                name: 'test.jpg',
                type: imagePicker.mime,
                size: imagePicker.size
            });

            await api.post(`/users`, formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                },
                transformRequest: (formData) => {
                    return formData;
                },
            }).then(async function (response) {
                await Login(data?.email, data?.password);
                ToastAndroid.show(response?.data?.success ?? "Erro de conexão", ToastAndroid.LONG);
            }).catch(function (error) {
                ToastAndroid.show(error?.response?.data?.error ?? "Erro de conexão", ToastAndroid.LONG);
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [api, data]);


    const camera = () => {
        ImagePicker.openCamera({
            width: 150,
            height: 150,
            cropping: true,
        }).then(image => {
            setImagePicker(image);
        });
    }

    return (
        loading ?
            <View className="w-full h-[100vh] flex justify-center items-center">
                <ActivityIndicator size="large" />
            </View>

            :
            <ScrollView>
                <View className="w-full h-[100vh] flex justify-center items-center px-[20px] gap-y-2">
                    <View className="w-full float-left justify-center items-center mt-5">
                        <TouchableOpacity className="w-[150px] h-[150px] float-left rounded-[150px] overflow-hidden flex justify-center items-center" onPress={() => { camera() }}>
                            {imagePicker ?
                                <Image className="min-w-[150px] min-h-[150px]" source={{ uri: imagePicker.path }} />
                                :
                                <Image className="w-full h-[150px] float-left" source={ImagePlaceholder} />
                            }
                        </TouchableOpacity>
                    </View>
                    <TextInput placeholder="Nome" className="w-full h-[40px] border-[2px] border-color_2 rounded-[6px] pl-[11px] text-[15px] text-color_3 font-[montserratlight]" onChangeText={(value) => onChangeTextData("name", value)} value={data?.name} />
                    <TextInput placeholder="E-mail" className="w-full h-[40px] border-[2px] border-color_2 rounded-[6px] pl-[11px] text-[15px] text-color_3 font-[montserratlight]" onChangeText={(value) => onChangeTextData("email", value)} value={data?.email} />
                    <TextInput secureTextEntry placeholder="Senha" className="w-full h-[40px] border-[2px] border-color_2 rounded-[6px] pl-[11px] text-[15px] text-color_3 font-[montserratlight]" onChangeText={(value) => onChangeTextData("password", value)} value={data?.password} />
                    <TextInput secureTextEntry placeholder="Confirme sua Senha" className="w-full h-[40px] border-[2px] border-color_2 rounded-[6px] pl-[11px] text-[15px] text-color_3 font-[montserratlight] mb-5" onChangeText={(value) => onChangeTextData("repeatPassword", value)} value={data?.repeatPassword} />
                    <TouchableOpacity className="w-[204px] h-[35px] float-left bg-color_3 rounded-[6px] flex items-center justify-center" onPress={() => { handleRegister() }}>
                        <Text className="text-[14px] text-[#FFFFFF] text-center">ENVIAR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
    )
}