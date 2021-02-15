import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './types'
import { counter } from './counter/index'
//import { mapEditor } from '/editor/index'

Vue.use(Vuex)

// Vuex structure based on https://codeburst.io/vuex-and-typescript-3427ba78cfa8

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0' // a simple property
  },
  modules: {
    counter//,
    //mapEditor
  }
}

export default new Vuex.Store<RootState>(store)
