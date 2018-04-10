import React, { Component } from 'React';
import { Image, Animated, Keyboard, Platform, Modal, TouchableOpacity, TextInput, ScrollView,AsyncStorage} from "react-native";
import {
    Container,
    Text,
    View,
    Button,
    Toast,
    Content,
    Header,
    Title,
    Left,
    Body,
    Right,
    Icon,
    Card,
    CardItem,
    H3,
    ListItem,
    List,
    Form,
    Item,
    Label,
    Input,
    Footer,
    FlatList
  } from "native-base";


import styles from "./styles";

var chat_support=[{chat:"HI", flag:0},
{chat:"How May I Help You?", flag:1},
{chat:"I Need one Salwar but it is showing sold out.", flag:0},
{chat:"Send the Product Detail", flag:1},
{chat:"JT_RC_SALWAR_1006", flag:0},
{chat:"Ok I will try to get this product for you", flag:1}, 
{chat:"Above mentioned product", flag:0},
{chat:"ok", flag:1},
{chat:"Thank You", flag:0},
{chat:"Thank You, Always Welcome You for More Queries in Future!", flag:1},];

export default class SOCAmsLiveChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatmessage: '',
      error_code: undefined,
        message: " ",
      messagerender: true,
      };
      this.height = new Animated.Value(220);
      this.width = new Animated.Value(220);
      this.top = new Animated.Value(30);
  }
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }
 
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow = () => {
    Animated.parallel([
      Animated.timing(this.height, {
        toValue: 150,
        duration: 300
      }),
      Animated.timing(this.width, {
        toValue: 150,
        duration: 300
      }),
      Animated.timing(this.top, {
        toValue: Platform.OS === "ios" ? 90 : 0,
        duration: 300
      })
    ]).start();
  };

  _keyboardDidHide = () => {
    Animated.parallel([
      Animated.timing(this.height, {
        toValue: 250,
        duration: 300
      }),
      Animated.timing(this.width, {
        toValue: 250,
        duration: 300
      }),
      Animated.timing(this.top, {
        toValue: 30,
        duration: 300
      })
    ]).start();

  };

  getmessageRow(item){

    // if(item.senderName !=''){
    
      var millisec=item.conversationCreatedTime;
      let currtime = new Date(millisec);
      var time = currtime.toLocaleTimeString();
      var date =dateformat(currtime, 'mmm dd yyyy');
    return(<View style={[styles.listitem, item.flag ? styles.incoming :styles.outgoing ]}>
      <View style={[styles.logo, item.flag ? styles.incoming :styles.outgoing]}>
 
      {/* <Image style={{width:15,height:15}}
    source={require("./../../../assets/user-icon-circle-white.png") }  />  */}
          <Text style={{fontSize:10, marginTop:2,color: '#888888'}}> {item.chat}</Text>
         </View>
          <Text style={styles.chat}> {item.chat}</Text>
  
    {/* <Text style={styles.text}> {date}   {time} <Icon  name="checkmark" style={styles.markicon} />
    </Text>  */}
   </View>);
    //  }
    //  else{
    
    // var millisec=item.conversationCreatedTime;
    //   let currtime = new Date(millisec);
    //   var time = currtime.toLocaleTimeString();
    //    var date = currtime.toDateString();
   
    //   return(<View style={[styles.listitem, item.conversationStatus ? styles.incoming :styles.outgoing ]}>
    //      <View style={[styles.logo, item.conversationStatus ? styles.incoming :styles.outgoing]}>
    //      <Image style={{width:15,height:15}}
    //   source={require("./../../../assets/user-icon-circle-white.png") }  /> 
    //       <Text style={{fontSize:10, marginTop:2,color: '#888888'}}> {AdminName} </Text>
        
          
    //      </View>
    //       <Text style={styles.chat}> {item.conversationMessage}</Text>

    //       <View style={[styles.logo]}>
    //       <Text style={{fontSize:10, marginTop:2,color: '#888888'}}> {date}   {time} </Text>
    //       <Icon  name="checkmark" style={styles.markicon} />
    //       {/* <Icon style={[item.conversationReaderStatus? styles.markicon : styles.icon]} name="done-all" style={styles.markicon} /> */}
    //       </View>
    //       </View>);
    // } 
  }

 clearText() {
    
    this.setState({chatmessage: ''});
    return(<Input placeholder="Enter Your Message Here!" /> );
  }

  checkmessage()
  {
    if(this.state.chatmessage !== ''){
      this.sendmessage()
    }
  }
  render()
  {
    if (this.state.messagerender) {
      
      return(
      <Container>
        <Header style={{backgroundColor: "#bc037f"}}>
          <Left>
          {/* <Animated.Image
            source={require("./../../../assets/live-chat-logo-150.png")}
            style={{height:50, width: 50}}
          /> */}
          </Left>
          <Body>
          <Text style ={{color:"#fff"}}> Welcome To Josh Trendz Chat </Text>
          </Body>
          <Right>
          <Button transparent onPress={() => this.props.navigation.navigate("Drawer")}>
              <Icon name="home"  style={{color: "#fff"}}/>
            </Button>
            <Button transparent > 
            {/* <Icon name="refresh"  style={{color: "#fff", fontSize:20, marginLeft: 5, marginRight:5}}/>  */}
            <Icon name="refresh"  style={{color: "#fff"}}/> 
            </Button>
          {/* <Icon  name="md-remove" style={{color: "#fff", fontSize:20, marginLeft: 5, marginRight:5}} />  */}
          <Button transparent onPress={() => this.props.navigation.goBack()}>
          <Icon  name="close" style={{color: "#fff", }}/>
          </Button>
          </Right>
        </Header>
        <ScrollView>
         
        <List   
                   dataArray={chat_support}
               renderRow={item => this.getmessageRow(item) }  
         
           /> 
           {/* <Text style={styles.incoming}>DeviceId : {jsonObject['deviceID']} </Text>
              <Text style={styles.productDetails}>Company Name: {jsonObject['companyName']}</Text> */}
            
        </ScrollView>
        <View>
        <Footer style={{backgroundColor:"#F5F5F5"}}>
        {/* <Item underline> */}
        <Body>
          
        <Input 
          style={{height: 40, width: 500}} 
          placeholder="Enter Your Message Here!"
          onChangeText={chatmessage => this.setState({chatmessage})}
          value={this.state.chatmessage}
          
        />
        
                      {/* </Item> */}
                      </Body>
        <Right>
        <Icon name="play" style={{color: "#000", fontSize:30, marginRight:15}} onPress={() => this.checkmessage()}/> 
          </Right>
        </Footer>
        </View>
      </Container>
    );
    }
  }
}
