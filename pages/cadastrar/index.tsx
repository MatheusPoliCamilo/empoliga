import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import MaskedInput from 'react-text-mask'
import { CurrentUserContext } from '../../context/state'

function onPasswordConfirmationChange(event, user, setUser) {
  const passwordConfirmation = event.target.value
  const password = (document.querySelector('#password') as HTMLInputElement).value
  const button = document.querySelector('#create-account') as HTMLButtonElement

  if (passwordConfirmation !== password) {
    document.querySelector('#error-message').classList.remove('is-hidden')
    document.querySelector('#password-confirmation').classList.remove('is-primary')
    document.querySelector('#password-confirmation').classList.add('is-danger')
    button.disabled = true
  } else {
    document.querySelector('#error-message').classList.add('is-hidden')
    document.querySelector('#password-confirmation').classList.remove('is-danger')
    document.querySelector('#password-confirmation').classList.add('is-primary')
    button.disabled = false
    setUser({ ...user, password: password })
  }
}

function onPasswordChange(event) {
  const password = event.target.value
  const passwordConfirmation = (document.querySelector('#password-confirmation') as HTMLInputElement).value

  if (passwordConfirmation !== password) {
    document.querySelector('#error-message').classList.remove('is-hidden')
    document.querySelector('#password-confirmation').classList.remove('is-primary')
    document.querySelector('#password-confirmation').classList.add('is-danger')
  } else {
    document.querySelector('#error-message').classList.add('is-hidden')
    document.querySelector('#password-confirmation').classList.remove('is-danger')
    document.querySelector('#password-confirmation').classList.add('is-primary')
  }
}

function handleSubmit(event, user, setUser) {
  const button = document.querySelector('#create-account') as HTMLButtonElement
  const buttonBack = document.querySelector('#backFifthStep') as HTMLButtonElement

  button.classList.add('is-loading')
  buttonBack.disabled = true

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

      if (data.errors) {
        console.log('Errors:', data.errors)
      } else if (Object.keys(data).length === 0) {
        console.log('Error:', data.errors)
      } else {
        setUser(data)
        window.location.href = '/'
      }
    })
    .catch((error) => {
      button.classList.remove('is-loading')
      buttonBack.disabled = false

      console.error('Error:', error)
    })

  event.preventDefault()
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
          placeholder='Insira o nome completo'
          style={{ width: '21rem' }}
          onChange={(event) => setUser({ ...user, name: event.target.value })}
          autoFocus
        />
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
        <div className='control'>
          <label htmlFor='male' className='radio'>
            <input
              id='m'
              type='radio'
              name='gender'
              className='mr-1'
              onClick={() => setUser({ ...user, gender: 'M' })}
              defaultChecked
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
            />
            Outro
          </label>
        </div>
      </div>
    </>
  )
}

function ThirdStep(user, setUser) {
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
          <select>
            {[...Array(31)].map((_, day) => (
              <option key={day}>{day + 1}</option>
            ))}
          </select>
        </div>

        <div className='select is-primary mr-3'>
          <select>
            {[...Array(12)].map((_, month) => (
              <option key={month}>{month + 1}</option>
            ))}
          </select>
        </div>

        <div className='select is-primary'>
          <select>{yearOptions.map((year) => year)}</select>
        </div>
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
        Qual é o seu email?
      </h1>

      <div className='has-text-centered'>
        <input
          className='input is-large is-primary'
          type='email'
          placeholder='Insira o e-mail'
          style={{ width: '18rem' }}
          onChange={(event) => setUser({ ...user, email: event.target.value })}
          autoFocus
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
        Qual é o seu número?
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
          placeholder='Insira o número'
          onChange={(event) => {
            const whatsapp = event.target.value.replace(/\D/g, '')

            setUser({ ...user, whatsapp })
          }}
          autoFocus
        />
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
            placeholder='Insira a senha'
            style={{ width: '18rem' }}
            id='password'
            onChange={(event) => onPasswordChange(event)}
            autoFocus
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
  const [currentUser, setCurrentUser] = useState({ gender: 'M', birthDate: '' })
  const [step, setStep] = useState('firstStep')
  const { setUser } = useContext(CurrentUserContext)

  useEffect(() => {
    document.querySelector('html').classList.add('has-background-dark')
    // document.querySelector('html').style.backgroundImage = 'url("/map.png")'
  })

  return (
    <div className='has-text-weight-bold' style={{ height: '100vh' }}>
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

      <form onSubmit={(event) => handleSubmit(event, currentUser, setUser)}>
        {step === 'firstStep' && FirstStep(currentUser, setCurrentUser)}
        {step === 'secondStep' && SecondStep(currentUser, setCurrentUser)}
        {step === 'thirdStep' && ThirdStep(currentUser, setCurrentUser)}
        {step === 'fourthStep' && FourthStep(currentUser, setCurrentUser)}
        {step === 'fifthStep' && FifthStep(currentUser, setCurrentUser)}
        {step === 'sixthStep' && SixthStep(currentUser, setCurrentUser)}

        <div className='mt-6 mb-6'>
          {step === 'firstStep' && (
            <progress
              className='progress is-primary is-small'
              value='16.7'
              max='100'
              style={{ margin: 'auto', maxWidth: '18rem' }}
            >
              16.7%
            </progress>
          )}

          {step === 'secondStep' && (
            <progress
              className='progress is-primary is-small'
              value='33.4'
              max='100'
              style={{ margin: 'auto', maxWidth: '18rem' }}
            >
              33.4%
            </progress>
          )}

          {step === 'thirdStep' && (
            <progress
              className='progress is-primary is-small'
              value='50.1'
              max='100'
              style={{ margin: 'auto', maxWidth: '18rem' }}
            >
              50.1%
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
              value='83.5'
              max='100'
              style={{ margin: 'auto', maxWidth: '18rem' }}
            >
              83.5%
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
            <button className='button is-large is-primary' type='submit' onClick={() => setStep('secondStep')}>
              Continuar
            </button>
          )}

          {step === 'secondStep' && (
            <>
              <button
                className='button is-large is-primary is-light'
                type='button'
                onClick={() => setStep('firstStep')}
              >
                Voltar
              </button>

              <button className='button is-large is-primary ml-5' onClick={() => setStep('thirdStep')}>
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
                onClick={() => {
                  const daySelect = document.querySelectorAll('select')[0]
                  const monthSelect = document.querySelectorAll('select')[1]
                  const yearSelect = document.querySelectorAll('select')[2]

                  const day = daySelect.options[daySelect.selectedIndex].value
                  const month = monthSelect.options[monthSelect.selectedIndex].value
                  const year = yearSelect.options[yearSelect.selectedIndex].value

                  setCurrentUser({ ...currentUser, birthDate: new Date(`${year}-${month}-${day}`).toISOString() })
                  setStep('fourthStep')
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
                onClick={() => setStep('fourthStep')}
              >
                Voltar
              </button>

              <button className='button is-large is-primary ml-5' onClick={() => setStep('sixthStep')}>
                Continuar
              </button>
            </>
          )}

          {step === 'sixthStep' && (
            <>
              <button
                className='button is-large is-primary is-light'
                id='backFifthStep'
                onClick={() => setStep('fourthStep')}
                type='button'
              >
                Voltar
              </button>

              <button className='button is-large is-primary ml-5 has-text-weight-semibold' id='create-account'>
                Criar conta
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  )
}
