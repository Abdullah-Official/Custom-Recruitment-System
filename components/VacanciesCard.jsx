import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Card, Icon } from 'react-native-elements';
import { SecondaryColor } from '../constants/PrimaryColor';

const VacanciesCard = (props) => {
    return (
        <Card containerStyle={{borderRadius:10,}}>
        <Card.Title>{props.vacancy}</Card.Title>
        <Card.Divider/>
        <Card.Image style={{resizeMode:'cover',}} source={{uri:'https://media.istockphoto.com/photos/apply-now-jobs-job-working-recruitment-employees-business-desk-picture-id643778458?k=6&m=643778458&s=612x612&w=0&h=42rZTES6oeZFldaS0TgZ3grMiaDYx_cZLw_pljZ5U6w='}}/>
          <Text style={{color: SecondaryColor, letterSpacing:1,fontSize:18, fontWeight:'bold', marginVertical:3}}>{props.companyName}</Text>
          <Text style={{marginBottom: 10, fontSize:13}}>
            {props.desc}
          </Text>
          
      </Card>
    )
}

export default VacanciesCard

const styles = StyleSheet.create({})
