import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Informe o nome da equipe'],
  },
  acronym: {
    type: String,
    required: [true, 'Informe a sigla da equipe'],
  },
  logo: {
    type: String,
    required: [true, 'Informe a logo da equipe'],
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TeamPlayer',
    },
  ],
})

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema)

export { Team }
