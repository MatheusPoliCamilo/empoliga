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
  },
  twitter: {
    type: String,
    unique: true,
  },
  twitch: {
    type: String,
    unique: true,
  },
  instagram: {
    type: String,
    unique: true,
  },
  facebook: {
    type: String,
    unique: true,
  },
  nickname: [
    {
      type: String,
      unique: true,
      index: true,
    },
  ],
  role: {
    type: String,
    index: true,
    enum: ['Top', 'Jungle', 'Mid', 'Adc', 'Support'],
  },
  password: {
    type: String,
    required: [true, 'Informe uma senha'],
  },
})

userSchema.pre('save', async function () {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 8)
  }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export { User }
