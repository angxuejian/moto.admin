import { PublicAxios } from '@/utils/public-axios'
const $ = new PublicAxios()

export const getUserList = () => {
  return $.get({
    url: 'user/info',
  })
}
