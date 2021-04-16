import Image from 'next/image'
import { Navbar } from '../components/navbar'
import { Footer } from '../components/footer'

export default function Index() {
  return (
    <div className='has-text-weight-bold'>
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
            href='/cadastrar'
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
        <div className='is-flex is-justify-content-center' style={{ paddingTop: '7rem', cursor: 'pointer' }}>
          <div className='grow-on-hover'>
            <Image
              src='/tradicional.svg'
              width={200}
              height={200}
              alt='Logo da Empoliga'
              title='Empoliga Tradicional'
            />
          </div>
        </div>

        <div className='pt-5 is-flex is-justify-content-space-around'>
          <div className='grow-on-hover fix-scale' style={{ cursor: 'pointer' }} title='Empoliga Minor'>
            <Image src='/minor.svg' width={200} height={200} alt='Logo da Empoliga' />
          </div>
          <div className='' style={{ height: '200px', width: '200px' }} />
          <div className='grow-on-hover' style={{ cursor: 'pointer' }}>
            <Image src='/major.svg' width={200} height={200} alt='Logo da Empoliga' title='Empoliga Major' />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
