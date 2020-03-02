import { User } from 'src/@types/user'

export const transformData = (user: User) => {
  return {
    ...user,
    code: '0' + user.code
  }
}
