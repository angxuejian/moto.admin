import axios from 'axios'

class PublicAxios {
  constructor(type = 'VUE_APP_AXIOS_URL') {
    this.baseurl = process.env[type]

    this.instance = axios.create({
      baseURL: this.baseurl,
    })

    this.instance.interceptors.request.use(this.request, this.reqError)
    this.instance.interceptors.response.use(this.response, this.resError)
  }

  request(req) { return req }

  reqError(err) { console.log('request', err) }

  response(res) {
    if (res.status === 200) return res.data
    else {
      alert('请求失败')
    }
  }

  resError(err) { console.log('response', err) }

  // -
  // ------------------------------------ ------------------------------------
  // ------------------------------------ ------------------------------------
  // ------------------------------------ ------------------------------------
  // ------------------------------------ ------------------------------------
  // -

  // get请求
  async get(params = {}) {
    const { url = '', data = {} } = params
    return await this.instance.get(url, { params: data })
  }

  // post请求
  async post(params = {}) {
    const { url = '', data = {} } = params
    return await this.instance.post(url, data)
  }

  // 上传文件
  async upload(params = {}) {
    const { url = '', file = {} } = params
    const data = new FormData()
    data.append('file', file)

    return await this.instance.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}

export { PublicAxios }
