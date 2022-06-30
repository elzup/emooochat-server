const { readFileSync } = require('fs')
const { tokenize } = require('./kuromoji')
const { toHiragana } = require('jaconv')

const emojiTsv = readFileSync('./data/emoji.tsv', 'utf8')
const lines = emojiTsv.split('\n')
const toHira = (text) => {
  try {
    return toHiragana(text)
  } catch (e) {
    console.warn(`toHiragana failed ${text}`)
    return text
  }
}

const lib = {}
lines.forEach((v) => {
  const [k, emoji] = v.split('\t')
  lib[k.substring(1)] = emoji
})

exports.emojify = (text) => {
  const tokens = tokenize(text)
  return tokens
    .map((v) => {
      const reading = toHira(v.reading)
      const hit = lib[reading]
      if (hit) return hit
      return v.surface_form
    })
    .join('')
}
