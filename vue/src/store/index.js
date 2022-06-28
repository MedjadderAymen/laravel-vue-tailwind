import {createStore} from "vuex";

const store = createStore({
  state: {
    user: {
      data: {
        name: 'Aimen Medjadder',
        email: 'aimen@gmail.com',
        imageUrl:
          'https://mir-s3-cdn-cf.behance.net/user/276/263bbd275526321.5ed29761601cf.jpg',
      },
      token: 75
    }
  },
  getters: {},
  actions: {},
  mutations: {
    logout: (state) => {
      console.log('medjadji')
      state.user.data={};
      state.user.token=null;
    }
  },
  modules: {}
})

export default store;
