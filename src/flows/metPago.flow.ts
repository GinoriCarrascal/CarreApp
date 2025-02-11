import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { handleHistory } from "../utils/handleHistory";
import { typing } from "../utils/others/typing";

 /*Funcion para decir al cliente que no atendemos en este horario */

const flowMetPago = addKeyword(EVENTS.ACTION)
.addAction(async (ctx, { state, provider,flowDynamic}) => {
    try {
        await typing(ctx, provider)
        await flowDynamic( ["Te comparto las modalidades de pago disponibles: \n 💵 *Yape* / *Plin* / *Transferencia*"])
        await flowDynamic( ["Detalles de cuentas:\n 1️⃣ Cuenta Simple Soles (Interbank):\n 8983172554328 \n 2️⃣ Cuenta Interbancaria (Interbank): \n 00389801317255432847 \n3️⃣ Cuenta Ahorros (BCP): \n 24592036146029"])
        await flowDynamic( ["📱 Número para Yape / Plin:\n 993793724"])
        await flowDynamic( ["👩‍💻 *Nombre* *del* *titular*: \n Noemí Judith Sánchez Mantilla"])

        await handleHistory ({content:"Enviamos datos bancarios", role:'assistant'},state)
    } catch (error) {
        console.log(`[ERROR]:`, error)
        return error
    }

})



export { flowMetPago };