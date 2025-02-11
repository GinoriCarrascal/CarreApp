const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));



async function sendMS(ctx: any, provider: any, mensaje: any): Promise<void> {
  if (provider && provider.vendor && provider.vendor.sendMessage) {
   //
   //  const id = ctx.key.remoteJid; // the WhatsApp ID 
    //console.log(id)

    await provider.vendor.sendMessage('51986310080@s.whatsapp.net', { text: mensaje })
    
  }
}

export { sendMS };