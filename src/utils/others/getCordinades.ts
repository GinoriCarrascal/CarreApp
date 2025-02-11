import fetch from 'node-fetch';

import { getCordinades } from "../../services/api/getCoordinades"

async function obtenerCoordenadas(num:string,dir: string): Promise<string> {

  // Codificar la dirección para que se pueda usar en la URL  
  const direccionCodificada = encodeURIComponent(dir);
  try {
    //1 obtener coordenadas,
    // 2 comparar
    // 3 en base a la distancia devolver el costo
    // Realizar la solicitud GET usando fetch
   /* if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }*/

    const data = await getCordinades(num,direccionCodificada);
    let lat1, lon1

    // Si se encuentran resultados, devolver las coordenadas
    if (data.features && data.features.length > 0) {
      lat1 = data.features[0].geometry.coordinates[1];
      lon1 = data.features[0].geometry.coordinates[0];
      //return
    } else {
       console.log("Pedir una referencia.");
    }
    // Carretero
    const lat2 = -7.149950
    const lon2 = -78.506302

    function haversine(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radio de la Tierra en km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distancia en km
    }

    const distancia = haversine(lat1, lon1, lat2, lon2)
    console.log(distancia)

    let precio

    if (distancia <= 3) { precio=5; }
    if (distancia <= 6) { precio=8; }
    if (distancia <= 10) { precio= 12; }
    //return 15 + (distancia - 10) * 1;
   return `El precio de delivery es ${precio} `

  } catch (error) {
    console.log( `Error al realizar la solicitud: ${error.message} `)
  }
}

export { obtenerCoordenadas };
// Ejemplo de uso:
/*
const token = "tu_token_aqui";  // Sustituir con tu token de Mapbox
const direccion = "Jr. Dos de Mayo 736, Cajamarca, Perú 06003";
obtenerCoordenadas(direccion, token).then(result => {
  console.log(result);
});9*/

/* Coordenadas carretero 
-7.149950, -78.506302

*/
