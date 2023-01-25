import axios from 'axios';
import Cookies from 'universal-cookie';

class FetchService {
  isofetch(url, data, type) {
    return axios({
      method: type,
      url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data)
    .catch((error) => error.response.data);
  }

  /**
   * This request could be initiated on client or server side, so a check must be done so
   * we can know whether to use the Docker local instance (server side request) or the
   * public facing request (client side)
   * @param url
   * @param data
   * @param type
   * @param ssr
   */
  isofetchAuthed(url, data, type, contentType, ssr = false) {
    const cookies = new Cookies();
    const token = cookies.get('token');
    return axios({
      method: type,
      url: `${ssr ? process.env.NEXT_PUBLIC_NETWORK_API_URL : process.env.NEXT_PUBLIC_API_URL}${url}`,
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': contentType,
        Authorization: 'bearer ' + token
      },
    })
    .then((response) => response.data)
    .catch((error) => error.response.data);
  }
}

export default new FetchService();
