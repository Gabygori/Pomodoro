import { View, Text, Pressable, StyleSheet } from "react-native";

// Creo un arreglo de opciones
const opciones = ["Pomodoro", "Descanso Corto", "Descanso Largo"];

const Tabs = ({ seleccion, setSeleccion }) => {
  const handlerSeleccion = (opcion) => {
    setSeleccion(opcion);  // Cambiar el estado con el nombre de la opción seleccionada
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      {opciones.map((opcion, index) => (
        <Pressable
          key={index}
          onPress={() => handlerSeleccion(opcion)}
          style={({ pressed }) => [
            styles.boton,
            { opacity: pressed ? 0.5 : 1 },
            seleccion === opcion && styles.botonSeleccionado,  // Aplica el estilo si la opción está seleccionada
          ]}
        >
          <Text>{opcion}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  boton: {
    borderWidth: 2,
    width: "33%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    textAlign: "center",
    borderColor: "white",
    alignItems: "center",
    marginTop: 20,
  },
  botonSeleccionado: {
    borderColor: "black",  // Color del borde cuando la opción está seleccionada
  },
});

export default Tabs;
