import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
  name: string;
  image: string;
  types: pokemonTypes[];
}

interface pokemonTypes {
  type: {
    name: string;
    url: string;
  };
}

const colorsByType: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B8A038",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

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
            types: details.types,
          };
        }),
      );

      setPokemons(detailedPokemons);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <ScrollView className="p-5 bg-[#F4FCF9]">
      <View className="mb-6 mt-2">
        <Text className="text-[40px] font-extrabold text-[#292A50]">
          Pokédex
        </Text>
        <Text className="text-base text-slate-500 mt-2">
          Search for Pokémon by name or using the National Pokédex number.
        </Text>
      </View>
      <View className="flex-row flex-wrap justify-between gap-y-4 pb-20">
        {pokemons.map((items, index) => (
          <View
            key={items.name}
            className="w-[48%] p-4 rounded-2xl items-center py-7"
            style={{
              backgroundColor:
                (colorsByType[items.types[0]?.type?.name] || "#A8A77A") + "35",
            }}
          >
            <Image
              source={{ uri: items.image }}
              style={{ width: 120, height: 120 }}
            />
            <Text style={styles.name} className="text-[#292A50]">
              {items.name.slice(0, 1).toUpperCase()}
              {items.name.slice(1)}
            </Text>
            <Text style={styles.type}>
              {index != 9 ? "00" : "0"}
              {index + 1}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  type: {
    fontSize: 17,
    color: "gray",
  },
});
