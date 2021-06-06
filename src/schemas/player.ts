import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  role: {
    type: String,
    enum: ['Top', 'Jungle', 'Mid', 'Adc', 'Support'],
  },
  address: {
    type: String,
    select: false,
  },
  profilePicture: {
    type: String,
  },
  setupPhoto: {
    type: String,
    select: false,
  },
  rg: {
    type: String,
  },
  cpf: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  valid: {
    type: Boolean,
  },
  leagueAccounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LeagueAccount',
    },
  ],
})

// interface PlayerInterface extends mongoose.Document {
//   city: String
//   state: String
//   role: String
//   address: String
//   profilePicture: String
//   setupPhoto: String
//   rg: String
//   cpf: String
//   valid: Boolean
// }

// playerSchema.pre<PlayerInterface>('save', async function () {
//   const player = this

//   if (
//     player.city &&
//     player.state &&
//     player.role &&
//     player.address &&
//     player.profilePicture &&
//     player.setupPhoto &&
//     player.rg &&
//     player.cpf
//   ) {
//     this.valid = true
//   }
// })

const Player = mongoose.models.Player || mongoose.model('Player', playerSchema)

export { Player }
