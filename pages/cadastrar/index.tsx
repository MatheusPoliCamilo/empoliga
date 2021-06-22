import Image from 'next/image'
import { useState, useEffect } from 'react'
import MaskedInput from 'react-text-mask'
import Cookie from 'js-cookie'
import { addDays } from 'date-fns'
import * as yup from 'yup'

function onPasswordConfirmationChange(event, user, setUser) {
  const passwordConfirmation = event.target.value
  const password = (document.querySelector('#password') as HTMLInputElement).value
  const button = document.querySelector('#create-account') as HTMLButtonElement
  const errorMessage = document.querySelector('#error-message') as HTMLParagraphElement

  if (passwordConfirmation !== password) {
    errorMessage.textContent = 'As senhas não coincidem'
    errorMessage.classList.remove('is-hidden')
    document.querySelector('#password-confirmation').classList.remove('is-primary')
    document.querySelector('#password-confirmation').classList.add('is-danger')
    button.disabled = true
  } else {
    errorMessage.classList.add('is-hidden')
    document.querySelector('#password-confirmation').classList.remove('is-danger')
    document.querySelector('#password-confirmation').classList.add('is-primary')
    button.disabled = false
    setUser({ ...user, password: password })
  }
}

function onPasswordChange(event) {
  const password = event.target.value
  const passwordConfirmation = (document.querySelector('#password-confirmation') as HTMLInputElement).value
  const button = document.querySelector('#create-account') as HTMLButtonElement
  const errorMessage = document.querySelector('#error-message') as HTMLParagraphElement

  if (password && passwordConfirmation !== password) {
    errorMessage.textContent = 'As senhas não coincidem'
    errorMessage.classList.remove('is-hidden')
    document.querySelector('#password-confirmation').classList.remove('is-primary')
    document.querySelector('#password-confirmation').classList.add('is-danger')
    button.disabled = true
  } else {
    errorMessage.classList.add('is-hidden')
    document.querySelector('#password-confirmation').classList.remove('is-danger')
    document.querySelector('#password-confirmation').classList.add('is-primary')
    button.disabled = false
  }
}

function handleSubmit(event, user) {
  event.preventDefault()
  const button = document.querySelector('#create-account') as HTMLButtonElement
  const buttonBack = document.querySelector('#backFifthStep') as HTMLButtonElement
  const errorMessage = document.querySelector('#error-message') as HTMLParagraphElement

  button.classList.add('is-loading')
  buttonBack.disabled = true

  errorMessage.classList.add('is-hidden')
  errorMessage.textContent = 'As senhas não coincidem'

  const schema = yup.object().shape({
    password: yup.string().required('Informe a senha').min(8, 'A senha precisa de no mínimo 8 caracteres'),
  })

  schema
    .validate({ password: user.password })
    .then(() => {
      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          button.classList.remove('is-loading')
          buttonBack.disabled = false

          console.log('Data:', data)
          if (data.name === 'MongoError' || data.errors || Object.keys(data).length === 0) {
            console.log('Errors:', data.errors)

            if (data?.keyValue?.email) {
              errorMessage.textContent = 'Erro: E-mail já cadastrado!'
              errorMessage.classList.remove('is-hidden')
            }
          } else {
            Cookie.set('token', data.token, { expires: addDays(new Date(), 1) })
            Cookie.set('currentUser', data.user, { expires: addDays(new Date(), 1) })
            window.location.href = '/'
          }
        })
        .catch((error) => {
          button.classList.remove('is-loading')
          buttonBack.disabled = false

          errorMessage.textContent = error
          errorMessage.classList.remove('is-hidden')

          console.error('Error:', error)
        })
    })
    .catch((error) => {
      errorMessage.textContent = (error.errors && error.errors[0]) || error
      errorMessage.classList.remove('is-hidden')
      button.classList.remove('is-loading')
    })
}

