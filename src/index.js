/* eslint-disable */

import {
  myTypeOf,
  cloneParamFn,
  stringifyJSONFn,
  parseJSONFn,
  getQueryFormatType,
  transformData,
  undefinedBase64,
  nullBase64,
  arrayBase64,
  objectBase64,
  stringBase64,
  numberBase64,
  otherBase64,
  separatorLen
} from './util'
export default class QueryFormat {
  constructor(encode) {
    this.decodeQuery = data => decodeQuery(data, encode)
    this.encodeQuery = data => encodeQuery(data, encode)
  }
}

function decodeQuery(data, encode) {
  const type = myTypeOf(data)
  if (type !== '[object Object]') {
    throw new Error('the input must be object')
  }
  const tData = cloneParamFn(data)
  const res = {}
  Object.keys(data).forEach(item => {
    let value = tData[item]
    if (encode) {
      value = window.decodeURIComponent(tData[item])
    }
    const valueType = getQueryFormatType(value)
    if (valueType === '[object Undefined]') {
      res[item] = undefined
    } else if (valueType === '[object Null]') {
      res[item] = null
    } else if (valueType === '[object Array]') {
      const index = value.indexOf(arrayBase64)
      const tVal = parseJSONFn(value.slice(0, index - separatorLen), null)
      res[item] = tVal
    } else if (valueType === '[object Object]') {
      const index = value.indexOf(objectBase64)
      const tVal = parseJSONFn(value.slice(0, index - separatorLen), null)
      res[item] = tVal
    } else if (valueType === '[object Number]') {
      const index = value.indexOf(numberBase64)
      const tVal = parseFloat(value.slice(0, index - separatorLen))
      res[item] = tVal
    } else if (valueType === '[object String]') {
      const index = value.indexOf(stringBase64)
      const tVal = value.slice(0, index - separatorLen)
      res[item] = tVal
    } else {
      const index = value.indexOf(otherBase64)
      const tVal = value.slice(0, index - separatorLen)
      res[item] = tVal
    }
  })
  return res
}

function encodeQuery(data, encode) {
  const type = myTypeOf(data)
  if (type !== '[object Object]') {
    throw new Error('the input must be object')
  }
  const tData = cloneParamFn(data)
  const res = {}
  Object.keys(data).forEach(item => {
    const value = tData[item]
    const valueType = myTypeOf(value)
    if (valueType === '[object Undefined]') {
      res[item] = transformData(`${value}(~)${undefinedBase64}`, encode)
    } else if (valueType === '[object Null]') {
      res[item] = transformData(`${value}(~)${nullBase64}`, encode)
    } else if (valueType === '[object Array]') {
      res[item] = transformData(
        `${stringifyJSONFn(value, null)}(~)${arrayBase64}`,
        encode
      )
    } else if (valueType === '[object Object]') {
      res[item] = transformData(
        `${stringifyJSONFn(value, null)}(~)${objectBase64}`,
        encode
      )
    } else if (valueType === '[object Number]') {
      res[item] = transformData(`${value}(~)${numberBase64}`, encode)
    } else if (valueType === '[object String]') {
      res[item] = transformData(`${value}(~)${stringBase64}`, encode)
    } else {
      res[item] = transformData(`${value}(~)${otherBase64}`, encode)
    }
  })
  return res
}
