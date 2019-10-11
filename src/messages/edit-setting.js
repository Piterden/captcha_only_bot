module.exports = (ctx, configMap) => {
  const [, setting, field] = ctx.match
  const fieldConfig = configMap[setting][field]

  let message = `Category: *${setting}*
Option: *${field}*
Type: *${fieldConfig.type.name}*

_${fieldConfig.description}_

Default value: ${fieldConfig.default} _${fieldConfig.unit}_

Current value: ${ctx.session.new && ctx.session.new[setting] && ctx.session.new[setting][field] &&
  ctx.session.new[setting][field] !== ctx.session.old[setting][field]
    ? `~${ctx.session.old[setting][field]}~ ${ctx.session.new[setting][field]}`
    : ctx.session.old[setting][field]} _${fieldConfig.unit || ''}_`

  if (fieldConfig.type.name === 'Number') {
    message += `
Type a number`

    if (fieldConfig.min) {
      message += ` from ${fieldConfig.min}`
    }

    if (fieldConfig.max) {
      message += ` to ${fieldConfig.max}`
    }

    if (fieldConfig.min || fieldConfig.max) {
      message += '.'
    }
  }

  if (fieldConfig.type.name === 'String') {
    message += `
Type a text`

    if (fieldConfig.min) {
      message += ` from ${fieldConfig.min}`
    }

    if (fieldConfig.max) {
      message += ` to ${fieldConfig.max}`
    }

    if (fieldConfig.min || fieldConfig.max) {
      message += ' characters length.'
    }
  }

  if (fieldConfig.type.name === 'Array') {
    message += `
Type each new value from a new line`

    if (fieldConfig.min) {
      message += `, min ${fieldConfig.min}`
    }

    if (fieldConfig.max) {
      message += `, max ${fieldConfig.max}`
    }

    if (fieldConfig.max || fieldConfig.min) {
      message += ' values.'
    }
  }

  return message
}
