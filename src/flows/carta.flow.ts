import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { handleHistory } from "../utils/handleHistory";
import { typing } from "../utils/others/typing";

let saludoInicial = [
    "¡Gracias por tu visita! Esperamos verte pronto. 😊👋",
 "¡Que tengas un excelente día! ¡Hasta la próxima! 🌞✨",
 "¡Fue un placer atenderte! Nos vemos pronto. 🙌😃",
 "¡Cuídate mucho y regresa pronto! 💪🚶‍♂️",
 "¡Gracias por preferirnos! ¡Nos vemos! 🏠👋",
 "¡Esperamos haberte ayudado! ¡Hasta luego! 🖐️🙂",
 "¡Hasta la próxima! ¡Qué tengas un día genial! 🌟👋",
 "¡Nos vemos pronto! ¡Gracias por visitarnos! 🚀😊",
 "¡Adiós! ¡Vuelve pronto! 🤗🏡",
 "¡Gracias por tu tiempo! ¡Hasta la próxima vez! ⏰👋"
   ]
 
 function aleatorio(lista) {
     try {
         let aleatorio = lista[Math.floor(Math.random() * lista.length)];
         return aleatorio;
     } catch (err) {
         console.log(err);
         return;
     }
 }

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
