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
              "https://carreterobdap-2cfaed4a1bb4.herokuapp.com/uploads/menu_0bfc39e06b.png",
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(`[ERROR]:`, error);
      return error;
    }
  });

/* Enviamos la carta */
/* .addAnswer(`Send video from Local`, 
        { media: path.join(process.cwd(), 'assets', 'menu.jpg') }
    )
/* Mensaje adicional */

export { flowSaludo };
