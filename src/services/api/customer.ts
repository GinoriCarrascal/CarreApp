import axios, { AxiosRequestConfig } from "axios";

const token = process.env.STRAPI_KEY;
const url = process.env.STRAPI_API_URL;



const buscarCliente = async (datosentrantes: any): Promise<any | null> => {
 
  try {
    const config: AxiosRequestConfig = {
      method: "post",
      url: `${url}/api/customer/find`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
       "telefono": datosentrantes
      },
    };

    const response = await axios(config);
    return response.data
  } catch (e) {
    console.log(e);
    return null;
  }
};



const guardarCliente = async (data: any): Promise<any | null> => {

  try {
    const config: AxiosRequestConfig = {
      method: "post",
      url: `${url}/api/customers`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data:{"data":data}
      
    };
    console.log(config)
    const response = await axios(config);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { guardarCliente, buscarCliente };
