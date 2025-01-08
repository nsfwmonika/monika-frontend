import axios, { AxiosRequestConfig, Method } from 'axios';

type RequestFunction = <T = any>(
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => Promise<T>;

const request: RequestFunction = async (method, url, data, config = {}) => {
  try {
    let href = window.location.href
    console.log('href---', href)

    let auth = ''

    if (href.indexOf("user") !== -1) {
      href = href.split("=")[1];
      let b = href.split("&");
      let decodedUrl = decodeURIComponent(b[0]);
      decodedUrl = decodeURIComponent(decodedUrl)
      const params = new URLSearchParams(decodedUrl)
      let temp = decodedUrl.split("&")[0].split("=")[1]
      console.log('auth:', JSON.parse(temp).id);
      auth = String(JSON.parse(temp).id)

    } else {
      let urlObject = new URL(href);
      let searchParams = urlObject.searchParams;
      console.log('searchParams---', searchParams)

      auth = searchParams.get('auth') || "";
      console.log('auth---', auth)
    }

    const instance = axios.create({
      baseURL: "https://rpc.nsfwmonika.ai/client",
      timeout: 50000,
      headers: {
        'Content-Type': 'application/json',
        'auth': String(auth)
      },
    });

    const response = await instance({
      method,
      url,
      ...(method.toLowerCase() === 'get' ? { params: data } : { data }),
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};

export default request;

