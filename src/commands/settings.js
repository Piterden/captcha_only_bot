const Markup = require('telegraf/markup')

const configMap = require('@/config')
const { errorHandler, debug, defaultConfig } = require('@/helpers')
const { settingsButtons } = require('@/buttons')

module.exports = () => async (ctx) => {
  await ctx.deleteMessage().catch(errorHandler)

  const chatMember = await ctx.tg.getChatMember(ctx.chat.id, ctx.from.id)
    .catch(errorHandler)

  debug(chatMember)

  if (!['creator', 'administrator'].includes(chatMember.status)) {
    const message = await ctx.reply('The only admins can manage this!')
      .catch(errorHandler)
    if (!message) {
      return
    }
    const id = message.message_id

    setTimeout(() => {
      ctx.tg.deleteMessage(ctx.chat.id, id).catch(errorHandler)
    }, 2500)
    return
  }

  ctx.session.edit = 'captcha'

  const chat = await ctx.database('groups')
    .where({ id: Number(ctx.chat.id) })
    .first()
    .catch(errorHandler)

  const config = chat ? chat.config : defaultConfig

  ctx.session.old = config

  const buttons = settingsButtons(ctx)
  const { message_id: id } = await ctx.reply(
    `Captcha settings for this chat:
${Object.keys(configMap[ctx.session.edit]).map((key) => `
*${configMap[ctx.session.edit][key].name}:*
_${config[ctx.session.edit][key]}_`).join('\n')}

Choose an option to edit:`,
    {
      ...Markup.inlineKeyboard(buttons).extra(),
      parse_mode: 'Markdown',
    }
  ).catch(errorHandler)

  ctx.session.messages = ctx.session.messages || []
  ctx.session.messages.push(id)
}
