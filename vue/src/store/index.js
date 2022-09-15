import {createStore} from "vuex";
import axiosClient from "../axios";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN")
    },
    currentSurvey:{
      loading: false,
      data:{}
    },
    surveys:{
      loading: false,
      data:[

      ]
    },
    questionTypes:["text", "select", "radio", "checkbox", "textarea"],
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
    },
    logout({commit}){
      return axiosClient.post('/logout')
        .then(({response})=>{
          commit('logout', response);
          return response;
        })
    },
    getSurvey({commit}, id){

      commit('setCurrentSurveyLoading', true);

      return axiosClient.get(`/survey/${id}`).then((res)=>{
        commit("setCurrentSurvey", res.data);
        commit('setCurrentSurveyLoading', false);
        return res;
      }).catch((err)=>{
        commit('setCurrentSurveyLoading', false);
        throw err;
      });

    },
    saveSurvey({commit}, survey){
      let response;

      delete survey.image_url;

      if(survey.id){
        response = axiosClient.put(`/survey/${survey.id}`, survey)
          .then((res)=>{
            //commit('updateSurvey', res.data);
            commit('setCurrentSurvey', res.data);
            return res;
          });
      }else{
        response = axiosClient.post('/survey', survey)
          .then((res)=>{
            //commit('saveSurvey', res.data);
            commit('setCurrentSurvey', res.data);
            return res;
          });
      }

      return response;

    },
    deleteSurvey({},id){
      return axiosClient.delete(`/survey/${id}`)
    },
    getSurveys({commit}){
      commit('setSurveysLoading', true);

      return axiosClient.get(`/survey`).then((res)=>{
        commit("setSurveys", res.data);
        commit('setSurveysLoading', false);
        return res;
      }).catch((err)=>{
        commit('setSurveysLoading', false);
        throw err;
      });

    }
  },
  mutations: {
    logout: (state) => {
      state.user.data={};
      state.user.token=null;
      sessionStorage.setItem("TOKEN",null);
    },
    setUser:(state, userData)=>{
      state.user.token = userData.token;
      state.user.date = userData.user;
      sessionStorage.setItem("TOKEN",userData.token);
    },
    /*saveSurvey:(state, survey)=>{
      state.surveys = [...state.surveys, survey.data];
    },
    updateSurvey:(state, survey)=>{
      state.surveys = state.surveys.map((s)=>{
        if(s.id === survey.data.id) {
          return survey.data;
        }
        return s
      });
    },*/
    setCurrentSurveyLoading:(state, loading)=>{
      state.currentSurvey
        .loading = loading;
    },
    setCurrentSurvey:(state, survey)=>{
      state.currentSurvey.data = survey.data;
    },
    setSurveysLoading:(state, loading)=>{
      state.surveys
        .loading = loading;
    },
    setSurveys:(state, surveys)=>{
      state.surveys.data = surveys.data;
    },
  },
  modules: {}
})

export default store;
