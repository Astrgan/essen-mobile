import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import Colors from '../constants/Colors';
import { withNavigation } from 'react-navigation';

function ListThumbnail(props){

    const list = props.list

    let listBg
    if (props.isActive){
      listBg = Colors.cardColors[Math.floor(Math.random()*Colors.cardColors.length)]
    } else {
      listBg = 'white'
    }

    let dishImageContainerLayout
    if (list.dishes.length == 0) {
      <View style={styles.dishImageContainerHalf}/>
    } else if (list.dishes.length < 3) {
      dishImageContainerLayout = (
      <View style={styles.dishImageContainerHalf}>
          {list.dishes.map((dish) => {
            return <Image key={dish.id} style={styles.dishImage} source={{uri: dish['image-url']}}></Image>
          })}
      </View>
      )
    } else {
      dishImageContainerLayout = (
      <View style={styles.dishImageContainerFull}>
          <Image style={styles.dishImage} source={{uri: list.dishes[0]['image-url']}}></Image>
          <Image style={styles.dishImage} source={{uri: list.dishes[1]['image-url']}}></Image>
          <Image style={styles.dishImage} source={{uri: list.dishes[2]['image-url']}}></Image>
      </View>
      )
    }

    return (
      <TouchableOpacity onPress={(props.onPressAction!==undefined?props.onPressAction:() => handleNavigateToList(list,props.navigation))}>
        <View style={[styles.listContainerOuter, {marginBottom: props.marginBottom}]}>
            <View style={[styles.listContainerInner, {backgroundColor: listBg}]}>
                <View style={styles.listTitleContainer}>
                    <Text style={styles.listTitle}>{list.name}</Text>
                    <Text style={styles.listSubitle}>{list.dishes.length} dishes · {Object.keys(list.ingredients).length} ingredients</Text>
                </View>
                {dishImageContainerLayout}
            </View>
        </View>
      </TouchableOpacity>
    );
};

function handleNavigateToList(list, navigation){
  navigation.navigate('SingleList', {list: list})
}
export default withNavigation(ListThumbnail)

const styles = StyleSheet.create({
    listContainerOuter: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
    },
    listContainerInner: {
      flexDirection: 'row',
      overflow: 'hidden',
      borderRadius: 20,
      paddingLeft: 16,
      paddingRight: 8,
      paddingTop: 16,
      paddingBottom: 16,
    },
    listTitleContainer: {
      flexDirection: 'column',
      flexBasis: "45%"
    },
    listTitle: {
      textAlign: 'left',
      fontSize: 18,
      color: 'black',
      fontFamily: "montserrat"
    },
    listSubitle: {
      marginTop: 4,
      textAlign: 'left',
      fontSize: 13,
      color: 'rgba(0,0,0,0.4)',
    },
    dishImageContainerFull: {
        flexDirection: 'row',
    },

    dishImageContainerHalf:{
      flexBasis: "55%",
      flexDirection: 'row-reverse',
    },

    dishImage: {
        marginRight: 8,
        borderRadius: 10,
        width: 68,
        height: 68,
        backgroundColor: 'gray',
    },
})