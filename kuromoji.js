const kuromoji = require('kuromoji')

let tokenizer = null

kuromoji.builder({ dicPath: 'data/dict' }).build((err, buildedTokenizer) => {
  if (tokenizer) return
  tokenizer = buildedTokenizer
})

exports.tokenize = (text) => {
  if (!tokenizer) return []
  return tokenizer.tokenize(text)
}
