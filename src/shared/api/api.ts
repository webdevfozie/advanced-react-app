import axios from 'axios'
import { LS_USER_KEY } from 'shared/const/localStorage'

export const $api = axios.create({
  baseURL: __API__,
  headers: {
    authorization: localStorage.getItem(LS_USER_KEY) || '',
  },
})
