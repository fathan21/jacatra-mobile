import { api } from './';

const url = 'news';

export function fetchBlogs(filter={cat:'',page:1,limit:20,q:''}){
  let params = {filter:filter};
  // console.warn(params);
  return dispatch => {
    return dispatch({
      type: 'FETCH_BLOGS',
      payload: api.post(`${url}`, params)
    })
  }
}

export function fetchBlogsCat(filter={cat:'',page:1,limit:20,q:''}){
  let params = {filter:filter};
  return dispatch => {
    dispatch({type: 'FETCH_BLOGS_CAT_PENDING'});
      api.post(`${url}`, params)
      .then(function (res) {
        if(res.error) {
            throw(res.error);
        }
        res.cat = filter.cat;
        dispatch({type:'FETCH_BLOGS_CAT_FULFILLED',payload: res});
        return res;
      })
      .catch(function (error) {
          dispatch({type:'FETCH_BLOGS_REJECTED',payload: {message:error}});
      });
  }
}

export function fetchHeadline(){
  let url_a = 'headline';
  // console.warn(params);
  return dispatch => {
    return dispatch({
      type: 'FETCH_HEADLINE',
      payload: api.post(`${url_a}`, {})
    })
  }
}

export function fetchPopuler(){
  let url_a = 'sidebar';
// console.warn(params);
return dispatch => {
  return dispatch({
    type: 'FETCH_POPULER',
    payload: api.post(`${url_a}`, {})
  })
}
}
