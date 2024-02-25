// Make sure to call Vue.use(Vuex) first if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
const axios = require("axios");

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    message: '',
    keywordTable: [],
    imagesTable: [],
    loading: true,
    ws_key: null,
    waitingLogInResult: false,
    phpLink: "/php/index.php",/*Pour mise en PRODUCTION */
    // phpLink: "http://localhost/SITE EN LIGNE/php/index.php",
    isMobile: false
  },
  actions: {
    loadData({ commit }) {

      commit('changeLoadingState', true)
      let req = this.state.phpLink + "?action=getKeyWords";
      axios
        .get(req)
        .then(response => {
          commit('updateKeyword', response.data)
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      const reqImg = this.state.phpLink + "?action=getImages";
      axios
        .get(reqImg)
        .then(response => {
          commit('updateImages', response.data)
          commit('changeLoadingState', false)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updateKeywordsTable({ commit, state }) {

      commit('changeLoadingState', true)
      let arrayToSend = this.state.keywordTable;
      for (let item of arrayToSend) {
        let newArray = "";
        if (item.imageName !== null) {
          for (let i = 0; i < item.imageName.length; i++) {
            if (i === 0) {
              newArray += item.imageName[i];
            } else newArray += "|" + item.imageName[i];
          }
          item.imageName = newArray;
        }
      }
      console.log(arrayToSend);

      let formData = new FormData();
      formData.append("fullKeywordTable", JSON.stringify(arrayToSend));
      formData.append("key", JSON.stringify(state.ws_key));

      let req = this.state.phpLink + "?action=updateFullKWTable";
      axios
        .post(req, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then((response) => {
          console.log("response");
          console.log(response.data);
          response => commit("msgToUsers", response);
        }
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    updateImageTable({ commit, dispatch }) {
      commit('changeLoadingState', true)

      let formData = new FormData();
      formData.append("fullImgTable", JSON.stringify(this.state.imagesTable));
      formData.append("key", JSON.stringify(this.state.ws_key));

      let req = this.state.phpLink + "?action=updateFullImgTable";
      axios
        .post(req, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(
          response => commit("msgToUsers", response.data),
          dispatch('loadData')
        )
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  mutations: {
    msgToUsers(state, msg) {
      state.message = msg
    },
    setToken(state, token) {
      state.ws_key = token
    },
    addKeyword(state, newKw) {
      console.log('addKeyword on state');
      state.keywordTable.push({
        id: "",
        keywords: newKw,
        imageName: "",
        main_image: ""
      })
    },
    updateImages(state, val) {
      state.imagesTable = val
      console.log('upimage on state');
    },
    updateKeyword(state, val) {
      console.log('upLeyword on state');

      for (let i = 0; i < val.length; i++) {
        if (val[i].imageName) {
          val[i].imageName = val[i].imageName.split("|")
        }
      }
      state.keywordTable = val
    },
    changeLoadingState(state, loading) {
      state.loading = loading
    }
  }
})
