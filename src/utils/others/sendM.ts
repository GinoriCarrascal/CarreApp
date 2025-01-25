const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

async function sendMS(ctx: any, provider: any, mensaje: any): Promise<void> {
  if (provider && provider.vendor && provider.vendor.sendMessage) {
    const id = ctx.key.remoteJid; // the WhatsApp ID 
    await provider.vendor.sendMessage(id, { text: mensaje, mentions: ['12345678901@s.whatsapp.net'] })
    
  }
}

export { sendMS };