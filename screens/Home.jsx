import React, { useLayoutEffect, useState,useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import {auth, db} from '../firebase'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import VacanciesCard from '../components/VacanciesCard';
import { Button } from 'react-native-elements';

const Home = ({navigation}) => {
    const [data,setData] = useState([])

    const logout = () =>{
        auth.signOut();
        navigation.replace("Login")
    }
    useLayoutEffect(() =>{
        navigation.setOptions({
            headerTintColor: 'white',
            headerLeft: () =>(
<TouchableOpacity onPress={logout} activeOpacity={1} ><AntDesign name="logout" size={24} color="white" style={{fontWeight:'bold'}}  /> <AntDesign name="logout" size={24} color="red" /></TouchableOpacity>
            )
        })
    },[])
    useEffect(() =>{
        const unsubscribe = db.collection('Vacancies').onSnapshot(snapshot => {
             setData(snapshot.docs.map(doc =>({
                 id: doc.id,
                 data: doc.data()  
             })))
        } )
 
        return unsubscribe
 
     },[])
    return (
        <View style={{flex:1, backgroundColor:'#12232e'}}>
                    <StatusBar style="light"/>
            <View style={{flex:0, marginBottom:15}}>
                <View style={{alignItems: 'flex-end',paddingRight:10}}><TouchableOpacity activeOpacity={0.6} containerStyle={{marginTop:20, width:30, height:'auto',}} onPress={logout} >
                <AntDesign name="logout" size={24} color="#fff" />
                    </TouchableOpacity></View>
                <View style={{flexDirection:'row', paddingTop:30}}>
                <View style={{paddingHorizontal:10, paddingTop:10}}><Ionicons name="school-sharp" size={63} color="white" /></View>
                    <View>
                    <Text style={{color:'#fff', fontSize:34, fontWeight:'bold', textTransform:'uppercase'}}>Welcome</Text>
                    <Text style={{color:'#fff', fontSize:16}}>{auth.currentUser.photoURL === "Admin" ? (`${auth.currentUser.displayName} (ADMIN)` ) : (auth.currentUser.displayName)}</Text>
                    </View>
                </View>
            </View>
            <View style={{flex:2}}>
               <View style={{flexDirection:'row'}}>
                    <View><Text style={{color:'#f1f1f1', padding:18, fontSize:24, }}>Vacancies</Text></View>
                    <View><Feather style={{paddingTop:30}} name="corner-right-down" size={24} color="white" /></View>
                </View>
               <ScrollView>
               <View style={{marginBottom:10}}>
                
                {
                    data.length ? (
                        data.map((v,i) =>{
                            return (
                                <VacanciesCard 
                                key={i}
                                companyName={v.data.companyName}
                                vacancy={v.data.vacancy}
                                desc={v.data.desc}
                                />
                            )
                        })
                    ): (
                       <View style={{justifyContent:'center', alignItems:'center', marginTop:'40%'}} >
                            <Text style={{color:'white', textAlign:'center', fontStyle:'italic'}}>No Vacancies till now ..</Text>
                       </View>
                    )
                }
                
                </View>
               </ScrollView>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})
