import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req: any, res: any) {
    const raw = readFileSync(join(process.cwd(), 'json') + '/data.json').toString();
    const clicks = JSON.parse(raw);
    res.status(200).json(clicks)
}