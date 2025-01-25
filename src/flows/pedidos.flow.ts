import { addKeyword, EVENTS } from "@bot-whatsapp/bot";

import AIClass from "../services/ai";
import { getHistoryParse, handleHistory } from "../utils/handleHistory";
import { generateTimer } from "../utils/generateTimer";

import { typing } from "../utils/others/typing";

import { getProducto } from "../../src/services/api/producto"

//import { getCalles } from "src/services/api/calles";

import PROMPT_SCHEDULE from "src/utils/promts/promtPedidos";

const generateSchedulePrompt = (
  history: string,
  bd_ham: string,
  bd_cal: string
) => {
  const mainPrompt = PROMPT_SCHEDULE.replace(
    "{HISTORIAL_CONVERSACION}",
    history
  )
    .replace("{BD_HAMBURGUESAS}", bd_ham)
    .replace("{BD_CALLES}", bd_cal);

  return mainPrompt;
};

const flowPedido = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, { extensions, provider, state, flowDynamic, fallBack }) => {
    await typing(ctx, provider);
    const ai = extensions.ai as AIClass;
    const history = getHistoryParse(state);
    const menus = await getProducto();
    console.log(menus);

    const listMenu = menus.data
      .map(
        (menu) =>
          `articulo:${menu.nombre}, precio:${menu.precio}`
      )
      .join("; \n");
     
    //const calles = await getCalles()
    const listCalles = "";
    // calles.data.map((calle) => `nombre:${calle.attributes.nombre}, precio:${calle.attributes.precio}`).join('; \n')
    const promptSchedule = generateSchedulePrompt(
      history,
      listMenu?.length ? listMenu : "ninguna",
      listCalles?.length ? listCalles : "ninguna"
    );

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

    await handleHistory({ content: text, role: "assistant" }, state);

    const chunks = text.split(/(?<!\d)\.\s+/g);
    for (const chunk of chunks) {
      await flowDynamic([
        { body: chunk.trim(), delay: generateTimer(150, 250) },
      ]);
    }

    if (!text.includes("SI ACEPTO")) {
      return fallBack();
    }
  }
);

export { flowPedido };