function FirstStep(user, setUser) {
  return (
    <>
      <h1
        className='is-size-1 is-align-self-center title has-text-white is-size-3-mobile ml-4 mr-4'
        style={{ textAlign: 'center', letterSpacing: '0.25rem' }}
      >
        Sua carreira de pro player começa agora!
      </h1>

      <div className='mb-5 is-hidden-tablet' />
      <div className='mb-6 is-hidden-mobile' />

      <h2 className='is-subtitle is-size-3 is-size-5-mobile has-text-white has-text-centered has-text-primary ml-3 mr-3'>
        Primeiro, informe seu nome completo.
      </h2>

      <div className='mb-5 is-hidden-tablet' />
      <div className='mb-6 is-hidden-mobile' />

      <div className='has-text-centered'>
        <input
          className='input is-large is-primary'
          type='text'
          placeholder='Insira seu nome completo'
          style={{ width: '21rem' }}
          onChange={(event) => setUser({ ...user, name: event.target.value })}
          autoFocus
          value={user.name}
        />
      </div>

      <div className='is-flex is-justify-content-center mt-5 is-hidden' id='name-error'>
        <article className='message is-danger is-flex' style={{ width: '21rem' }}>
          <div className='message-body' style={{ textTransform: 'none', fontWeight: 400 }} />
        </article>
      </div>
    </>
  )
}

function SecondStep(user, setUser) {
  return (
    <>
      <h1
        className='is-size-1 is-align-self-center title has-text-white is-size-2-mobile ml-4 mr-4 mb-5'
        style={{ textAlign: 'center' }}
      >
        Qual o seu gênero?
      </h1>

      <div className='mt-6' />

      <div className='has-text-centered is-flex is-justify-content-center'>
        <div className='control' style={{ color: '#bf9d6b' }}>
          <label htmlFor='male' className='radio'>
            <input
              id='male'
              type='radio'
              name='gender'
              className='mr-1'
              onClick={() => setUser({ ...user, gender: 'M' })}
              defaultChecked={user.gender === 'M'}
            />
            Masculino
          </label>

          <label htmlFor='female' className='radio ml-3'>
            <input
              id='female'
              type='radio'
              name='gender'
              className='mr-1'
              onClick={() => setUser({ ...user, gender: 'F' })}
              defaultChecked={user.gender === 'F'}
            />
            Feminino
          </label>

          <label htmlFor='other' className='radio ml-3'>
            <input
              id='other'
              type='radio'
              name='gender'
              className='mr-1'
              onClick={() => setUser({ ...user, gender: 'O' })}
              defaultChecked={user.gender === 'O'}
            />
            Outro
          </label>
        </div>
      </div>

      <div className='is-flex is-justify-content-center mt-5 is-hidden' id='gender-error'>
        <article className='message is-danger is-flex' style={{ width: '21rem' }}>
          <div className='message-body' style={{ textTransform: 'none', fontWeight: 400 }} />
        </article>
      </div>
    </>
  )
}

function ThirdStep(date, setDate) {
  const minYear = new Date().getFullYear() - 12
  const maxYear = new Date().getFullYear() - 100
  const yearOptions = []

  for (let year = minYear; year > maxYear; year--) {
    yearOptions.push(
      <option value={year} key={year}>
        {year}
      </option>
    )
  }

  return (
    <>
      <h1
        className='is-size-1 is-align-self-center title has-text-white is-size-2-mobile ml-4 mr-4 mb-5'
        style={{ textAlign: 'center' }}
      >
        Quando você nasceu?
      </h1>

      <div className='has-text-centered mt-6 is-flex is-justify-content-center'>
        <div className='select is-primary mr-3'>
          <select
            onClick={(event) => {
              setDate({ ...date, day: (event.target as HTMLOptionElement).value })
            }}
            defaultValue={date.day}
          >
            {[...Array(31)].map((_, day) => (
              <option key={day}>{day + 1}</option>
            ))}
          </select>
        </div>

        <div className='select is-primary mr-3'>
          <select
            onClick={(event) => {
              setDate({ ...date, month: (event.target as HTMLOptionElement).value })
            }}
            defaultValue={date.month}
          >
            {[...Array(12)].map((_, month) => (
              <option key={month}>{month + 1}</option>
            ))}
          </select>
        </div>

        <div className='select is-primary'>
          <select
            onClick={(event) => {
              setDate({ ...date, year: (event.target as HTMLOptionElement).value })
            }}
            defaultValue={date.year}
          >
            {yearOptions.map((year) => year)}
          </select>
        </div>
      </div>

      <div className='is-flex is-justify-content-center mt-5 is-hidden' id='date-error'>
        <article className='message is-danger is-flex' style={{ width: '21rem' }}>
          <div className='message-body' style={{ textTransform: 'none', fontWeight: 400 }} />
        </article>
      </div>
    </>
  )
}

