import axios from './http.js'
import qs from 'qs'

axios.interceptors.response.use((response) => response, (error) => {
  const { response: { status } } = error
  switch (status / 100) {
    case 5: // 5xx error
      error.response.data = { message: 'Internal Server Error' }
      break
    default:
      break
  }

  return Promise.reject(error)
})

export default {
  booth: {
    getSlugByToken: async (token) => {
      const { data: { slug } } = await axios.get('/event/puzzle/deliverer', {
        params: {
          token: token
        }
      })

      return slug
    },
    sendReward2Player: async (boothToken, playerToken) => {
      const { data } = await axios.post(`/event/puzzle/deliver?token=${boothToken}`, qs.stringify({ receiver: playerToken }))

      return data
    }
  },
  player: {
    // playerPubToken is mean sha1(playerToken)
    getUserStamps: async (playerPubToken) => {
      const res = await axios.get('/event/puzzle', {
        params: {
          token: playerPubToken
        }
      })
      return res.data
    }
  }
}
