import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PrimaryColor, SecondaryColor } from '../constants/PrimaryColor'
import {auth, db} from '../firebase'
import { Button, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Resume from '../components/Resume';

const Profile = ({navigation}) => {
    const [skills, setSkills] = useState()
    const [degree, setDegree] = useState()
    const [yearComplt, setYearComplt] = useState()
    const [exp, setExp] = useState()
    const [data,setData] = useState([])

        const onSubmit = async () =>{
            if(skills,degree,yearComplt,exp == ''){
                alert("Please fill all required fields..")
            }
            else{
               await db.collection("CV").add({
                    name: auth.currentUser.displayName,
                    skills: skills,
                    degree: degree,
                    yearComplt: yearComplt,
                    exp:exp,
                })
        
                navigation.replace("Home")
            }
        }
    
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
        <View style={{flex:1}}>
            <ScrollView>
            <View style={{flex:1}}>
                <View style={{flexDirection:'row', padding:20}}>
                    <View><View style={styles.customAvatar}><Text style={styles.avatarText}>{auth.currentUser.displayName.slice(0,2)}</Text></View></View>
                    <View style={{padding:18}}>
                        <Text style={{textTransform:'uppercase',letterSpacing:2, color:'#000', opacity: 0.8}}>{auth.currentUser.displayName}</Text>
                        <Text  style={{color:'#000', opacity: 0.8}}>{auth.currentUser.email}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{padding:16, color: PrimaryColor, fontSize:25, fontWeight: 'bold'}}>{ !data.length ? ("Create CV Now!") : ("My CV/Resume")}</Text>
                   {
                       data.length ? (
                        <View style={{alignItems:'center', justifyContent:'center'}}>
                        <Input style={{width: '60%', }} placeholder='Name' value={auth.currentUser.displayName} />
                        <Input style={{width: '60%'}} placeholder='Skills' value={skills} onChangeText={(e) => setSkills(e)} />
                        <Input style={{width: '60%'}} placeholder='Highest Degree' value={degree} onChangeText={(e) => setDegree(e)} />
                        <Input style={{width: '60%'}} placeholder='Degree Completion Year' value={yearComplt} onChangeText={(e) => setYearComplt(e)} />
                        <Input style={{width: '60%'}} placeholder='Experience' value={exp} onChangeText={(e) => setExp(e)} />
                        <Button onPress={onSubmit} title="Create" containerStyle={{width:'60%', backgroundColor:'#4da8da'}} raised={true} />
                        </View>
                       ) : (
                           <View style={{justifyContent:'center', alignItems:'center'}}> 
                                     {
                                         data.map((v,i) =>{
                                            <Resume 
                                            name={auth.currentUser.displayName}
                                            skills={v.data.skills}
                                            />
                                         })
                                     }
                               <Button title="Companies" containerStyle={{marginTop:20, width:'80%'}} />
                           </View>
                       )
                   }
                </View>
            </View>
            </ScrollView>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    customAvatar:{
        backgroundColor:"purple",
        opacity: 0.8,
        width:80,
        height:80,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 100
    },
    avatarText:{
        color: '#fff',
        textTransform:'uppercase',
        fontSize:25
    },
    
})
