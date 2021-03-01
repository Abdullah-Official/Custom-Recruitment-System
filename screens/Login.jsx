import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { PrimaryColor, SecondaryColor } from '../constants/PrimaryColor'
import { Button, Input } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from '../firebase'

const Login = ({navigation}) => {

    const [email, setEmail] = useState();
    const [password,setPassword] = useState()

    useEffect(() =>{
      const unsubscribe = auth.onAuthStateChanged((authUser) =>{
          if(authUser){
              navigation.replace("Home")
          }
      })
      return unsubscribe;
  },[])

  const signIn = () =>{
      auth.signInWithEmailAndPassword(email,password)
      .then((authUser)=>{ return {authUser} })
      .catch(err => alert(err))
  }
  
    return (
      <View style={{ flex: 1, backgroundColor: SecondaryColor }}>
        <View
          style={{
            flex: 1,
            backgroundColor: SecondaryColor,
            justifyContent: "center",
            paddingHorizontal: 30,
            paddingTop: 30,
          }}
        >
          <Text style={styles.loginHeading}>Welcome</Text>
          <Text style={styles.loginText}>Please login to continue</Text>
        </View>
        <View
          style={{
            flex: 2,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 30,
            paddingVertical: 30,
            backgroundColor: "#fff",
            justifyContent:'center'
          }}
        >
          <ScrollView>
            <View style={{ marginVertical: 10 }}>
              <Input
                placeholder="Email"
                leftIcon={
                  <MaterialIcons name="email" size={24} color="black" />
                }
                onChangeText={(e) => setEmail(e)}
                value={email}
              />
              <Input
                placeholder="Password"
                leftIcon={<FontAwesome name="lock" size={24} color="black" />}
                secureTextEntry={true}
                onChangeText={(e) => setPassword(e)}
                value={password}
              />
              <Button onPress={signIn} raised={false} title="Sign In" />
              <Button type="outline" containerStyle={{marginVertical:12}} raised={true} title="Sign Up" onPress={() => navigation.navigate("Sign Up")} />
            </View>
          </ScrollView>
        </View>
      </View>
    );
}

export default Login

const styles = StyleSheet.create({
    loginHeading:{
        color: '#fff',
        fontSize:35,
        fontWeight:'bold'
    },
    loginText:{
        color: '#fff',
        fontSize: 15,
    }
})
