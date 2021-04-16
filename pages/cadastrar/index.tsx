import Image from 'next/image'
import { useState, useEffect } from 'react'
import MaskedInput from 'react-text-mask'

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({ gender: 'M', birthDate: '' })
  const [step, setStep] = useState('firstStep')

  useEffect(() => {
    document.querySelector('html').classList.add('has-background-dark')
  })

  return (
    <div className='has-background-dark has-text-weight-bold' style={{ height: '100vh' }}>
      <div className='has-text-centered pb-5 pt-4 is-hidden-tablet'>
        <a href='/' className='pt-1 grow-on-hover'>
          <Image src='/logo.svg' width={120} height={120} alt='Logo da Empoliga' />
        </a>
      </div>

      <div className='has-text-centered pb-5 pt-5 is-hidden-mobile'>
        <a href='/' className='pt-1 grow-on-hover'>
          <Image src='/logo.svg' width={150} height={150} alt='Logo da Empoliga' />
        </a>
      </div>

      {step === 'firstStep' && FirstStep(user, setUser)}
      {step === 'secondStep' && SecondStep(user, setUser)}
      {step === 'thirdStep' && ThirdStep(user, setUser)}
      {step === 'fourthStep' && FourthStep(user, setUser)}
      {step === 'fifthStep' && FifthStep(user, setUser)}
      {step === 'sixthStep' && SixthStep(user, setUser)}

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
          <button className='button is-large is-primary' onClick={() => setStep('secondStep')}>
            Continuar
          </button>
        )}

        {step === 'secondStep' && (
          <>
            <button className='button is-large is-primary is-light' onClick={() => setStep('firstStep')}>
              Voltar
            </button>

            <button className='button is-large is-primary ml-5' onClick={() => setStep('thirdStep')}>
              Continuar
            </button>
          </>
        )}

        {step === 'thirdStep' && (
          <>
            <button className='button is-large is-primary is-light' onClick={() => setStep('secondStep')}>
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

                setUser({ ...user, birthDate: new Date(`${year}-${month}-${day}`).toISOString() })
                setStep('fourthStep')
              }}
            >
              Continuar
            </button>
          </>
        )}

        {step === 'fourthStep' && (
          <>
            <button className='button is-large is-primary is-light' onClick={() => setStep('thirdStep')}>
              Voltar
            </button>

            <button className='button is-large is-primary ml-5' onClick={() => setStep('fifthStep')}>
              Continuar
            </button>
          </>
        )}

        {step === 'fifthStep' && (
          <>
            <button className='button is-large is-primary is-light' onClick={() => setStep('fourthStep')}>
              Voltar
            </button>

            <button className='button is-large is-primary ml-5' onClick={() => setStep('sixthStep')}>
              Continuar
            </button>
          </>
        )}

        {step === 'sixthStep' && (
          <>
            <button className='button is-large is-primary is-light' onClick={() => setStep('fourthStep')}>
              Voltar
            </button>

            <button
              className='button is-large is-primary ml-5 has-text-weight-semibold'
              id='create-account'
              onClick={() => {
                const button = document.querySelector('#create-account')
                button.classList.add('is-loading')

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
                    console.log('Success:', data)
                    window.location.href = 'https://www.empoliga.games'
                  })
                  .catch((error) => {
                    button.classList.remove('is-loading')
                    console.error('Error:', error)
                  })
              }}
            >
              Criar conta
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function FirstStep(user, setUser) {
  return (
    <>
      <h1
        className='is-size-1 is-align-self-center title has-text-white is-size-3-mobile ml-4 mr-4 mb-5'
        style={{ textAlign: 'center', letterSpacing: '0.25rem' }}
      >
        Sua carreira de pro player começa agora!
      </h1>

      <h2 className='is-subtitle is-size-3 is-size-5-mobile has-text-white has-text-centered has-text-primary pb-5 ml-3 mr-3'>
        Primeiro, informe seu nome completo.
      </h2>

      <div className='has-text-centered'>
        <input
          className='input is-large is-primary'
          type='text'
          placeholder='Insira o nome completo'
          style={{ width: '18rem' }}
          onChange={(event) => setUser({ ...user, name: event.target.value })}
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
        <input
          className='input is-large is-primary'
          type='password'
          placeholder='Insira a senha'
          style={{ width: '18rem' }}
          id='password'
          onChange={(event) => onPasswordChange(event)}
        />
        <input
          className='input is-large is-primary mt-2'
          type='password'
          placeholder='Confirme a senha'
          style={{ width: '18rem' }}
          id='password-confirmation'
          onChange={(event) => onPasswordConfirmationChange(event)}
        />
        <p className='mt-1 has-text-danger is-hidden' id='error-message'>
          As senhas não coincidem
        </p>
      </div>
    </>
  )
}

function onPasswordConfirmationChange(event) {
  const passwordConfirmation = event.target.value
  const password = (document.querySelector('#password') as HTMLInputElement).value

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
