import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

export default function ImgComp({name,setName,myEmail,isEmail,setNav,navigation,loading,setLoading,dropDownChanger,setNotifyMsg,notifyMsg}:{loading:boolean,setLoading:()=>void,dropDownChanger:()=>void,notifyMsg:string,setNotifyMsg:()=>void}){
  const [image, setImage] = useState<string | null>(null);

  useEffect(()=>{if(setNav){setNav(navigation)}},[navigation]);

  useEffect(() => {
    getImage();
  }, []);
  const[profile,setProfile]=useState("");

  const getImage = async () => {
	  setProfile("Loading Photo...")
    setLoading(true);
    try {
      const response = await axios.get("https://mybackend-oftz.onrender.com/api/userDetails/Mark");
      setImage(response.data.uri);
      setNotifyMsg(`Photo of ${response.data.name} has been downloaded successfully`);
      setProfile(`Hello ${response.data.name}`)
      dropDownChanger();
    } catch (err) {
      setNotifyMsg(`Error, Photos failed to fetch: ${err}`);
      dropDownChanger();
    } finally {
      setLoading(false);
      setNotifyMsg(response.data.uri);
      dropDownChanger();
    }
  };

  return (
    <>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}

      <View style={styles.container}>
        <ScrollView style={styles.imageContainer}>
	<View style={styles.innerContainer}>
          {Array(6)
            .fill(null)
            .map((_, index) => (<>
              <View key={index} style={styles.imageWrapper}>
                 
                  <Image source={{ uri: image }} style={styles.image} />
                 
                
              </View>
	      <Text style={styles.imageText}>
	      {profile}
	      </Text>
           </> ))}
	    </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    zIndex: 150,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(46,74,95,0.4)",
    position: "absolute",
  },
  container: {
    flex: 1,
    backgroundColor: "#2e4a5f",
    justifyContent: "center",

    alignItems: "center",
  },
  imageContainer: {
	  position:"absolute",
	  alignSelf:"center",
	  top:20,
	  height:"90%",
	  width:"80%",
    padding: 20,
  },
  innerContainer:{height:400,width:300,position:"absolute",alignSelf:"center",top:0,display:"flex",alignItems:"center"},
  imageWrapper: {
    height: 300,
    width: 200,
    borderRadius: 10,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  imageText: {
    color: "white",
    position:"relative"
  },
});
