import React from 'react';
import { StyleSheet,View,Image,Text,Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Headline,Subheading,Card,Button  } from 'react-native-paper';
import axios from 'axios';

function ViewProfile({ navigation, route }) {
    const email = route.params.email;
    const contact = route.params.contact;

    const deleteUser = async (id) =>{
        console.log(id);
        await axios.delete("http://192.168.1.6:8070/user/delete/"+id).then(()=>{
                console.log("Deleted user......!")
                navigation.navigate('Home')
            }).catch((err)=>{
                console.log(err)
                
            })
    }
    return (
        <View style={styles.root}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#8A2387', '#3b5998', '#f12711']}
                style={styles.background}
            />
                    <LinearGradient colors={['#F27121', '#E94057','#8A2387']} style={styles.linearGradient}>
                        <View style={styles.imageView}>
                            <Image
                                style={styles.image}
                                source={{
                                uri: route.params.picture,
                                }}
                            />
                            <Headline style={{ fontSize:20,fontFamily: 'Inter_900Black',color: 'white'}}>{route.params.name}</Headline>
                            <Subheading style={{ color:'white' }}>{route.params.role}</Subheading>
                        </View>
                
                        <Card style={styles.row} 
                        onPress={() => Linking.openURL('mailto:'+JSON.stringify(email)+'?subject=SendMail&body=Description') }title="Demo">
                        <View style={styles.card}>
                            <Button icon="email"  ></Button>
                            <Text style={{ marginTop:7,fontSize:15,marginLeft:-10 }}>{route.params.email}</Text>
                        </View>
                        </Card>
                        <Card style={styles.row} onPress={()=>{Linking.openURL('tel:'+JSON.stringify(contact));}}>
                        <View style={styles.card}>
                            <Button icon="cellphone"  ></Button>
                            <Text style={{ marginTop:7,fontSize:15,marginLeft:-10 }}>{route.params.contact}</Text>
                        </View>
                        </Card>
                        <Card style={styles.row}>
                        <View style={styles.card}>
                            <Button icon="home-map-marker"  ></Button>
                            <Text style={{ marginTop:7,fontSize:15,marginLeft:-10 }}>{route.params.address}</Text>
                        </View>
                        </Card>

                        
                    </LinearGradient>
                    <View style={{ flexDirection:"row",justifyContent:"space-around" ,padding:10,position:"absolute",bottom:2, width:"100%"}}>
                                <Button style={{ borderRadius:10 }}  Button icon="trash-can-outline" mode="contained" onPress={()=>{deleteUser(route.params.id)}}>
                                Delete Account
                                </Button>
                                
                        </View>
             
        </View>
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    root:{
        flex:1,
    },
    background:{
        height:'20%'
    },
    image:{
        marginTop:-50,
        width:100,height:100,borderRadius:50
    },
    imageView:{
        alignItems: 'center',
    },
    card:{
        flexDirection:"row",
        borderRadius:20,
        
    },
    row:{
        marginTop:20,
        borderRadius:15,
        margin:10
    }
})
export default ViewProfile;