function FourthStep(user, setUser) {
  return (
    <>
      <h1
        className='is-size-1 is-align-self-center title has-text-white is-size-2-mobile ml-4 mr-4 mb-6'
        style={{ textAlign: 'center' }}
      >
        Qual é o seu telefone?
      </h1>

      <div style={{ maxWidth: '18rem', margin: 'auto' }}>
        <MaskedInput
          mask={(value) => {
            if (value.replace(/\D/g, '').length > 10) {
              return ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
            } else {
              return ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
            }
          }}
          className='input is-large is-primary'
          placeholder='Insira seu telefone'
          onChange={(event) => {
            const whatsapp = event.target.value.replace(/\D/g, '')

            setUser({ ...user, whatsapp })
          }}
          autoFocus
          type='tel'
          value={user.whatsapp}
        />
      </div>
    </>
  )
}

function FifthStep(user, setUser) {
  return (
    <>
      <h1
        className='is-size-1 is-align-self-center title has-text-white is-size-2-mobile ml-4 mr-4 mb-6'
        style={{ textAlign: 'center' }}
      >
        Qual é o seu email?
      </h1>

      <div className='has-text-centered'>
        <input
          className='input is-large is-primary'
          type='email'
          placeholder='Insira seu e-mail'
          style={{ width: '18rem' }}
          onChange={(event) => setUser({ ...user, email: event.target.value })}
          autoFocus
          value={user.email}
        />
      </div>

      <div className='is-flex is-justify-content-center mt-5 is-hidden' id='email-error'>
        <article className='message is-danger is-flex' style={{ width: '18rem' }}>
          <div className='message-body' style={{ textTransform: 'none', fontWeight: 400 }} />
        </article>
      </div>
    </>
  )
}

function SixthStep(user, setUser) {
  return (
    <>
      <h1
        className='is-size-1 is-align-self-center title has-text-white is-size-2-mobile ml-4 mr-4 mb-6'
        style={{ textAlign: 'center' }}
      >
        Qual será sua senha?
      </h1>

      <div className='has-text-centered'>
        <div className='field'>
          <input
            className='input is-large is-primary'
            type='password'
            placeholder='Insira sua senha'
            style={{ width: '18rem' }}
            id='password'
            onChange={(event) => onPasswordChange(event)}
            autoFocus
            autoComplete='new-password'
          />
        </div>

        <div className='field'>
          <input
            className='input is-large is-primary mt-2'
            type='password'
            placeholder='Confirme a senha'
            style={{ width: '18rem' }}
            id='password-confirmation'
            onChange={(event) => onPasswordConfirmationChange(event, user, setUser)}
            autoComplete='new-password'
          />
        </div>
        <p className='mt-1 has-text-danger is-hidden' id='error-message'>
          As senhas não coincidem
        </p>
      </div>
    </>
  )
}

