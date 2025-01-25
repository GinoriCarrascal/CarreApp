import { addKeyword, EVENTS } from "@bot-whatsapp/bot";

import AIClass from "../services/ai";
import { getHistoryParse, handleHistory } from "../utils/handleHistory";
import { generateTimer } from "../utils/generateTimer";
import { typing } from "../utils/others/typing";

import promtFA from "../utils/promts/promptFAQs";
import promt from "../utils/promts/promptConfirm";

const generateSchedulePrompt = (history: string, faq: string) => {
  const mainPrompt = promt
    .replace("{HISTORIAL_CONVERSACION}", history)
    .replace("{PREGFREQ}", faq);

  return mainPrompt;
};

const flowfreq = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, { extensions, state, provider, flowDynamic }) => {
    await typing(ctx, provider);
    const ai = extensions.ai as AIClass;
    const history = getHistoryParse(state);
    const promptSchedule = generateSchedulePrompt(history, promtFA);

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
      "gpt-3.5-turbo",
      0.7
    );

    await handleHistory({ content: text, role: "assistant" }, state);

    const chunks = text.split(/(?<!\d)\.\s+/g);
    for (const chunk of chunks) {
      await flowDynamic([
        { body: chunk.trim(), delay: generateTimer(150, 250) },
      ]);
    }
  }
);

export { flowfreq };
