const { errorHandler } = require('@/helpers')

const { BOT_USER } = process.env

module.exports = () => async (ctx) => {
  if (ctx.message.left_chat_member.username === BOT_USER) {
    const date = new Date()

    await ctx.database('groups')
      .where({ id: Number(ctx.chat.id) })
      .update({ active: false, updated_at: date })
      .catch(errorHandler)
  }

  if (ctx.session.timeoutToKick) {
    clearTimeout(ctx.session.timeoutToKick)
  }

  await ctx.deleteMessage(ctx.message.message_id).catch(errorHandler)
}
