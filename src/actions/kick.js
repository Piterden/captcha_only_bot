const { errorHandler } = require('@/helpers')

module.exports = () => async (ctx) => {
  const [chat] = await ctx.database('groups')
    .where({ id: Number(ctx.chat.id) })
    .catch(errorHandler)
  let { config } = chat

  config = JSON.parse(config)

  const [, id] = ctx.match

  if (!ctx.session.restricted || ctx.from.id !== Number(id)) {
    return ctx.answerCbQuery(config.captcha.notYouToast)
  }
  ctx.session.restricted = null

  if (ctx.session.timeoutToKick) {
    clearTimeout(ctx.session.timeoutToKick)
    ctx.session.timeoutToKick = null
  }

  await ctx.deleteMessage()
  ctx.answerCbQuery(config.captcha.failuteToast)

  await ctx.tg.kickChatMember(ctx.chat.id, id)

  setTimeout(() => {
    ctx.tg.unbanChatMember(ctx.chat.id, id)
  }, 40000)

  return true
}
