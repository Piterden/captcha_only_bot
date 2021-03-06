module.exports = {
  captcha: {
    waitingTimeout: {
      name: 'Captcha timeout',
      type: Number,
      description: 'A time bot will wait for user to press a button. After time end user will be temporary banned.',
      default: 300,
      unit: 'sec',
      min: 60,
      max: 1200,
    },
    unbanTimeout: {
      name: 'Time to unban',
      type: Number,
      description: 'A time to unban user of temporary ban.',
      default: 40,
      unit: 'sec',
      min: 0,
      max: 300,
    },
    messageGreetings: {
      name: 'Greetings message',
      type: String,
      description: 'A greetings text which will been seen by a newcomer.',
      default: 'Hello, {name}. You should answer a question to enter a chat.',
      placeholders: ['name'],
      max: 255,
    },
    messageCaptcha: {
      name: 'Question message',
      type: String,
      description: 'A question user should answer to.',
      default: '*What is this chat about?*',
      max: 255,
    },
    messageWelcome: {
      name: 'Success message',
      type: String,
      description: 'Text showing to a user after a right choice.',
      default: 'Welcome, {name}!',
      placeholders: ['name'],
      max: 255,
    },
    notYouToast: {
      name: 'Wrong user toast',
      type: String,
      description: 'A toast notification, showing if a button will be pressed by a wrong user.',
      default: 'Not for you, asshole!!!',
      max: 50,
    },
    successToast: {
      name: 'Success toast',
      type: String,
      description: 'A toast notification for a correct user\'s answer.',
      default: 'Correct! Welcome to a chat!',
      max: 50,
    },
    failuteToast: {
      name: 'Failed toast',
      type: String,
      description: 'A toast notification for an incorrect user\'s answer.',
      default: 'No! Read a chat description and try one more time after a few minutes!',
      max: 50,
    },
    buttons: {
      name: 'Answers list',
      type: Array,
      max: 9,
      default: 'MySQL\nKitties\nAnime',
      description: 'Answers options list. You should write each one on a new line. The first line will be a correct answer.',
    },
    removeJoined: {
      name: 'Remove joined message',
      type: Boolean,
      default: true,
      description: 'Should "... joined the group" message been removed by the bot',
    },
  },
}
