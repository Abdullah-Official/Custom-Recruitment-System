import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Resume from '../components/Resume'
import { PrimaryColor } from '../constants/PrimaryColor'
import {auth, db} from '../firebase'


const StudentsList = () => {
    const [data,setData] = useState([])
    useEffect(() =>{
        const unsubscribe = db.collection('CV').onSnapshot(snapshot => {
             setData(snapshot.docs.map(doc =>({
                 id: doc.id,
                 data: doc.data()  
             })))
        } )
 
        return unsubscribe
 
     },[])
    return (
      <ScrollView>
            <View style={{justifyContent:'center', alignItems:'center', marginVertical:15}}>
            <Text style={{fontSize:28, marginVertical:10, textAlign:'center', color:PrimaryColor, fontWeight:'bold'}}>List Of Students with their CV's</Text>
           {
               data.map((v,i) =>{
                   return (
                       <Resume 
                       key={i}
                       name={v.data.name}
                       skills={v.data.skills}
                       degree={v.data.degree}
                       yearComplt={v.data.yearComplt}
                       exp = {v.data.exp}
                       />
                   )
               })
           }
        </View>
      </ScrollView>
    )
}

export default StudentsList

const styles = StyleSheet.create({})
