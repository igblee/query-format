/* eslint-disable */

import {
  myTypeOf,
  cloneParamFn,
  stringifyJSONFn,
  parseJSONFn,
  getQueryFormatType,
  undefinedBase64,
  nullBase64,
  arrayBase64,
  objectBase64,
  stringBase64,
  numberBase64,
  otherBase64,
  separatorLen
} from './util'

export function decodeQuery(data) {
  const type = myTypeOf(data)
  if (type !== '[object Object]') {
    throw new Error('the input must be object')
  }
  const tData = cloneParamFn(data)
  const res = {}
  Object.keys(data).forEach(item => {
    const value = window.decodeURIComponent(tData[item])
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
      console.log('TCL: decodeQuery -> valueType', valueType)
      const index = value.indexOf(objectBase64)
      console.log('TCL: decodeQuery -> index', index)
      const tVal = parseJSONFn(value.slice(0, index - separatorLen), null)
      res[item] = tVal
    } else if (valueType === '[object Number]') {
      const index = value.indexOf(numberBase64)
      const tVal = parseInt(value.slice(0, index - separatorLen))
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

export function encodeQuery(data) {
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
      res[item] = window.encodeURIComponent(`${value}(~)${undefinedBase64}`)
    } else if (valueType === '[object Null]') {
      res[item] = window.encodeURIComponent(`${value}(~)${nullBase64}`)
    } else if (valueType === '[object Array]') {
      res[item] = window.encodeURIComponent(
        `${stringifyJSONFn(value, null)}(~)${arrayBase64}`
      )
    } else if (valueType === '[object Object]') {
      res[item] = window.encodeURIComponent(
        `${stringifyJSONFn(value, null)}(~)${objectBase64}`
      )
    } else if (valueType === '[object Number]') {
      res[item] = window.encodeURIComponent(`${value}(~)${numberBase64}`)
    } else if (valueType === '[object String]') {
      res[item] = window.encodeURIComponent(`${value}(~)${stringBase64}`)
    } else {
      res[item] = window.encodeURIComponent(`${value}(~)${otherBase64}`)
    }
  })
  return res
}
