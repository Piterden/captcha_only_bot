const { errorHandler } = require('@/helpers')

module.exports = () => async (ctx) => {
  const currentMessageId = ctx.update.callback_query.message.message_id

  switch (ctx.match[1]) {
    case 'delete':
      ctx.tg.deleteMessage(ctx.chat.id, currentMessageId)
      ctx.answerCbQuery()
      break

    case 'info':
      ctx.answerCbQuery()
      break

    case 'save':
      if (ctx.session.edit && ctx.session.new) {
        await ctx.database('groups')
          .update({ config: JSON.stringify(ctx.session.new) })
          .where({ id: Number(ctx.chat.id) })
          .catch(errorHandler)

        ctx.session.field = null
        ctx.session.new = null
        ctx.session.old = null
        ctx.session.messages.forEach((id) => {
          if (currentMessageId !== id) {
            ctx.tg.deleteMessage(ctx.chat.id, id)
          }
        })
        ctx.session.messages = [currentMessageId]
        ctx.answerCbQuery('Saved!')
      }
      break

    case 'exit':
      if (ctx.session.edit) {
        ctx.session.field = null
        ctx.session.edit = null
        ctx.session.new = null
        ctx.session.old = null
        ctx.session.messages.forEach((id) => {
          ctx.tg.deleteMessage(ctx.chat.id, id)
        })
        ctx.session.messages = []
        ctx.answerCbQuery()
      }
      break
    default:
  }
}
