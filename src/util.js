/* eslint-disable */
import { Base64 } from 'js-base64'

export const nullBase64 = Base64.encode('[object Null]')
export const undefinedBase64 = Base64.encode('[object Undefined]')
export const arrayBase64 = Base64.encode('[object Array]')
export const objectBase64 = Base64.encode('[object Object]')
export const numberBase64 = Base64.encode('[object Number]')
export const stringBase64 = Base64.encode('[object String]')
export const otherBase64 = Base64.encode('[object Other]')
export function myTypeOf(data) {
  return Object.prototype.toString.call(data)
}
export function cloneParamFn(value) {
  if (Array.isArray(value)) {
    return value.map(cloneParamFn)
  }
  if (value && typeof value === 'object') {
    const res = {}
    for (const key in value) {
      res[key] = cloneParamFn(value[key])
    }
    return res
  }
  return value
}
export function stringifyJSONFn(data, dft, replacer = null, space = null) {
  const type = Object.prototype.toString.call(data)
  if (
    type !== '[object Object]' &&
    type !== '[object Null]' &&
    type !== '[object Array]'
  ) {
    return dft
  }
  try {
    const res = JSON.stringify(data, replacer, space)
    return res
  } catch (err) {
    console.info(err)
  }
  return dft
}
export function parseJSONFn(data, dft) {
  if (!data) return dft
  try {
    const res = JSON.parse(data)
    return res
  } catch (err) {
    console.info(err)
  }
  return dft
}

export function getQueryFormatType(data) {
  const tData = cloneParamFn(data)
  if (~tData.indexOf(`${undefinedBase64}`)) {
    return '[object Undefined]'
  }
  if (~tData.indexOf(`${nullBase64}`)) {
    return '[object Null]'
  }
  if (~tData.indexOf(`${arrayBase64}`)) {
    return '[object Array]'
  }
  if (~tData.indexOf(`${objectBase64}`)) {
    return '[object Object]'
  }
  if (~tData.indexOf(`${numberBase64}`)) {
    return '[object Number]'
  }
  if (~tData.indexOf(`${stringBase64}`)) {
    return '[object String]'
  }
  return '[object Other]'
}
export const separatorLen = 3
