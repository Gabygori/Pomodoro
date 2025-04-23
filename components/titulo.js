import { View, Text, StyleSheet} from "react-native";

export default function Titulo({titulo}) {
  return (
    <View>
        <Text>
            {titulo}
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    texto: {
      color: "#fff",
      fontSize: 25,
      fontWeight: "bold",
      padding: 10,
    },
  });