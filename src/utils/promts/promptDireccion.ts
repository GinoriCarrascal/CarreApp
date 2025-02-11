const promt = `
...
Lee el historial del cliente 

Historial de Conversacion:
-----------------------------------
{HISTORIAL_CONVERSACION}


y devuelve el mensaje en json

Formato de salida JSON:
      {
   "via": "[tipo de via av, jiron, pasaje, etc]",
   "nombre": "[nombre de la calle ]",
   "numero": "[numero de la calle ]",
}

`;

export default promt;