import React,{useState,useEffect } from 'react';
import { StyleSheet, Text,Modal , Image,View,ScrollView,SafeAreaView,Alert  } from 'react-native';
import { TextInput,Button  } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { LinearGradient } from 'expo-linear-gradient';

function AddContact() {
    const [name, setname] = useState("");
    const [contact, setcontact] = useState("");
    const [role, setrole] = useState("");
    const [email, setemail] = useState("");
    const [address, setaddress] = useState("");
    const [modal, setmodal] = useState(false);
    const [Image, setImage] = useState(null);
    const [picture, setpicture] = useState("");
    const [uploaded, setuploaded] = useState(false);
    const [saved, setsaved] = useState(false);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            setImage(result.uri);
        // upload image to the cloudinary//
            const uri = result.uri;
            const type = `test/${result.uri.split(".")[1]}`;
            const name = `test.${result.uri.split(".")[1]}`;
            const source = {uri, type, name}; 
            const data = new FormData()
            data.append('file', source)
            data.append('upload_preset', 'contactApp')
            data.append("cloud_name", "khan98")
            fetch("https://api.cloudinary.com/v1_1/khan98/image/upload", {
            method: "post",
            body: data
            }).then(res => res.json()).
            then(data => {
                setpicture(data.url);
                setmodal(false);
                setuploaded(true);
                console.log("URL = "+data.url);
                
            }).catch(err => {
                console.log("An Error has been ocurred While Uploading")
            })
        }
      };
      const pickCamera = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            setImage(result.uri);
            const uri = result.uri;
            const type = `test/${result.uri.split(".")[1]}`;
            const name = `test.${result.uri.split(".")[1]}`;
            const source = {uri, type, name}; 
            const data = new FormData()
            data.append('file', source)
            data.append('upload_preset', 'contactApp')
            data.append("cloud_name", "khan98")
            fetch("https://api.cloudinary.com/v1_1/khan98/image/upload", {
            method: "post",
            body: data
            }).then(res => res.json()).
            then(data => {
                setpicture(data.url);
                setmodal(false);
                setuploaded(true);
                console.log("URL = "+data.url);
                
            }).catch(err => {
                console.log("An Error has been ocurred While Uploading")
            })
        }
      };

      const saveButton = async () =>{
        console.log("save button");
        const newUser = {name,role, email,contact,address,picture}
        console.log(newUser);
        if(name&&role&&email&&contact&&address&&picture)
        {
            await axios.post("http://192.168.1.6:8070/user/add",newUser).then(()=>{
                console.log("Saved data......!")
                setname("");
                setrole("")
                setcontact("");
                setemail("");
                setaddress("");
                setpicture("");
                setsaved(true);
            }).catch((err)=>{
                console.log(err)
                
            })
        }else{
            Alert.alert('Error', 'Fill all the fields', [
                
                { text: 'Dismiss', onPress: () => console.log('OK Pressed') },
              ]);
        }
      }

    return (
        <View style = {styles.root}>
            <LinearGradient colors={['#c31432', '#240b36']} style={styles.linearGradient}>
                <TextInput
                label="Name"
                value={name}
                mode="outlined"
                theme={theme}
                outlineColor="green"
                style = {styles.inputStyle}
                onChangeText={text => setname(text)}
                />
                <TextInput
                label="Role"
                value={role}
                mode="outlined"
                theme={theme}
                outlineColor="green"
                style = {styles.inputStyle}
                onChangeText={text => setrole(text)}
                />
                <TextInput
                label="Address"
                value={address}
                mode="outlined"
                theme={theme}
                outlineColor="green"
                style = {styles.inputStyle}
                onChangeText={text => setaddress(text)}
                />
                <TextInput
                label="Contact Number"
                value={contact}
                mode="outlined"
                theme={theme}
                keyboardType="number-pad"
                outlineColor="green"
                style = {styles.inputStyle}
                onChangeText={text => setcontact(text)}
                />
                <TextInput
                label="E-Mail"
                value={email}
                mode="outlined"
                theme={theme}
                keyboardType="email-address"
                outlineColor="green"
                style = {styles.inputStyle}
                onChangeText={text => setemail(text)}
                />
                <View style={{ alignItems:'center',marginTop:200 }}>
                
                    {uploaded?(<Button style={styles.buttonStyleUploaded} icon="check-all" mode="contained" onPress={() => setmodal(true)}>
                        Uploaded Image
                    </Button>):(<Button style={styles.buttonStyle} icon="camera" mode="contained" onPress={() => setmodal(true)}>
                        Upload Image
                    </Button>)}
                    
                    {saved?(<Button style={styles.buttonStyleSaved} icon="content-save-all" mode="contained" onPress={saveButton}>
                        saved
                    </Button>):(<Button style={styles.buttonStyle} icon="content-save-all" mode="contained" onPress={saveButton}>
                        save
                    </Button>)}
                    
                    
                </View>

                
                    
                        <Modal visible={modal}  transparent={true} animationType="slide" onRequestClose={()=>{setmodal(false)}}>
                        <View style={styles.modalView}>
                        <View style={{ flexDirection:"row",justifyContent:"space-around" ,padding:10}}>
                            <Button   Button icon="camera" mode="contained" onPress={pickCamera} style={styles.ModalButton}>
                            Camera
                            </Button>
                            <Button icon="image" mode="contained" onPress={pickImage} style={styles.ModalButton}>
                                Gallery
                            </Button>
                        </View>
                            <Button icon="close-circle-outline" mode="contained" onPress={() => setmodal(false)} style={styles.ModalButton}>
                                Cancel
                            </Button>
                        </View>
                            
                        </Modal>
                    
                    
            </LinearGradient>
        
        </View>
        
    );
}
const theme = {
    colors:{
        primary:"blue"
    }
}
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },
    root:{
        flex:1,
        backgroundColor:"#defcfa",
        
        
    },
    inputStyle:{
        margin:5,
        backgroundColor:"#eaafc8",
        
    },
    modalView:{
        position:"absolute",
        bottom:2,
        backgroundColor:"#aa076b",
        width:"100%",
        borderRadius:10
       
    },
    ModalButton:{
        backgroundColor:"#ec008c"
    },
    buttonStyle:{
        margin:8,
        marginHorizontal:100,
        borderRadius:20
        
    },
    buttonStyleUploaded:
    {
        margin:8,
        marginHorizontal:100,
        backgroundColor:"green",
        borderRadius:20
    },
    buttonStyleSaved:{
        margin:8,
        marginHorizontal:100,
        backgroundColor:"green",
        borderRadius:20
    }
    
})
export default AddContact;