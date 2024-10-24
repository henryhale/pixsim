import { writeFile } from "fs/promises"
import set from "./charset.js"

await writeFile("./characters.json", JSON.stringify(set))
