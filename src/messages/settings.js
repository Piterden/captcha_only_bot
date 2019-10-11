module.exports = (ctx, configMap, config) => `Captcha settings for this chat:
${Object.keys(configMap[ctx.session.edit]).map((key) => `
*${configMap[ctx.session.edit][key].name}:*
_${config[ctx.session.edit][key]}_`).join('\n')}

Choose an option to edit:`
