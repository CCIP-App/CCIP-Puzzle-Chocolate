import axios from 'axios'
import config from '../../config/project.json'

const defaults = {
  baseURL: config.API_URL
}

Object.assign(axios.defaults, defaults)

export default axios
