const { debug } = require('@/helpers')

module.exports = () => async (ctx, next) => {
  debug(ctx.update)
  next(ctx)
}
