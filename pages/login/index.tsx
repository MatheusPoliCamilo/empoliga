import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../../styles/login.module.scss'
import Cookie from 'js-cookie'
import { addDays } from 'date-fns'

function handleSubmit(event, userData) {
  event.preventDefault()

  const buttonSubmit = document.querySelector('#submit')
  const buttonSubmitMobile = document.querySelector('#submit-mobile')

  buttonSubmit.classList.remove(styles.btnArrow)
  buttonSubmitMobile.classList.remove(styles.btnArrow)
  buttonSubmit.classList.add('is-loading')
  buttonSubmitMobile.classList.add('is-loading')

  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      buttonSubmit.classList.remove('is-loading')
      buttonSubmitMobile.classList.remove('is-loading')
      buttonSubmit.classList.add(styles.btnArrow)
      buttonSubmitMobile.classList.add(styles.btnArrow)

      return response.json()
    })
    .then((data) => {
      if (data.errors || Object.keys(data).length === 0) {
        console.log('Errors:', data.errors)
      } else {
        Cookie.set('token', data.token, { expires: addDays(new Date(), 1) })
        Cookie.set('currentUser', data.user, { expires: addDays(new Date(), 1) })
        window.location.href = '/'
      }
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

export default function MyApp({ Component, pageProps }) {
  const [userData, setUserData] = useState({ email: '', password: '' })

  useEffect(() => {
    document.querySelector('html').classList.add('has-background-dark')
  })

  return (
    <div>
      <div className='ml-5 mt-5 is-hidden-touch grow-on-hover'>
        <a href='/'>
          <Image src='/tradicional.svg' width={80} height={80} alt='Logo da Empoliga' />
        </a>
      </div>

      <div className='is-hidden-desktop mt-1 is-flex is-justify-content-center'>
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

          <form onSubmit={(event) => handleSubmit(event, userData)}>
            <div className='p-6' style={{ marginBottom: '2rem' }}>
              <input
                className='input is-large'
                type='email'
                placeholder='Digite o e-mail'
                value={userData.email}
                onChange={(event) => setUserData({ ...userData, email: event.target.value })}
              />
              <input
                className='input is-large mt-4'
                type='password'
                placeholder='Digite a senha'
                value={userData.password}
                onChange={(event) => setUserData({ ...userData, password: event.target.value })}
              />
            </div>

            <div className='is-flex is-justify-content-center'>
              <button id='submit' className={`button is-large is-primary p-6 ${styles.btn} ${styles.btnArrow}`} />
            </div>

            <div className='is-flex is-justify-content-center has-text-weight-bold black-hover'>
              <a
                className='has-text-grey mb-6'
                style={{ marginTop: '3.5rem', letterSpacing: '0.05rem' }}
                href='/cadastrar'
              >
                CRIAR CONTA
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className='is-hidden-desktop is-flex is-justify-content-center'>
        <div className='has-background-white' style={{ height: '83vh', width: '94vw' }}>
          <div style={{ marginTop: '2vh' }} />
          <div className='is-flex is-justify-content-center'>
            <h1 className='is-size-2 has-text-black has-text-weight-bold' style={{ textTransform: 'none' }}>
              Iniciar sessão
            </h1>
          </div>

          <form onSubmit={(event) => handleSubmit(event, userData)}>
            <div className='p-6'>
              <input
                className='input is-large'
                type='email'
                placeholder='Digite o e-mail'
                value={userData.email}
                onChange={(event) => setUserData({ ...userData, email: event.target.value })}
              />
              <input
                className='input is-large mt-4'
                type='password'
                placeholder='Digite a senha'
                value={userData.password}
                onChange={(event) => setUserData({ ...userData, password: event.target.value })}
              />
            </div>

            <div className='is-flex is-justify-content-center'>
              <button
                id='submit-mobile'
                className={`button is-large is-primary p-6 ${styles.btn} ${styles.btnArrow}`}
              />
            </div>
          </form>

          <div className='is-flex is-justify-content-center has-text-weight-bold black-hover'>
            <a className='has-text-grey mb-6' style={{ marginTop: '5vh', letterSpacing: '0.05rem' }} href='/cadastrar'>
              CRIAR CONTA
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
