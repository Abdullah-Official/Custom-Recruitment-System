import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SecondaryColor } from '../constants/PrimaryColor'

const Resume = (props) => {
    
    return (
        <View style={styles.cvContainer}> 
        <Text style={{color: "#fff", fontSize: 30 ,textAlign:'center', textTransform:'uppercase' ,marginBottom:14, letterSpacing:3, fontWeight:'bold'}}>Hire Me!</Text>
        <Text  style={{color:'#fff', marginBottom:5, letterSpacing:1, textTransform:'uppercase', fontSize:13, }}>Name: <Text style={{color:'#fff', marginBottom:5, letterSpacing:1, textTransform:'uppercase', fontSize:13, }}>{props.name}</Text></Text>
        <Text style={{color:'#fff', marginBottom:5, letterSpacing:1, textTransform:'uppercase', fontSize:13, }}>Skills: <Text style={{color:'#fff', marginBottom:5, letterSpacing:1, textTransform:'uppercase', fontSize:13, }}>{props.skills}</Text></Text>
        <Text style={{color:'#fff', marginBottom:5, letterSpacing:1, textTransform:'uppercase', fontSize:13, }}>Highest Degree: <Text style={{color:'#fff', marginBottom:5, letterSpacing:1, textTransform:'uppercase', fontSize:13, }}>{props.degree}</Text></Text>
        <Text style={{color:'#fff', marginBottom:5, letterSpacing:1, textTransform:'uppercase', fontSize:13, }}>Year Of Completion: <Text style={{color:'#fff', marginBottom:5, letterSpacing:1, textTransform:'uppercase', fontSize:13, }}>{props.yearComplt}</Text></Text>
        <Text style={{color:'#fff', marginBottom:5, letterSpacing:1, textTransform:'uppercase', fontSize:13, }}>Experience: <Text style={{color:'#fff', marginBottom:5, letterSpacing:1, textTransform:'uppercase', fontSize:13, }}>{props.exp}</Text></Text>
    </View>
    )
}

export default Resume

const styles = StyleSheet.create({
    cvContainer:{
        backgroundColor: SecondaryColor,
        justifyContent:'center',
        marginVertical:10,
        padding:20,
        height: 280,
        borderRadius: 12,
        width:'80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    }
})
