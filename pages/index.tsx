import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { hotjar } from 'react-hotjar'
import { Navbar } from '../components/navbar'

export default function Index() {
  useEffect(() => {
    hotjar.initialize(2333536, 6)
  })

  return (
    <body className='has-text-weight-bold'>
      <Head>
        <title>Empoliga</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        {/* Global site tag (gtag.js) - Google Analytics */}
        <script async src='https://www.googletagmanager.com/gtag/js?id=G-J0356FEWDD' />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-J0356FEWDD');
            `,
          }}
        />
      </Head>

      <Navbar />

      <div className='has-background-black is-hidden-tablet' style={{ paddingTop: '22vw' }} />

      <div className='has-background-black' style={{ height: '40vw', position: 'relative' }}>
        <video
          width={1280}
          autoPlay
          loop
          muted
          style={{
            position: 'absolute',
            top: '63%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <source src='/abertura_empoliga.mp4' type='video/mp4' />
        </video>

        <div
          style={{
            position: 'absolute',
            top: '38vw',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '91vw',
            textAlign: 'center',
          }}
        >
          <h2
            className='subtitle has-text-white is-size-3-desktop'
            style={{
              textShadow: '4px 3px 2px #000000',
            }}
          >
            Entre na Empoliga
          </h2>

          <h1
            className='title has-text-white is-size-1-desktop'
            style={{
              textShadow: '4px 3px 2px #000000',
            }}
          >
            Sinta a experiência de ser pro player
          </h1>

          <a
            className='button is-primary is-medium p-5'
            style={{
              borderRadius: 'unset',
            }}
          >
            <strong>Cadastre-se</strong>
          </a>
        </div>
      </div>

      <div
        className='pt-6'
        style={{
          height: '50rem',
          background: 'repeating-linear-gradient(45deg, transparent 0px 21px, #e8d7be 0px 23px)',
        }}
      >
        <div className='is-flex is-justify-content-center' style={{ paddingTop: '7rem' }}>
          <Image src='/logo.svg' width={230} height={230} alt='Logo da Empoliga' />
        </div>

        <div className='pt-5 is-flex is-justify-content-space-around'>
          <span style={{ height: '6rem', borderRight: '4px solid #b27826' }} />
        </div>

        <div className='pt-5 is-flex is-justify-content-space-around'>
          <div className='grow-on-hover' style={{ cursor: 'pointer' }} title='Empoliga Minor'>
            <Image src='/logo.svg' width={200} height={200} alt='Logo da Empoliga' />
          </div>
          <div className='grow-on-hover' style={{ cursor: 'pointer' }}>
            <Image
              src='/tradicional.svg'
              width={200}
              height={200}
              alt='Logo da Empoliga'
              title='Empoliga Tradicional'
            />
          </div>
          <div className='grow-on-hover' style={{ cursor: 'pointer' }}>
            <Image src='/major.svg' width={200} height={200} alt='Logo da Empoliga' title='Empoliga Major' />
          </div>
        </div>
      </div>
    </body>
  )
}
