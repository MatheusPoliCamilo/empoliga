import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  role: {
    enum: ['Top', 'Jungle', 'Mid', 'Adc', 'Support'],
  },
  availability: {
    type: String,
  },
  address: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  setupPhoto: {
    type: String,
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

interface PlayerInterface extends mongoose.Document {
  city: String
  state: String
  role: String
  availability: String
  address: String
  profilePicture: String
  setupPhoto: String
  rg: String
  cpf: String
  valid: Boolean
}

playerSchema.pre<PlayerInterface>('save', async function () {
  const player = this

  if (
    player.city &&
    player.state &&
    player.role &&
    player.availability &&
    player.address &&
    player.profilePicture &&
    player.setupPhoto &&
    player.rg &&
    player.cpf
  ) {
    this.valid = true
  }
})

const Player = mongoose.models.Player || mongoose.model('Player', playerSchema)

export { Player }
