import axios from './http.js'
import qs from 'qs'

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
