import auth from './modules/auth' // 校验权限

export const directive = app => {
  app.directive('auth', auth)
}
