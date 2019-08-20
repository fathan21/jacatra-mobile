import {parse, differenceInHours, format, distanceInWordsToNow} from 'date-fns';
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
	    return `${format(value,'DD/MM/YYYY HH:mm')}`;
	}else{
	    return `${distanceInWordsToNow(dateRight, {locale: idDateFns})} yang lalu`;
	}
}
export function toDate(value) {
	if(!value){
		return '';
	}
  return `${format(value,'DD/MM/YYYY HH:mm')}`;
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

export function getProfile() {
  let auth = window.localStorage.getItem(config.core.user_local_);
  if(auth){
    auth = JSON.parse(auth);
    return auth;
  }
  return false;
}

export function getHomeModule(){
  return api.get(config.core.base_url+'setting');
}
export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
export function checkToken(){
  let url = baseUrl+'checkToken';
  let config = {headers: {
      "Content-Type": "application/json",
      "token":getToken()
  }};
  return axios.get(url,config)
  .then(function (response) {
    // handle success
    if(response.data.status !=='ok'){
      window.localStorage.removeItem(config.core.user_local_);
      return {status:'invalid token'};
    }else{
      return {status:'ok'};
    }
  })
  .catch(function (error) {
    // handle error
      return {status:'ok'};
  })
  .then(function (r) {
    return r;
    //return {status:'ok'};
  });
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

export function getAppSetting() {

  let app_name = config.core.app_name;
  // console.log(app_name,'appname');
  let auth = window.localStorage.getItem(app_name);
  if(auth){
    auth = JSON.parse(auth);
    return auth.s;
  }
  return false;


}
export function getSignature() {
  let app_name = config.core.app_name;
  let auth = window.localStorage.getItem(app_name);

  if(auth){
    auth = JSON.parse(auth);
    return auth.app_id;
  }
  return false;
}
export function generateAppID(){
  let appID = config.core.app_id;
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var rand = Math.floor(Math.random() * 100);
  var secret = year+''+month+''+day+''+rand;
      secret = new Buffer(secret).toString('base64');
  //console.log('ese',secret);
  let app_name = config.core.app_name;

  let status = statusHtmlStorage(app_name);

  if(status === 0){
    // genereate new token and flash Data
    let data =  new Buffer(appID+'.'+secret).toString('base64');
    let headers={};
    headers['Access-Control-Allow-Origin'] = "*";
    headers['Signature'] = data;
    headers['Content-Type'] = "application/json";
		return new Promise((resolve, reject)  => {
      fetch(config.core.base_url+'setting', {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *omit
        headers: headers,
        method: 'GET', // *,POST,GET, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *same-origin
        redirect: 'follow', // *manual, error
        referrer: 'no-referrer', // *client
      })
      .then(response =>{
        //console.log('signature',data);
        if(response.ok){
          let res = response.clone();
          res.json().then((r) => {
            setHtmlStorage(app_name,{'app_id':data,'s':r.data},1);
            resolve(response.json());
          });

        }else{
          resolve({'status':'error','msg':response.statusText});
        }
      })
      .catch(e=>{
          resolve({'status':'error','msg':e});
      });
		});
  }else{
			return new Promise(resolve => {
        resolve({'status':'ok','msg':'success'});
			});
  }
  //let data = base64urlEncode( header ) + “.” + base64urlEncode( payload );
  //let hashedData = hash( data, secret );
  //let signature = base64urlEncode( hashedData );
}

export function logoutData(){
  localStorage.removeItem(config.core.user_local_);
  // localStorage.removeItem(config.core.cart_local_);
}
export function getCart(){
  let d = statusHtmlStorage(config.core.cart_local_);
  if(!d){
    return [];
  }
  return d.dt;
}

// set local data
export function removeHtmlStorage(name){
    let app_name = config.core.app_name;
    if(app_name === name){
  		localStorage.removeItem(config.core.user_local_);
      // localStorage.removeItem(config.core.cart_local_);
    }

		localStorage.removeItem(name);
		localStorage.removeItem(name + '_time');
}
export function setHtmlStorage(name, value, expires){
  		if (expires === undefined || expires === null) { expires = 1500*1; } // default: 2h
  		let date = new Date();
  		let schedule = Math.round((date.setSeconds(date.getSeconds() + expires)) / 1000);
  		let	k = String(schedule);
  		localStorage.setItem(name, JSON.stringify(value));
  		localStorage.setItem(name + '_time', k);
}
export function statusHtmlStorage(name){
		let date = new Date();
		let current = Math.round(+date / 1000);
		// Get Schedule
		let stored_time = localStorage.getItem(name + '_time');
		let	j = parseInt(stored_time,0);
		if (stored_time === undefined || stored_time === null) { j = 0; }
		// Expired
		if (j < current) {
			// Remove
			removeHtmlStorage(name);
			return 0;
		} else {
			return JSON.parse(localStorage.getItem(name));
		}
}
