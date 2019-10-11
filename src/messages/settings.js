module.exports = (ctx) => `This chat has a next settings for ${ctx.session.edit}:

\`\`\`
${JSON.stringify(ctx.session.new || ctx.session.old, null, '  ')}
\`\`\`

Choose an option for edit:`
