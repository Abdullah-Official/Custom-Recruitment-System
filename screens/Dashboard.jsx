import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text,  } from 'react-native'
import {PrimaryColor, SecondaryColor} from '../constants/PrimaryColor'
import { db} from '../firebase'
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
const Dashboard = () => {
    const [data,setData] = useState([])
    useEffect(() =>{
        const unsubscribe = db.collection('Vacancies').onSnapshot(snapshot => {
             setData(snapshot.docs.map(doc =>({
                 id: doc.id,
                 data: doc.data()  
             })))
        } )
 

   return unsubscribe

     },[])


     const onDeleteAll =  () => {
        data.filter(  (data) => {
            db.collection('Vacancies').doc(data.id).delete() !==  data.id
        })
      }

    return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
       <ScrollView>
       <View style={{flex:1}}>
            <Text style={styles.adminHeading}>Admin Dashboard</Text>
            <View style={{padding:20}}>
                <View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View><Text style={{color: SecondaryColor, fontSize:19, letterSpacing:2 ,fontWeight:'bold', textTransform:'uppercase'}}>Vacancies:</Text></View>
                        <View><Button title="Delete All" onPress={onDeleteAll} containerStyle={{color:'red'}} /></View>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{fontSize:16}}>Total Vacancies: <Text style={{color: PrimaryColor, fontSize: 16}}>{data.length}</Text> </Text>
                    </View>
                </View>
                <View >
                  {
                      data.map((v,i) =>{
                          
                          return (
                              
                            <View style={styles.adminVac}>
                            <View style={{padding:15, justifyContent:'space-between', flexDirection:'row'}}>
                            <View >
                                <Text style={{color:'black', fontWeight:'bold', letterSpacing:1}}>{v.data.vacancy}</Text>
                                <Text style={{color:'gray'}}>{v.data.companyName}</Text>
                                </View>
                            <TouchableOpacity style={{paddingTop:6}} activeOpacity={0.8} ><MaterialIcons name="admin-panel-settings" size={30} color="green" /></TouchableOpacity >
                            </View>
                        </View>
                          )
                      })
                  }
                </View>
            </View>
        </View>
       </ScrollView>
    </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    adminHeading:{
        color: PrimaryColor,
        textAlign:'center',
        paddingVertical:25,
        fontSize:25,
        textTransform:'uppercase',
        fontWeight:'bold'
    },
    adminVac:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 2.4,
        marginTop: 10
    }
})
