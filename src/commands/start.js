module.exports = () => async (ctx) => {
  if (ctx.chat.type === 'private') {
    ctx.reply(`Hello!

I am a captcha only bot. Add me to your chat and give me admin rights.
I will show a captcha message to each newcomer to your chat.
Also you can edit messages and a bit of my behavior with /settings command in a chat where you are admin.

Created by @piterden`)
  }
}
