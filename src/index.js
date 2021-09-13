require('dotenv').config()
require('module-alias/register')

const knex = require('knex')
const Telegraf = require('telegraf')

const knexConfig = require('../knexfile')
const { errorHandler } = require('./helpers')
const { userMiddleware } = require('./middlewares')
const { startCommand, settingsCommand } = require('./commands')
const { passAction, actionsAction, editSettingAction } = require('./actions')
const {
  hearsHandler,
  newChatMembersHandler,
  leftChatMemberHandler,
} = require('./handlers')

const { session } = Telegraf
const { BOT_USER, BOT_TOKEN } = process.env

const init = async (bot, dbConfig) => {
  bot.context.database = knex(dbConfig)

  /**
   * Middlewares
   */
  bot.use(session())
  bot.use(userMiddleware())
  // bot.use(debugMiddleware())

  /**
   * Handlers
   */
  bot.hears(/[\S\s]*/, hearsHandler())
  bot.on('new_chat_members', newChatMembersHandler())
  bot.on('left_chat_member', leftChatMemberHandler())

  /**
   * Actions
   */
  bot.action(/^([.\d]{15,22})=(\d+)/, passAction())
  bot.action(/^action=(\w+)/, actionsAction())
  bot.action(/^settings=(\w+)&field=(\w+)/, editSettingAction())

  /**
   * Commands
   */
  bot.start(startCommand())
  bot.command('settings', settingsCommand())

  return bot
}

/**
 * Init bot function.
 *
 * @param {Telegraf} bot The bot instance.
 * @param {Object} dbConfig The knex connection configuration.
 * @return {Promise<Telegraf>} Bot ready to launch.
 */
init(new Telegraf(BOT_TOKEN, { username: BOT_USER }), knexConfig)
  .then((bot) => {
    /**
     * Run
     */
    bot.launch()
  })
  .catch(errorHandler)

module.exports = init
