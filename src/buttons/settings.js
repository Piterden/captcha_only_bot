const Markup = require('telegraf/markup')

const configMap = require('@/config')

module.exports = (ctx) => {
  const config = ctx.session.new || ctx.session.old
  const buttons = Object.keys(config[ctx.session.edit]).map((key) => (
    Markup.callbackButton(
      configMap[ctx.session.edit][key].name,
      `settings=captcha&field=${key}`
    )
  )).reduceRight((acc, cur, idx) => {
    const index = parseInt(idx / 2, 10)

    acc[index] = acc[index] || []
    acc[index].push(cur)

    return acc
  }, [])

  buttons.push([
    Markup.callbackButton('Save', 'action=save', !ctx.session.new),
    Markup.callbackButton('Exit', 'action=exit'),
  ])

  return buttons
}
