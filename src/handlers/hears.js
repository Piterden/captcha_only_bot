const Markup = require('telegraf/markup')

const configMap = require('@/config')
const { errorHandler } = require('@/helpers')
const { settingsButtons } = require('@/buttons')
const { settingsMessage } = require('@/messages')

module.exports = () => async (ctx, next) => {
  // if (ctx.session.restricted) {
  //   await ctx.tg.deleteMessage(ctx.chat.id, ctx.update.message.message_id)
  //   return next()
  // }

  if (!ctx.session.edit || !ctx.session.field ||
    !configMap || !configMap[ctx.session.edit] ||
    !configMap[ctx.session.edit][ctx.session.field]) {
    return next()
  }

  const field = configMap[ctx.session.edit][ctx.session.field]
  let re

  switch (field.type.name) {
    case 'Number': re = /\d+/; break
    case 'String': re = /.+/; break
    case 'Array': re = /(?:.+)+(?:\n.+)*/; break
    default:
  }

  if (ctx.match[0].match(re)) {
    ctx.session.new = ctx.session.new || JSON.parse(JSON.stringify(ctx.session.old))
    ctx.session.new[ctx.session.edit][ctx.session.field] = field.type.name === 'Number'
      ? Number(ctx.match[0])
      : ctx.match[0]
    ctx.session.field = null

    await ctx.tg.deleteMessage(ctx.chat.id, ctx.update.message.message_id)
      .catch(errorHandler)
    for (let idx = 1; idx < ctx.session.messages.length; idx += 1) {
      await ctx.tg.deleteMessage(ctx.chat.id, ctx.session.messages[idx])
        .catch(errorHandler)
    }

    if (JSON.stringify(ctx.session.old) === JSON.stringify(ctx.session.new)) {
      ctx.session.new = null
    }

    const buttons = settingsButtons(ctx)

    await ctx.tg.editMessageText(
      ctx.chat.id,
      ctx.session.messages[0],
      undefined,
      settingsMessage(ctx, configMap, ctx.session.new),
      {
        ...Markup.inlineKeyboard(buttons).extra(),
        parse_mode: 'Markdown',
      },
    ).catch(errorHandler)

    ctx.session.messages = [ctx.session.messages[0]]
  }

  return next()
}
