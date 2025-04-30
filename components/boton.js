import { View, Text, Pressable, StyleSheet } from "react-native";
import { Audio } from "expo-av";

const Boton = ({ run, setRun, tiempo, setTiempo, tiempoInicial }) => {
  const toggleRun = () => {
    if (tiempo === 0) {
      // Reinicia al tiempo inicial de la selección actual
      setTiempo(tiempoInicial);
      setRun(false); // Queda pausado después de reiniciar
    } else {
      setRun(!run);
    }
    playSound();
  };

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sound/mouse-click-117076.mp3")
      );
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error("Error al reproducir el sonido:", error);
    }
  };

  const getTextoBoton = () => {
    if (tiempo === 0) return "Reiniciar";
    return run ? "Detener" : "Iniciar";
  };

  return (
    <View>
      <Pressable
        onPress={toggleRun}
        style={({ pressed }) => [styles.boton, { opacity: pressed ? 0.5 : 1 }]}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}>
          {getTextoBoton()}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  boton: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "white",
    marginTop: 10,
    justifyContent: "center",
  },
});

export default Boton;
