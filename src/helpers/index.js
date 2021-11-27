const configMap = require('@/config')

// eslint-disable-next-line no-console
const debug = (data, name = 'DEBUG') => {
  console.error(`${name} ${new Date()}`, JSON.stringify(data, null, '  '))
  return data
}

// eslint-disable-next-line no-console
const log = (data, name = 'LOG') => {
  console.log(`${name} ${new Date()}`, JSON.stringify(data, null, '  '))
  return data
}

// eslint-disable-next-line no-console
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
  log,
  debug,
  errorHandler,
  defaultConfig,
  makeUserMention,
}
