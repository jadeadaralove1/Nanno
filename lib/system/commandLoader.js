import fs from "fs"
import path from "path"
import chalk from "chalk"
import { fileURLToPath, pathToFileURL } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const commandsFolder = path.join(__dirname, "../../commands")

global.comandos = new Map()
global.plugins = {}

/* ================= LOAD CJS + ESM ================= */
async function importSafe(filePath) {
try {
// 🔥 intenta ESM primero
return await import(pathToFileURL(filePath).href)
} catch (e) {
try {
// 🔥 fallback CJS (require emulado)
const mod = await import("module")
const require = mod.createRequire(import.meta.url)
return { default: require(filePath) }
} catch (err) {
console.log(chalk.red(`❌ No se pudo cargar: ${filePath}`))
return null
}
}
}

/* ================= BUILD ================= */
async function seeCommands(dir = commandsFolder) {
const files = fs.readdirSync(dir)

for (const file of files) {
const full = path.join(dir, file)

if (fs.lstatSync(full).isDirectory()) {
await seeCommands(full)
continue
}

if (!file.endsWith(".js")) continue

const mod = await importSafe(full)
if (!mod) continue

const cmd = mod.default || mod

// 🔥 COMANDOS
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
// 🔥 plugins normales
global.plugins[file.replace(".js", "")] = mod
}
}
}

/* ================= SAFE RELOAD ================= */
let timeout = null

globalThis.reload = async (_e, filename) => {
if (!filename.endsWith(".js")) return

clearTimeout(timeout)

timeout = setTimeout(async () => {
global.comandos = new Map()
await seeCommands()
}, 300)
}

fs.watch(commandsFolder, { recursive: true }, (e, f) => {
if (f) globalThis.reload(e, f)
})

export default seeCommands