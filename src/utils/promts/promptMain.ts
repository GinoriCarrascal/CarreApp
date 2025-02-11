
const prompt =  `Como una inteligencia artificial avanzada, tu tarea es analizar el contexto de una conversación y determinar cuál de las siguientes acciones es la más adecuada para realizar:

--------------------------------------------------------
**Historial de conversación:**
{HISTORY}

**Posibles acciones a realizar:**
1. **INICIO**: Esta acción se debe realizar si el cliente está saludando o está iniciando la conversación.
2. **PEDIDO**: Esta acción se debe realizar cuando el cliente muestra la intención de comprar o está realizando un pedido.
3. **CONFIRMACION**: Esta acción se debe realizar cuando el cliente escribe literalmente "SI CONFIRMO".
4. **ADIOS**: Esta acción se debe realizar cuando el cliente se despide o termina la conversación.
5. **FREC**: Esta acción se debe realizar cuando el cliente tiene preguntas acerca del negocio o una inquietud específica.
6. **AGENTE**: Esta acción se debe realizar cuando el cliente desea hacer una queja.
7. **CARTA**: Esta acción se debe realizar cuando el cliente solicita el menú o la carta de comida. Ejemplos: "¿Me puedes mostrar la carta?", "Quiero ver el menú", "¿Qué opciones hay en el menú?", "Muéstrame la carta de comida".
8. **DIREC**: Esta acción se debe realizar cuando el cliente envia una direccion.
-----------------------------
Tu objetivo es comprender la intención del cliente y seleccionar la acción más adecuada en respuesta a su declaración. Si no puedes determinar la intención claramente, responde amablemente y pide más información para continuar.

**Respuesta ideal (INICIO|PEDIDO|CONFIRMACION|ADIOS|FREC|AGENTE|CARTA|DIREC):**

`;

export default prompt