import Image from 'next/image'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className='has-background-dark has-text-weight-bold' style={{ height: '100vh' }}>
        <div className='columns'>
          <div className='column is-flex'>
            <Image src='/lol.svg' width={100} height={100} alt='Logo da Empoliga' />
            <h1 className='is-size-1 is-align-self-center ml-6' style={{ textAlign: 'center' }}>
              Sua carreira de pro player começa agora!
            </h1>
          </div>
        </div>
      </div>
    </>
  )
}
