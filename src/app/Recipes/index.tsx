import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { styles } from "./styles";
import { router } from "expo-router";

// Funçao para voltar a tela interior: onPress={() => router.back()}

export default function Recipes() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name={"arrow-back"}
          size={32}
          onPress={() => router.back()}
        />
      </View>
    </View>
  );
}
