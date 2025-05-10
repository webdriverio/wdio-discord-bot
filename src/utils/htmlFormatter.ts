import { decode } from "html-entities";

export function formatBody(html: string): string {
  let content = decode(html);
  content = content.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, "```$1```");
  return content.replace(/<[^>]+>/g, "").trim();
}
