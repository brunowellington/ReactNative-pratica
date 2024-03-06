import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, FlatList } from "react-native";
import { styles } from "./styles";
import { router } from "expo-router";
import { Recipe } from "@/components/Recipe";
import { Ingredients } from "@/components/Ingredients";

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
        <Text style={styles.title}>Ingredientes</Text>
      </View>
      {/* FlatList é para renderizar listas e usa o renderItem */}

      <FlatList
        data={["1"]}
        keyExtractor={(item) => item}
        renderItem={() => (
          <Recipe
            recipe={{
              name: "Omelete",
              image:
                "https://cptstatic.s3.amazonaws.com/imagens/blogs/portal-agropecuario/materias/2012/10/producao-ovo-portal-agropecuario.jpg",
              minutes: 10,
            }}
          />
        )}
      />
    </View>
  );
}
