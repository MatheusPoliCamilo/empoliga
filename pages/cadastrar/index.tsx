import Image from 'next/image'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className='has-background-dark has-text-weight-bold' style={{ height: '100vh' }}>
        <Image src='/lol.svg' width={45} height={45} alt='Logo da Empoliga' />
      </div>
    </>
  )
}
