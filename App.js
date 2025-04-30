import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View, Platform } from "react-native";
import Titulo from "./components/titulo";
import Visor from "./components/visor";
import Boton from "./components/boton";
import Tabs from "./components/tabs";
import { useState, useEffect } from "react";
import playSound from "./utility/playSound";
import * as Notifications from "expo-notifications";
import { enviarNotificacion } from "./utility/notificacion";

const alarma = require("./assets/sound/russia-eas-alarm-1964-269169.mp3");

export default function App() {
  // Asocia cada opción con un tiempo específico
  const tiemposPorSeleccion = {
    Pomodoro: 25 * 60, // 25 minutos
    "Descanso Corto": 5 * 60, // 5 minutos
    "Descanso Largo": 15 * 60, // 15 minutos
  };
  const [seleccion, setSeleccion] = useState("Pomodoro");
  const [tiempoInicial, setTiempoInicial] = useState(tiemposPorSeleccion["Pomodoro"]);
  const [tiempo, setTiempo] = useState(tiemposPorSeleccion["Pomodoro"]);
  const [run, setRun] = useState(false);
  

  const colores = ["#3D7CFC", "#D5D6FF", "#B73DFC"];

  const solicitarPermisosNotificaciones = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        console.log("Permiso de notificación denegado");
        return;
      }
    }
    console.log("Permiso de notificación concedido");
  };

  useEffect(() => {
    solicitarPermisosNotificaciones();
  }, []);

  useEffect(() => {
    let intervalo;

    if (run && tiempo > 0) {
      intervalo = setInterval(() => {
        setTiempo((tiempoAnterior) => tiempoAnterior - 1); // Decrementa el tiempo en 1 segundo
      }, 1000);
    }

    if (tiempo === 0 && run) {
      playSound(alarma); // Sonido de alarma
      setRun(false);
      enviarNotificacion();
    }

    return () => clearInterval(intervalo);
  }, [run, tiempo]);

  const cambiarSeleccion = (opcion) => {
    setSeleccion(opcion);
    const nuevoTiempo = tiemposPorSeleccion[opcion];
    setTiempo(nuevoTiempo);
    setTiempoInicial(nuevoTiempo);
    setRun(false);
  };
  

  return (
    <View
      style={[
        styles.container,
        Platform.OS === "android" && { paddingTop: 25 },
        { backgroundColor: colores[["Pomodoro", "Descanso Corto", "Descanso Largo"].indexOf(seleccion)] },
      ]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Titulo titulo="Pomodoro" />
        <Visor tiempo={tiempo} />
        <Boton
          run={run}
          setRun={setRun}
          tiempo={tiempo}
          setTiempo={setTiempo}
          tiempoInicial={tiempoInicial}
        />
        <Tabs setSeleccion={cambiarSeleccion} seleccion={seleccion} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
