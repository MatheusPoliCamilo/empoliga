import { Schema } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Informe o nome']
  },
  genre: {
    type: String,
    enum: ['M', 'F', 'O'],
    required: [true, 'Informe o gênero']
  },
  birthDate: {
    type: Date,
    required: [true, 'Informe a data de nascimento']
  },
  email: {
    type: String,
    unique: true
  },
  whatsapp: {
    type: String,
    unique: true,
    validate: {
      validator: function (number) {
        return /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/.test(number)
      },
      message: props => `${props.value} não é um telefone válido`
    }
  },
  twitter: {
    type: String,
    unique: true
  },
  twitch: {
    type: String,
    unique: true
  },
  instagram: {
    type: String,
    unique: true
  },
  facebook: {
    type: String,
    unique: true
  },
  nickname: {
    type: String,
    unique: true
  },
  role: {
    type: String,
    index: true,
    enum: ['Top', 'Jungle', 'Mid', 'Adc', 'Support']
  }
})

export { userSchema }
