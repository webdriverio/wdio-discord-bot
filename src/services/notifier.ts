import { WebhookClient, EmbedBuilder } from "discord.js";

import { Question } from "./stackoverflow";
import { env } from "../config/env";

const webhook = new WebhookClient({
  id: env.DISCORD_WEBHOOK_ID,
  token: env.DISCORD_WEBHOOK_TOKEN,
});

export async function sendQuestion(question: Question, snippet: string) {
  await webhook.send({
    embeds: [
      new EmbedBuilder()
        .setAuthor({
          name: "Stack Overflow",
          iconURL: "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png",
          url: question.link,
        })
        .setTitle(question.title)
        .setURL(question.link)
        .setDescription(`${snippet}\n\n[View full question](${question.link})`)
        .setTimestamp(new Date(question.creation_date * 1000))
        .setFooter({ text: `Question #${question.question_id}` }),
    ],
  });
}
