### How to use

```js
import QueryFormat from '@glennlee/query-format'

const format = new QueryFormat(true) // if true will use base64 format the query's value
const query = {
  a: undefined,
  b: null,
  c: 1,
  d: 'd',
  e: [1, 2, '3', { a: 'a' }],
  f: { a: 'a', b: 1, c: [1, 2, '3'] },
  g: 1.1111112223123
}
const res1 = format.encodeQuery(query)
console.log('TCL: res1', res1)
const res2 = format.decodeQuery(res1)
console.log('TCL: res2', res2) // res2.result 是解析结果， res2.flag 表示解析是否正常(true代表正常),res.failedItems代表解析失败项
```
