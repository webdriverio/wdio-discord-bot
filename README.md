# WDIO Discord Bot

A Node.js bot that bridges Stack Overflow and Discord for the WebdriverIO community.

## Features

- **Monitors Stack Overflow** for new questions tagged with a configurable tag (default: `webdriver-io`).
- **Posts new questions** as rich embeds to a specified Discord channel via webhook.
- **Prevents duplicate notifications** by persisting sent question IDs.
- **Configurable** via environment variables.
- **Easy to extend** for other tags or notification channels.

## Getting Started

### Prerequisites

- Node.js v22+ (for native fetch and ESM support)
- npm
- Access to a Discord server where you can create a webhook

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd wdio-discord-bot
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the project root with the following content:

   ```
   DISCORD_WEBHOOK_ID=your_discord_webhook_id
   DISCORD_WEBHOOK_TOKEN=your_discord_webhook_token
   TAG_TO_MONITOR=webdriver-io
   # Optional: STACKEXCHANGE_KEY=your_stackexchange_api_key
   ```

   - `DISCORD_WEBHOOK_ID` and `DISCORD_WEBHOOK_TOKEN` are from your Discord channel webhook.
   - `TAG_TO_MONITOR` is the Stack Overflow tag to monitor.
   - `STACKEXCHANGE_KEY` is optional but recommended for higher API rate limits.

4. **Run the bot:**

   - For development (with TypeScript):
     ```sh
     npm run dev
     ```
   - For production:
     ```sh
     npm start
     ```

## How It Works

- On each run, the bot:
  1. Loads the list of previously notified question IDs from `data/sentIds.json`.
  2. Fetches the latest questions from Stack Overflow tagged with your configured tag.
  3. Filters out questions already sent.
  4. Formats and posts new questions to Discord as embeds.
  5. Updates `sentIds.json` and auto-commits/pushes the file (if using git).

## Development Advice

- **TypeScript:** The project is written in TypeScript. Use `npm run dev` for live development.
- **Persistence:** Sent question IDs are stored in `data/sentIds.json`. To reset notifications, delete or clear this file.
- **Auto-commit:** Each time new questions are sent, the bot auto-commits and pushes the updated `sentIds.json`. Ensure your environment has git configured and permissions set.
- **Extending:** To monitor a different tag, change `TAG_TO_MONITOR` in your `.env`.
- **Formatting:** The embed includes a snippet of the question body, with code blocks formatted for Discord.
- **Error Handling:** If the bot fails to send a message or update sent IDs, errors are logged to the console.
- **API Limits:** For higher Stack Exchange API limits, set `STACKEXCHANGE_KEY` in your `.env`.

## Project Structure

```
src/
  config/         # Environment variable validation
  services/       # Stack Overflow, Discord, and persistence logic
  utils/          # HTML formatting for Discord
  index.ts        # Entry point
data/
  sentIds.json    # Tracks sent question IDs
```

## Troubleshooting

- **No new questions:** If there are no new questions, the bot will log "No new questions."
- **Webhook errors:** Double-check your Discord webhook credentials.
- **Git errors:** Ensure your environment has git installed and configured for auto-commits.

## License

MIT

Feel free to further customize this README for your community or deployment environment!
