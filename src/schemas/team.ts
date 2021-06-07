import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Informe o nome da equipe'],
  },
  acronym: {
    type: String,
    required: [true, 'Informe a sigla da equipe'],
    maxLength: 4,
    minLength: 2,
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
  invites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema)

export { Team }
