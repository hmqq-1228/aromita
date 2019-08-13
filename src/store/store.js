import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  fileFormat: ['jpg', 'jpeg', 'png', 'gif'],
  cont: 0,
  contPrev: 0,
  addCartState: false,//添加购物车商品
  delcartList:false,//删除购物车商品
  spuId: '',
  skuId: '',
  idList: []
}

const mutations = {

}

const getters={
  delcart: state => {
    return state.delcartList;
  },
  addCart:state =>{
    return state.addCartState;
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations
})
