import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  role: {
    index: true,
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
})

const Player = mongoose.models.Player || mongoose.model('Player', playerSchema)

export { Player }
