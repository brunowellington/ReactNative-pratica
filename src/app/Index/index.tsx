import { View, Text, ScrollView, Alert } from "react-native";
import { styles } from "./styles";
import { Ingredient } from "@/components/Ingredient";
import { useState } from "react";
import { Selected } from "@/components/Selected";

import { router } from "expo-router";
import { useEffect } from "react";
import { services } from "@/services";

export default function Index() {
  const [selected, setSelected] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);

  function handleToggleSelected(value: string) {
    if (selected.includes(value)) {
      return setSelected((state) => state.filter((item) => item !== value));
    }
    setSelected((state) => [...state, value]);
  }

  function handleClearSelected() {
    Alert.alert("Limpar", "Deseja limpar tudo?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => setSelected([]) },
    ]);
  }

  function handleSearch() {
    // navegar para outra tela
    router.navigate("/Recipes/" + selected);
  }

  useEffect(() => {
    services.ingredientes.findAll().then(setIngredients);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Escolha {"\n"}
        <Text style={styles.subtitle}>os produtos</Text>
      </Text>

      <Text style={styles.message}>
        Descubra receitas baseadas nos produtos que você escolheu.
      </Text>

      {/* Faz a renderização de uma lista de todos os ingredientes por meio de um mapeamento passando dentro de um array e retirando a barra de rolagem*/}
      {/* contentContainerStyle -> fazer a estilização dentro da lista */}
      {/* isso é para fazer na horizontal <ScrollView horizontal contentContainerStyle={styles.ingredients}> */}
      <ScrollView
        contentContainerStyle={styles.ingredients}
        showsVerticalScrollIndicator
      >
        {ingredients.map((item) => (
          <Ingredient
            key={item.id}
            name={item.name}
            image={`${services.storage.imagePath}/${item.image}`}
            selected={selected.includes(item.id)}
            onPress={() => handleToggleSelected(item.id)}
          />
        ))}
      </ScrollView>

      {selected.length > 0 && (
        <Selected
          quantity={selected.length}
          onClear={handleClearSelected}
          onSearch={handleSearch}
        />
      )}
    </View>
  );
}
