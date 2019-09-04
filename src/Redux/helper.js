import {parse, differenceInHours, format, distanceInWordsToNow} from 'date-fns';
import AsyncStorage from '@react-native-community/async-storage';
import {api} from '../Redux/Actions';
const idDateFns = require('date-fns/locale/id');


export function toDateIndo(value) {
	if(!value){
		return '';
	}
	let dateLeft = new Date();
	let dateRight = parse(
	  value,
	  'YYYY-MM-DD HH:mm:ss',
	  new Date()
	);
	let difH = differenceInHours(dateLeft, dateRight);
	if(difH > 24){
	    return `${format(value,'MMMM DD, YYYY HH:mm',{locale: idDateFns})}`;
	}else{
	    return `${distanceInWordsToNow(dateRight, {locale: idDateFns})} yang lalu`;
	}
}
export function toDate(value) {
	if(!value){
		return '';
	}
  return `${format(value,'MMMM DD, YYYY HH:mm',{locale: idDateFns})}`;
}


export function parseQueryParams(query) {
    //You get a '?key=asdfghjkl1234567890&val=123&val2&val3=other'
    if(!query){
      return {};
    }
    let queryArray = query.split('?')[1].split('&');
    let queryParams = {};
    for (let i = 0; i < queryArray.length; i++) {
      const [key, val] = queryArray[i].split('=');
      queryParams[key] = val ? val : true;
    }
    return queryParams;
}
export function currency(amount,symbol="Rp.") {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    // the default value for minimumFractionDigits depends on the currency
    // and is usually already 2
  });
  return  symbol+''+formatter.format(amount);
}

export function getToken() {
  let auth = window.localStorage.getItem(config.core.user_local_);
  if(auth){
    auth = JSON.parse(auth);
    return auth.token;
  }
  return false;
}

export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
export const Rupiah=(angka)=> {
  if(!angka){
    return '';
  }
	var rupiah = '';
	var angkarev = angka.toString().split('').reverse().join('');
	for(var i = 0; i < angkarev.length; i++) if(i%3 === 0) rupiah += angkarev.substr(i,3)+'.';
	return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
}
//genearet appid

export const _isBookmark = async (id) => {
  try {
    return AsyncStorage.getItem('_bookmark').then((e)=>{
        if(e === null) {
          return false;
        }
        let dk = JSON.parse(e);
        let n = dk.filter(person => person.id === id);
        if(n.length > 0) {
          return true;
        } else {
          return false;
        }
    })
  } catch (error) {
    return false;
  }
};

export const _getBookmark = async () => {
  try {
    return AsyncStorage.getItem('_bookmark').then((e)=>{
        let data = [];
        if(e !== null) {
          data = JSON.parse(e);
        } 
        return data;
        
    })
  } catch (error) {
    return [];
  }
};
export const _saveBookmark = async (item) => {
  try {

    return AsyncStorage.getItem('_bookmark').then((e)=>{
        let data = [];
        if(e !== null) {
          data = JSON.parse(e);
        } 
        let cek = data.filter(person => person.id === item.id);
        if(cek.length > 0){   
          for (let index = 0; index < data.length; index++) {
            if (data[index].id === item.id){
              data.splice(index,1);
              break;
            }
          }
          
          return _storeLocalData('_bookmark', data).then((e)=>{
            return 'hapus';
          });    
        } else {        
          data.push(item);
          return _storeLocalData('_bookmark', data).then((e)=>{
            return 'save';
          });
        }
        
    })
  } catch (error) {
    return false;
  }
};
export const _storeLocalData = async (key,data) => {
  try {
    data = JSON.stringify(data);
    let r = await AsyncStorage.setItem(key, data);
    return r;
  } catch (error) {
    return null;
  }
};

export const _getLocalData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      return JSON.parse(value);
    }
  } catch(e) {
    // error reading value
    return null;
  }
}

export const removeHtmlStorage = async(name) =>{
  //localStorage.removeItem(name);
  //localStorage.removeItem(name+'_time');
  try {
    await AsyncStorage.multiRemove([name, name+'_time']);
  } catch (error) {
    // Error saving data
  }
}

export const  setHtmlStorage = async (name, value, expires) =>{
  value = JSON.stringify(value);
  if (expires==undefined || expires=='null') { var expires = 3600; } // default: 1h

  var date = new Date();
  var schedule = Math.round((date.setSeconds(date.getSeconds()+expires))/1000);

  // localStorage.setItem(name, value);
  // localStorage.setItem(name+'_time', schedule);
  try {
    await AsyncStorage.multiSet([[name, value],[name+'_time', schedule]]);
    return JSON.parse(value);
  } catch (error) {
    // Error saving data
    return null;
  }
}

export const statusHtmlStorage = async (name) => {
  var date = new Date();
  var current = Math.round(+date/1000);
  try {
    const stored_time = await AsyncStorage.get(name+'_time');
    // Get Schedule
    // var stored_time = localStorage.getItem(name+'_time');
    if (stored_time==undefined || stored_time==null) { stored_time = 0; }

    // Expired
    if (stored_time < current) {
        // Remove
        removeHtmlStorage(name);
        return 0;
    } else {
        
        const dt = await AsyncStorage.get(name);
        return JSON.parse(dt);
    } 
  } catch (error) {
    // Error retrieving data
    return 0;
  }
}
export  const getAppSetting= async() => {
 
  try {
    let dt = await statusHtmlStorage('_setting');
    if (dt == 0 ){
      return api.get('setting').then((res)=>{
        setHtmlStorage('_setting',  res.data.data);
        return res.data.data;
      });
    } else {
      return dt;
    }
  } catch (error) {
    return null;
  }
  
}
