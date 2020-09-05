import decode from "jwt-decode";
import { url } from "./url";

let AuthSingleton = (function () {
  let instance: AuthService;

  function createInstance() {
    return new AuthService();
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }

      return instance;
    }
  };
})();
interface Decoded {
  email: string;
  name: string;
  institution_id: string;
  lang: string;
  roles: [];
  iat: number;
  exp: number;
}
class AuthService {
  this: any;
  constructor() {
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.checkResponse = this.checkResponse.bind(this);
    this.refreshToken = this.refreshToken.bind(this);

    // setInterval(() => this.refreshToken(), 60000);
  }
  login(email: string, password: string): Promise<any> {
    return this.fetch(`/signin`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    }).then(response => {
      if (response.output.payload.statusCode === 201) {
        this.setToken(response.data.token);
        return Promise.resolve(response);
      } else {
        return response;
      }
    });
  }
  signUp = form => {
    return this.fetch(`/send-reg-email`, {
      method: "POST",
      body: JSON.stringify(form)
    }).then(response => {
      return Promise.resolve(response);
    });
  };

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = decode<Decoded>(token);

      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }
  logOut = () => {
    localStorage.removeItem("id_token");
  };

  getRole = (): [] | false => {
    const token = this.getToken();
    if (token !== null) {
      const decodedToken = decode<Decoded>(token);
      return decodedToken.roles;
    } else {
      return false;
    }
  };
  setToken(token: string) {
    localStorage.setItem("id_token", token);
  }
  getToken() {
    return localStorage.getItem("id_token") || "";
  }
  getTokenExpiration(token) {
    if (null !== token) {
      const decoded = decode<Decoded>(token);

      return Math.floor(decoded.exp);
    }
    return 0;
  }
  refreshToken = () => {
    if (!this.loggedIn()) {
      return;
    }
    let now = Date.now() / 1000;
    let expire: number = this.getTokenExpiration(this.getToken());
    let limit = 600;

    if (now >= expire - limit) {
      return this.fetch(`${url}/api/refresh_token`).then(response => {
        if (response.employee.token !== undefined) {
          this.setToken(response.employee.token);
        }
        return Promise.resolve(response);
      });
    }
  };
  getProfile() {
    return decode(this.getToken());
  }
  send_message_to_sw(type = `replayRequests`) {
    return new Promise(function (resolve, reject) {
      let msg_chan = new MessageChannel();
      msg_chan.port1.onmessage = function (event) {
        if (event.data.error) {
          reject(event.data.error);
        } else {
          resolve(event.data);
        }
      };
      !!navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage(
        {
          data: "Browser established connection after beeing offline",
          type: type,
        },
        [msg_chan.port2],
      );
    });
  };
  fetch(passedUrl, options: any = {}, offline = false) {
    let endpoint = `${url}${passedUrl}`;
    // if (offline) {
    //   endpoint = addSession(endpoint);
    // }
    let headers = new Headers();
    let auth = ``;
    if (this.loggedIn()) {
      auth = `Bearer ${this.getToken()}`;
    }
    headers.append("Authorization", auth);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "multipart/form-data");

    return fetch(endpoint, { headers, ...options }).then(response => {
      if (response.status === 202) {
        const body = JSON.parse(options.body);
        return { data: { employee: { ...body.form } } };
      }
      return response.json();
    });
  }
  checkResponse(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      return response.json().then(data => {
        throw data;
      });
    }
  }
}

export default AuthSingleton;
