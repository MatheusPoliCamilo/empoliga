import { useContext, useEffect } from 'react'
import { Navbar } from '../../components/navbar'
import { CurrentUserContext } from '../../context/state'

function openProfilePictureModal() {
  document.querySelector('html').classList.add('is-clipped')
  document.querySelector('.modal').classList.add('is-active')
}

function closeProfilePictureModal() {
  document.querySelector('html').classList.remove('is-clipped')
  document.querySelector('.modal').classList.remove('is-active')
}

export default function Index() {
  const { user, token } = useContext(CurrentUserContext)

  useEffect(() => {
    document.querySelector('body').classList.add('has-navbar-fixed-top')
    document.querySelector('html').style.backgroundColor = 'black'
  })

  console.log(user)
  console.log(token)

  return (
    <div className='has-text-weight-bold'>
      <Navbar />

      <div className='is-flex is-justify-content-center mt-6'>
        <div className='card' style={{ backgroundColor: 'white', height: '48rem', width: '60rem' }}>
          <div className='card-content'>
            <div className='content'>
              <div className='is-flex'>
                <figure
                  className='image ml-0 mt-0'
                  style={{
                    cursor: 'pointer',
                    width: '20rem',
                    minWidth: '20rem',
                    height: '20rem',
                    backgroundColor: 'gray',
                  }}
                  onClick={() => openProfilePictureModal()}
                >
                  {/* <img src='https://bulma.io/images/placeholders/128x128.png' /> */}
                </figure>

                <div>
                  <h1 className='title m-0 mt-1' style={{ fontSize: '4rem' }}>
                    MMMMMMMMMMMMMMMM
                  </h1>

                  <h1 className='title'>Yanca Silva Elizandro</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='modal'>
        <div className='modal-background' onClick={() => closeProfilePictureModal()} style={{ cursor: 'pointer' }} />
        <div className='modal-content'>
          <p className='image is-4by3'>
            <img src='https://bulma.io/images/placeholders/1280x960.png' />
          </p>
        </div>
        <button className='modal-close is-large' aria-label='close' onClick={() => closeProfilePictureModal()} />
      </div>
    </div>
  )
}
