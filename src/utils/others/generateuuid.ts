async function generar(longitud: number, tipo: string): Promise<any> {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let identificador = "";

  // Generar una parte aleatoria
  for (let i = 0; i < longitud; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    identificador += caracteres[indiceAleatorio];
  }

  // Obtener la fecha actual en formato timestamp (milisegundos)
  const fecha = Date.now().toString(); // Esto devuelve el número de milisegundos desde 1970

  // Combinar el identificador aleatorio con la fecha
  return `${tipo}${identificador}-${fecha}`;
}

export { generar };
