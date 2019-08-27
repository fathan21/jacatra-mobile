import React from "react";
import { View,  ScrollView, ActivityIndicator, RefreshControl, Dimensions,Text } from "react-native";
import {
    Layout, Button, TopNavigation, Input,
} from 'react-native-ui-kitten';

import {
  SafeAreaView as SafeAreaViewReactNavigation,
} from 'react-navigation';
import {RenderErrorBlog} from '../Component';

import {api} from '../Redux/Actions';
import {
  ArrowBackOutlineWhite,
} from '@src/assets/icons';
import theme from '../assets/style';

import {ArticleCard1, ArticleCard2, ArticleCard3 } from '../Component/';

const widthWindow = Dimensions.get('window').width;
export default class SarchScreen extends React.Component {
  state = {
    isRefreshing: false,
    loading: false,
    error: false, 
    submit: false,
    q:'',
    data: [],
    realted:[]
  } 
  _isMounted = false;
  constructor(props) {
    super(props);

    this.inputS = React.createRef();
    this._goToPage = this._goToPage.bind(this);
  }
  
  componentDidMount() {
    
    //console.warn(this.inputS);
    let app = this;
    setTimeout(function(){ app.inputS.current.focus();}, 1000);
  };
  
  componentWillMount(){
    this._isMounted = true;
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    // 
    
  }
  onInputValueChange = (q) => {
    this.setState({ q });
  };
  onSubmitEditing =(e) => {   
    this.setState({
      submit:true
    })
    this._getData();
  }
  
  renderLeftControl = () => {
      return (
        
        <View style = {{display: 'flex',flexDirection: 'row', alignItems:'center'}} >
          
          <Button
            style={{
                width:40,height:40, 
                backgroundColor:theme.PRIMARY_COLOR, 
                color:theme.PRIMARY_TEXT_COLOR,
                padding:0,
                display:'flex', alignItems:'center',justifyContent:'center', borderWidth:0
            }}
            size='large'
            icon={ArrowBackOutlineWhite}
            onPress={()=>this.props.navigation.goBack()}
            // onPress={()=>this.inputS.current.focus()}
          />
          
          <Input
            ref={this.inputS}
            value={this.state.q}
            onChangeText={this.onInputValueChange}
            size={'small'}
            placeholder="cari.."
            onSubmitEditing={this.onSubmitEditing}
            style={{width:widthWindow-80, padding:0, fontSize:13}}
            textStyle={{padding:0,margin:0}}
          />
        </View>
      );
  }
  renderRightControls = () => {
      return (
        <View style = {{display: 'flex',flexDirection: 'row'}} >
         
        </View>
    );
  }
  
  _goToPage = (item) => {
    if(!item.id){
      return;
    }
    this.props.navigation.push('Page', {
        itemId: item.link,
    })
  }
  componentWillUnmount(){
    this._isMounted = false;
    this.setState( {
      isRefreshing: false,
      loading: false,
      error: false, 
      data: {},
      realted:[]
    });
  }
  _onRefresh = ()=>{
    
  }
  _getData = () => {
    let params = {
      q: this.state.q,
      page:1,
      limit: 50
    };
    this.setState({loading:true},()=>{
      api.post('news',{filter:params}).then((res) => {
        if(!this._isMounted){
          return;
        }
        this.setState({
          loading: false,
          isRefreshing:false,
          data: res.data.data
        });
      }).catch((e)=>{
        if(!this._isMounted){
          return;
        }
        this.setState({
          loading: false,
          isRefreshing:false,
          error: true
        });
      });
    });
  }
  
  render() {
    
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');


    return (
      <Layout style={{paddingBottom:50}}>
        
        <SafeAreaViewReactNavigation >
          <TopNavigation alignment = 'start'
              style={{backgroundColor:theme.PRIMARY_COLOR, marginBottom:10, color:theme.PRIMARY_TEXT_COLOR}}
              leftControl={this.renderLeftControl()}
              rightControls = {
                this.renderRightControls()
              }
              />
        </SafeAreaViewReactNavigation>
        <ScrollView 
          refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh}
                tintColor="#000000"
                title="Loading..."
                titleColor="#000000"
                colors={['#000000', '#000000', '#000000']}
                progressBackgroundColor="#ffffff"
              />
          }
          >
            {
              this.state.loading? 
              <ActivityIndicator size="large" color={theme.PRIMARY_COLOR} />: null
            }
            {
              this.state.error? 
              <RenderErrorBlog getDatas={this._getData} />: null
            }
            <ScrollView>
              {
                !this.state.loading && !this.state.error?
                this.state.data.length == 0 && this.state.submit? 
                  <Text style={{marginVertical:50, textAlign:'center'}}>Data tidak ditemukan</Text>:
                  this.state.data.map((blog, i) => {
                    return (
                      <ArticleCard2 goToPage={this._goToPage} key={i}  data={blog}   />
                    );
                  })
                :null
              }
            </ScrollView>
            

          </ScrollView>
      </Layout>
    );
  }
}
