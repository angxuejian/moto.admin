import { PublicAxios } from '@/utils/PublicAxios'
const $ = new PublicAxios()

export const getUserList = () => {
  return $.get({
    url: 'user/info',
  })
}
