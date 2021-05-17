import mongoose from 'mongoose'

const leagueAccountSchema = new mongoose.Schema({
  nickname: {
    type: String,
  },
  summonerId: {
    type: String,
  },
  accountId: {
    type: String,
  },
  puuid: {
    type: String,
  },
  tier: {
    type: String,
  },
  rank: {
    type: String,
  },
  wins: {
    type: Number,
  },
  losses: {
    type: Number,
  },
  leaguePoints: {
    type: Number,
  },
})

const LeagueAccount = mongoose.models.LeagueAccount || mongoose.model('LeagueAccount', leagueAccountSchema)

export { LeagueAccount }
