import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Details() {
  const params = useLocalSearchParams();
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        const text = data.flavor_text_entries?.find((item: any) => item.language.name === "en");
        setDescription(text?.flavor_text.replace(/[\n\f]/g, " ") || "");
      });
  }, []);

  return (
    <ScrollView className="p-6 bg-[#F4FCF9] pt-16 relative">
      <Pressable onPress={() => router.back()} className="absolute top-2 z-10 p-2">
        <ArrowLeft size={27} color="#2e3069" strokeWidth={2.5} />
      </Pressable>

      <View className="items-center">
        <Text className="text-[25px] font-extrabold text-[#2e3069]">
          {String(params.name)}
        </Text>
        <Text className="text-[18px] text-[#2e3069]">
          {Number(params.id) < 10 ? "00" + params.id : "0" + params.id}
        </Text>
      </View>

      <View style={{ backgroundColor: params.color }} className="mt-6 rounded-3xl py-12 items-center">
        <Image source={{ uri: String(params.image) }} style={{ width: 300, height: 300 }} />
      </View>

      <View className="mt-6 mb-10">
        <Text className="text-[#2e3069] text-[18px] font-bold">Description</Text>
        <Text className="text-[#2e3069] text-[16px] mt-2">{description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
