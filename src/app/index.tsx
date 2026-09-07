import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Search } from "lucide-react-native";
interface Pokemon {
  name: string;
  image: string;
  types: pokemonTypes[];
  id: number;
}

interface pokemonTypes {
  type: {
    name: string;
    url: string;
  };
}

interface pokemonDes {
  description: {
    name: string;
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
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase().trim()),
  );

  async function fetchPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=20",
      );
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            id: details.id,
            name: pokemon.name,
            image:
              details.sprites.other?.["official-artwork"]?.front_default ||
              details.sprites.other?.home?.front_default ||
              details.sprites.front_default,
            types: details.types,
          };
        }),
      );

      setPokemons(detailedPokemons);
    } catch (e) {
      console.log(e);
    }
  }

  const formatId = (id: number) => (id < 10 ? "00" : id < 100 ? "0" : "") + id;

  return (
    <ScrollView className="p-5 px-6 bg-[#F4FCF9]">
      <View className="mb-3 mt-12">
        <Text className="text-[40px] font-extrabold text-[#292A50]">
          Pokédex
        </Text>
        <Text className="text-base text-slate-500 mt-2">
          Search for Pokémon by name or using the National Pokédex number.
        </Text>
      </View>

      <View className="bg-[#EBF3F5] rounded-2xl px-4 h-16 flex-row items-center my-3 gap-x-3">
        <Search
          size={22}
          color="#5A5B7B"
          strokeWidth={2.5}
        />
        <TextInput
          placeholder="Search a name"
          placeholderTextColor="#94a3b8"
          onChangeText={(text) => setSearch(text)}
          value={search}
          className="flex-1 h-full text-base text-[#292A50] px-1"
        />
      </View>

      <View className="flex-row flex-wrap justify-between gap-y-4 pb-20 mt-4">
        {filteredPokemons.map((items) => (
          <Link
            key={items.name}
            href={{ pathname: "/details", params: { name: items.name, image: items.image, color: (colorsByType[items.types[0]?.type?.name] || "#A8A77A") + "35", id: items.id } }}
            className="w-[48%] rounded-2xl py-8 items-center justify-center"
            style={{
              backgroundColor:
                (colorsByType[items.types[0]?.type?.name] || "#A8A77A") + "35",
            }}
          >
            <View className="w-full items-center justify-center px-2">
              <View className="w-28 h-28 items-center justify-center my-1">
                <Image
                  source={{ uri: items.image }}
                  style={{ width: 110, height: 110 }}
                  resizeMode="contain"
                />
              </View>
              <Text
                style={styles.name}
                className="text-[#2e3069] text-center mt-1"
              >
                {items.name.slice(0, 1).toUpperCase()}
                {items.name.slice(1)}
              </Text>
              <Text style={styles.type} className="text-center mt-1">
                {formatId(items.id)}
              </Text>
            </View>
          </Link>
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
