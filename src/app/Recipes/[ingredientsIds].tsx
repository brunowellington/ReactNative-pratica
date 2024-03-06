import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, FlatList } from "react-native";
import { styles } from "./styles";
import { router, useLocalSearchParams } from "expo-router";
import { Recipe } from "@/components/Recipe";
import { Ingredients } from "@/components/Ingredients";
import { useEffect, useState } from "react";
import { services } from "@/services";
import { findByIds } from "@/services/ingredientsServices";

// Funçao para voltar a tela interior: onPress={() => router.back()}

export default function Recipes() {
  const params = useLocalSearchParams<{ ingredientsIds: string }>();
  const ingredientsIds = params.ingredientsIds.split(",");
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);

  useEffect(() => {
    services.ingredientes.findByIds(ingredientsIds).then(setIngredients);
  }, []);

  useEffect(() => {
    services.recipes.findByIngredientsIds(ingredientsIds).then(setRecipes);
  }, []);

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

      <Ingredients ingredients={ingredients} />

      {/* FlatList é para renderizar listas e usa o renderItem */}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Recipe recipe={item} />}
        style={styles.recipes}
        contentContainerStyle={styles.recipesContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 16 }}
        numColumns={2}
      />
    </View>
  );
}
