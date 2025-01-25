import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { handleHistory } from "../utils/handleHistory";
import { typing } from "../utils/others/typing";
import { aleatorio } from "../utils/others/aleatorioM";
import arraySaludo from "../utils/converflow/horaInicial";

/*Funcion para decir al cliente que no atendemos en este horario */

const flowHorario = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, { state, provider, flowDynamic }) => {
    try {
      await typing(ctx, provider);
      const sal = aleatorio(arraySaludo);
      await handleHistory({ content: sal, role: "assistant" }, state);

      await flowDynamic(sal);
    } catch (error) {
      console.log(`[ERROR]:`, error);
      return error;
    }
  }
);

export { flowHorario };
