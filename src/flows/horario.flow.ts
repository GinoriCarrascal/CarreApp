import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { handleHistory } from "../utils/handleHistory";
import { typing } from "../utils/others/typing";
import { aleatorio } from "../utils/others/aleatorioM";
import arraySaludo from "../utils/converflow/horaInicial";
import recHorario from "../utils/converflow/horaSec";

 /*Funcion para decir al cliente que no atendemos en este horario */

const flowHorario = addKeyword(EVENTS.ACTION)
.addAction(async (ctx, { state, provider,flowDynamic}) => {
    try {
        await typing(ctx, provider)
        const sal=aleatorio(arraySaludo)
        const hor=aleatorio(recHorario)
        await handleHistory({ content:sal.concat(" ",hor).concat(" ","Puedes programar tu delivery o recojo para este horario"), role: 'assistant' }, state)
        
        await flowDynamic(sal)
        await flowDynamic(hor)
        await flowDynamic("Puedes programar tu delivery o recojo para este horario ")
    } catch (error) {
        console.log(`[ERROR]:`, error)
        return error
    }

})



export { flowHorario };