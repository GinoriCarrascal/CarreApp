import axios, { AxiosRequestConfig } from "axios";

const token = process.env.STRAPI_KEY;
const url = process.env.STRAPI_API_URL;

const getProducto = async (): Promise<any | null> => {
  try {
    const config: AxiosRequestConfig = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${url}/api/productos?pagination[page]=1&pagination[pageSize]=100`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(config);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { getProducto };
