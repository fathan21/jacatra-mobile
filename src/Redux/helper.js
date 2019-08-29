import {parse, differenceInHours, format, distanceInWordsToNow} from 'date-fns';
import AsyncStorage from '@react-native-community/async-storage';
const idDateFns = require('date-fns/locale/id')

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

export function setMetta(meta_temp) {
  let meta = {};
  let app_setting = getAppSetting();
  if (typeof app_setting['menu'] === 'undefined') {
  }else{
    meta = {
      title:app_setting['site_title'],
      keywords:app_setting['site_keywords'],
      site_subtitle:app_setting['site_subtitle'],
      description:app_setting['site_subtitle'],
      menu:app_setting['menu'],
      img:app_setting['site_logo'],
      type:'article',
      twitter:app_setting['twitter'],
      wa:(app_setting['site_wa']).replace('+',''),
      fb:app_setting['social_facebook'],
      ig:app_setting['social_ig'],
    };
  }


  if (meta_temp.title !== undefined) {
    meta.title = meta_temp.title + ' - ' +meta.title;
  }
  if (meta_temp.description !== undefined) {
    meta.description = meta.description +' - '+ meta_temp.description;
  }
  if (meta_temp.keyword !== undefined) {
    meta.keyword = meta_temp.keyword;
  }
  if (meta_temp.type !== undefined) {
    meta.type = meta_temp.type;
  }
  if (meta_temp.img !== undefined) {
    meta.img = meta_temp.img;
  }

  return(
    <Helmet>
      <meta charSet="utf-8" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description}  />
      <meta name="keywords" content={meta.keyword} />
      <meta property="og:type" content={meta.type} />
      <link rel="canonical" href={window.location.href} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:image" content={meta.img} />
    </Helmet>
  )
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
