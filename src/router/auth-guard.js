import { store } from '../store'

// direct user to sign-in page if not authenticated yet
export default (to, from, next) => {
  if (store.getters.user) {
    next()
  } else {
    next('/signin')
  }
}
