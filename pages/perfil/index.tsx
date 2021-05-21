import { useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar'
import Cookie from 'js-cookie'
import { addDays, parseISO, getYear, differenceInYears } from 'date-fns'
import { Player } from '../../src/schemas/player'

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

async function fetchStates() {
  const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  return await response.json()
}

async function fetchCities(state) {
  const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)
  return await response.json()
}

export default function Index() {
  const [profile, setProfile] = useState(null)
  const [name, setName] = useState('')
  const [role, setRole] = useState('Top')
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [age, setAge] = useState('')
  const [date, setDate] = useState({ day: '1', month: '1', year: '2009' })
  const [states, setStates] = useState([])
  const [state, setState] = useState('RO')
  const [cities, setCities] = useState([])
  const [city, setCity] = useState('')

  useEffect(() => {
    document.querySelector('body').classList.add('has-navbar-fixed-top')
    document.querySelector('html').style.backgroundColor = 'black'

    fetchProfile().then(async (profile) => {
      if (profile.errors) {
        window.location.href = '/'
      } else {
        setProfile(profile)
        setName(profile.name)
        setRole(profile.player.role)
        setEmail(profile.email)
        setBirthDate(profile.birthDate.toString())
        setState(profile.player.state)
        setCity(profile.player.city)

        fetchStates().then((states) => {
          setStates(
            states.map((state) => {
              return { uf: state.sigla, name: state.nome }
            })
          )

          document.querySelector('#loading').classList.add('is-hidden')
          document.querySelector('#page').classList.remove('is-hidden')
        })
      }
    })
  }, [])

  useEffect(() => {
    const date = parseISO(birthDate)
    const numberAge = differenceInYears(new Date(), date)

    setDate({ day: date.getDate().toString(), month: (date.getMonth() + 1).toString(), year: getYear(date).toString() })
    setAge(`${numberAge} anos`)
  }, [birthDate])

  useEffect(() => {
    fetchCities(state).then((cities) => {
      setCities(
        cities.map((city) => {
          return { name: city.nome }
        })
      )
    })
  }, [state])

  const minYear = new Date().getFullYear() - 12
  const maxYear = new Date().getFullYear() - 100
  const yearOptions = []

  for (let year = minYear; year > maxYear; year--) {
    yearOptions.push(
      <option value={year} key={year}>
        {year}
      </option>
    )
  }

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
            Dados pessoais
          </button>
          {/* <button
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
          </button> */}
        </div>

        <div
          className='card'
          style={{ backgroundColor: 'white', height: '38vw', width: '60rem', marginRight: '12rem' }}
        >
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
                    This is my nickname
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
                    {profile && profile.name}
                  </h1>

                  <form
                    id='name-form'
                    className='is-hidden is-flex mt-5 mb-4'
                    onSubmit={async (event) => {
                      event.preventDefault()

                      const button = document.querySelector('#name-save') as HTMLButtonElement
                      button.disabled = true
                      button.classList.add('is-loading')

                      await fetch(`/api/users/${profile._id}`, {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name }),
                      })

                      setProfile({ ...profile, name })

                      const user = JSON.parse(Cookie.get('currentUser'))
                      Cookie.set('currentUser', { ...user, name }, { expires: addDays(new Date(), 1) })

                      document.querySelector('#name-form').classList.add('is-hidden')
                      document.querySelector('#name').classList.remove('is-hidden')

                      button.disabled = false
                      button.classList.remove('is-loading')
                    }}
                  >
                    <input
                      type='text'
                      className='input is-medium'
                      placeholder='Digite seu nome completo'
                      value={name}
                      autoFocus
                      onChange={(event) => setName(event.target.value)}
                    />
                    <button className='button is-primary is-medium ml-2' id='name-save'>
                      Salvar
                    </button>
                    <button
                      className='button is-medium ml-2'
                      type='button'
                      onClick={() => {
                        document.querySelector('#name-form').classList.add('is-hidden')
                        document.querySelector('#name').classList.remove('is-hidden')
                      }}
                    >
                      Cancelar
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
                    {profile && profile.player.role}
                  </h1>

                  <form
                    id='role-form'
                    className='is-hidden is-flex mt-5 mb-4'
                    onSubmit={async (event) => {
                      event.preventDefault()

                      const button = document.querySelector('#role-save') as HTMLButtonElement
                      button.disabled = true
                      button.classList.add('is-loading')

                      await fetch(`/api/players/${profile.player._id}`, {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ role }),
                      })

                      setProfile({ ...profile, player: { ...profile.player, role } })

                      document.querySelector('#role-form').classList.add('is-hidden')
                      document.querySelector('#role').classList.remove('is-hidden')

                      button.disabled = false
                      button.classList.remove('is-loading')
                    }}
                  >
                    <div className='select is-medium'>
                      <select
                        onChange={(event) => {
                          setRole(event.target.value)
                        }}
                        value={role}
                      >
                        <option value='Top'>Top</option>
                        <option value='Jungle'>Jungle</option>
                        <option value='Mid'>Mid</option>
                        <option value='Adc'>Adc</option>
                        <option value='Support'>Support</option>
                      </select>
                    </div>

                    <button className='button is-primary is-medium ml-2' id='role-save'>
                      Salvar
                    </button>

                    <button
                      type='button'
                      className='button is-medium ml-2'
                      onClick={() => {
                        document.querySelector('#role-form').classList.add('is-hidden')
                        document.querySelector('#role').classList.remove('is-hidden')
                      }}
                    >
                      Cancelar
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
                  <h1
                    className='title is-4'
                    style={{ cursor: 'pointer' }}
                    id='email'
                    onClick={() => {
                      document.querySelector('#email').classList.add('is-hidden')
                      document.querySelector('#email-form').classList.remove('is-hidden')
                    }}
                  >
                    {profile && profile.email}
                  </h1>

                  <form
                    id='email-form'
                    className='is-hidden is-flex mb-3'
                    onSubmit={async (event) => {
                      event.preventDefault()

                      const button = document.querySelector('#email-save') as HTMLButtonElement
                      button.disabled = true
                      button.classList.add('is-loading')

                      await fetch(`/api/users/${profile._id}`, {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email }),
                      })

                      setProfile({ ...profile, email })

                      document.querySelector('#email-form').classList.add('is-hidden')
                      document.querySelector('#email').classList.remove('is-hidden')

                      button.disabled = false
                      button.classList.remove('is-loading')
                    }}
                  >
                    <input
                      type='text'
                      className='input'
                      placeholder='Digite seu e-mail'
                      value={email}
                      autoFocus
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <button className='button is-primary ml-2' id='email-save'>
                      Salvar
                    </button>
                    <button
                      className='button ml-2'
                      type='button'
                      onClick={() => {
                        document.querySelector('#email-form').classList.add('is-hidden')
                        document.querySelector('#email').classList.remove('is-hidden')
                      }}
                    >
                      Cancelar
                    </button>
                  </form>

                  <h1
                    className='title is-4'
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      document.querySelector('#age').classList.add('is-hidden')
                      document.querySelector('#age-form').classList.remove('is-hidden')
                    }}
                    id='age'
                  >
                    {age}
                  </h1>

                  <form
                    id='age-form'
                    className='is-hidden is-flex mb-3'
                    onSubmit={async (event) => {
                      event.preventDefault()

                      const button = document.querySelector('#age-save') as HTMLButtonElement
                      button.disabled = true
                      button.classList.add('is-loading')

                      const birthDate = new Date(`${date.year}-${date.month}-${date.day}`).toISOString()

                      await fetch(`/api/users/${profile._id}`, {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ birthDate }),
                      })

                      setBirthDate(birthDate)

                      document.querySelector('#age-form').classList.add('is-hidden')
                      document.querySelector('#age').classList.remove('is-hidden')

                      button.disabled = false
                      button.classList.remove('is-loading')
                    }}
                  >
                    <div className='select'>
                      <select
                        onClick={(event) => {
                          setDate({ ...date, day: (event.target as HTMLOptionElement).value })
                        }}
                        value={date.day}
                        onChange={(event) => setDate({ ...date, day: event.target.value })}
                      >
                        {[...Array(31)].map((_, day) => (
                          <option key={day}>{day + 1}</option>
                        ))}
                      </select>
                    </div>

                    <div className='select ml-2'>
                      <select
                        onClick={(event) => {
                          setDate({ ...date, month: (event.target as HTMLOptionElement).value })
                        }}
                        value={date.month}
                        onChange={(event) => setDate({ ...date, month: event.target.value })}
                      >
                        {[...Array(12)].map((_, month) => (
                          <option key={month}>{month + 1}</option>
                        ))}
                      </select>
                    </div>

                    <div className='select ml-2'>
                      <select
                        onClick={(event) => {
                          setDate({ ...date, year: (event.target as HTMLOptionElement).value })
                        }}
                        value={date.year}
                        onChange={(event) => setDate({ ...date, year: event.target.value })}
                      >
                        {yearOptions.map((year) => year)}
                      </select>
                    </div>

                    <button className='button is-primary ml-2' id='age-save'>
                      Salvar
                    </button>
                    <button
                      className='button ml-2'
                      type='button'
                      onClick={() => {
                        document.querySelector('#age-form').classList.add('is-hidden')
                        document.querySelector('#age').classList.remove('is-hidden')
                      }}
                    >
                      Cancelar
                    </button>
                  </form>

                  <h1
                    className='title is-4'
                    id='state'
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      document.querySelector('#state').classList.add('is-hidden')
                      document.querySelector('#state-form').classList.remove('is-hidden')
                    }}
                  >
                    {profile && profile.player.state}
                  </h1>

                  <form
                    id='state-form'
                    className='is-hidden is-flex mb-3'
                    onSubmit={async (event) => {
                      event.preventDefault()
                      const button = document.querySelector('#state-save') as HTMLButtonElement
                      button.disabled = true
                      button.classList.add('is-loading')

                      await fetch(`/api/players/${profile.player._id}`, {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ state }),
                      })

                      setProfile({ ...profile, player: { ...profile.player, state } })

                      document.querySelector('#state-form').classList.add('is-hidden')
                      document.querySelector('#state').classList.remove('is-hidden')

                      button.disabled = false
                      button.classList.remove('is-loading')
                    }}
                  >
                    <div className='select'>
                      <select value={state} onChange={(event) => setState(event.target.value)}>
                        {states.map(({ uf, name }) => (
                          <option value={uf} key={uf}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button className='button is-primary ml-2' id='state-save'>
                      Salvar
                    </button>
                    <button
                      className='button ml-2'
                      type='button'
                      onClick={() => {
                        document.querySelector('#state-form').classList.add('is-hidden')
                        document.querySelector('#state').classList.remove('is-hidden')
                      }}
                    >
                      Cancelar
                    </button>
                  </form>

                  <h1
                    className='title is-4'
                    style={{ cursor: 'pointer' }}
                    id='city'
                    onClick={() => {
                      document.querySelector('#city').classList.add('is-hidden')
                      document.querySelector('#city-form').classList.remove('is-hidden')
                    }}
                  >
                    {profile && profile.player.city}
                  </h1>

                  <form
                    id='city-form'
                    className='is-hidden is-flex mb-3'
                    onSubmit={async (event) => {
                      event.preventDefault()

                      const button = document.querySelector('#city-save') as HTMLButtonElement
                      button.disabled = true
                      button.classList.add('is-loading')

                      await fetch(`/api/players/${profile.player._id}`, {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ city }),
                      })

                      setProfile({ ...profile, player: { ...profile.player, city } })

                      document.querySelector('#city-form').classList.add('is-hidden')
                      document.querySelector('#city').classList.remove('is-hidden')

                      button.disabled = false
                      button.classList.remove('is-loading')
                    }}
                  >
                    <div className='select'>
                      <select value={city} onChange={(event) => setCity(event.target.value)}>
                        {cities.map(({ name }) => (
                          <option value={name} key={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button className='button is-primary ml-2' id='city-save'>
                      Salvar
                    </button>
                    <button
                      className='button ml-2'
                      type='button'
                      onClick={() => {
                        document.querySelector('#city-form').classList.add('is-hidden')
                        document.querySelector('#city').classList.remove('is-hidden')
                      }}
                    >
                      Cancelar
                    </button>
                  </form>
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
