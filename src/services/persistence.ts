import fs from 'fs/promises';
import { exec } from 'child_process';
import path from 'path';

const DATA_FILE = path.resolve(__dirname, '../../data/sentIds.json');

export async function loadSentIds(): Promise<Set<number>> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return new Set<number>(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

export async function saveSentIds(ids: Set<number>) {
  const arr = Array.from(ids);
  await fs.writeFile(DATA_FILE, JSON.stringify(arr, null, 2));
  // Auto‑commit and push
  exec(
    `git add ${DATA_FILE} && git commit -m "chore: update sent question IDs" && git push`,
    (err, stdout, stderr) => {
      if (err) console.error('Git commit failed:', stderr, stdout);
      else console.log('Sent IDs file committed.');
    }
  );
}