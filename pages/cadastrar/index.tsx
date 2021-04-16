import Image from 'next/image'
import { useState } from 'react'

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({ genre: 'M' })
  const [step, setStep] = useState('firstStep')

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

            <button className='button is-large is-primary ml-5' onClick={() => console.log(user)}>
              Continuar
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
              onClick={() => setUser({ ...user, genre: 'M' })}
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
              onClick={() => setUser({ ...user, genre: 'F' })}
            />
            Feminino
          </label>

          <label htmlFor='other' className='radio ml-3'>
            <input
              id='other'
              type='radio'
              name='gender'
              className='mr-1'
              onClick={() => setUser({ ...user, genre: 'O' })}
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
        className='is-size-2 is-align-self-center title has-text-white is-size-3-mobile ml-4 mr-4 mb-5'
        style={{ textAlign: 'center' }}
      >
        Quando você nasceu?
      </h1>

      <div className='has-text-centered mt-6 is-flex is-justify-content-center'>
        <div className='select is-primary mr-3'>
          <select onChange={() => console.log('Alterou dia')}>
            {[...Array(31).keys()].map((day) => (
              <option key={day}>{day + 1}</option>
            ))}
          </select>
        </div>

        <div className='select is-primary mr-3'>
          <select onChange={() => console.log('Alterou mês')}>
            {[...Array(12).keys()].map((month) => (
              <option key={month}>{month + 1}</option>
            ))}
          </select>
        </div>

        <div className='select is-primary'>
          <select onChange={(e) => console.log(e)}>{yearOptions.map((year) => year)}</select>
        </div>
      </div>
    </>
  )
}
