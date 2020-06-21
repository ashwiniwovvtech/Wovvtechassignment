import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';
import {Button, Input} from 'native-base';

  


function Item({ title }) {
    return (
      <View style={styles.item}>
          <View style={styles.itemContainer}>
              <View style={{flexDirection:'row'}}>
               <Text style={styles.newsText}>Headline: </Text>
               <Text style={styles.newsText, {width:300}} numberOfLines={1}>{title}</Text>
               <Text style={styles.ttext}>URL : </Text>
               <Text>{created_at}</Text>
            </View>               
               
          </View>       
        
      </View>
    );
  }

export default class LatestNews extends Component {

    constructor(props){
        super(props);
        this.state = {
            data:[],
            isLoading:false,
            text:'',
            arrayholder: [],
        }
        
        this.getData()

    }

    getData = () => {

        return fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0',{

            method:'GET',
            headers:{
                Accept:'application/json',
                'content-type':'application/json',
            }
            
        }).then(response => response.json())
        .then(responseJson => {
            // console.log("response-------------: " , responseJson ) 

            this.setState({
                data:responseJson.hits
            }),
            function() {
                this.arrayholder = responseJson.hits;
                console.log("response: " , this.state.data ) 
              }
            
        });

    }

    SearchFilterFunction(text) {
        const newData = this.arrayholder.filter(function(item) {
          const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
    
        this.setState({
          dataSource: newData,
          text: text,
        });
      }

    

    render(){
  
      return (
        <View style={styles.container}>

            <View style={styles.subcontainer}>
              
               <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={text => this.SearchFilterFunction(text)}
                        value={this.state.text}
                        underlineColorAndroid="transparent"
                        placeholder="title, URL and author name"
                        />
                   
                   <Image source={require('./images/search.png')} style={styles.simage} />
                   <Image source={require('./images/list.png')} style={styles.simage} />
               </View>
             
               
            </View>


            <View>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => 
                    // <Item title={item.title} created_at={item.created_at} />
                    <View style={styles.item}>
                    <View style={styles.itemContainer}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.newsText}>Headline: </Text>
                            <Text style={styles.newsText, {width:300}} numberOfLines={1}>{item.title}</Text>
                        </View>   
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.ttext}>Created at : </Text>
                            <Text>{item.created_at}</Text>
                        </View>  

                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.ttext}>URL : </Text>
                            <Text style={{width:300}} numberOfLines={3}>{item.url}</Text>
                        </View> 

                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.ttext}>Author : </Text>
                            <Text>{item.author}</Text>
                        </View>            
                         
                    </View>       
                  
                </View>
                
                   }
                    keyExtractor={item => item.id}
                />

            </View>            
        </View>
      );
  
    }
   
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop:30,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    searchContainer:{
        flex:4,
        flexDirection:'row',       
        padding:10,
        // borderColor:'#aaa',
        // borderWidth:1,
        margin:8,
        fontSize:15,
    },
    subcontainer:{
        flexDirection:'row'
    },
    imageCon:{
        flex:1,
        padding:10,
        margin:2,
    },
    newsText:{
        fontSize:16
    },
    simage:{
        height:30,
        width:30,
        alignSelf:'flex-end',
        marginHorizontal:3,
        marginVertical:5,
    },
    item:{
        borderColor:'#eee',
        borderWidth:1,
        borderRadius:5,
        padding:10,
        marginHorizontal:10,
        marginVertical:5,
    },
    ttext:{
        fontSize:15,
        color:'#444',
    },
    textStyle: {
        padding: 10,
     },
    textInputStyle: {
        flex:3,
        height: 40,
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: '#888',
        backgroundColor: '#FFFFFF',
        marginHorizontal:8,
      },
  });
  