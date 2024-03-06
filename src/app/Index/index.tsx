import { View, Text, ScrollView, Alert } from "react-native";

import { styles } from "./styles";
import { Ingredient } from "@/components/Ingredient";
import { useState } from "react";
import { Selected } from "@/components/Selected";

export default function Index() {
  const [selected, setSelected] = useState<string[]>([]);

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
        {Array.from({ length: 100 }).map((item, index) => (
          <Ingredient
            key={index}
            name="tomate"
            image=""
            selected={selected.includes(String(index))}
            onPress={() => handleToggleSelected(String(index))}
          />
        ))}
      </ScrollView>

      {selected.length > 0 && (
        <Selected
          quantity={selected.length}
          onClear={handleClearSelected}
          onSearch={() => {}}
        />
      )}
    </View>
  );
}
