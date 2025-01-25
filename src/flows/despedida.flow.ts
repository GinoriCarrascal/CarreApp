import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { handleHistory } from "../utils/handleHistory";
import { typing } from "../utils/others/typing";

import { aleatorio } from "../utils/others/aleatorioM";
import arrayDespedida from "../utils/converflow/despedida";



const flowDespedida = addKeyword(["adios", "bye", "chau"])
    .addAction(async (ctx, { state, provider, flowDynamic }) => {
        try {
            await typing(ctx, provider)
            const sal = aleatorio(arrayDespedida)
            await flowDynamic(sal)

            await handleHistory({ content: sal, role: 'assistant' }, state)

        } catch (error) {
            console.log(`[ERROR]:`, error)
            return error
        }

    })


export { flowDespedida }
