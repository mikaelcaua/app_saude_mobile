import { useAuth } from "@/src/contexts/auth_context";
import { StyleSheet, View, Text } from "react-native";

export default function ProfileScreen() {
    const { user } = useAuth();

    return (
            <View style={styles.container}>
                <Text style={styles.text}>Não logado Screen, {user!.name}</Text>
            </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
})