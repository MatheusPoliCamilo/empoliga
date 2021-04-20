import { useEffect } from 'react'
import Image from 'next/image'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.querySelector('html').classList.add('has-background-dark')
  })

  return (
    <div style={{ height: '20rem' }}>
      <div className='ml-5 mt-5 is-hidden-touch grow-on-hover'>
        <a href='/'>
          <Image src='/tradicional.svg' width={80} height={80} alt='Logo da Empoliga' />
        </a>
      </div>

      <div className='is-hidden-touch is-flex is-justify-content-center'>
        <div
          className='has-background-white'
          style={{ height: '37vw', width: '30vw', minWidth: '28rem', minHeight: '35rem' }}
        >
          <div className='is-flex is-justify-content-center'>
            <h1 className='is-size-2 has-text-black has-text-weight-bold mt-6' style={{ textTransform: 'none' }}>
              Iniciar sessão
            </h1>
          </div>

          <form action=''>
            <div className='mb-6 p-6'>
              <input className='input is-large' type='email' placeholder='Digite o e-mail' />
              <input className='input is-large mt-4' type='password' placeholder='Digite a senha' />
            </div>

            <div className='is-flex is-justify-content-center'>
              <button
                className='button is-large is-primary p-6'
                style={{
                  backgroundImage:
                    'url(data:image/svg+xml;charset=utf8;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC4yNzI3IDEwTDAuNSAxMFY4TDE0LjI3MjUgOEw4LjUxMzQ1IDEuNzI0OTZMOS44NjU3OSAwLjI1MTQ2NUwxNy4yMTg5IDguMjYzMzNDMTcuNTkyMyA4LjY3MDIyIDE3LjU5MjMgOS4zMjk5MyAxNy4yMTg5IDkuNzM2ODJMOS44NjU3OSAxNy43NDg3TDguNTEzNDUgMTYuMjc1MkwxNC4yNzI3IDEwWiIgZmlsbD0iI0Y5RjlGOSIvPgo8L3N2Zz4K)',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                  backgroundSize: '2.5rem',
                  borderRadius: '1.7rem',
                }}
              />
            </div>

            <div className='is-flex is-justify-content-center has-text-weight-bold black-hover'>
              <a className='has-text-grey' style={{ marginTop: '2vw', letterSpacing: '0.05rem' }} href='/cadastrar'>
                CRIAR CONTA
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className='is-hidden-desktop mt-1 is-flex is-justify-content-center'>
        <Image src='/tradicional.svg' width={100} height={100} alt='Logo da Empoliga' />
      </div>

      <div className='has-background-white mr-2 ml-2 is-hidden-desktop' style={{ height: '32rem' }}>
        <h1 className='is-size-1'>Iniciar sessão</h1>
      </div>
    </div>
  )
}
