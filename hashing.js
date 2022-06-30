const crypto = require('crypto')

exports.hash = (data) => {
  return crypto
    .createHash('sha256')
    .update(data)
    .digest('base64')
    .substring(0, 10)
}
