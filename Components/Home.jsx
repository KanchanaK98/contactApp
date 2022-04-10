import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, Image,View,ScrollView,SafeAreaView,RefreshControl,ImageBackground } from 'react-native';
import { Card, FAB  } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import image from '../assets/bgImage.jpg';
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const  Home = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [users, setusers] = useState([]);
    useEffect(()=>{
        axios.get("http://192.168.1.6:8070/user/view").then((res)=>{
            setusers(res.data);
            // console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        })

        
    },[])
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        axios.get("http://192.168.1.6:8070/user/view").then((res)=>{
            setusers(res.data);
            // console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        })
      }, []);

      let [fontsLoaded] = useFonts({
        Inter_900Black,
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }
    
       const renderList = users.map((item)=>{
            return (
            
            
            <Card style={styles.mycard} key={item._id} onPress={() =>
                navigation.navigate('View Profile', { id:item._id, name: item.name,role:item.role,email:item.email,contact:item.contact,address:item.address,picture:item.picture })
              }>
                <View style={styles.row}>
                    <Image 
                    style = {{ width:50,height:50,borderRadius:50 }}
                    source = {{ uri:item.picture }}
                    />
                    <View style={{ marginLeft:8 }}>
                    {/* <Text style={{ fontSize:20,fontFamily: 'Inter_900Black',}}>{item.name}</Text> */}
                    <Text style={{ fontSize:20,}}>{item.name}</Text>
                    <Text style ={{ fontStyle:'italic' }}>{item.role}</Text>
                    </View>
                </View>
        
            </Card>
            
            
            );
        }
        )
        return(
        <ImageBackground source={image} style={styles.image}>
        <SafeAreaView style={styles.main}>
        
        {/* <LinearGradient colors={['#f12711', '#f5af19']} style={styles.linearGradient}> */}
        <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
            }
        >
        {renderList}
        </ScrollView>
        <FAB
            style={styles.fab}
            icon="plus"
            theme={{ colors:{accent:"red"} }}
            onPress={() =>navigation.navigate('Add Contact')}
        />
        {/* </LinearGradient> */}
        
        </SafeAreaView>
        </ImageBackground>
        )
        
        
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    mycard:{
        margin:10,
        padding:5,
        borderRadius:10,
        backgroundColor: '#e9e4d4',
    },
    row:{
        flexDirection:"row"
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
      main:{
          flex:1
      }
})

export default Home;