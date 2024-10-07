import 'dotenv/config'
import { createBot, MemoryDB, createProvider } from '@bot-whatsapp/bot'
import { TelegramProvider } from '@builderbot-plugins/telegram'
import { BaileysProvider } from '@bot-whatsapp/provider-baileys'

import AIClass from './services/ai';
import flows from './flows';

const ai = new AIClass(process.env.OPENAI_API_KEY, 'gpt-3.5-turbo-16k')

const PORT = process.env.PORT || 3000;  // Usa el puerto de Railway o el puerto 3000 como fallback

const main = async () => {

    const provider = createProvider(BaileysProvider)
    // const provider = createProvider(TelegramProvider, { token: process.env.TELEGRAM_API ?? '' })

    await createBot({
        database: new MemoryDB(),
        provider,
        flow: flows
    }, { extensions: { ai } })

    provider.initHttpServer(3000)

    

}

main()