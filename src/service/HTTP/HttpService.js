import RequestConfig from './RequestConfig'

export const RESPONSE_TYPE = {
  json: 'json',
  blob: 'blob',
  text: 'text',
  arrayBuffer: 'arrayBuffer'
}

class HttpService {
  #methods = null;
  #config = null;

  constructor() {
    this.#config = new RequestConfig();
    this.#methods = {
      post: 'POST',
      get: 'GET'
    }
  }

  #setConfig(config) {
    if (null !== config) {
      if (!(config instanceof RequestConfig)) {
        throw new Error('Config must be instance of RequestConfig')
      }
      this.#config = config;
    }
  }

  async #request(method, uri, data = null, config = null) {

    this.#setConfig(config);
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }

    if (null !== data) {
      options.body = JSON.stringify(data);
    }

    const url = this.#config.baseUrl + uri;

      const response = await fetch(url, options);
      return await this.#parseResponse(response)
  }

  async get(uri, config) {
    return this.#request(this.#methods.get, uri, null, config)
  }

  async post(uri, data, config) {
    return this.#request(this.#methods.post, uri, data, config)
  }

  async #parseResponse(response) {
    if (response.status === 200) {
      switch (this.#config.responseType) {
        case RESPONSE_TYPE.json:
          return await response.json();

        case RESPONSE_TYPE.text:
          return await response.text();

        case RESPONSE_TYPE.arrayBuffer:
          return await response.arrayBuffer();

        case RESPONSE_TYPE.blob:
          return await response.blob();
      }
    }

    if (response.status === 400) {
      let error_string = ''
      let errors = new Map()
      const data = await response.json();
      data.details.violations.forEach(
        error => {
          errors.set(error.property_path, error.message);
          error_string += error.message + "<br>"
        })
      return errors
      throw new Error(error_string)
    }

    if (response.status === 401) {
      throw new Error('Unauthorized Request')
    }

    if (response.status === 404) {
      throw new Error('Not Found')
    }

    if (response.status === 500) {
      throw new Error('Internal server error')
    }

    throw new Error('Undefined status code')

  }
}

const httpService = new HttpService()
export default httpService;
