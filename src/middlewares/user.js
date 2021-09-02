const { errorHandler } = require('@/helpers')

module.exports = () => async (ctx, next) => {
  if (ctx.updateType === 'channel_post' || !ctx.from || !ctx.session) {
    return
  }

  if (ctx.session.user) {
    return next()
  }

  const users = () => ctx.database('users')
  const id = Number(ctx.from.id)
  const date = new Date()
  const user = await users().where({ id }).first().catch(errorHandler)

  if (user) {
    const diff = Object.keys(ctx.from).reduce((acc, key) => {
      if (key === 'id') {
        return acc
      }
      if (typeof ctx.from[key] === 'boolean') {
        user[key] = Boolean(user[key])
      }
      if (ctx.from[key] !== user[key]) {
        acc[key] = ctx.from[key]
      }
      return acc
    }, {})

    const fields = { ...diff, updated_at: date }

    if (Object.keys(diff).length > 0) {
      await users().where({ id }).update(fields).catch(errorHandler)
      ctx.session.user = await users().where({ id }).first().catch(errorHandler)
      return next()
    }

    ctx.session.user = user
    return next()
  }

  if (ctx.session) {
    ctx.session.restricted = true
    ctx.session.user = { ...ctx.from, created_at: date }
  }

  await users().insert(ctx.session.user).catch(errorHandler)

  next()
}
