import { useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar'
import Cookie from 'js-cookie'
import { addDays } from 'date-fns'

function openProfilePictureModal() {
  document.querySelector('html').classList.add('is-clipped')
  document.querySelector('.modal').classList.add('is-active')
}

function closeProfilePictureModal() {
  document.querySelector('html').classList.remove('is-clipped')
  document.querySelector('.modal').classList.remove('is-active')
}

async function fetchProfile() {
  const response = await fetch('/api/profile')
  return await response.json()
}

export default function Index() {
  const [profile, setProfile] = useState(null)
  const [name, setName] = useState('')

  useEffect(() => {
    document.querySelector('body').classList.add('has-navbar-fixed-top')
    document.querySelector('html').style.backgroundColor = 'black'

    fetchProfile().then((profile) => {
      if (profile.errors) {
        window.location.href = '/'
      } else {
        setProfile(profile)
        setName(profile.name)

        document.querySelector('#loading').classList.add('is-hidden')
        document.querySelector('#page').classList.remove('is-hidden')
      }
    })
  }, [])

  console.log(profile)

  return (
    <div className='has-text-weight-bold'>
      <Navbar />

      <div className='is-flex is-justify-content-center mt-6 is-hidden' id='page'>
        <div className='is-flex is-flex-direction-column is-justify-content-center'>
          <button
            className='button is-large is-focused is-primary'
            style={{ borderRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            Perfil
          </button>
          <button
            className='button is-large mt-5 is-primary'
            style={{ borderRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            disabled
          >
            Histórico
          </button>
          <button
            className='button is-large mt-5 is-primary'
            style={{ borderRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            disabled
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

                  <h1
                    className='title'
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      document.querySelector('#name').classList.add('is-hidden')
                      document.querySelector('#name-form').classList.remove('is-hidden')
                    }}
                    id='name'
                  >
                    {name}
                  </h1>

                  <form
                    id='name-form'
                    className='is-hidden is-flex mt-5 mb-4'
                    onSubmit={(event) => {
                      event.preventDefault()
                    }}
                  >
                    <input
                      type='text'
                      id='name-input'
                      className='input is-medium'
                      placeholder='Digite seu nome completo'
                      value={name}
                      autoFocus
                      onChange={(event) => setName(event.target.value)}
                    />
                    <button
                      className='button is-primary is-medium ml-2'
                      onClick={async () => {
                        document.querySelector('#name-form').classList.add('is-hidden')
                        document.querySelector('#name').classList.remove('is-hidden')

                        await fetch(`/api/users/${profile._id}`, {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ name }),
                        })

                        const user = JSON.parse(Cookie.get('currentUser'))
                        Cookie.set('currentUser', { ...user, name }, { expires: addDays(new Date(), 1) })
                      }}
                    >
                      Salvar
                    </button>
                  </form>

                  <h1
                    className='title mt-1'
                    id='role'
                    onClick={() => {
                      document.querySelector('#role').classList.add('is-hidden')
                      document.querySelector('#role-form').classList.remove('is-hidden')
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    ADC
                  </h1>

                  <form
                    id='role-form'
                    className='is-hidden is-flex mt-5 mb-4'
                    onSubmit={(event) => {
                      event.preventDefault()
                    }}
                  >
                    <div className='select is-medium'>
                      <select>
                        <option value='Top' selected={profile && profile.player.role === 'Top'}>
                          Top
                        </option>
                        <option value='Jungle' selected={profile && profile.player.role === 'Jungle'}>
                          Jungle
                        </option>
                        <option value='Mid' selected={profile && profile.player.role === 'Mid'}>
                          Mid
                        </option>
                        <option value='Adc' selected={profile && profile.player.role === 'Adc'}>
                          Adc
                        </option>
                        <option value='Support' selected={profile && profile.player.role === 'Support'}>
                          Support
                        </option>
                      </select>
                    </div>

                    <button
                      className='button is-primary is-medium ml-2'
                      onClick={() => {
                        document.querySelector('#role-form').classList.add('is-hidden')
                        document.querySelector('#role').classList.remove('is-hidden')
                      }}
                    >
                      Salvar
                    </button>
                  </form>

                  {/* TODO: Time/Free agent */}
                  {/* <h1 className='title mt-1'>
                    <a href=''>paiN Gaming</a>
                  </h1> */}
                </div>
              </div>

              <div className='columns'>
                <div className='column'>
                  <h1 className='title is-4'>{profile && profile.email}</h1>
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

      <div className='is-flex is-justify-content-center'>
        <div style={{ margin: '0', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>
          <button className='button is-loading is-large' id='loading' />
        </div>
      </div>
    </div>
  )
}
