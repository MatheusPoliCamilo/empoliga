import { useEffect } from 'react'
import Image from 'next/image'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.querySelector('html').classList.add('has-background-dark')
  })

  return (
    <div className='has-text-weight-bold' style={{ height: '20rem' }}>
      <div className='ml-5 mt-5 is-hidden-touch'>
        <Image src='/tradicional.svg' width={130} height={130} alt='Logo da Empoliga' />
      </div>

      <div className='is-hidden-desktop mt-1 is-flex is-justify-content-center'>
        <Image src='/tradicional.svg' width={100} height={100} alt='Logo da Empoliga' />
      </div>

      <div className='is-hidden-touch is-flex is-justify-content-center'>
        <div className='has-background-white' style={{ height: '44rem', width: '38rem' }} />
      </div>
      <div className='has-background-white mr-2 ml-2 is-hidden-desktop' style={{ height: '30rem' }} />
    </div>
  )
}
