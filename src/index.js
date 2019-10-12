require('dotenv').config()
require('module-alias/register')

const knex = require('knex')
const Telegraf = require('telegraf')

const knexConfig = require('@/../knexfile')

const {
  startCommand,
  settingsCommand,
} = require('@/commands')

const {
  userMiddleware,
  debugMiddleware,
} = require('@/middlewares')

const {
  hearsHandler,
  newChatMemberHandler,
  leftChatMemberHandler,
} = require('@/handlers')

const {
  passAction,
  actionsAction,
  editSettingAction,
} = require('@/actions')

const { session } = Telegraf
const { BOT_NAME, BOT_TOKEN } = process.env

const bot = new Telegraf(BOT_TOKEN, { username: BOT_NAME })

bot.context.database = knex(knexConfig)

/**
 * Middlewares
 */
bot.use(session())
bot.use(userMiddleware())
bot.use(debugMiddleware())

/**
 * Handlers
 */
bot.hears(/[\S\s]*/, hearsHandler())
bot.on('new_chat_members', newChatMemberHandler())
bot.on('left_chat_member', leftChatMemberHandler())

/**
 * Actions
 */
bot.action(/^([.\d]{18})=(\d+)/, passAction())
bot.action(/^action=(\w+)/, actionsAction())
bot.action(/^settings=(\w+)&field=(\w+)/, editSettingAction())

/**
 * Commands
 */
bot.start(startCommand())
bot.command('settings', settingsCommand())

/**
 * Run
 */
bot.startPolling()
