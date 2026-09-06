import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
}
export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemons();
  }, []);
  async function fetchPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10",
      );
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
          };
        }),
      );

      setPokemons(detailedPokemons);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <ScrollView>
      {pokemons.map((items) => (
        <View key={items.name}>
          <Text>{items.name}</Text>
          <View className="flex-row">
            <Image source={{ uri: items.image }} style={{ width: 80, height: 80 }} />
            <Image source={{ uri: items.imageBack }} style={{ width: 80, height: 80 }} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
