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
        <div className='is-flex is-flex-direction-column is-justify-content-center'>
          <button
            className='button is-large is-focused'
            style={{ borderRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            Perfil
          </button>
          <button
            className='button is-large mt-5'
            style={{ borderRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            Histórico
          </button>
          <button
            className='button is-large mt-5'
            style={{ borderRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            Conquistas
          </button>
        </div>
        <div className='card' style={{ backgroundColor: 'white', height: '38vw', width: '60rem' }}>
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
                  <h1 className='title ml-0 mr-0 mb-0 is-1' style={{ fontSize: '4rem', marginTop: '-1rem' }}>
                    MMMMMMMMMMMMMMMM
                  </h1>

                  <h1 className='title'>Yanca Silva Elizandro</h1>

                  <h1 className='title mt-1'>ADC</h1>

                  <h1 className='title mt-1'>
                    <a href=''>paiN Gaming</a>
                  </h1>
                </div>
              </div>

              <div className='columns'>
                <div className='column'>
                  <h1 className='title is-4'>yancaselizandro@gmail.com</h1>
                  <h1 className='title is-4'>24 anos</h1>
                  <h1 className='title is-4'>Santa Catarina</h1>
                  <h1 className='title is-4'>Tijucas</h1>
                </div>
                <div className='column has-text-centered'>
                  <h1>Diamante 1</h1>

                  <div className='is-flex is-justify-content-center'>
                    <figure
                      className='image ml-0 mt-0 mr-0'
                      style={{
                        cursor: 'pointer',
                        // width: '20rem',
                        minWidth: '20rem',
                        minHeight: '15rem',
                        // height: '20rem',
                        backgroundColor: 'gray',
                      }}
                      onClick={() => openProfilePictureModal()}
                    >
                      {/* <img src='https://bulma.io/images/placeholders/128x128.png' /> */}
                    </figure>
                  </div>
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