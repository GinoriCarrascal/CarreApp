const promt = `
    Tu tarea es analizar la conversación entre el cliente y el sistema para extraer la información necesaria y generar un objeto JSON que siga la estructura especificada.
    Historial de Conversacion:
    -----------------------------------
    {HISTORIAL_CONVERSACION}
    
    Formato de salida JSON:
      {
   "nombre": "[nombre del cliente]",
   "tipo": "[delivery/recojo]",
   "direccion": "[si es delivery, extraer dirección; si es recojo, asignar null]",
   "hora_de_recojo": "[si es recojo, extraer hora de recojo; si es delivery, asignar null]",
   "metodo": "[método de pago: yape/plin/transferencia]",
   "dni": "[extraer DNI si se proporciona (8 dígitos), de lo contrario null]",
   "importe": [total del pedido],
   "ventas": [
     {"plato": "nombre del plato", "cantidad": cantidad, "precio_unitario": precio}
     // Agregar más entradas según corresponda
   ]
}

Reglas clave:
Obligatorio: Debes extraer y llenar los campos nombre, tipo, metodo, importe y ventas siempre.
Si el cliente ha solicitado delivery, es obligatorio proporcionar la direccion.
Si el cliente ha solicitado recojo, es obligatorio proporcionar la hora_de_recojo.
Si no se menciona un DNI, el valor debe ser null.
Calcula el total del pedido sumando el precio de todos los platos multiplicado por la cantidad de cada uno.

    `

export default promt;