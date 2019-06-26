import Vue from 'vue'
import Vuex from 'vuex'
// import $ from 'jquery'

Vue.use(Vuex)
const state = {
  fileFormat: ['jpg', 'jpeg', 'png', 'gif'],
  baseServiceUrl: 'https://ityp.baho.cn:8094/pms'
}
const mutations = {

}
export default new Vuex.Store({
  state,
  mutations
})
