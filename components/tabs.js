import { View, Text, Pressable, StyleSheet } from "react-native";

//creo un arreglo de opciones
const opciones = ["Pomodoro", "Descanso Corto", "Descanso Largo"];

const Tabs = ({ seleccion, setSeleccion }) => {
  const handlerSeleccion = (index) => {
    setSeleccion(index);
  };
  return (
    <View style={{ flexDirection: "row" }}>
      {opciones.map((opcion, index) => (
        <Pressable
          //TAREA 3: ESTILO DEL BORDE CONDICIONAL, SI LA SELECCION DEL TAP (INDICE) NO COINCIDE CON LA SELECCION (ESTADO) NO DEBO DIBUJAR EL BORDE
          style={({ pressed }) => [
            styles.boton,
            { opacity: pressed ? 0.5 : 1 },
            {},
          ]}
          key={index}
          onPress={() => handlerSeleccion(index)}
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
    padding: 8,
    borderRadius: 10,
    borderColor: "white",
    alignItems: "center",
    marginTop: 15,
  },
});

export default Tabs;