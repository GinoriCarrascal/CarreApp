import { addKeyword, EVENTS } from "@bot-whatsapp/bot";

import AIClass from "../services/ai/index";

import { getHistoryParse, handleHistory } from "../utils/handleHistory";
import { generar } from "../utils/others/generateuuid";

import { flowMetPago } from "./metPago.flow";

import { Usuario } from "../entities/cliente.entity";
import { Venta } from "../entities/venta.entity";
import { DetalleVenta } from "../entities/detalleVenta.entity";
import  Order  from "../entities/order";

import { buscarCliente } from "../services/api/customer";
import {sendMS} from "../utils/others/sendM"
import {sendS} from "../utils/others/sendSticker"

import promt from "../utils/promts/promptConfirm";
import {obtenerCoordenadas } from "../utils/others/getCordinades"

const generateJsonParse = (history: string) => {
  const mainPrompt = promt.replace("{HISTORIAL_CONVERSACION}", history);
  return mainPrompt;
};

/**
 * Encargado de pedir los datos necesarios para registrar
 *
 */

const flowConfirm = addKeyword(EVENTS.ACTION).addAction(
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
   
    const vercliente  = await buscarCliente(ctx.from);


    let idUsuario

   if(vercliente.encontrado){ 
      idUsuario=vercliente.data?.[0]?.id
    }else{
      //Creamos
      const idCust= generar(4,"C")
      const customer=new Usuario(ctx.from,objeto.dni,objeto.nombre,idCust)
      const cust=customer.crearUsuario()
      console.log(cust)
     // idUsuario=cust.data?.[0]?.id
    }

    const idVenta= generar(4,"V")
    const venta=new Venta(idVenta,idUsuario ,objeto.metodo,objeto.direccion,objeto.hora_de_recojo,objeto.importe,objeto.tipo)
   const idVentaa= venta.crearVenta()

 const arrayOrder=[]
 let stringPedido=""
 console.log(objeto.ventas.length)

    for (let index = 0; index < objeto.ventas.length; index++) {
      //const element = array[index];
      const idVenta= generar(4,"DV")
      const dVe=new DetalleVenta(idVenta,objeto.ventas?.[index]?.plato,objeto.ventas?.[index]?.cantidad,objeto.ventas?.[index]?.precio_unitario,objeto.ventas?.[index]?.adicional,objeto.ventas?.[index]?.precioadicional)
      dVe.CrearDetalleVenta()    

      let myOrder: Order = {
        nombre: objeto.ventas[index].plato,
        cantidad: objeto.ventas[index].cantidad,
        adicional: objeto.ventas[index].adicional
       };
       arrayOrder.push(myOrder)
      stringPedido +=`${objeto.ventas[index].cantidad}x ${objeto.ventas[index].plato}`
      if(objeto.ventas[index].adicional!=null){
      stringPedido +=` con adicional  ${objeto.ventas[index].adicional} \n`
      }
    }
    let mensaje=""
    sendS(ctx,provider)
    obtenerCoordenadas("736","jiron dos de mayo")
    
    const tipo=objeto.tipo
    
    if(tipo=='delivery'){
      mensaje=`  📢 Nuevo pedido 
 📝 Cliente: ${objeto.nombre}(${ctx.from}) 
 🛵 Tipo: Delivery 
 📍 Dirección: ${objeto.direccion}
 💰 Total: ${objeto.importe} 
 🛒 Pedido:
 ${stringPedido} 
 💳 Pago: ${objeto.metodo}`
    }else{
      mensaje=` 📢 Nuevo pedido 
 📝 Cliente: ${objeto.nombre}(${ctx.from}) 
 🛵 Tipo: Recojo 
 ⌚Hora de recojo: ${objeto.hora_de_recojo}
 💰 Total: ${objeto.importe} 
 🛒 Pedido:
 ${stringPedido} 
  💳 Pago: ${objeto.metodo}`
    }
    //sendMS(ctx,provider,mensaje)
    //sendS(ctx,provider,mensaje)
    await flowDynamic("Pedido Confirmado. . .");
    gotoFlow(flowMetPago)
  }
);

export { flowConfirm };

