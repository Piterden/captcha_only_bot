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

#### Parameters

| Parameter         | Type   | Default |
| ----------------- | ------ | ------- |
| Captcha timeout   | Number | 300     |
| Time to unban     | Number | 40      |
| Greetings message | String | Hello, {name}. You should answer a question to enter a chat. |
| Question message  | String | *What is this chat about?* |
| Success message   | String | Welcome, {name}! |
| Wrong user toast  | String | Not for you, asshole!!! |
| Success toast     | String | Correct! Welcome to a chat! |
| Failed toast      | String | No! Read a chat description and try one more time after a few minutes! |
| Answers list      | Array  | MySQL\nKitties\nAnime |

Time to unban:
40

Greetings message:
Hello, {name}. You should answer a question to enter a chat.

Question message:
*What is this chat about?*

Success message:
Welcome, {name}!

Wrong user toast:
Not for you, asshole!!!

Success toast:
Correct! Welcome to a chat!

Failed toast:
No! Read a chat description and try one more time after a few minutes!

Answers list:
MySQL
Kitties
Anime

## Donate

- **BTC** `3F275vPSCvYW19MHZqSjw79fEwwU4MbTgV`
- **LTC** `MGMCQB3QAcrSBjU3eGJviqB2J2f5BNVRGr`
- **DOGE** `D5m69FRDGEn3G3xuakvqTxUpGVt6NegKJp`
