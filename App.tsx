import MyApp from "./userDetails.tsx";
import { useEffect } from "react";
import { StatusBar } from "react-native";                       import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";           export default function App() {
	const handleNav = async()=>{
	await NavigationBar.setBackgroundColorAsync("#2eda5f");
	await NavigationBar.setButtonStyleAsync("light")}
	useEffect(()=>{
	handleNav()},[]);
  return (
    <>  
    <StatusBar barStyle={"light-content"} backgroundColor={"#2eda5f"}/>
    <MyApp/>
    </>
  );
}
