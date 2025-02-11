import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { handleHistory } from "../utils/handleHistory";
import { typing } from "../utils/others/typing";
import { aleatorio } from "../utils/others/aleatorioM";
import arraySaludo from "../utils/converflow/salInicial";
import arrayMenu from "../utils/converflow/menu";

const flowSaludo = addKeyword(EVENTS.ACTION)
  /*Enviamos el saludo */
  .addAction(async (ctx, { state, provider, flowDynamic, gotoFlow }) => {
    try {
      await typing(ctx, provider);
      const sal = aleatorio(arraySaludo);
      await flowDynamic(sal);
      await handleHistory({ content: sal, role: "assistant" }, state);

      try {
        await flowDynamic([
          {
            body: aleatorio(arrayMenu),
            media:
              "https://carreterobdap-2cfaed4a1bb4.herokuapp.com/uploads/Whats_App_Image_2024_04_11_at_18_46_53_fe6a685522.png",
          },
        ]);
        await flowDynamic(["🔥 completa los siguientes datos por favor: \n Nombre:\n DNI: (en caso desee boleta) \n Pedido: \n Dirección: \n Recojo o Delivery: \n Método de pago: \n Gracias por su preferencia 🍔"])
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(`[ERROR]:`, error);
      return error;
    }
  });


export { flowSaludo };
