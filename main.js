import fs from 'fs'
import path from 'path'
import moment from 'moment'
import chalk from 'chalk'
import gradient from 'gradient-string'

import seeCommands from './lib/system/commandLoader.js'
import initDB from './lib/system/initDB.js'
import antilink from './commands/antilink.js'
import level from './commands/level.js'

seeCommands()

export default async (client, m) => {
if (!m.message) return

const sender = m.sender
const from = m.key.remoteJid
const text =
  m.message.conversation ||
  m.message.extendedTextMessage?.text ||
  m.message.imageMessage?.caption ||
  m.message.videoMessage?.caption ||
  m.message.buttonsResponseMessage?.selectedButtonId ||
  m.message.listResponseMessage?.singleSelectReply?.selectedRowId ||
  m.message.templateButtonReplyMessage?.selectedId ||
  ''

initDB(m, client)
antilink(client, m)

/* ================= PLUGINS ALL ================= */
for (const name in global.plugins) {
const plugin = global.plugins[name]
if (plugin?.all) {
try {
await plugin.all.call(client, m, { client })
} catch (e) {
console.log('plugin.all error', name, e)
}}}

/* ================= SETTINGS ================= */
const botJid = client.user.id.split(':')[0] + '@s.whatsapp.net'
const chat = global.db.data.chats[from] ||= {}
const settings = global.db.data.settings[botJid] ||= {}
const user = global.db.data.users[sender] ||= {}

const namebot = settings.namebot || 'Yuki'

/* ================= PREFIX (FIXED SIMPLE) ================= */
const prefixes = [
namebot,
namebot.charAt(0),
(namebot.split(' ')[0] || ''),
'!',
'.',
'/'
]

const prefixRegex = new RegExp(
'^(' + prefixes.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')',
'i'
)

const match = text.match(prefixRegex)
if (!match) return

const usedPrefix = match[0]
const args = text.slice(usedPrefix.length).trim().split(/\s+/)
const command = (args.shift() || '').toLowerCase()
const body = args.join(' ')

/* ================= GROUP INFO ================= */
let groupAdmins = []
let isAdmins = false
let isBotAdmins = false

if (m.isGroup) {
const metadata = await client.groupMetadata(from).catch(() => null)
const participants = metadata?.participants || []

groupAdmins = participants.filter(p => p.admin)

isAdmins = groupAdmins.some(p => p.id === sender)
isBotAdmins = groupAdmins.some(p => p.id === botJid)
}

/* ================= ANTI BLOCK PRIVADO (FIX) ================= */
if (!m.isGroup) {
const allowed = [
'report','reporte','sug','suggest','invite','invitar'
]

if (command && !allowed.includes(command) && !global.owner.includes(sender.split('@')[0])) {
return // ahora NO rompe, solo ignora limpio
}
}

/* ================= CHAT PRIMARY FIX ================= */
const chatData = global.db.data.chats[from] ||= {}
if (chatData.primaryBot && chatData.primaryBot !== botJid) {
if (chatData.primaryBot !== botJid) {
return // FIX: antes te bloqueaba sin control
}}

/* ================= COMMAND SYSTEM ================= */
if (!command) return

const cmdData = global.comandos.get(command)
if (!cmdData) return

if (cmdData.isAdmin && !isAdmins) return
if (cmdData.botAdmin && !isBotAdmins) return
if (cmdData.isOwner && !global.owner.includes(sender.split('@')[0])) return

try {
await client.readMessages([m.key])

user.usedcommands = (user.usedcommands || 0) + 1

await cmdData.run(client, m, args, usedPrefix, command, body)

level(m)

} catch (e) {
await client.sendMessage(from, {
text: '❌ Error:\n' + e.message
}, { quoted: m })
}
}