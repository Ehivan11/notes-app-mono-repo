const { palindrome } = require('../utils/for_tests')

test('palindrome of ehivan', () => {
  const result = palindrome('ehivan')

  expect(result).toBe('navihe')
})

test('palindrome of empty string', () => {
  const result = palindrome('')

  expect(result).toBe('')
})
