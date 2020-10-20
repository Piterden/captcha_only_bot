# Captcha Only Bot

![Travis (.org)](https://img.shields.io/travis/com/Piterden/captcha_only_bot.svg?style=for-the-badge)
![GitHub search hit counter](https://img.shields.io/github/search/Piterden/captcha_only_bot/captcha.svg?style=for-the-badge)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Piterden/captcha_only_bot.svg?style=for-the-badge)

Captcha admin bot.

> **!!! Bot requires admin rights and looses its sense either!**

## Overview

Each newcomer to a chat will be instantly restricted to do anything in a chat, until he choose a correct answer to a question. A question and an answer options may be edited. Options are placed on inline keyboard buttons.

## Commands

- **`/settings`** - _Works only in groups and only for admins!!!_ Shows the settings overview and editor.

![](./images/docs-1.jpg)

### Settings command

| Parameter         | Type     | Default |
| ----------------- | ------   | ------- |
| Captcha timeout   | `Number` |     300 |

| Parameter         | Type     | Default |
| ----------------- | ------   | ------- |
| Time to unban     | `Number` |      40 |

| Parameter         | Type     | Default                                                      |
| ----------------- | ------   | ------------------------------------------------------------ |
| Greetings message | `String` | Hello, {name}. You should answer a question to enter a chat. |

| Parameter         | Type     | Default                    |
| ----------------- | ------   | -------------------------- |
| Question message  | `String` | *What is this chat about?* |

| Parameter         | Type     | Default          |
| ----------------- | ------   | ---------------- |
| Success message   | `String` | Welcome, {name}! |

| Parameter         | Type     | Default                 |
| ----------------- | ------   | ----------------------- |
| Wrong user toast  | `String` | Not for you, asshole!!! |

| Parameter         | Type     | Default                     |
| ----------------- | ------   | --------------------------- |
| Success toast     | `String` | Correct! Welcome to a chat! |

| Parameter         | Type     | Default                                                                |
| ----------------- | ------   | ---------------------------------------------------------------------- |
| Failed toast      | `String` | No! Read a chat description and try one more time after a few minutes! |

| Parameter         | Type     | Default               |
| ----------------- | ------   | --------------------- |
| Answers list      | `Array`  | MySQL\nKitties\nAnime |

![](./images/docs-2.jpg)
