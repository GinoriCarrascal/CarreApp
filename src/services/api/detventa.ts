import axios, { AxiosRequestConfig } from "axios";

const token = process.env.STRAPI_KEY;
const url = process.env.STRAPI_API_URL;

const guardarDetVenta = async (datosentrantes: any): Promise<any | null> => {
  if (!token) {
    console.error('Faltan las variables de entorno Q o ACCESS_TOKEN.');
    process.exit(1); // Salir si falta alguna variable
  }

  try {
    const config: AxiosRequestConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${url}/api/detalle-ventas`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data:{"data":datosentrantes},
    };

    const response = await axios(config);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};


export { guardarDetVenta };
