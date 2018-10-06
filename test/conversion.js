import test from 'ava'
import convert from './helpers/conversion.cjs'
import { isNumber } from 'is-what'

test('eth-eth', t => {
  let res
  res = convert(1000000000000000000, 'wei', 'eth')
  t.is(res, 1)
  res = convert(1, 'eth', 'wei')
  t.is(res, 1000000000000000000)
  res = convert(1, 'wei', 'eth')
  t.is(res, 0.000000000000000001)
})

test('dai-eth', async t => {
  let res
  res = await convert(1, 'dai', 'usd')
  t.true(isNumber(res))
  t.true(res < 1.5 && res > 0.5)
  res = await convert(1, 'usd', 'dai')
  t.true(isNumber(res))
  t.true(res < 1.5 && res > 0.5)
})
