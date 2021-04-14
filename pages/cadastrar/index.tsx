import Image from 'next/image'
import Stepper from 'react-stepper-horizontal'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className='has-background-dark has-text-weight-bold' style={{ height: '100vh' }}>
        <div className='has-text-centered pb-4 pt-4 is-hidden-tablet'>
          <a href='/' className='pt-1 grow-on-hover'>
            <Image src='/logo.svg' width={120} height={120} alt='Logo da Empoliga' />
          </a>
        </div>

        <div className='has-text-centered pb-5 pt-5 is-hidden-mobile'>
          <a href='/' className='pt-1 grow-on-hover'>
            <Image src='/logo.svg' width={150} height={150} alt='Logo da Empoliga' />
          </a>
        </div>

        <h1
          className='is-size-1 is-align-self-center title has-text-white is-size-3-mobile'
          style={{ textAlign: 'center', letterSpacing: '0.25rem' }}
        >
          Sua carreira de pro player começa agora!
        </h1>

        <h2 className='is-subtitle is-size-3 is-size-5-mobile has-text-white has-text-centered has-text-primary pb-5'>
          Primeiro, informe seu nome completo.
        </h2>

        <div className='has-text-centered'>
          <input
            className='input is-large'
            type='text'
            placeholder='Insira o nome completo'
            style={{ width: '18rem' }}
          />
        </div>

        <div className='pt-4'>
          <Stepper
            steps={[{ title: '1º passo' }, { title: '2º passo' }, { title: '3º passo' }, { title: '4º passo' }]}
            activeStep={0}
            defaultColor='#b27826'
            defaultTitleColor='#b27826'
            activeColor='#ffffff'
            activeTitleColor='#ffffff'
            circleFontSize={0}
            defaultBorderColor='#b27826'
            activeBorderColor='#b27826'
            defaultBorderStyle='solid'
          />
        </div>

        <div className='has-text-centered'>
          <button className='button is-large is-primary mt-5'>Continuar</button>
        </div>
      </div>
    </>
  )
}
