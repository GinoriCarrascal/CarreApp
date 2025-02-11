import axios, { AxiosRequestConfig } from "axios";

const token = process.env.MAPBOX_TOKEN;
const url = process.env.MAPBOX_API_URL;


const getCordinades = async (numero, calle): Promise<any | null> => {
   try {
        const config: AxiosRequestConfig = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${url}?country=pe&region=cajamarca&postcode=06000&place=cajamarca&address_number=${numero}&street=${calle}&access_token=${token}`,
        };

        const response = await axios.request(config);
        //console.log(response.data.features[0])
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }

      
};

export { getCordinades };

/**
 * import axios from "axios";

const ORS_API_KEY = "TU_API_KEY"; // Reemplaza con tu clave
const UBICACION_RESTAURANTE = "-77.0428,-12.0464"; // Latitud, Longitud de tu restaurante

// Función para obtener la distancia y calcular el precio del delivery
export async function calcularPrecioDelivery(direccionUsuario) {
  try {
    const destino = await obtenerCoordenadas(direccionUsuario);
    if (!destino) return null;

    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${UBICACION_RESTAURANTE}&end=${destino}`;
    const response = await axios.get(url);

    const distanciaKM = response.data.routes[0].summary.distance / 1000; // Convertir a KM

    // Definir tarifas basadas en la distancia
    let precio;
    if (distanciaKM <= 3) precio = 5;
    else if (distanciaKM <= 6) precio = 8;
    else if (distanciaKM <= 10) precio = 12;
    else precio = 15 + (distanciaKM - 10) * 1;

    return { distancia: distanciaKM, precio };
  } catch (error) {
    console.error("Error obteniendo distancia:", error);
    return null;
  }
}

// Función para obtener coordenadas de la dirección (usando una API de geolocalización)
async function obtenerCoordenadas(direccion) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;
  try {
    const response = await axios.get(url);
    if (response.data.length === 0) return null;

    const { lat, lon } = response.data[0];
    return `${lon},${lat}`;
  } catch (error) {
    console.error("Error obteniendo coordenadas:", error);
    return null;
  }
}

 */

