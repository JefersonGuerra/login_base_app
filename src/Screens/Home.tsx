import React, { useContext } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ContextAuth from "../Context/Auth";
import { propsStack } from "../Routes/TypesRoutes";

export const Home = () => {

    const { user, Logout } = useContext(ContextAuth);
    const navigation = useNavigation<propsStack>();

    return (
        <View>
            <View className="w-full float-left justify-center items-center mt-5">
                <View className="w-[150px] h-[150px] float-left rounded-[150px] overflow-hidden flex justify-center items-center">
                    <Image className="min-w-[150px] min-h-[150px]" source={{ uri: user?.image }} />
                </View>
            </View>
            <Text className="w-full float-left text-[20px] text-center mt-5">{user?.name}</Text>
            <Text className="w-full float-left text-[15px] text-center mt-5">{user?.email}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}><Text>BTN</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => Logout()}><Text>SAIR</Text></TouchableOpacity>
        </View>
    )
}