import axios from './http.js'
import qs from 'qs'

export default {
  booth: {
    getSlugByToken: async (token) => {
      const res = await axios.get('/event/puzzle/deliverer', {
        params: token
      })
      return res.data.slug
    },
    sendReward2Player: async (boothToken, playerToken) => {
      const res = await axios.post(`/event/puzzle/deliver?token=${boothToken}`, qs.stringify({ receiver: playerToken }))

      return res.data.slug
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
