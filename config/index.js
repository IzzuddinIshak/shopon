import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedProducts: [
      {imageUrl: 'https://torange.biz/photo/1/IMAGE/money-wallets-wallet-credit-cards-1372.jpg', id: 'first', name: 'Wallet A', price: 'RM100'},
      {imageUrl: 'https://c1.staticflickr.com/3/2502/3883618658_6e8f9eddf9.jpg', id: 'second', name: 'Shoe Q', price: 'RM200'}
    ],
    user: null,
    loading: false,
    error: null,
    createdProductKey: ''
  },
  mutations: {
    addProductToCart (state, payload) {
      const id = payload.id
      if (state.user.purchasedProducts.findIndex(product => product.id === id) >= 0) {
        return
      }
      state.user.purchasedProducts.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    removeProductFromCart (state, payload) {
      const purchasedProducts = state.user.purchasedProducts
      purchasedProducts.splice (purchasedProducts.findIndex(product => product.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setLoadedProduct (state, payload) {
      state.loadedProducts = payload
    },
    addNewProduct (state, payload) {
      state.loadedProducts.push(payload)
    },
    updateProduct (state, payload) {
      const product = state.loadedProducts.find(product => {
        return product.id === payload.id
      })
      if (payload.name) {
        product.name = payload.name
      }
      if (payload.price) {
        product.price = payload.price
      }
      if (payload.description) {
        product.description = payload.description
      }
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    setCreatedProductKey (state, payload) {
      state.createdProductKey = payload
    }
  },
  actions: {

    addProductToCart ({commit, getters}, payload) {
      commit ('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/shopping/')
      .push(payload)
      .then(data => {
        commit('setLoading', false)
        commit('addProductToCart', {id: payload, fbKey: data.key})
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },

    removeProductFromCart ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/shopping/').child(fbKey)
      .remove()
      .then(() => {
        commit('setLoading', false)
        commit('removeProductFromCart', payload)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },

    loadProduct ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('products').once('value')
      .then((data) => {
        const products = []
        const obj = data.val()
        for (let key in obj) {
          products.push({
            id: key,
            name: obj[key].name,
            description: obj[key].description,
            price: obj[key].price,
            imageUrl: obj[key].imageUrl,
            creatorId: obj[key].creatorId
          })
        }
        commit('setLoading', false)
        commit('setLoadedProduct', products)
      })
      .catch(
        (error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },

    addNewProduct ({commit, getters}, payload) {
      const product = {
        name: payload.name,
        price: payload.price,
        description: payload.description,
        creatorId: getters.user.id
      }

      let imageUrl
      let key

      firebase.database().ref('products').push(product)
      .then((data) => {
        return data.key
      })
      .then(key => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        commit('setCreatedProductKey', key)
        return firebase.storage().ref('products/' + key + ext).put(payload.image)
      })
      .then (fileData => {
        let fullPath = fileData.metadata.fullPath
        return firebase.storage().ref(fullPath).getDownloadURL()
      })
      .then(URL => {
        imageUrl = URL
        key = getters.createdProductKey
        return firebase.database().ref('products').child(key).update({imageUrl: imageUrl})
      })
      .then(() => {
        commit('addNewProduct', {
          ...product,
          imageUrl: imageUrl,
          id: key
        })
      })
      .catch((error) => {
        console.log(error)
      })

      // reach out to Firebase and store it

    },

    updateProductData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.name) {
        updateObj.name = payload.name
      }
      if (payload.price) {
        updateObj.price = payload.price
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      firebase.database().ref('products').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
        commit('updateProduct', payload)
      })
      .catch (error => {
        console.log(error)
        commit('setLoading', false)
      })
    },

    signUserup ({commit}, payload) {
      commit ('setLoading', true)
      commit ('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then (
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            purchasedProducts: [],
            fbKeys: {}
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },

    signUserin ({commit}, payload) {
      commit ('setLoading', true)
      commit ('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then (
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            purchasedProducts: [],
            fbKeys: {}
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },

    autoSignIn ({commit}, payload) {
      commit ('setUser', {
        id: payload.uid,
        purchasedProducts: [],
        fbKeys: {}
      })
    },

    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/shopping/').once('value')
      .then(data => {
        const dataPairs = data.val()
        let purchasedProducts = []
        let swappedPairs = {}
        for (let key in dataPairs) {
          purchasedProducts.push(dataPairs[key])
          swappedPairs[dataPairs[key]] = key
        }
        const updatedUser = {
          id: getters.user.id,
          purchasedProducts: purchasedProducts,
          fbKeys: swappedPairs
        }
        commit('setLoading', false)
        commit('setUser', updatedUser)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },

    logout ({commit}) {
      firebase.auth().signOut()
      commit ('setUser', null)
    },
    
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    // for view all products
    loadedProducts (state) {
      return state.loadedProducts.sort((productA, productB) => {
        return productA.price > productB.price
      })
    },
    featuredProducts (state, getters) {
      return getters.loadedProducts.slice(0, 5)
    },

    // for view detail of selected product
    loadedProduct (state) {
      return (productId) => {
        return state.loadedProducts.find((product) => {
          return product.id === productId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    createdProductKey (state) {
      return state.createdProductKey
    }
  }
})
