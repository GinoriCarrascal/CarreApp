import { BotContext, BotMethods } from "@bot-whatsapp/bot/dist/types";
import { getHistoryParse } from "../utils/handleHistory";

import { flowPedido } from "../flows/pedidos.flow";
import { flowConfirm } from "../flows/confirm.flow";
import { flowSaludo } from "../flows/saludo.flow";
import { flowDespedida } from "../flows/despedida.flow";
import { flowAgente } from "../flows/agente.flow";
import { flowHorario } from "../flows/horario.flow";
import promt from "../utils/promts/promptMain";

import AIClass from "../services/ai/index";

/**
 * Determina que flujo va a iniciarse basado en el historial que previo entre el bot y el humano
 */

export default async (
  _: BotContext,
  { state, gotoFlow, extensions }: BotMethods
) => {
  // Obtener la hora actual al inicio
  const currentHour = new Date().getHours(); // Hora actual en formato 24 horas (0-23)

  // Verificar si la hora está entre las 5 PM (17) y 12 AM (23)
  if (currentHour <= 17 && currentHour > 24) {
    // Si está en ese rango, terminamos la conversación llamando a 'gotoFlow' con 'terminar'
    console.log(
      "Dentro del horario restringido (5 PM - 12 AM), terminando la conversación."
    );
    return gotoFlow(flowHorario);
  } else {
    // Si no está en el rango restringido, continuamos con el procesamiento normal

    const history = getHistoryParse(state);
    const ai = extensions.ai as AIClass;
    const promptMain = promt.replace("{HISTORY}", history);

    const text = await ai.createChat(
      [
        {
          role: "system",
          content: promptMain,
        },
      ],
      "gpt-4o-mini",
      0.2
    );

    console.log(text);

    try {
      switch (true) {
        case text.includes("INICIO"):
          console.log("INIVIO");
          return gotoFlow(flowSaludo);

        case text.includes("PEDIDO"):
          console.log("Pedido");
          return gotoFlow(flowPedido);

        case text.includes("CONFIRMACION"):
          console.log("Confirmación");
          return gotoFlow(flowConfirm);

        case text.includes("ADIOS"):
          console.log("Adiós");
          return gotoFlow(flowDespedida);

        case text.includes("FREC"):
          console.log("Frecuentes");
        //return gotoFlow(flowMen);

        case text.includes("PAGO"):
          console.log("Pago");
          return gotoFlow(flowAgente);

        case text.includes("AGENTE"):
          console.log("Agente");
          return gotoFlow(flowAgente);

        default:
          console.log("No matching action found");
          break;
      }
    } catch (error) {
      console.error("Error in switch statement:", error);
      return error;
    }
  }
};
