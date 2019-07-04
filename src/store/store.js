import Vue from 'vue'
import Vuex from 'vuex'
// import $ from 'jquery'

Vue.use(Vuex)
const state = {
  fileFormat: ['jpg', 'jpeg', 'png', 'gif'],
  baseServiceUrl: 'http://www.aromita.com/',
  localUrl: 'http://localhost:8080/',
  cont: 0,
  contPrev: 0,
  spuId: '',
  skuId: '',
}
const mutations = {

}
export default new Vuex.Store({
  state,
  mutations
})
