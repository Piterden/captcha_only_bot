const Markup = require('telegraf/markup')

const { errorHandler, defaultConfig } = require('@/helpers')

const { BOT_NAME } = process.env
const randomString = (length) => Array.from(
  { length },
  () => String.fromCharCode(Math.round(Math.random() * 55 + 66))
).join('')

module.exports = () => async (ctx) => {
  const date = new Date()
  const [chat] = await ctx.database('groups')
    .where({ id: Number(ctx.chat.id) })
    .catch(errorHandler)

  if (ctx.message.new_chat_member.username === BOT_NAME) {
    if (chat) {
      const diff = Object.keys(ctx.chat).reduce((acc, key) => {
        if (key === 'id') {
          chat[key] = Number(chat[key])
          return acc
        }
        if (typeof ctx.chat[key] === 'boolean') {
          chat[key] = Boolean(chat[key])
        }
        if (ctx.chat[key] !== chat[key]) {
          acc[key] = ctx.chat[key]
        }
        return acc
      }, {})

      if (Object.keys(diff).length > 0) {
        await ctx.database('groups')
          .where({ id: Number(chat.id) })
          .update({ ...diff, active: true, updated_at: date })
          .catch(errorHandler)
      }
    } else {
      await ctx.database('groups')
        .insert({
          ...ctx.chat,
          active: true,
          config: JSON.stringify(defaultConfig),
          created_at: date,
        })
        .catch(errorHandler)
    }
    return
  }

  let { config } = chat

  config = JSON.parse(config)

  if (!ctx.message.new_chat_member.is_bot) {
    const {
      id,
      username,
      first_name: firstName,
      last_name: lastName,
    } = ctx.message.new_chat_member

    ctx.session.restricted = await ctx.restrictChatMember(id, {
      can_send_messages: false,
      can_send_media_messages: false,
      can_send_other_messages: false,
      can_add_web_page_previews: false,
    })

    ctx.session.pass = randomString(10)
    const name = username
      ? `@${username.replace(/([_*~])/g, '\\$1')}`
      : `[${firstName || lastName}](tg://user?id=${id})`
    const buttons = config.captcha.buttons.split('\n').map((button, index) => (
      Markup.callbackButton(button, `${index ? randomString(10) : ctx.session.pass}=${id}`)
    )).sort(() => Math.random() - 0.5)

    const captchaMessage = await ctx.reply(
      `${config.captcha.messageGreetings.replace('{name}', name)}

${config.captcha.messageCaptcha}`,
      {
        ...Markup.inlineKeyboard(buttons).extra(),
        parse_mode: 'Markdown',
      }
    )

    ctx.session.timeoutToKick = setTimeout(() => {
      ctx.session.timeoutToKick = null
      ctx.kickChatMember(id)
      ctx.deleteMessage(captchaMessage.message_id)
      setTimeout(() => {
        ctx.tg.unbanChatMember(ctx.chat.id, id)
      }, config.captcha.unbanTimeout * 1000)
    }, config.captcha.waitingTimeout * 1000)
  }

  setTimeout(() => {
    ctx.deleteMessage(ctx.message.message_id)
  })
}
