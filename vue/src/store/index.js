import {createStore} from "vuex";
import axiosClient from "../axios";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN")
    }
  },
  getters: {},
  actions: {
    register({commit},user){
      return axiosClient.post('/register', user)
        .then(({data})=>{
          commit('setUser', data);
          return data;
        })
        .catch((error)=>console.log(error.response.data))
    },
    login({commit},user){
     return axiosClient.post('/login', user)
       .then(({data})=>{
         commit('setUser', data);
         return data;
       })
       .catch((error)=>console.log(error.response.data))
    }
  },
  mutations: {
    logout: (state) => {
      state.user.data={};
      state.user.token=null;
    },
    setUser:(state, userData)=>{
      state.user.token = userData.token;
      state.user.date = userData.user;
      sessionStorage.setItem("TOKEN",userData.token);
    }
  },
  modules: {}
})

export default store;
