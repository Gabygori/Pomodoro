import { Text, View, StyleSheet } from "react-native";

// Tarea 1: formatear el valor del tiempo, para que muestre en minutos en el siguiente formato MM:SS -- EJEMPLO 24:56 -- 05:05
export default function Visor({ tiempo }) {
  // Lógica para convertir segundos a MM:SS
  const minutos = Math.floor(tiempo / 60);
  const segundos = tiempo % 60;

  // Agregamos ceros delante si es necesario
  const tiempoFormateado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50, fontWeight: "bold" }}>
        {tiempoFormateado}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.4,
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "white",
  },
});