export default function MyApp({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState({ gender: 'M', birthDate: '', name: '', email: '' })
  const [step, setStep] = useState('firstStep')
  const [date, setDate] = useState({})

  useEffect(() => {
    document.querySelector('html').classList.add('has-background-dark')
    // document.querySelector('html').style.backgroundImage = 'url("/map.png")'
  })

  return (
    <div className='has-text-weight-bold' style={{ minHeight: '100vh' }}>
      {/* <div
        style={{
          backgroundImage: 'url("/map.png")',
          position: 'fixed',
          left: -10,
          right: 0,
          top: -10,
          zIndex: -1,
          display: 'block',
          width: '200%',
          height: '200%',
          filter: 'blur(5px)',
        }}
      /> */}

      <div className='pt-4 is-hidden-tablet' />
      <div className='pt-6 is-hidden-mobile' />

      <div className='has-text-centered'>
        <a href='/' className='pt-1 grow-on-hover'>
          <Image src='/tradicional.svg' width={150} height={150} alt='Logo da Empoliga' />
        </a>
      </div>

      <div className='pb-4 is-hidden-tablet' />
      <div className='pb-6 is-hidden-mobile' />

      <form onSubmit={(event) => handleSubmit(event, currentUser)}>
        {step === 'firstStep' && FirstStep(currentUser, setCurrentUser)}
        {step === 'secondStep' && SecondStep(currentUser, setCurrentUser)}
        {step === 'thirdStep' && ThirdStep(date, setDate)}
        {/* {step === 'fourthStep' && FourthStep(currentUser, setCurrentUser)} */}
        {step === 'fifthStep' && FifthStep(currentUser, setCurrentUser)}
        {step === 'sixthStep' && SixthStep(currentUser, setCurrentUser)}

        <div className='mt-6 mb-6'>
          {step === 'firstStep' && (
            <progress
              className='progress is-primary is-small'
              // value='16.7'
              value='20'
              max='100'
              style={{ margin: 'auto', maxWidth: '18rem' }}
            >
              {/* 16.7% */}
              20%
            </progress>
          )}

          {step === 'secondStep' && (
            <progress
              className='progress is-primary is-small'
              // value='33.4'
              value='40'
              max='100'
              style={{ margin: 'auto', maxWidth: '18rem' }}
            >
              40%
              {/* 33.4% */}
            </progress>
          )}

          {step === 'thirdStep' && (
            <progress
              className='progress is-primary is-small'
              value='60'
              // value='50.1'
              max='100'
              style={{ margin: 'auto', maxWidth: '18rem' }}
            >
              {/* 50.1% */}
              60%
            </progress>
          )}

          {step === 'fourthStep' && (
            <progress
              className='progress is-primary is-small'
              value='66.8'
              max='100'
              style={{ margin: 'auto', maxWidth: '18rem' }}
            >
              66.8%
            </progress>
          )}

          {step === 'fifthStep' && (
            <progress
              className='progress is-primary is-small'
              // value='80'
              value='80'
              max='100'
              style={{ margin: 'auto', maxWidth: '18rem' }}
            >
              80%
              {/* 83.5% */}
            </progress>
          )}

          {step === 'sixthStep' && (
            <progress
              className='progress is-primary is-small'
              value='100'
              max='100'
              style={{ margin: 'auto', maxWidth: '18rem' }}
            >
              100%
            </progress>
          )}
        </div>

        <div className='has-text-centered'>
          {step === 'firstStep' && (
            <button
              className='button is-large is-primary mb-5'
              type='submit'
              onClick={(event) => {
                event.preventDefault()
                const nameError: HTMLDivElement = document.querySelector('#name-error')
                const schema = yup.object().shape({
                  name: yup
                    .string()
                    .required('É necessário informar o nome completo')
                    .min(3, 'Informe seu nome completo'),
                })

                schema
                  .validate({ name: currentUser.name })
                  .then(() => {
                    nameError.classList.add('is-hidden')
                    nameError.querySelector('div').textContent = ''
                    setStep('secondStep')
                  })
                  .catch((error) => {
                    nameError.querySelector('div').textContent = (error.errors && error.errors[0]) || error
                    nameError.classList.remove('is-hidden')
                  })
              }}
            >
              Continuar
            </button>
          )}

          {step === 'secondStep' && (
            <>
              <button
                className='button is-large is-primary is-light'
                type='button'
                onClick={(event) => setStep('firstStep')}
              >
                Voltar
              </button>

              <button
                className='button is-large is-primary ml-5'
                onClick={(event) => {
                  event.preventDefault()
                  const genderError: HTMLDivElement = document.querySelector('#gender-error')
                  const schema = yup.object().shape({
                    gender: yup.string().length(1, 'Gênero inválido').required('Informe seu gênero'),
                  })

                  schema
                    .validate({ gender: currentUser.gender })
                    .then(() => {
                      genderError.classList.add('is-hidden')
                      genderError.querySelector('div').textContent = ''
                      setStep('thirdStep')
                    })
                    .catch((error) => {
                      genderError.querySelector('div').textContent = (error.errors && error.errors[0]) || error
                      genderError.classList.remove('is-hidden')
                    })
                }}
              >
                Continuar
              </button>
            </>
          )}

          {step === 'thirdStep' && (
            <>
              <button
                className='button is-large is-primary is-light'
                type='button'
                onClick={() => setStep('secondStep')}
              >
                Voltar
              </button>

              <button
                className='button is-large is-primary ml-5'
                onClick={(event) => {
                  event.preventDefault()

                  const dateError: HTMLDivElement = document.querySelector('#date-error')
                  const daySelect = document.querySelectorAll('select')[0]
                  const monthSelect = document.querySelectorAll('select')[1]
                  const yearSelect = document.querySelectorAll('select')[2]
                  const day = daySelect.options[daySelect.selectedIndex].value
                  const month = monthSelect.options[monthSelect.selectedIndex].value
                  const year = yearSelect.options[yearSelect.selectedIndex].value

                  if (!day || !month || !year) {
                    dateError.querySelector('div').textContent = 'Informe sua data de nascimento'
                    dateError.classList.remove('is-hidden')
                    return
                  }

                  const date = new Date(`${year}-${month}-${day}`)

                  const schema = yup.object().shape({
                    date: yup.date().required(),
                  })

                  schema
                    .validate({ date })
                    .then((date) => {
                      dateError.classList.add('is-hidden')
                      dateError.querySelector('div').textContent = ''
                      setCurrentUser({ ...currentUser, birthDate: date.date.toISOString() })
                      setStep('fifthStep')
                    })
                    .catch((error) => {
                      dateError.querySelector('div').textContent = (error.errors && error.errors[0]) || error
                      dateError.classList.remove('is-hidden')
                    })
                }}
              >
                Continuar
              </button>
            </>
          )}

          {step === 'fourthStep' && (
            <>
              <button
                className='button is-large is-primary is-light'
                type='button'
                onClick={() => setStep('thirdStep')}
              >
                Voltar
              </button>

              <button className='button is-large is-primary ml-5' onClick={() => setStep('fifthStep')}>
                Continuar
              </button>
            </>
          )}

          {step === 'fifthStep' && (
            <>
              <button
                className='button is-large is-primary is-light'
                type='button'
                onClick={() => setStep('thirdStep')}
              >
                Voltar
              </button>

              <button
                className='button is-large is-primary ml-5'
                onClick={(event) => {
                  event.preventDefault()

                  const emailError: HTMLDivElement = document.querySelector('#email-error')
                  const schema = yup.object().shape({
                    email: yup.string().required('Informe seu email').email('Email inválido'),
                  })

                  schema
                    .validate({ email: currentUser.email })
                    .then(() => {
                      emailError.classList.add('is-hidden')
                      emailError.querySelector('div').textContent = ''
                      setStep('sixthStep')
                    })
                    .catch((error) => {
                      emailError.querySelector('div').textContent = (error.errors && error.errors[0]) || error
                      emailError.classList.remove('is-hidden')
                    })
                }}
              >
                Continuar
              </button>
            </>
          )}

          {step === 'sixthStep' && (
            <>
              <button
                className='button is-large is-primary is-light'
                id='backFifthStep'
                onClick={() => setStep('fifthStep')}
                type='button'
              >
                Voltar
              </button>

              <button
                type='submit'
                className='button is-large is-primary ml-5 has-text-weight-semibold'
                id='create-account'
                disabled
              >
                Criar conta
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  )
}
