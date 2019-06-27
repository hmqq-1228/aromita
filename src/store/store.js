import Vue from 'vue'
import Vuex from 'vuex'
// import $ from 'jquery'

Vue.use(Vuex)
const state = {
  fileFormat: ['jpg', 'jpeg', 'png', 'gif'],
  baseServiceUrl: 'http://www.aromita.com'
}
const mutations = {

}
export default new Vuex.Store({
  state,
  mutations
})
