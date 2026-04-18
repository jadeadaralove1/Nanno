import fs from "fs"
import path from "path"
import chalk from "chalk"
import { fileURLToPath } from "url"
import { parse } from "@babel/parser"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

global.comandos = new Map()
global.plugins = {}

const commandsFolder = path.join(__dirname, "../../commands")

/* ================= SAFE LOAD ================= */
async function seeCommands(dir = commandsFolder) {
const items = fs.readdirSync(dir)

for (const file of items) {
const fullPath = path.join(dir, file)

if (fs.lstatSync(fullPath).isDirectory()) {
await seeCommands(fullPath)
continue
}

if (!file.endsWith(".js")) continue

const code = fs.readFileSync(fullPath, "utf8")

try {
parse(code, {
sourceType: "module",
plugins: ["topLevelAwait"]
})
} catch (err) {
console.log(chalk.red(`❌ Syntax error: ${file}`))
continue
}

try {
const mod = await import(`${path.resolve(fullPath)}?v=${Date.now()}`)

const cmd = mod.default || mod

if (cmd?.command && typeof cmd.run === "function") {

for (const c of cmd.command) {
global.comandos.set(c.toLowerCase(), {
run: cmd.run,
category: cmd.category || "uncategorized",
isOwner: cmd.isOwner || false,
isAdmin: cmd.isAdmin || false,
botAdmin: cmd.botAdmin || false,
plugin: file
})
}

} else {
global.plugins[file.replace(".js", "")] = mod
}

} catch (e) {
console.log(chalk.red(`❌ Load error: ${file}`), e.message)
}
}
}

/* ================= CACHE PROTECTION ================= */
let reloadTimeout = null

globalThis.reload = async (_ev, filename) => {
if (!filename.endsWith(".js")) return

clearTimeout(reloadTimeout)

reloadTimeout = setTimeout(async () => {
const fullPath = path.join(commandsFolder, filename)

try {
if (!fs.existsSync(fullPath)) {
delete global.plugins[filename.replace(".js", "")]
global.comandos = new Map()
await seeCommands()
return
}

const mod = await import(`${fullPath}?v=${Date.now()}`)

global.plugins[filename.replace(".js", "")] = mod

// 🔥 SOLO recargar, no destruir todo inmediatamente
global.comandos = new Map()
await seeCommands()

} catch (e) {
console.log("reload error:", e.message)
}
}, 200)
}

/* ================= WATCH SAFE ================= */
fs.watch(commandsFolder, { recursive: true }, (e, f) => {
if (f) globalThis.reload(e, f)
})

export default seeCommands