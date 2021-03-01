import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { PrimaryColor, SecondaryColor } from '../constants/PrimaryColor'
import {auth, db} from '../firebase'

const PostVacancy = ({navigation}) => {
    const [vacancy, setVacancy] = useState()
        const [desc, setDesc] = useState()
    const onSubmit = async () =>{

        

        if(vacancy, desc == ''){
            alert("Please fill all required fields..")
        }
        else{
           await db.collection("Vacancies").add({
                vacancy: vacancy,
                companyName: auth.currentUser.displayName,
                desc: desc,
            })
    
            navigation.replace("Home")
        }
    }
    return (
      <View style={{justifyContent:'center', flex:1}}>
          <View style={{justifyContent:'center', alignItems:'center', marginVertical:15, marginBottom:20}}>
          <Text style={{color: SecondaryColor, fontSize:30,}}>Post a <Text style={{color: PrimaryColor, fontSize:40, fontWeight: 'bold'}}>JOB</Text></Text>
          </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Input
            style={{ width: "60%" }}
            placeholder="Company Name"
            value={auth.currentUser.displayName}
          />
          <Input
            style={{ width: "60%" }}
            placeholder="Vacancy"
            value={vacancy}
            onChangeText={(e) => setVacancy(e)}
          />
          <Input
            style={{ width: "60%" }}
            placeholder="Description"
            value={desc}
            onChangeText={(e) => setDesc(e)}
          />
          <Button
            onPress={onSubmit}
            title="Post"
            containerStyle={{ width: "60%", backgroundColor: "#4da8da" }}
            raised={true}
          />
        </View>
      </View>
    );
}

export default PostVacancy

const styles = StyleSheet.create({})
