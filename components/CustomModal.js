import React, { useState } from 'react';
import Dimensions from 'Dimensions';
import {
  TextInput,
  Keyboard,
  Image,
  Modal,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';

// import { connect } from 'react-redux';
// import store from './store';
// import { Provider } from 'react-redux';
// import ACTION_TYPES from './constants/ActionTypes';

import CustomButton from '../components/CustomButton';
import SectionHeader from '../components/SectionHeader';
import KeyboardListener from 'react-native-keyboard-listener';

import Colors from '../constants/Colors';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';
const Icon = createIconSetFromFontello(fontelloConfig);

const CustomModal = (props) => {
    let lists = []
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [isKeyboardVisible, setKeyboardVisiblity] = useState(false);
    const [isAddInputVisible, setAddInputVisiblity] = useState(false);
    return (
        <Modal
          visible={props.displayModal}
          transparent={true}
          animationType={'slide'}
          onRequestClose={()=>{console.log('close')}}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => handleCloseModal(setAddInputVisiblity, setKeyboardVisiblity, props.closeModal)}
          />
          <View style={isKeyboardVisible? [styles.modalBgContainer, {height: 410+keyboardHeight}] : styles.modalBgContainer}>
            <View style={styles.modalContentContainer}>
              <View style={styles.modalHeaderContainer}>
                <SectionHeader title="Save to"/>
                <TouchableOpacity onPress={()=>handleToggleAddInput(isAddInputVisible, setAddInputVisiblity)}>
                  <Icon
                    style={styles.valueImage}
                    name='add'
                    size={34}
                    color='black'
                  />
                </TouchableOpacity>
              </View>
              
              <View style={[styles.separator, {marginTop: 0}]}></View>
              {isAddInputVisible ?
                <View style = {styles.addInputContainer}>
                  <KeyboardListener
                    onWillShow={(e) => {
                      // let newSize = Dimensions.get('window').height - e.endCoordinates.height
                      setKeyboardVisiblity(true); 
                      setKeyboardHeight(e.endCoordinates.height)
                      console.log(e.endCoordinates.height, "SHOWN", isKeyboardVisible)}}
                    onWillHide={() => {
                      let newSize = Dimensions.get('window').height
                      setKeyboardVisiblity(false); 
                      console.log("HIDE", isKeyboardVisible)}}
                  />
                  <TextInput style = {styles.addInput} onSubmitEditing={Keyboard.dismiss}/>
                </View>  
              :
              lists.length === 0 ?
              <View style = {styles.emptyStateBox}>
                <View style = {styles.emptyStateImage}></View>
                <Text style = {styles.paragraph}>Seems you haven’t created any lists yet.{"\n"}Let’s add your first one!</Text>
              </View>
              :
              <View style = {styles.listContainer}>

              </View>
              }
              
              <CustomButton isPrimary={false} title="Cancel" onPressAction={() => handleCloseModal(setAddInputVisiblity, setKeyboardVisiblity, props.closeModal)}/>
            </View>
          </View>
        </View>
      </Modal>
    )
}
function handleCloseModal(setAddInputVisiblity, setKeyboardVisiblity, closeModalFunction){
  setAddInputVisiblity(false)
  setKeyboardVisiblity(false)
  closeModalFunction()
}

function handleToggleAddInput(addInputVisibility, setAddInputVisiblity){
  console.log("ADD PRESSED")
  setAddInputVisiblity(!addInputVisibility);
}

export default CustomModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
      },
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modalBgContainer: {
        height: 457,
        backgroundColor: 'white',
      },
      modalContentContainer: {
        flex: 1,
        paddingHorizontal: 21,
      },
      modalHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
  
      },
      separator: {
        marginVertical: 20,
        backgroundColor: Colors.tabIconDefault,
        height: 1,
      },
      emptyStateBox: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
      },
      emptyStateImage: {
        width: 160,
        height: 160,
        marginBottom: 20,
        backgroundColor: Colors.tabIconDefault
      },
      paragraph: {
        textAlign: 'center',
        fontSize: 17,
        color: 'rgba(0,0,0,0.4)',
      },
      addInputContainer: {
        width: 160,
        height: 250,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
      },
      addInput: {
        width: '100%',
        height: 40,
        backgroundColor: 'red',
      },
      listContainer: {
        width: 160,
        height: 250,
        backgroundColor: 'red',
      },
})