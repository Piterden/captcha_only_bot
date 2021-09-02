const { errorHandler } = require('@/helpers')

module.exports = () => async (ctx) => {
  const chat = await ctx.database('groups')
    .where({ id: Number(ctx.chat.id) })
    .first()
    .catch(errorHandler)
  const config = chat.config

  if (ctx.from.id !== Number(ctx.match[2])) {
    await ctx.answerCbQuery(config.captcha.notYouToast)
    return null
  }

  if (ctx.session.pass === ctx.match[1]) {
    ctx.session.pass = null
    ctx.session.restricted = null

    if (ctx.session.timeoutToKick) {
      clearTimeout(ctx.session.timeoutToKick)
      ctx.session.timeoutToKick = null
    }

    await ctx.restrictChatMember(
      ctx.from.id,
      {
        can_send_messages: true,
        can_send_media_messages: true,
        can_send_other_messages: true,
        can_add_web_page_previews: true,
      }
    )

    await ctx.answerCbQuery(config.captcha.successToast)
    await ctx.deleteMessage()
    return null
  }

  await ctx.answerCbQuery(config.captcha.failuteToast)
  await ctx.tg.kickChatMember(ctx.chat.id, ctx.from.id)

  setTimeout(() => {
    ctx.tg.unbanChatMember(ctx.chat.id, ctx.from.id)
  }, config.captcha.unbanTimeout * 1000)

  await ctx.deleteMessage()
  return null
}
