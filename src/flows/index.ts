import { createFlow } from "@bot-whatsapp/bot";
import welcomeFlow from "./welcome.flow";
import { flowPedido } from "./pedidos.flow";
import { flowConfirm } from "./confirm.flow";
import { flowSaludo } from "./saludo.flow";
import { flowDespedida } from "./despedida.flow";
import { flowVoice } from "./voice.flow";
import { flowfreq } from "./freq.flow";
import { flowAgente } from "./agente.flow";
import { flowHorario } from "./horario.flow";
import { flowMetPago } from "./metPago.flow";

/**
 * Declaramos todos los flujos que vamos a utilizar
 */
export default createFlow(
    [   welcomeFlow,
        flowSaludo,
        flowPedido,
        flowConfirm,
        flowDespedida,
        flowVoice,
        flowAgente,
        flowfreq,
        flowHorario,
        flowMetPago
        ])