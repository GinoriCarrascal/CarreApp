import { addKeyword, EVENTS } from "@bot-whatsapp/bot";

import AIClass from "../services/ai/index";

import { getHistoryParse, handleHistory } from "../utils/handleHistory";
import { generar } from "../utils/others/generateuuid";

import { Usuario } from "../entities/cliente.entity";
import { Venta } from "../entities/venta.entity";
import { DetalleVenta } from "../entities/detalleVenta.entity";

import { buscarCliente } from "../services/api/Customer";

import promt from "../utils/promts/promptConfirm";

const generateJsonParse = (history: string) => {
  const mainPrompt = promt.replace("{HISTORIAL_CONVERSACION}", history);
  return mainPrompt;
};

/**
 * Encargado de pedir los datos necesarios para registrar
 *
 */

const flowConfirm = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, { extensions, state, flowDynamic }) => {
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

    // Ahora `objeto` es un objeto JavaScript y puedes acceder a sus propiedades
    console.log(objeto.nombre); // Salida: Ginori
    console.log(objeto.ventas); // Salida: el array de ventas
    console.log(objeto.ventas[0].plato); // Salida: Clásica
    const tel=ctx.from;
    console.log(tel); // Salida: Clásica
    
    const respuestalcliente = buscarCliente(tel);
    console.log(respuestalcliente); // Salida: Clásica

    //
    if (respuestalcliente != null) {
      //guardamos cliente nuevo
      //uuid
      const idCostumer = await generar(4, "C");
      const cliente = new Usuario(
        objeto.telefono,
        objeto.dni,
        objeto.nombre,
        idCostumer
      );
      cliente.esValido();
      cliente.crearUsuario();
      /*
      if (cliente.esValido) {
        cliente.crearUsuario();
        const venta = new Venta(
          objeto.telefono,
          objeto.metodo_de_pago,
          objeto.direccion,
          objeto.hora_de_recojo,
          objeto.importe,
          objeto.tipo
        );
        venta.esValido();
        
        
      }*/
    }

    await flowDynamic("Pedido Confirmado. . .");
  }
);

export { flowConfirm };
