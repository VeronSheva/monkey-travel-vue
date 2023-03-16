import {RESPONSE_TYPE} from "./HttpService";

export default class RequestConfig {
  #baseUrl = null
  #responseType = null
  #header = null

  constructor() {
    this.#baseUrl = process.env.VUE_APP_API_URL;
    this.#responseType = RESPONSE_TYPE.json;
    this.#header = {
      'Content-Type': 'application/json;charset=utf-8',
    }
  }

  get baseUrl() {
    return this.#baseUrl;
  }

  set baseUrl(value) {
    this.#baseUrl = value;
  }

  get responseType() {
    return this.#responseType;
  }

  set responseType(value) {
    if (Object.values(RESPONSE_TYPE).includes(value)) {
      this.#responseType = value;
    } else {
      throw new Error('Invalid request type');
    }
  }

  get header() {
    return this.#header;
  }

  set header(value) {
    Object.keys(value).forEach(key => {
      this.#header[key] = value[key]
    })
  }
}

