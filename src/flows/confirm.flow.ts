import { addKeyword, EVENTS } from "@bot-whatsapp/bot";

import AIClass from "../services/ai/index";

import { getHistoryParse, handleHistory } from "../utils/handleHistory";

import {guardarConcepto} from "../services/api/concepto"
import {guardarVenta} from "../services/api/ventas"

const PROMPT = `
    
    tu tarea principal es analizar la información proporcionada en el contexto y generar un objeto JSON que se adhiera a la estructura especificada a continuación. 

    Historial de Conversacion:
    -----------------------------------
    {HISTORIAL_CONVERSACION}
    
    Objeto JSON a generar:
       {
   "nombre": "[obtener el nombre del cliente]",
   "tipo": "[recojo/delivery]",
   "direccion": "[obtener la dirección si es para delivery, de lo contrario, null]",
   "hora_de_recojo": "[obtener la hora si es para recojo, de lo contrario, null]",
   "metodo": "[obtener el método de pago: yape/plin/transferencia]",
   "dni": "[número de 8 cifras], de lo contrario null",
   "importe": [total del pedido],
   "ventas": [
     {"plato": "hamburguesa clásica", "cantidad": 2, "precio_unitario": 14},
     {"plato": "huevo adicional", "cantidad": 1, "precio_unitario": 3}
   ]
  
   Los siguientes datos, son obligatorios: Nombre, tipo, metodo de pago , importe y ventas.
 }
    `

const generateJsonParse = (history: string) => {

  const mainPrompt = PROMPT
      .replace('{HISTORIAL_CONVERSACION}', history)

  return mainPrompt
}

/**
 * Encargado de pedir los datos necesarios para registrar el evento en el calendario
 */

const flowConfirm = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, { extensions,provider,state, flowDynamic }) => {
        const ai = extensions.ai as AIClass
        const history = getHistoryParse(state)
        const promptSchedule = generateJsonParse(history)

        const text = await ai.createChat([
            {
                role: 'system',
                content: promptSchedule
            },
            {
                role: 'user',
                content: `Cliente pregunta: ${ctx.body}`
            }
        ], 'gpt-4')
    
        await guardarConcepto(text)
        await flowDynamic('Pedido Confirmado. . .')
    
    }
       
)
export { flowConfirm }