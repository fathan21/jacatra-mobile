import { createSelector } from 'reselect';

const defaultState = {
  blogs: [],
  blogMain: {},
  blog: {},
  blogLoading: true,
  blogError:{},

  blogsByCat:{},
  blogMainByCat:{},
  blogCountByCat:{},
}

export default (state=defaultState, action={}) => {
  // console.warn(action);
  switch (action.type) {
    // load more
    case 'FETCH_BLOGS_FULFILLED': {
      // console.warn(action.payload.data.main);
      let blogMain = state.blogMain;
      if(!blogMain.id) {
        blogMain = action.payload.data.main;
      }
      return {
        ...state,
        blogs: state.blogs.concat(action.payload.data.data),
        blogMain: blogMain,
        blogLoading: false,
        blogCount:action.payload.data.count,
        blogError: {}
      }
    }
    case 'FETCH_BLOGS_PENDING': {
      return {
        ...state,
        blogLoading: true,
        blogError: {}
      }
    }
    case 'FETCH_BLOGS_REJECTED': {
      return {
        ...state,
        blogLoading: false,
        blogError: { global: action.payload.message }
      }
    }
    
    case 'FETCH_BLOGS_CAT_FULFILLED': {
      // console.warn(action.payload.cat);
      let blogsByCat = jsonCopy(state.blogsByCat);
      let blogMainByCat = jsonCopy(state.blogMainByCat);
      let blogCountByCat = jsonCopy(state.blogCountByCat);
      if (blogsByCat[action.payload.cat]) {      
        blogsByCat[action.payload.cat] = blogsByCat[action.payload.cat].concat(action.payload.data.data);
      } else {      
        blogsByCat[action.payload.cat] = action.payload.data.data;
        blogMainByCat[action.payload.cat] = action.payload.data.main;
        blogCountByCat[action.payload.cat] = action.payload.data.count;
      }
      // console.warn(blogsByCat);
      return {
        ...state,
        blogsByCat: blogsByCat,
        blogMainByCat: blogMainByCat,
        blogCountByCat:blogCountByCat,
        blogLoading: false,
        blogError: {global:''}
      }
    }
    case 'FETCH_BLOGS_CAT_PENDING': {
      return {
        ...state,
        blogLoading: true,
        blogError: {global: ''}
      }
    }
    case 'FETCH_BLOGS_REJECTED': {
      return {
        ...state,
        blogLoading: false,
        blogError: { global: action.payload.message }
      }
    }
    default:
      return state;
  }
}

function jsonCopy(src) {
  return JSON.parse(JSON.stringify(src));
}
