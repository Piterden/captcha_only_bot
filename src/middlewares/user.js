const { errorHandler } = require('@/helpers')

module.exports = () => async (ctx, next) => {
  if (ctx.session.user) {
    return next()
  }

  let user = await ctx.database('users')
    .where({ id: Number(ctx.from.id) })
    .first()
    .catch(errorHandler)
  const date = new Date()

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
      await ctx.database('users')
        .where({ id: Number(ctx.from.id) })
        .update(fields)
        .catch(errorHandler)

      user = await ctx.database('users')
        .where({ id: Number(ctx.from.id) })
        .first()
        .catch(errorHandler)
    }

    ctx.session.user = user

    return next()
  }

  user = { ...ctx.from, created_at: date }

  await ctx.database('users').insert(user).catch(errorHandler)
  ctx.session.user = user

  return next()
}
