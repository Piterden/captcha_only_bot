const { inspect } = require('util')

const configMap = require('@/config')

// eslint-disable-next-line no-console
const debug = (data) => console.log(inspect(data, {
  showHidden: true,
  colors: true,
  depth: 10,
}))

const errorHandler = (error) => debug(error)

const defaultConfig = Object.entries(configMap).reduce(
  (acc, [settings, object]) => {
    acc[settings] = Object.entries(object).reduce(
      (accField, [field, { default: value }]) => {
        accField[field] = value
        return accField
      },
      {},
    )
    return acc
  },
  {},
)

const makeUserMention = ({
  id,
  username,
  first_name: firstName,
  last_name: lastName,
}) => username
  ? `@${username}`
  : `[${firstName || lastName}](tg://user?id=${id})`

module.exports = {
  debug,
  errorHandler,
  defaultConfig,
  makeUserMention,
}
