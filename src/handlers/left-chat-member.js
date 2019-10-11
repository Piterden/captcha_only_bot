const { errorHandler } = require('@/helpers')

const { BOT_NAME } = process.env

module.exports = () => async (ctx) => {
  if (ctx.message.left_chat_member.username === BOT_NAME) {
    const date = new Date()

    await ctx.database('groups')
      .where({ id: Number(ctx.chat.id) })
      .update({ active: false, updated_at: date })
      .catch(errorHandler)
  }

  await ctx.deleteMessage(ctx.message.message_id)
}
