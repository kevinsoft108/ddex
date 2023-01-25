import Cookies from 'universal-cookie';
import { redirect } from 'react-router-dom';
import FetchService from './Fetch.service';

class TokenService {
  saveToken(token) {
    const cookies = new Cookies();
    cookies.set('token', token, { path: '/' });
    return Promise.resolve();
  }

  deleteToken() {
    const cookies = new Cookies();
    cookies.remove('token', { path: '/' });
    return;
  }

  checkAuthToken(token, ssr) {
    return FetchService.isofetchAuthed(`/auth/validate`, { token }, 'POST', 'application/json', ssr);
  }

  /**
   * Runs on both client and server side in the getInitialProps static.
   * This decides whether the request is from client or server, which
   * is important as the URL's will be different due to the Docker
   * container network
   * @param ctx
   */
  async authenticateTokenSsr(ctx) {
    const ssr = ctx?.req ? true : false;
    const cookies = new Cookies(ssr ? ctx.req?.headers.cookie : null);
    const token = cookies.get('token');

    const response = await this.checkAuthToken(token, ssr);
    if (!response.success) {
      this.deleteToken();
      redirect('/?l=t')
    }
  }
}

export default TokenService;
