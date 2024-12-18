import { View, Text, StyleSheet, Animated, SafeAreaView, Image } from "react-native";
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { globalS } from "../../constants/styles";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import LoadingItems from "../UI/LoadingItems";

export default function Header({ isBack, bgDark, doc }) {
    const authCtx = useContext(AuthContext);
    const navigation = useNavigation();

    function buttonClick() {
        if (isBack) {
            navigation.goBack();
        }
        // else {
        //     navigation.toggleDrawer();
        // }
    }

    function goProfile() {
        navigation.navigate("Profile");
    }

    function logoutHandler() {
        authCtx.logout();
    }


    function NavButton() {
        if (isBack) return <Feather name="arrow-left" size={32} color={bgDark ? "white" : "black"} onPress={buttonClick} />
        // else return <Ionicons name="menu" size={32} color="black" onPress={buttonClick} />
        else return <Ionicons name="menu" size={20} color="transparent" />
    }
    // { backgroundColor: headerBackgroundColor }
    return (
        <>
            <SafeAreaView style={[style.safeArea, bgDark && style.bgDark]}>
                <Animated.View style={[style.headerContainer, globalS.dFlexCenterBetween]}>
                    <NavButton />
                    <Image source={require("./../../assets/images/logo.png")} style={style.logo} />
                    <MaterialCommunityIcons name="logout" size={24} color={bgDark ? "white" : "black"} onPress={logoutHandler} />
                    {/* <FontAwesome5 name="user-alt" size={24} color="black" onPress={goProfile} /> */}
                </Animated.View>
                {
                    doc && doc
                }

            </SafeAreaView>
            {/* {
                isLoading == true && <View style={style.full}>
                    <LoadingItems />
                </View>
            } */}
        </>
    )
}

const style = StyleSheet.create({
    // full: {
    //     position: "absolute",
    //     width: "100%",
    //     height: "100%",
    //     zIndex: 5,
    //     top: 0,
    //     left: 0,
    //     backgroundColor: Colors.whiteOp
    // },
    safeArea: {
        // backgroundColor: Colors.softBlack
    },
    bgDark: {
        backgroundColor: Colors.softBlack,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,

    },
    headerContainer: {
        width: '100%',
        zIndex: 1000,
        paddingHorizontal: 28,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 6,
    },
    logo: {
        width: 190,
        height: 120,
        objectFit: "contain"
    }
});
