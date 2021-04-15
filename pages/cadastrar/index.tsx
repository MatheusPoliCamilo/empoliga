import Image from 'next/image'

export default function MyApp({ Component, pageProps }) {
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
        <input className='input is-large' type='text' placeholder='Insira o nome completo' style={{ width: '18rem' }} />
      </div>

      <div className='mt-6 mb-6'>
        <progress
          className='progress is-primary is-small'
          value='15'
          max='100'
          style={{ margin: 'auto', maxWidth: '18rem' }}
        >
          15%
        </progress>
      </div>

      <div className='has-text-centered'>
        <button className='button is-large is-primary'>Continuar</button>
      </div>
    </div>
  )
}
