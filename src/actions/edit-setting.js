const configMap = require('@/config')
const { editSettingMessage } = require('@/messages')
const { errorHandler } = require('@/helpers')

module.exports = () => async (ctx) => {
  const [, setting, field] = ctx.match

  if (ctx.session.edit !== setting) {
    return ctx.answerCbQuery('Don\'t touch!!!').catch(errorHandler)
  }

  if (!configMap[setting] || !Object.keys(configMap[setting]).includes(field)) {
    return ctx.answerCbQuery(`${setting} or ${field} not found(`).catch(errorHandler)
  }

  ctx.session.field = field
  const message = editSettingMessage(ctx, configMap)
  const { message_id: id } = await ctx.replyWithMarkdown(message)

  ctx.session.messages = ctx.session.messages || []
  ctx.session.messages.push(id)

  // debug(ctx.session)

  return ctx.answerCbQuery()
}
