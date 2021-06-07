import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Informe o nome'],
  },
  gender: {
    type: String,
    enum: ['M', 'F', 'O'],
    required: [true, 'Informe o gênero'],
  },
  birthDate: {
    type: Date,
    required: [true, 'Informe a data de nascimento'],
  },
  email: {
    type: String,
    required: [true, 'Informe um e-mail'],
    unique: [true, 'Esse e-mail já está cadastrado'],
  },
  whatsapp: {
    type: String,
    unique: [true, 'Esse número já está cadastrado'],
    required: [true, 'Informe um número'],
    select: false,
  },
  twitter: {
    type: String,
  },
  twitch: {
    type: String,
  },
  instagram: {
    type: String,
  },
  facebook: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Informe uma senha'],
    select: false,
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
  ],
  teamInvites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
  ],
})

interface UserInterface extends mongoose.Document {
  password: {
    type: String
  }
}

userSchema.pre<UserInterface>('save', async function () {
  const user = this

  if (user.isModified('password')) {
    this.password = await bcryptjs.hash(user.password, 8)
  }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export { User }
