require('dotenv').config()
require('module-alias/register')

const knex = require('knex')
const Telegraf = require('telegraf')

const knexConfig = require('@/../knexfile')
const { captchaCommand, startCommand } = require('@/commands')
const { userMiddleware, debugMiddleware } = require('@/middlewares')
const {
  kickAction,
  passAction,
  actionsAction,
  editSettingAction,
} = require('@/actions')
const {
  newChatMemberHandler,
  leftChatMemberHandler,
} = require('@/handlers')

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
bot.on('new_chat_members', newChatMemberHandler())
bot.on('left_chat_member', leftChatMemberHandler())

/**
 * Actions
 */
bot.action(/^kick=(\d+)/, kickAction())
bot.action(/^pass=(\d+)/, passAction())
bot.action(/^action=(\w+)/, actionsAction())
bot.action(/^settings=(\w+)&field=(\w+)/, editSettingAction())

/**
 * Commands
 */
bot.start(startCommand())
bot.command('captcha', captchaCommand())

/**
 * Run
 */
bot.startPolling()