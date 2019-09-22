import React from "react";
import {
  View,
  Text,
  Platform,
  Dimensions,
  TouchableOpacity,
  Linking,
  Share,
  StyleSheet,
  Modal,
  Image,
  Switch
} from "react-native";
import DeviceInfo from 'react-native-device-info';
import VersionCheck from 'react-native-version-check';
import RNRestart from 'react-native-restart';
import {_storeLocalData, _getLocalData} from '../Redux/helper';

import {Layout, Button} from 'react-native-ui-kitten';
import {Close} from '@src/assets/icons';
import {withTheme} from '../Redux/theme';

import {globalStyle} from '../assets/style';
import {logo} from '../assets/images';

import {getAppSetting} from '../Redux/helper';
const widthWindow = Dimensions.get('window').width;
const heightWindow = Dimensions.get('window').height;
import {HeaderBack} from '../Component/';

const baseOS = DeviceInfo.getSystemVersion();
const buildNumber = DeviceInfo.getBuildNumber();
const systemName = DeviceInfo.getSystemName();
const pkg = require('../../package.json');
const version = VersionCheck.getCurrentVersion();
const name = pkg.name;
const deviceId = DeviceInfo.getDeviceId();

const APP_STORE_LINK = 'itms://itunes.apple.com/us/app/apple-store/myiosappid?mt=8';
const PLAY_STORE_LINK = 'market://details?id=myandroidappid';

export class SettingScreen extends React.Component {
  state = {
    modalVisible: false,
    falseSwitchIsOn: false
  }
  constructor(props) {
    super(props);
    this._renderAbuot = this._renderAbuot.bind(this);
    this._emailBantuan = this._emailBantuan.bind(this);
  }
  async componentDidMount() {
    _getLocalData('_theme').then((e) => {
      if (e === 'dark') {
        this.setState({falseSwitchIsOn: true})
      }
    })
  }
  async _emailBantuan() {
    let text = `SIGNATURE \r\n ${deviceId} \r\n  ${systemName} ${baseOS} \r\n ${name} ${version}`;
    getAppSetting().then((e) => {
      // return e;
      Linking.openURL(`mailto:${e.email}?subject=feedback&body=${text}`)
    });
  }
  _ulas() {
    if (Platform.OS == 'ios') {
      Linking.openURL(APP_STORE_LINK).catch(err => console.error('An error occurred', err));
    } else {
      Linking.openURL(PLAY_STORE_LINK).catch(err => console.error('An error occurred', err));
    }
  }
  _share() {
    let link = PLAY_STORE_LINK;
    if (Platform.OS == 'ios') {} else {
      link = APP_STORE_LINK;
    }
    Share.share({
      message: link + '\n' + name,
      // url: link,
      //url: 'https://www.npmjs.com/package/react-native-video',
      title: name
    }, {
      subject: name,
      dialogTitle: name,
      excludedActivityTypes: [],
      tintColor: 'green'
    },)
  }
  _renderAbuot = () => {
    const {theme} = this.props;
    return (<View style={styles.container}>
      <Layout level='3' style={[
          styles.modalContainer, {
            backgroundColor: theme.PRIMARY_HEADER_BG
          }
        ]}>
        <View style={{
            width: '100%',
            height: 100,
            backgroundColor: theme.PRIMARY_HEADER_BG,
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10
          }}>
          <Image style={globalStyle.logo} source={logo.imageSource}/>
        </View>
        <Text style={{
            color: theme.PRIMARY_TEXT_COLOR
          }}>Versi {version}</Text>
        <Text style={{
            color: theme.PRIMARY_TEXT_COLOR
          }}>Copy right 2019</Text>
        <Button style={{
            position: 'absolute',
            top: -10,
            right: -17,
            width: 50,
            borderRadius: 20,
            backgroundColor: 'transparent',
            borderWidth: 0
          }} size='small' icon={Close} onPress={() => this.setState({modalVisible: false})}/>
      </Layout>

      <View onPress={() => this.setState({modalVisible: false})} style={[
          styles.overlay, {
            height: heightWindow
          }
        ]}/>
    </View>)
  }
  toggleSwitch = (value) => {
    //onValueChange of the switch this function will be called
    this.setState({
      falseSwitchIsOn: value
    }, () => {
      if (!value) {
        _storeLocalData('_theme', 'light').then(() => {
          RNRestart.Restart();
          //this.props.setTheme('light');
        });
      } else {
        _storeLocalData('_theme', 'dark').then(() => {
          RNRestart.Restart();
          //this.props.setTheme('dark');

          // RNRestart.Restart();
        });

      }
    })
    //state changes according to switch
    //which will result in re-render the text
  }

  render() {
    const {theme} = this.props;
    return (<View style={[
        styles.viewStyles, {
          minHeight: heightWindow,
          backgroundColor: theme.CARD_TEXT_BG,
          color: theme.CARD_TEXT_COLOR
        }
      ]}>
      <HeaderBack navigation={this.props.navigation} title={'title'} theme={theme}/>
      <Modal visible={this.state.modalVisible} animationType="slide" transparent={true} style={{}} onRequestClose={() => {
          this.setState({modalVisible: false});
        }}>
        {this._renderAbuot()}
      </Modal>

      <View style={{
          margin: 10
        }}>
        <View style={{
            borderBottomColor: theme.PRIMARY_HEADER_BG,
            borderBottomWidth: 2,
            marginBottom: 10,
            paddingBottom: 5
          }}>
          <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: theme.CARD_TEXT_COLOR
            }}>PENGATURAN</Text>
        </View>

        <TouchableOpacity activeOpacity={0.9}>
          <View style={{
              marginBottom: 5,
              paddingBottom: 5,
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row'
            }}>
            <Text style={{
                fontSize: 16,
                color: theme.CARD_TEXT_COLOR
              }}>Tema Malam</Text>
            <Switch trackColor={'#ccccccc'}
              //tintColor={'red'}
              thumbColor={theme.PRIMARY_HEADER_BG} onValueChange={this.toggleSwitch} value={this.state.falseSwitchIsOn}/>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{
          margin: 10
        }}>
        <View style={{
            borderBottomColor: theme.PRIMARY_HEADER_BG,
            borderBottomWidth: 2,
            marginBottom: 10,
            paddingBottom: 5
          }}>
          <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: theme.CARD_TEXT_COLOR
            }}>SARAN</Text>
        </View>

        <TouchableOpacity activeOpacity={0.9} onPress={() => this._emailBantuan()}>
          <View style={{
              marginBottom: 5,
              paddingBottom: 5
            }}>
            <Text style={{
                fontSize: 16,
                color: theme.CARD_TEXT_COLOR
              }}>Email Bantuan</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.9} onPress={() => this._ulas()}>
          <View style={{
              marginBottom: 5,
              paddingBottom: 5
            }}>
            <Text style={{
                fontSize: 16,
                color: theme.CARD_TEXT_COLOR
              }}>Ulas aplikasi ini</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.9} onPress={() => this._share()}>
          <View style={{
              marginBottom: 5,
              paddingBottom: 5
            }}>
            <Text style={{
                fontSize: 16,
                color: theme.CARD_TEXT_COLOR
              }}>Share aplikasi ini</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.9} onPress={() => this.setState({modalVisible: true})}>
          <View style={{
              marginBottom: 5,
              paddingBottom: 5
            }}>
            <Text style={{
                fontSize: 16,
                color: theme.CARD_TEXT_COLOR
              }}>Tentang aplikasi ini</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>);
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: 200,
    height: 200,
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: 9999,
    borderRadius: 10
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    width: widthWindow
  }
});

export default PageSc = withTheme(SettingScreen);
