import React from 'react';
import {  Text, View, TouchableOpacity,StyleSheet, Touchable } from 'react-native';
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component{
    constructor(){
        super()
        this.state={hasCameraPermissions:null,
        scanned:false,
        scannedData:"",
        buttonState:"normal"}
    }
    getCameraFunction=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status==='granted',
            buttonState:"clicked"
        })
    }
    handleBarCodeScaner=async({type,data})=>{
        this.setState({
            scanned:true,scannedData:data,buttonState:"normal"
        })
    }
    render(){
      const hasCameraPermissions=this.state.hasCameraPermissions;
      const scanned= this.state.scanned;
      const buttonState=this.state.buttonState;
      if(buttonState==="clicked" && hasCameraPermissions){
          return(
              <BarCodeScanner
              onBarCodeScanned={scanned ? undefined:this.handleBarCodeScaner}
              style={StyleSheet.absoluteFillObject}/>
          )
      }
      else if(buttonState==="normal"){
        return(
            <View style = {styles.container}> 

                <Text style={styles.displayText}>
                    {hasCameraPermissions===true ? this.state.scannedData:"request camera permissions"}
                </Text>

                <TouchableOpacity 
                style={styles.scanButton}
                onPress={this.getCameraFunction}>
                    <Text style={styles.buttonText}>
                        scan qr code
                    </Text>
                </TouchableOpacity>
            </View>
        )}
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",

    },
    displayText:{
        fontSize:15,
        textDecorationLine:"underline"
    },
    scanButton:{
        backgroundColor:"#2196f3",
        padding:10,
        margin:10
    },
    buttonText:{
        fontSize:20
    }
})