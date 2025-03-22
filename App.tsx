import MyApp from "./comp1.tsx";
import { useEffect } from "react";
import { StatusBar } from "react-native";

export default function App() {

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#2e4a5f" />
      <MyApp />
    </>
  );
}
