import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native"; 
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar, StyleSheet, Dimensions,FlatList, View, TouchableOpacity, Text } from "react-native";                                   
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";                                                                 
import MyApp from "./comp.tsx";
import ImgComp from "./Image.tsx";  
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming } from "react-native-reanimated";  
import { useNavigation } from "@react-navigation/native";
import{BlurView} from "expo-blur";

export default function App() {
	const [myEmail, setMyEmail] = useState("");                     const [isEmail, setIsEmail] = useState(false);
	const[name,setName]=useState("");
  const [loading, setLoading] = useState(false);
  const notifyBoxTop = useSharedValue(-40);
  const notifyBoxOpacity = useSharedValue(1);
  const notifyBoxAnim = useAnimatedStyle(() => {                                            
    return { top: notifyBoxTop.value, opacity: notifyBoxOpacity.value };                                                                                   
  });                                                                                                                                         
  
  const [notifyMsg, setNotifyMsg] = useState("");                                                          
  const [backendActive, setBackendActive] = useState(true);                                                                                                                                                                            
  
  const dropDownChanger = () => {                                                           
    setBackendActive(true);                                                                                   
    notifyBoxTop.value = withSequence(                                                                                                             
      withTiming(50, { duration: 500 }),                                                                                                           
      withTiming(50, { duration: 1500 }),                                                                                                          
      withTiming(-40, { duration: 700 })                                                                                                        
    );                                                                                                                                          
    notifyBoxOpacity.value = withSequence(                                                    
      withTiming(1, { duration: 500 }),                                                       
      withTiming(1, { duration: 1500 }),                                                      
      withTiming(0, { duration: 600 })                                                     
    );
  };

  const handleNav = async () => {
    await NavigationBar.setBackgroundColorAsync("#2e4a5f");
    await NavigationBar.setButtonStyleAsync("light");
  };

  useEffect(() => {
    handleNav();                                                                                                                               
  }, []);

  const Stack = createStackNavigator();                                                                                                                                                                                                                                                    const screenWidth = Dimensions.get("window").width; 
  const [nav,setNav]=useState(null);
  const[tab,setTab]=useState([]);
  const tabs = [{id:1,name:"Home",route:"MyApp"},{id:2,name:"Profile",route:"ImgComp"}];

const [clickedTab,setClickedTab] = useState(null);

  
  return (                                                                                                                                      
    <View style={{ flex: 1 }}>                                                                                                               
      <Animated.View                                                                            
        style={[                                                                                  
          {                                                                                         
            height: 30,                                                                             
            position: "absolute",
            borderRadius: 10,                                                                       
            top: -40,                                                                               
            backgroundColor: "#feb819",                                                             
            opacity: backendActive ? 1 : 0,                                                                                                                     
            alignItems: "center",                                                                   
            zIndex: 160,                                                                            
            paddingVertical: 10,                                                                    
            paddingHorizontal: 15,                                                                  
            alignSelf: "center",
            justifyContent: "space-between",
	    flexDirection:"row",
	    gap:10
          },                                                                                      
          backendActive && notifyBoxAnim
        ]}
      ><Text style={{margin:2,fontSize:30,fill:"blue"}}>📢</Text>                                                                                      
        <Text
          style={{color: "black",fontSize: 14,whiteSpace: "nowrap"}} >
          {notifyMsg}
        </Text> 
      </Animated.View>

      <StatusBar barStyle="light-content" backgroundColor="#2e4a5f" />

      <NavigationContainer>
        <Stack.Navigator initialRouteName="MyApp">
          <Stack.Screen
            name="MyApp"
            options={{ headerShown: false,unmountOnBlur:false }}>
        {(props) => <MyApp {...props} name={name} setName={setName} myEmail ={myEmail} isEmail={isEmail}loading={loading} setNav={setNav} setLoading={setLoading} dropDownChanger={dropDownChanger} notifyMsg={notifyMsg} setNotifyMsg={setNotifyMsg}/>}
          </Stack.Screen>

          <Stack.Screen
            name="ImgComp"
            options={{ headerShown: false, unmountOnBlur:false}}>
            {(props) => (
              <ImgComp
                {...props}
                loading={loading}
		setNav={setNav}
		name={name} setName={setName} myEmail ={myEmail} isEmail={isEmail}
                dropDownChanger={dropDownChanger}
                notifyMsg={notifyMsg}
                setNotifyMsg={setNotifyMsg}
                setLoading={setLoading}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>

      <BlurView style={styles.tabBar}>
<FlatList                                                             data={tabs}                                                           horizontal={true}                                                     keyExtractor={(item,index)=>item.id}
renderItem={({item})=>{
	const isTab = clickedTab === item.id;

	      return(
        <TouchableOpacity  onPress={()=>{setClickedTab(item.id);nav?.navigate(item.route);
		setTab((prev)=>prev.includes(item.id)?
			 prev.filter((id)=>id !== item.id):[...prev,item.id])}} 
		style={[styles.home,{width:screenWidth/2,borderRightWidth:0,borderColor:isTab?"#ccc":"transparent",backgroundColor:isTab? "white":"transparent",borderTopRightRadius:item.id ==1 && 0,borderTopLeftRadius:item.id == 1 && 15,borderWidth:0,borderColor:isTab?"#ccc":"transparent",}]}>
          <Text style={{ borderRadius:25,color:isTab?"#2e4a5f":"white",fontWeight: "bold"}}>{item.name}</Text>
        </TouchableOpacity>)}}
	/>

      </BlurView>
    </View>
  );
}
                                                                                                                                             
const styles = StyleSheet.create({                                                                                                             
  tabBar: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    borderColor:"#ccc",
    overflow:"hidden",

    flexDirection: "row",
  },
  home: {
    height: 40,                                                                                                                                  
    width: 150,                                                                                                                               
    alignItems: "center",                                                                                                                       
    justifyContent: "center",                                                                                                                  
  },
});
