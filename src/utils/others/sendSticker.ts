const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));


async function sendS(ctx: any, provider: any): Promise<void> {
  if (provider && provider.vendor && provider.vendor.sendMessage) {
   //
     const id = ctx.key.remoteJid; // the WhatsApp ID 
    //console.log(id)
    const stickerWebP="https://carreterobdap-2cfaed4a1bb4.herokuapp.com/uploads/Confirmado_cf2ecbbe68.webp"

    await provider.vendor.sendMessage(id, {sticker: {url:stickerWebP}})
    
  }
}

export { sendS };