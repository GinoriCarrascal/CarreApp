import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { handleHistory } from "../utils/handleHistory";
import { typing } from "../utils/others/typing";

const flowMen = addKeyword(EVENTS.ACTION)
.addAnswer(`Send image from URL`, 
    { media: 'https://i.imgur.com/0HpzsEm.png' }
)
.addAction(async (ctx, { state, provider}) => {
    try {
        await typing(ctx, provider)
        await handleHistory({ content:"carta Enviada", role: 'assistant' }, state)
    } catch (error) {
        console.log(`[ERROR]:`, error)
        return error
    }

})


export { flowMen };
