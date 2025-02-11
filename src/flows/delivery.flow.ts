
import { addKeyword, EVENTS } from "@bot-whatsapp/bot";

import AIClass from "../services/ai/index";

import { getHistoryParse,handleHistory } from "../utils/handleHistory";

import { flowMetPago } from "./metPago.flow";

import { buscarCliente } from "../services/api/customer";

import promt from "../utils/promts/promptConfirm";
import {obtenerCoordenadas } from "../utils/others/getCordinades"

const generateJsonParse = (history: string) => {
  const mainPrompt = promt.replace("{HISTORIAL_CONVERSACION}", history);
  return mainPrompt;
};


const flowDelivery = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, { extensions, state, flowDynamic,provider ,gotoFlow}) => {
    const ai = extensions.ai as AIClass;
    const history = getHistoryParse(state);
    const promptSchedule = generateJsonParse(history);

    const text = await ai.createChat(
      [
        {
          role: "system",
          content: promptSchedule,
        },
        {
          role: "user",
          content: `Cliente pregunta: ${ctx.body}`,
        },
      ],
      "gpt-4o-mini"
    );

    // Convertir la cadena JSON a un objeto JavaScript
    const objeto = JSON.parse(
      text.replace("```json", " ").replace("```", " ").trim()
    );
    console.log(objeto)
   const mensaje = await obtenerCoordenadas(objeto.numero ,objeto.via+" "+objeto.nombre)

   await handleHistory({ content: mensaje, role: "assistant" }, state);
    
    gotoFlow(flowMetPago)
  }
);

export { flowDelivery };




/**import { calcularPrecioDelivery } from "../services/deliveryService.js";

export async function manejarPedido(cliente, mensaje) {
  if (mensaje.includes("delivery")) {
    return "¡Perfecto! ¿Me puedes compartir tu dirección para calcular el costo de envío? 🚗";
  }

  // Si el cliente envía su dirección
  if (mensaje.includes("calle") || mensaje.includes("av.") || mensaje.includes("direccion")) {
    const resultado = await calcularPrecioDelivery(mensaje);

    if (!resultado) {
      return "No pude calcular el costo de envío. ¿Puedes verificar tu dirección? 📍";
    }

    const { distancia, precio } = resultado;
    return `El costo de envío hasta tu ubicación (${distancia.toFixed(2)} km) es de S/${precio} 🚚.
    El total con delivery sería S/[monto_total + precio]. ¿Todo correcto? Escribe 'SI CONFIRMO' para proceder.`;
  }

  return "¿Cómo te puedo ayudar? 😊";
}
 */