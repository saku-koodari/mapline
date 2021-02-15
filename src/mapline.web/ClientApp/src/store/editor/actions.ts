﻿import { ActionTree } from 'vuex'
import { EditorState } from './types'
import { RootState } from '../types'

export const actions: ActionTree<EditorState, RootState> = {
  saveMap({ commit }) {
    commit('saveMap')
  }
}
