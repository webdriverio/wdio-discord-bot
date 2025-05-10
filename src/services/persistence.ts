import fs from 'node:fs/promises';
import cp from 'node:child_process';
import path from 'node:path';

const DATA_FILE = path.resolve(__dirname, '../../data/sentIds.json');

export async function loadSentIds(): Promise<Set<number>> {
  const isExisting = await fs.access(DATA_FILE).then(() => true).catch(() => false);
  if (!isExisting) {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
    return new Set();
  }

  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return new Set<number>(JSON.parse(raw));
}

export async function saveSentIds(ids: Set<number>) {
  const arr = Array.from(ids);
  await fs.writeFile(DATA_FILE, JSON.stringify(arr, null, 2));

  // Auto‑commit and push
  return new Promise<void>((resolve, reject) => cp.exec(
    `git add ${DATA_FILE} && git commit -m "chore: update sent question IDs" && git push`,
    (err, stdout, stderr) => {
      if (err) {
        console.error('Git commit failed:', stderr, stdout);
        return reject(err);
      }

      console.log('Sent IDs file committed.');
      resolve();
    }
  ));
}