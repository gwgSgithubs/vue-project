// import jsonp from 'common/js/jsonp'
import {commonParams} from './config'
import axios from 'axios'

const commonDate = {
  g_tk: 5381,
  loginUin: 0,
  hostUin: 0,
  format: 'json',
  inCharset: 'utf8',
  outCharset: 'utf-8',
  notice: 0,
  platform: 'yqq',
  needNewCode: 0
}
export function getSingerList () {
  const url = '/api/getSingerList'
  const paramData = {
    comm: {
      ct: 24,
      cv: 0
    },
    singerList: {
      module: 'Music.SingerListServer',
      method: 'get_singer_list',
      param: {
        area: -100,
        sex: -100,
        genre: -100,
        index: -100,
        sin: 0,
        cur_page: 1
      }
    }
  }
  commonDate.data = JSON.stringify(paramData)
  const data = Object.assign({}, commonParams, commonDate)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getSingerDetail (singermid) {
  const url = '/api/getSingerDetail'
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singermid
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getMusic (songmid) {
  const url = '/api/music'
  const data = Object.assign({}, commonParams, {
    songmid: songmid,
    filename: 'C400' + songmid + '.m4a',
    guid: 7981028948,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    cid: 205361747,
    uid: 0,
    g_tk: 1928111839
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
