import 'dotenv/config'
import { z } from 'zod'

export const Config = z.object({
    DISCORD_WEBHOOK_ID: z.string().nonempty(),
    DISCORD_WEBHOOK_TOKEN: z.string().nonempty(),
    TAG_TO_MONITOR: z.string().nonempty(),
    STACKEXCHANGE_KEY: z.string().optional(),
})

export type ConfigType = z.infer<typeof Config>
export const env = Config.parse(process.env)
