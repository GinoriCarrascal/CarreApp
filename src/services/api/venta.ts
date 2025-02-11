import axios, { AxiosRequestConfig } from "axios";

const token = process.env.STRAPI_KEY;
const url = process.env.STRAPI_API_URL;

const guardarVenta = async (datosentrantes: any): Promise<any | null> => {
  try {
    const config: AxiosRequestConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${url}/api/ventas`,
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

export { guardarVenta };
