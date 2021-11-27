const { errorHandler, defaultConfig } = require('@/helpers')

module.exports = () => async (ctx) => {
  const chat = await ctx.database('groups')
    .where({ id: Number(ctx.chat.id) })
    .first()
    .catch(errorHandler)
  const config = chat ? chat.config : defaultConfig

  if (ctx.from.id !== Number(ctx.match[2])) {
    await ctx.answerCbQuery(config.captcha.notYouToast).catch(errorHandler)
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
    ).catch(errorHandler)

    await ctx.answerCbQuery(config.captcha.successToast).catch(errorHandler)
    await ctx.deleteMessage().catch(errorHandler)
    return null
  }

  await ctx.answerCbQuery(config.captcha.failuteToast).catch(errorHandler)
  await ctx.tg.kickChatMember(ctx.chat.id, ctx.from.id).catch(errorHandler)

  setTimeout(() => {
    ctx.tg.unbanChatMember(ctx.chat.id, ctx.from.id).catch(errorHandler)
  }, config.captcha.unbanTimeout * 1000)

  await ctx.deleteMessage().catch(errorHandler)
  return null
}
