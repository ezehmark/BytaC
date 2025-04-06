import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import {BlurView} from "expo-blur";

export default function ImgComp({
  name,
  setLoadingTxt,
  loadingTxt,
  setName,
  myEmail,
  isEmail,
  setNav,
  navigation,
  loading,
  setLoading,
  dropDownChanger,
  setNotifyMsg,
  notifyMsg,
}: {
  loading: boolean;
  setLoading: () => void;
  dropDownChanger: () => void;
  notifyMsg: string;
  setNotifyMsg: () => void;
}) {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (setNav) {
      setNav(navigation);
    }
  }, [navigation]);

  useEffect(() => {
    getImage();
  }, []);
  const [profile, setProfile] = useState("");

  const getImage = async () => {
    setLoadingTxt("Loading Photo...");
    setLoading(true);
    try {
      const response = await axios.get(
        "https://mybackend-oftz.onrender.com/api/userDetails/Mark",
      );
      setImage(response.data.uri);
      setNotifyMsg(
        `Photo of ${response.data.name} has been downloaded successfully`,
      );
      setProfile(`Hello ${response.data.name}`);
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

  const [touched, setTouched] = useState([]);

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.imageContainer}>
          <View style={styles.innerContainer}>
            {<FlatList
		    data={Array(6).fill(null)}
	      horizontal={false}
	      keyExtractor={(_,index)=>index.toString()}

	      renderItem={({index})=>{
                const isTouched = touched.includes(index);

                return (
                  <React.Fragment>
                    <TouchableOpacity
		    onPress={()=>{setTouched((prev)=>prev.includes(index)?prev.filter((id)=>id !== index):[...prev,index])}}
         style={[styles.imageWrapper,{ opacity: isTouched ? 1 : 0.5}]}>
        <Image source={{ uri: image }} style={styles.image} />
        <BlurView style={styles.imageText}><Text style={{color:"black"}}>{profile}</Text></BlurView>
	</TouchableOpacity>
                  </React.Fragment>
)
	      }}
	      />}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e4a5f",
    justifyContent: "center",

    alignItems: "center",
  },
  imageContainer: {
    position: "absolute",
    alignSelf: "center",
    top: 20,
    height: "90%",
    width: "80%",
    padding: 20,
    backgroundColor:"black",
  },
  innerContainer: {
    height: "100%",
    width: "100%",
    position: "absolute",
    alignSelf: "center",
    top: 0,
    display: "flex",
    alignItems: "center",
  },
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
    position: "absolute",
    bottom:20,
    alignSelf:"center",
    right:10,
    shadowRadius:2,
    shadowOffset:{width:0,height:0},
    shadowColor:"black",

    borderRadius:10,
    padding:5,

  },
});
