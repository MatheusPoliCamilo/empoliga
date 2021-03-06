import mongoose from 'mongoose'

const teamPlayerSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  firstString: {
    type: Boolean,
  },
})

const TeamPlayer = mongoose.models.TeamPlayer || mongoose.model('TeamPlayer', teamPlayerSchema)

export { TeamPlayer }
