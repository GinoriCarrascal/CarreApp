
const prompt = `Como una inteligencia artificial avanzada, tu tarea es analizar el contexto de una conversación y determinar cuál de las siguientes acciones es más apropiada para realizar:
--------------------------------------------------------
Historial de conversación:
{HISTORY}

Posibles acciones a realizar:
1. INICIO: Esta acción se debe realizar si el cliente esta saludando o se esta iniciando la conversacion
2. PEDIDO: Esta acción se debe realizar cuando el muestra la intención de comprar o esta realizando un pedido.
3. CONFIRMACION: Esta acción se debe realizar cuando el cliente esribe literalmente "SI CONFIRMO".
4. ADIOS: Esta acción se debe realizar cuando el cliente se despide.
5. FREC: Esta acción se debe realizar cuando el cliente hace preguntas acerca del negocio.
6. AGENTE : Esta acción se debe realizar cuando el cliente quiere realizar una queja o sugerencia.

-----------------------------
Tu objetivo es comprender la intención del cliente y seleccionar la acción más adecuada en respuesta a su declaración, si no se 
encuentra dentro de estos responde amablemente hasta encontrar su intencion claramente

Respuesta ideal (INICIO|PEDIDO|CONFIRMACION|ADIOS|FREC|AGENTE):`

export default prompt