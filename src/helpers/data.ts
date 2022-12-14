import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const PATH = join(process.cwd(), 'json') + '/data.json'

export function read() {
    return Number(JSON.parse(readFileSync(PATH).toString()).clicks)
}

export function write(clicks: number) {
    writeFileSync(PATH, JSON.stringify({clicks}))
}