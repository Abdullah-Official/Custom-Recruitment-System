import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {SecondaryColor } from '../constants/PrimaryColor'
import { Input, Button } from 'react-native-elements';
import { Picker } from "native-base";
import {auth, db} from '../firebase'
const Signup = ({navigation}) => {
    const [fullName, setFullName] = useState()
    const [email, setEmail] = useState();
    const [password,setPassword] = useState()
    const [userStatus, setUserStatus] = useState()

    const register = () =>{
      
      auth.createUserWithEmailAndPassword(email,password)
      .then(authUser =>{
          authUser.user.updateProfile({
              displayName: fullName,
              email: email,
              photoURL: userStatus
          })
          if(fullName,email,password,userStatus == ''){
            alert("Please fill all required fields..")
        }
        else{
            db.collection(userStatus !== "User" && "Company" ? ("Admin") : userStatus ==="Company" ? ("Company") : ("User")).add({
                fullName: fullName,
                email: email,
                password: password,
                userStatus: userStatus,
            })
    
        }
      }).catch(error => console.log(error.message))
      setFullName("");
      setEmail("");
      setPassword("");
      setUserStatus("");

      navigation.replace("Login")
  }

    return (
      <View style={{ flex: 1, backgroundColor: SecondaryColor }}>
        <View style={styles.flex1}>
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: 27,
              fontWeight: "bold",
            }}
          >
            SIGN UP
          </Text>
          <Text
            style={{ marginVertical: 6, color: "#fff", textAlign: "center" }}
          >
            Please Sign Up to join us .
          </Text>
        </View>
        <View style={{ flex: 2, borderTopRightRadius: 30 , borderTopLeftRadius: 30 , backgroundColor: '#fff'}}>
          <ScrollView>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Input
                placeholder="Full Name"
                onChangeText={(e) => setFullName(e)}
                value={fullName}
                containerStyle={{ width: "80%" }}
              />
              <Input
                placeholder="Email"
                onChangeText={(e) => setEmail(e)}
                value={email}
                containerStyle={{ width: "80%" }}
              />
              <Input
                placeholder="Password"
                onChangeText={(e) => setPassword(e)}
                value={password}
                containerStyle={{ width: "80%" }}
                secureTextEntry={true}
              />
               <View style={{borderBottomColor: '#ccc', borderBottomWidth:2, width:'80%', marginBottom:10}}>
             <Picker
                    mode="dropdown"
                    styles={styles.pickerContent}
                    placeholder="Select Your Blood Group"
                    placeholderStyle={{ color: "#ccc"}}
                    placeholderIconColor={"#000"}
                    selectedValue={userStatus}
                    onValueChange={(e) => setUserStatus(e)}
                >
                    <Picker.Item label="Choose Authorization" value="Null" />
                    <Picker.Item label="User" value="User" />
                    <Picker.Item label="Company" value="Company" />
                    <Picker.Item label="Admin" value="Admin" />
                </Picker>
                </View>
                <Button onPress={register} title="Submit" raised={true} containerStyle={{width:'60%', marginVertical:10}} />
            </View>
          </ScrollView>
        </View>
      </View>
    );
}

export default Signup

const styles = StyleSheet.create({
    flex1:{
        backgroundColor: SecondaryColor,
        justifyContent:'center',
        flex:1,
    },
    pickerContent: {
        color: '#000',
        borderBottomColor: '#000',
        fontSize:12
        }   
})
