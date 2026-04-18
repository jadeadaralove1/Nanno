import fs from "fs"
import path from "path"
import chalk from "chalk"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const commandsFolder = path.join(__dirname, "../../commands")

global.comandos = global.comandos || new Map()
global.plugins = global.plugins || {}

/* ================= BUILD COMMANDS ================= */
async function buildCommands() {
const map = new Map()
const plugins = {}

function loadDir(dir) {
const items = fs.readdirSync(dir)

for (const file of items) {
const full = path.join(dir, file)

if (fs.lstatSync(full).isDirectory()) {
loadDir(full)
continue
}

if (!file.endsWith(".js")) continue

try {
const mod = require(full)

const cmd = mod.default || mod

if (cmd?.command && typeof cmd.run === "function") {
for (const c of cmd.command) {
map.set(c.toLowerCase(), {
run: cmd.run,
category: cmd.category || "uncategorized",
isOwner: cmd.isOwner || false,
isAdmin: cmd.isAdmin || false,
botAdmin: cmd.botAdmin || false,
plugin: file
})
}
} else {
plugins[file.replace(".js", "")] = mod
}

} catch (e) {
console.log(chalk.red(`❌ Error loading ${file}:`), e.message)
}
}
}

loadDir(commandsFolder)

global.comandos = map
global.plugins = plugins

console.log(chalk.green(`✔ Comandos cargados: ${map.size}`))
}

/* ================= AUTO RELOAD SAFE ================= */
let timeout = null

function safeReload() {
clearTimeout(timeout)

timeout = setTimeout(() => {
global.comandos.clear?.()
buildCommands()
}, 300)
}

/* ================= WATCH ================= */
fs.watch(commandsFolder, { recursive: true }, () => {
safeReload()
})

/* ================= INIT ================= */
buildCommands()

export default buildCommands