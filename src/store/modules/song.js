import { getSongUrl, getSongDetail, getLyric } from '@/api/song'
import { parseLyric } from '@/utils/parse-lyric'
const state = {
  currentSong: {}, // 当前播放歌曲
  currentSongIndex: 0,
  isPlaying: false,
  lyricList: [],
  currentLyricIndex: 0,
  currentLyricTime: 0,
  playList: [], // 播放列表
  currnetPlayListId: null
}
const mutations = {
  SET_CURRENT_SONG_INDEX(state, index) {
    state.currentSongIndex = index
  },
  SET_CURRENT_SONG(state, song) {
    state.currentSong = song
  },
  SET_IS_PLAYING(state, status) {
    state.isPlaying = status
  },
  SET_PLAY_LIST(state, playList) {
    state.playList = playList
  },
  SET_LYRIC_LIST(state, lyricList) {
    state.lyricList = lyricList
  },
  SET_CURRENT_LYRIC_INDEX(state, index) {
    state.currentLyricIndex = index
  },
  SET_CURRENT_PLAY_LIST_ID(state, id) {
    state.currnetPlayListId = id
  },
  SET_CURRENT_LYRIC_TIME(state, time) {
    state.currentLyricTime = time
  }
}
const actions = {
  // 设置name
  setCurrentSong({ state, commit, dispatch }, { song, playList }) {
    return new Promise((resolve) => {
      getSongDetail(song.id).then(rex => { // 根据id获取歌曲详情
        const resSong = rex.songs[0] || {}
        // 加入播放列表逻辑
        if (playList) { // 传了歌曲列表
          const currentPlayIndex = playList.findIndex((item) => item.id === resSong.id)
          commit('SET_PLAY_LIST', playList)
          commit('SET_CURRENT_SONG_INDEX', currentPlayIndex)
        } else {
          const currentPlayIndex = state.playList.findIndex((item) => item.id === resSong.id)
          if (currentPlayIndex !== -1) { // 播放列表里有原来的歌曲
            commit('SET_CURRENT_SONG_INDEX', currentPlayIndex)
          } else { // 播放列表里没有原来的歌曲
            const nowPlaylist = [...state.playList, resSong]
            commit('SET_PLAY_LIST', nowPlaylist)
            commit('SET_CURRENT_SONG_INDEX', nowPlaylist.length - 1)
          }
        }
        getSongUrl({ id: song.id }).then((rey) => { // 根据id获取歌曲的url
          const url = rey.data[0].url
          const newSong = { ...resSong, url }
          commit('SET_CURRENT_SONG', newSong)
          dispatch('setLyricList', song.id)
          resolve(newSong)
        })
      })
      // getSongUrl({ id: song.id }).then((res) => {
      //   const url = res.data[0].url
      //   const newSong = { ...song, url }
      //   commit('SET_CURRENT_SONG', newSong)
      //   resolve(url)
      // })
    })
  },
  setIsplaying({ commit }, status) {
    commit('SET_IS_PLAYING', status)
  },
  setPlayList({ commit }, playList) {
    commit('SET_PLAY_LIST', playList)
  },
  setLyricList({ commit }, id) {
    return new Promise((resolve) => {
      getLyric(id).then((res) => {
        if (res.nolyric) {
          commit('SET_LYRIC_LIST', [])
        } else {
          commit('SET_LYRIC_LIST', parseLyric(res.lrc.lyric))
        }
        // console.log('lyricres', res)
      })
    })
  }
}
export default {
  namespaced: true,

  state,
  mutations,
  actions
}
