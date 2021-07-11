import { useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar'
import Cookie from 'js-cookie'
import { addDays, parseISO, getYear, differenceInYears } from 'date-fns'
import Image from 'next/image'
import { generateRankString } from '../../services/generateRankString'

function openLeagueAccountModal() {
  document.querySelector('html').classList.add('is-clipped')
  document.querySelector('.modal').classList.add('is-active')
}

function closeLeagueAccountModal() {
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

function showOnlyInput(attributeName) {
  document.querySelector(`#${attributeName}`).classList.add('is-hidden')
  document.querySelector(`#${attributeName}-cancel`).classList.add('is-hidden')
  document.querySelector(`#${attributeName}-form`).classList.remove('is-hidden')
}

function genderText(genderChar) {
  switch (genderChar) {
    case 'M':
      return 'Masculino'
    case 'F':
      return 'Feminino'
    case 'O':
      return 'Outro'
    default:
      break
  }
}

function generateProfileIconId(profileIconId) {
  let randomId = Math.floor(Math.random() * 29)

  while (randomId === profileIconId) {
    randomId = Math.floor(Math.random() * 29)
  }

  return randomId
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
  const [profilePicture, setProfilePicture] = useState('')
  const [setupPhoto, setSetupPhoto] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [rg, setRg] = useState('')
  const [cpf, setCpf] = useState('')
  const [address, setAddress] = useState('')
  const [twitter, setTwitter] = useState('')
  const [twitch, setTwitch] = useState('')
  const [instagram, setInstagram] = useState('')
  const [facebook, setFacebook] = useState('')
  const [gender, setGender] = useState('M')
  const [leagueAccount, setLeagueAccount] = useState({
    id: '',
    accountId: '',
    puuid: '',
    name: '',
    profileIconId: 1,
    confirmationIconId: 1,
    leaguePoints: 0,
    wins: 0,
    losses: 0,
    tier: '',
    rank: '',
  })

  useEffect(() => {
    document.querySelector('body').classList.add('has-navbar-fixed-top')
    document.querySelector('html').style.backgroundColor = 'black'

    fetchProfile().then(async (profile) => {
      if (profile.errors) {
        window.location.href = '/'
      } else {
        setProfile(profile)
        setName(profile.name)
        if (profile.player.role) setRole(profile.player.role)
        setEmail(profile.email)
        setGender(profile.gender)
        setBirthDate(profile.birthDate.toString())
        if (profile.player.state) setState(profile.player.state)
        setCity(profile.player.city)
        setProfilePicture(profile.player.profilePicture)
        setSetupPhoto(profile.player.setupPhoto)
        setWhatsapp(profile.whatsapp)
        if (profile.player.rg) setRg(profile.player.rg)
        if (profile.player.cpf) setCpf(profile.player.cpf)
        if (profile.player.address) setAddress(profile.player.address)
        setTwitch(profile.twitch)
        setTwitter(profile.twitter)
        setInstagram(profile.instagram)
        setFacebook(profile.facebook)

        fetchStates().then((states) => {
          setStates(
            states.map((state) => {
              return { uf: state.sigla, name: state.nome }
            })
          )

          document.querySelector('#loading').classList.add('is-hidden')
          document.querySelector('#page').classList.remove('is-hidden')
        })

        if (!profile.player.role) showOnlyInput('role')
        if (!profile.player.state) showOnlyInput('state')
        if (!profile.player.city) showOnlyInput('city')
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

      <div className='is-flex is-justify-content-center mt-4 is-hidden' id='page'>
        <div className='is-flex is-flex-direction-column is-justify-content-center'>
          <button
            className='button is-large is-focused is-primary'
            style={{ borderRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            id='player-card-button'
            onClick={() => {
              document.querySelector('#information-card').classList.add('is-hidden')
              document.querySelector('#social-media-card').classList.add('is-hidden')
              document.querySelector('#smurfs-card').classList.add('is-hidden')

              document.querySelector('#player-card').classList.remove('is-hidden')
            }}
          >
            Perfil
          </button>

          <button
            className='button is-large mt-5 is-primary'
            style={{ borderRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            onClick={() => {
              document.querySelector('#player-card-button').classList.remove('is-focused')

              document.querySelector('#player-card').classList.add('is-hidden')
              document.querySelector('#social-media-card').classList.add('is-hidden')
              document.querySelector('#smurfs-card').classList.add('is-hidden')

              document.querySelector('#information-card').classList.remove('is-hidden')
            }}
          >
            Dados pessoais
          </button>

          <button
            className='button is-large mt-5 is-primary'
            style={{ borderRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            onClick={() => {
              document.querySelector('#player-card-button').classList.remove('is-focused')

              document.querySelector('#player-card').classList.add('is-hidden')
              document.querySelector('#information-card').classList.add('is-hidden')
              document.querySelector('#smurfs-card').classList.add('is-hidden')

              document.querySelector('#social-media-card').classList.remove('is-hidden')
            }}
          >
            Redes sociais
          </button>

          {/* <button
            className='button is-large mt-5 is-primary'
            style={{ borderRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            onClick={() => {
              document.querySelector('#player-card-button').classList.remove('is-focused')

              document.querySelector('#player-card').classList.add('is-hidden')
              document.querySelector('#information-card').classList.add('is-hidden')
              document.querySelector('#social-media-card').classList.add('is-hidden')

              document.querySelector('#smurfs-card').classList.remove('is-hidden')
            }}
          >
            Smurfs
          </button> */}
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
          style={{ backgroundColor: 'white', height: '50rem', width: '61rem', marginRight: '12rem' }}
        >
          <div className='card-content' id='player-card'>
            <div className='content'>
              <div className='is-flex'>
                <figure
                  className={`image ml-0 mt-0 mb-5 is-flex is-flex-direction-column is-justify-content-center has-background-grey-lighter grow-hover ${
                    profile?.player?.profilePicture ? '' : 'is-hidden'
                  }`}
                  style={{
                    cursor: 'pointer',
                    width: '20rem',
                    minWidth: '20rem',
                    height: '20rem',
                  }}
                  onClick={() => {
                    document.querySelector('#profile-picture').classList.add('is-hidden')
                    document.querySelector('#profile-picture-form').classList.remove('is-hidden')
                    document.querySelector('#profile-picture-cancel').classList.remove('is-hidden')
                  }}
                  id='profile-picture'
                >
                  {profile?.player?.profilePicture && (
                    <img src={`${profile?.player?.profilePicture}`} style={{ maxHeight: '20rem' }} />
                  )}
                </figure>

                <form
                  style={{
                    width: '20rem',
                    minWidth: '20rem',
                    height: '20rem',
                  }}
                  className={`is-flex is-flex-direction-column is-justify-content-center pb-6 mb-5 ml-4 mr-4 ${
                    profile?.player?.profilePicture ? 'is-hidden' : ''
                  }`}
                  id='profile-picture-form'
                  onSubmit={(event) => {
                    event.preventDefault()
                    const button = document.querySelector('#profile-picture-save') as HTMLButtonElement
                    button.disabled = true
                    button.classList.add('is-loading')

                    const form = document.querySelector('#profile-picture-form') as HTMLFormElement
                    const profilePictureInput = document.querySelector('#profile-picture')

                    const fileInput = document.querySelector('#profile') as HTMLInputElement

                    fetch(`/api/players/${profile.player._id}`, {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ profilePicture: fileInput.value }),
                    })
                      .then(() => {
                        form.classList.add('is-hidden')
                        profilePictureInput.classList.remove('is-hidden')
                        button.disabled = false
                        button.classList.remove('is-loading')

                        setProfile({ ...profile, player: { ...profile.player, profilePicture } })
                      })
                      .catch((err) => {
                        console.error(err)
                        button.disabled = false
                        button.classList.remove('is-loading')
                      })
                  }}
                >
                  <input
                    type='text'
                    id='profile'
                    className='input is-large'
                    value={profilePicture}
                    onChange={(event) => setProfilePicture(event.target.value)}
                    placeholder='Link da foto de perfil'
                  />

                  <div className='field is-grouped is-grouped-centered mt-2'>
                    <div className='control'>
                      <button className='button is-primary' id='profile-picture-save'>
                        Salvar
                      </button>
                    </div>
                    <div className='control'>
                      <button
                        type='button'
                        className='button is-hidden'
                        id='profile-picture-cancel'
                        onClick={() => {
                          document.querySelector('#profile-picture-form').classList.add('is-hidden')
                          document.querySelector('#profile-picture').classList.remove('is-hidden')
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </form>

                <div className='ml-4'>
                  <h1
                    className={`title ml-0 mr-0 mb-0 is-1 is-flex is-align-items-center on-hover-grow ${
                      profile && profile.player.leagueAccounts[0].nickname ? '' : 'is-hidden'
                    }`}
                    style={{ fontSize: '4rem', marginTop: '-1rem', textTransform: 'none', cursor: 'pointer' }}
                    id='player-nick'
                    onClick={() => {
                      document.querySelector('#player-nick').classList.add('is-hidden')
                      document.querySelector('#add-account-button').classList.remove('is-hidden')
                      document.querySelector('#nickname-cancel').classList.remove('is-hidden')
                    }}
                  >
                    {profile && profile.player.leagueAccounts[0].nickname}
                  </h1>

                  <button
                    className={`button is-primary is-large ${
                      profile && profile.player.leagueAccounts[0].nickname ? 'is-hidden' : ''
                    }`}
                    onClick={openLeagueAccountModal}
                    id='add-account-button'
                  >
                    Cadastrar conta
                  </button>

                  <button
                    className='button is-large ml-2 is-hidden'
                    id='nickname-cancel'
                    onClick={() => {
                      document.querySelector('#add-account-button').classList.add('is-hidden')
                      document.querySelector('#nickname-cancel').classList.add('is-hidden')
                      document.querySelector('#player-nick').classList.remove('is-hidden')
                    }}
                  >
                    Cancelar
                  </button>

                  <h1
                    className='title on-hover-grow'
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

                      if (name) {
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
                        document.querySelector('#name-input').classList.remove('is-danger')
                      } else {
                        document.querySelector('#name-input').classList.add('is-danger')
                      }

                      button.disabled = false
                      button.classList.remove('is-loading')
                    }}
                  >
                    <input
                      type='text'
                      className='input is-medium'
                      placeholder='Digite seu nome'
                      value={name}
                      autoFocus
                      id='name-input'
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
                        document.querySelector('#name-input').classList.remove('is-danger')
                      }}
                    >
                      Cancelar
                    </button>
                  </form>

                  <h1
                    className='title mt-1 on-hover-grow'
                    id='role'
                    onClick={() => {
                      document.querySelector('#role').classList.add('is-hidden')
                      document.querySelector('#role-form').classList.remove('is-hidden')
                      document.querySelector('#role-cancel').classList.remove('is-hidden')
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
                        <option value='Analista'>Analista</option>
                        <option value='Psicólogo'>Psicólogo</option>
                        <option value='Coach'>Coach</option>
                        <option value='Head Coach'>Head Coach</option>
                        <option value='Positional Coach'>Positional Coach</option>
                        <option value='Caster'>Caster</option>
                        <option value='Comentarista'>Comentarista</option>
                      </select>
                    </div>

                    <button className='button is-primary is-medium ml-2' id='role-save'>
                      Salvar
                    </button>

                    <button
                      type='button'
                      className='button is-medium ml-2'
                      id='role-cancel'
                      onClick={() => {
                        document.querySelector('#role-form').classList.add('is-hidden')
                        document.querySelector('#role').classList.remove('is-hidden')
                      }}
                    >
                      Cancelar
                    </button>
                  </form>

                  {profile?.teams?.length > 0 && (
                    <h1 className='title mt-1'>
                      <a href={`/equipe/${profile.teams[0]._id}`}>{profile.teams[0].name}</a>
                    </h1>
                  )}
                </div>
              </div>

              <div className='columns'>
                <div className='column pt-0'>
                  <label className='label mt-0' style={{ fontWeight: 'bolder' }}>
                    E-mail
                    <span
                      className='ml-1 icon is-small has-text-link-dark'
                      title='Seu e-mail só aparece para você e para a staff'
                    >
                      <svg
                        aria-hidden='true'
                        focusable='false'
                        data-prefix='fas'
                        data-icon='info-circle'
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 512 512'
                        className='svg-inline--fa fa-info-circle fa-w-16 fa-3x'
                      >
                        <path
                          fill='currentColor'
                          d='M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z'
                          className=''
                        />
                      </svg>
                    </span>
                  </label>

                  <h1
                    className='title is-4 mt-0 on-hover-grow'
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

                  <label className='label' style={{ fontWeight: 'bolder' }}>
                    Gênero
                  </label>

                  <h1
                    className='title is-4 mt-0 on-hover-grow'
                    style={{ cursor: 'pointer' }}
                    id='gender'
                    onClick={() => {
                      document.querySelector('#gender').classList.add('is-hidden')
                      document.querySelector('#gender-form').classList.remove('is-hidden')
                    }}
                  >
                    {profile && genderText(profile.gender)}
                  </h1>

                  <form
                    id='gender-form'
                    className='is-hidden is-flex mb-3'
                    onSubmit={async (event) => {
                      event.preventDefault()

                      const button = document.querySelector('#gender-save') as HTMLButtonElement
                      button.disabled = true
                      button.classList.add('is-loading')

                      await fetch(`/api/users/${profile._id}`, {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ gender }),
                      })

                      setProfile({ ...profile, gender })

                      document.querySelector('#gender-form').classList.add('is-hidden')
                      document.querySelector('#gender').classList.remove('is-hidden')

                      button.disabled = false
                      button.classList.remove('is-loading')
                    }}
                  >
                    <div className='select'>
                      <select onChange={(event) => setGender(event.target.value)} value={gender}>
                        <option value='M'>Masculino</option>
                        <option value='F'>Feminino</option>
                        <option value='O'>Outro</option>
                      </select>
                    </div>

                    <button className='button is-primary ml-2' id='gender-save'>
                      Salvar
                    </button>
                    <button
                      className='button ml-2'
                      type='button'
                      onClick={() => {
                        document.querySelector('#gender-form').classList.add('is-hidden')
                        document.querySelector('#gender').classList.remove('is-hidden')
                      }}
                    >
                      Cancelar
                    </button>
                  </form>

                  <label className='label' style={{ fontWeight: 'bolder' }}>
                    Idade
                  </label>

                  <h1
                    className='title is-4 mt-0 on-hover-grow'
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

                      const birthDate = new Date(`${date.year}/${date.month}/${date.day}`).toISOString()

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

                  <label className='label' style={{ fontWeight: 'bolder' }}>
                    Estado
                  </label>

                  <h1
                    className='title is-4 mt-0 on-hover-grow'
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
                      id='state-cancel'
                      onClick={() => {
                        document.querySelector('#state-form').classList.add('is-hidden')
                        document.querySelector('#state').classList.remove('is-hidden')
                      }}
                    >
                      Cancelar
                    </button>
                  </form>

                  <label className='label' style={{ fontWeight: 'bolder' }}>
                    Cidade
                  </label>

                  <h1
                    className='title is-4 mt-0 on-hover-grow'
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
                      id='city-cancel'
                      onClick={() => {
                        document.querySelector('#city-form').classList.add('is-hidden')
                        document.querySelector('#city').classList.remove('is-hidden')
                      }}
                    >
                      Cancelar
                    </button>
                  </form>
                </div>

                <div
                  className={`column has-text-centered is-flex is-flex-direction-column is-justify-content-center ${
                    profile && profile.player.leagueAccounts[0] ? '' : 'is-invisible'
                  }`}
                >
                  <h1 className='mb-0'>{profile && generateRankString(profile.player.leagueAccounts[0])}</h1>

                  <div className='is-flex is-justify-content-center grow-hover'>
                    {profile && profile.player.leagueAccounts[0].tier && (
                      <a
                        href={`https://br.op.gg/summoner/userName=${
                          profile && encodeURIComponent(profile.player.leagueAccounts[0].nickname)
                        }`}
                      >
                        <figure
                          className='image ml-0 mt-0 mr-0'
                          style={{
                            cursor: 'pointer',
                            minWidth: '288px',
                            minHeight: '329.0625px',
                          }}
                        >
                          <Image src={`/elo/${profile && profile.player.leagueAccounts[0].tier}.png`} layout='fill' />
                        </figure>
                      </a>
                    )}
                  </div>

                  {profile &&
                    profile.player.leagueAccounts[0].tier !== 'UNRANKED' &&
                    (profile.player.leagueAccounts[0].wins || profile.player.leagueAccounts[0].losses) && (
                      <p className='is-size-5'>
                        {profile.player.leagueAccounts[0].wins}W/
                        {profile.player.leagueAccounts[0].losses}L
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>

          <div
            className='card-content is-hidden is-flex is-flex-direction-column is-justify-content-center'
            id='information-card'
            style={{ height: '50rem' }}
          >
            <div className='content'>
              <div className='is-flex'>
                <div className='is-flex is-flex-direction-column is-justify-content-center'>
                  <form
                    style={{
                      width: '20rem',
                      minWidth: '20rem',
                      height: '20rem',
                    }}
                    className={`is-flex is-flex-direction-column is-justify-content-center pb-6 mb-5 ml-6 mr-6 ${
                      profile && profile.player.setupPhoto ? 'is-hidden' : ''
                    }`}
                    id='setup-photo-form'
                    onSubmit={(event) => {
                      event.preventDefault()
                      const button = document.querySelector('#setup-photo-save') as HTMLButtonElement
                      button.disabled = true
                      button.classList.add('is-loading')

                      const form = document.querySelector('#setup-photo-form') as HTMLFormElement
                      const setupPhoto = document.querySelector('#setup-photo')

                      const fileInput = document.querySelector('#setup-photo-input') as HTMLInputElement

                      fetch(`/api/players/${profile.player._id}`, {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ setupPhoto: fileInput.value }),
                      })
                        .then(() => {
                          form.classList.add('is-hidden')
                          setupPhoto.classList.remove('is-hidden')

                          setProfile({ ...profile, player: { ...profile.player, setupPhoto: fileInput.value } })
                        })
                        .catch((error) => {
                          console.error(error)
                        })
                        .then(() => {
                          button.disabled = false
                          button.classList.remove('is-loading')
                        })
                    }}
                  >
                    <label className='label'>Link da foto do setup</label>
                    <input
                      className='input'
                      type='text'
                      id='setup-photo-input'
                      onChange={(event) => setSetupPhoto(event.target.value)}
                      placeholder='Link da foto do setup'
                    />

                    <div className='field is-grouped is-grouped-centered mt-2'>
                      <div className='control'>
                        <button className='button is-primary' id='setup-photo-save'>
                          Salvar
                        </button>
                      </div>
                      <div className='control'>
                        <button
                          type='button'
                          className='button is-hidden'
                          id='setup-photo-cancel'
                          onClick={() => {
                            document.querySelector('#setup-photo-form').classList.add('is-hidden')
                            document.querySelector('#setup-photo').classList.remove('is-hidden')
                          }}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </form>

                  <figure
                    className={`image ml-0 mt-0 mb-5 is-flex is-flex-direction-column is-justify-content-center has-background-grey-lighter grow-hover ${
                      profile && profile.player.setupPhoto ? '' : 'is-hidden'
                    }`}
                    style={{
                      cursor: 'pointer',
                      width: '28rem',
                      minWidth: '20rem',
                      height: '28rem',
                    }}
                    onClick={() => {
                      document.querySelector('#setup-photo').classList.add('is-hidden')
                      document.querySelector('#setup-photo-cancel').classList.remove('is-hidden')
                      document.querySelector('#setup-photo-form').classList.remove('is-hidden')
                    }}
                    id='setup-photo'
                  >
                    <img src={`${setupPhoto}`} />
                  </figure>
                </div>

                <div className='is-flex is-flex-direction-column is-justify-content-center'>
                  <label className='label'>Whatsapp</label>

                  <h1
                    className='title is-4 mt-0 on-hover-grow'
                    style={{ cursor: 'pointer' }}
                    id='whatsapp'
                    onClick={() => {
                      document.querySelector('#whatsapp').classList.add('is-hidden')
                      document.querySelector('#whatsapp-form').classList.remove('is-hidden')
                    }}
                  >
                    {profile && profile.whatsapp}
                  </h1>

                  <form
                    id='whatsapp-form'
                    className='is-hidden is-flex mb-3'
                    onSubmit={async (event) => {
                      event.preventDefault()

                      const button = document.querySelector('#whatsapp-save') as HTMLButtonElement
                      button.disabled = true
                      button.classList.add('is-loading')

                      await fetch(`/api/users/${profile._id}`, {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ whatsapp }),
                      })

                      setProfile({ ...profile, whatsapp })

                      document.querySelector('#whatsapp-form').classList.add('is-hidden')
                      document.querySelector('#whatsapp').classList.remove('is-hidden')

                      button.disabled = false
                      button.classList.remove('is-loading')
                    }}
                  >
                    <input
                      type='text'
                      className='input'
                      placeholder='Digite seu WhatsApp'
                      value={whatsapp}
                      autoFocus
                      onChange={(event) => setWhatsapp(event.target.value)}
                      style={{ width: '17rem' }}
                    />

                    <button className='button is-primary ml-2' id='whatsapp-save'>
                      Salvar
                    </button>

                    <button
                      className='button ml-2'
                      type='button'
                      onClick={() => {
                        document.querySelector('#whatsapp-form').classList.add('is-hidden')
                        document.querySelector('#whatsapp').classList.remove('is-hidden')
                      }}
                    >
                      Cancelar
                    </button>
                  </form>

                  {/* <label className='label'>RG</label>

                  <h1
                    className={`title is-4 mt-0 ${profile && profile.player.rg ? '' : 'is-hidden'}`}
                    style={{ cursor: 'pointer' }}
                    id='rg'
                    onClick={() => {
                      document.querySelector('#rg').classList.add('is-hidden')
                      document.querySelector('#rg-form').classList.remove('is-hidden')
                      document.querySelector('#rg-cancel').classList.remove('is-hidden')
                    }}
                  >
                    {profile && profile.player.rg}
                  </h1>

                  <form
                    id='rg-form'
                    className={`is-flex mb-3 ${profile && profile.player.rg ? 'is-hidden' : ''}`}
                    onSubmit={async (event) => {
                      event.preventDefault()

                      const button = document.querySelector('#rg-save') as HTMLButtonElement
                      button.disabled = true
                      button.classList.add('is-loading')

                      await fetch(`/api/players/${profile.player._id}`, {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ rg }),
                      })

                      setProfile({ ...profile, player: { ...profile.player, rg } })

                      document.querySelector('#rg-form').classList.add('is-hidden')
                      document.querySelector('#rg').classList.remove('is-hidden')

                      button.disabled = false
                      button.classList.remove('is-loading')
                    }}
                  >
                    <input
                      type='text'
                      className='input'
                      placeholder='Digite seu RG'
                      value={rg}
                      autoFocus
                      onChange={(event) => setRg(event.target.value)}
                    />

                    <button className='button is-primary ml-2' id='rg-save'>
                      Salvar
                    </button>

                    <button
                      className='button ml-2 is-hidden'
                      type='button'
                      id='rg-cancel'
                      onClick={() => {
                        document.querySelector('#rg-form').classList.add('is-hidden')
                        document.querySelector('#rg').classList.remove('is-hidden')
                      }}
                    >
                      Cancelar
                    </button>
                  </form>

                  <label className='label'>CPF</label>

                  <h1
                    className={`title is-4 mt-0 ${profile && profile.player.cpf ? '' : 'is-hidden'}`}
                    style={{ cursor: 'pointer' }}
                    id='cpf'
                    onClick={() => {
                      document.querySelector('#cpf').classList.add('is-hidden')
                      document.querySelector('#cpf-form').classList.remove('is-hidden')
                      document.querySelector('#cpf-cancel').classList.remove('is-hidden')
                    }}
                  >
                    {profile && profile.player.cpf}
                  </h1>

                  <form
                    id='cpf-form'
                    className={`is-flex mb-3 ${profile && profile.player.cpf ? 'is-hidden' : ''}`}
                    onSubmit={async (event) => {
                      event.preventDefault()

                      const button = document.querySelector('#cpf-save') as HTMLButtonElement
                      button.disabled = true
                      button.classList.add('is-loading')

                      await fetch(`/api/players/${profile.player._id}`, {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ cpf }),
                      })

                      setProfile({ ...profile, player: { ...profile.player, cpf } })

                      document.querySelector('#cpf-form').classList.add('is-hidden')
                      document.querySelector('#cpf').classList.remove('is-hidden')

                      button.disabled = false
                      button.classList.remove('is-loading')
                    }}
                  >
                    <input
                      type='text'
                      className='input'
                      placeholder='Digite seu CPF'
                      value={cpf}
                      autoFocus
                      onChange={(event) => setCpf(event.target.value)}
                    />

                    <button className='button is-primary ml-2' id='cpf-save'>
                      Salvar
                    </button>

                    <button
                      className='button ml-2 is-hidden'
                      type='button'
                      id='cpf-cancel'
                      onClick={() => {
                        document.querySelector('#cpf-form').classList.add('is-hidden')
                        document.querySelector('#cpf').classList.remove('is-hidden')
                      }}
                    >
                      Cancelar
                    </button>
                  </form> */}

                  <label className='label'>Endereço</label>

                  <h1
                    className={`title is-4 mt-0 on-hover-grow ${profile && profile.player.address ? '' : 'is-hidden'}`}
                    style={{ cursor: 'pointer' }}
                    id='address'
                    onClick={() => {
                      document.querySelector('#address').classList.add('is-hidden')
                      document.querySelector('#address-form').classList.remove('is-hidden')
                      document.querySelector('#address-cancel').classList.remove('is-hidden')
                    }}
                  >
                    {profile && profile.player.address}
                  </h1>

                  <form
                    id='address-form'
                    className={`is-flex mb-3 ${profile && profile.player.address ? 'is-hidden' : ''}`}
                    onSubmit={async (event) => {
                      event.preventDefault()

                      const button = document.querySelector('#address-save') as HTMLButtonElement
                      button.disabled = true
                      button.classList.add('is-loading')

                      await fetch(`/api/players/${profile.player._id}`, {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ address }),
                      })

                      setProfile({ ...profile, player: { ...profile.player, address } })

                      document.querySelector('#address-form').classList.add('is-hidden')
                      document.querySelector('#address').classList.remove('is-hidden')

                      button.disabled = false
                      button.classList.remove('is-loading')
                    }}
                  >
                    <input
                      type='text'
                      className='input'
                      placeholder='Digite seu endereço'
                      value={address}
                      autoFocus
                      onChange={(event) => setAddress(event.target.value)}
                      style={{ width: '17rem' }}
                    />

                    <button className='button is-primary ml-2' id='address-save'>
                      Salvar
                    </button>

                    <button
                      className='button ml-2 is-hidden'
                      type='button'
                      id='address-cancel'
                      onClick={() => {
                        document.querySelector('#address-form').classList.add('is-hidden')
                        document.querySelector('#address').classList.remove('is-hidden')
                      }}
                    >
                      Cancelar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div
            className='card-content is-hidden is-flex is-flex-direction-column is-justify-content-space-between'
            id='social-media-card'
            style={{ height: '49rem' }}
          >
            <section className='hero is-small'>
              <div className='hero-body'>
                <div className='is-flex'>
                  <div>
                    <figure className='image is-96x96 mr-5'>
                      <svg
                        aria-hidden='true'
                        focusable='false'
                        data-prefix='fab'
                        data-icon='twitter'
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 512 512'
                        className='svg-inline--fa fa-twitter fa-w-16 fa-3x'
                      >
                        <path
                          fill='currentColor'
                          d='M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z'
                          className=''
                        />
                      </svg>
                    </figure>
                  </div>

                  <div style={{ width: '48rem' }}>
                    <p
                      className='title on-hover-grow'
                      onClick={() => {
                        document.querySelector('#twitter').classList.add('is-hidden')
                        document.querySelector('#twitter-form').classList.remove('is-hidden')

                        if (profile && profile.twitter) {
                          document.querySelector('#twitter-cancel').classList.remove('is-hidden')
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      Twitter
                    </p>

                    <p className={`subtitle mt-5 ${profile && profile.twitter ? '' : 'is-hidden'}`} id='twitter'>
                      <a href={`${profile && profile.twitter}`}>{profile && profile.twitter}</a>
                    </p>

                    <form
                      id='twitter-form'
                      className={`is-flex ${profile && profile.twitter ? 'is-hidden' : ''}`}
                      onSubmit={async (event) => {
                        event.preventDefault()

                        const button = document.querySelector('#twitter-save') as HTMLButtonElement
                        button.disabled = true
                        button.classList.add('is-loading')

                        await fetch(`/api/users/${profile._id}`, {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ twitter }),
                        })

                        setProfile({ ...profile, twitter })

                        document.querySelector('#twitter-form').classList.add('is-hidden')
                        document.querySelector('#twitter').classList.remove('is-hidden')

                        button.disabled = false
                        button.classList.remove('is-loading')
                      }}
                    >
                      <input
                        type='text'
                        className='input is-large'
                        placeholder='Digite o link do seu twitter'
                        value={twitter}
                        autoFocus
                        onChange={(event) => setTwitter(event.target.value)}
                      />
                      <button className='button is-primary ml-2 is-large' id='twitter-save'>
                        Salvar
                      </button>
                      <button
                        className='button ml-2 is-large is-hidden'
                        type='button'
                        id='twitter-cancel'
                        onClick={() => {
                          document.querySelector('#twitter-form').classList.add('is-hidden')
                          document.querySelector('#twitter').classList.remove('is-hidden')
                        }}
                      >
                        Cancelar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>

            <section className='hero is-small'>
              <div className='hero-body'>
                <div className='is-flex'>
                  <div>
                    <figure className='image is-96x96 mr-5'>
                      <svg
                        aria-hidden='true'
                        focusable='false'
                        data-prefix='fab'
                        data-icon='twitch'
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 512 512'
                        className='svg-inline--fa fa-twitch fa-w-16 fa-3x'
                      >
                        <path
                          fill='currentColor'
                          d='M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z'
                          className=''
                        />
                      </svg>
                    </figure>
                  </div>

                  <div style={{ width: '48rem' }}>
                    <p
                      className='title on-hover-grow'
                      onClick={() => {
                        document.querySelector('#twitch').classList.add('is-hidden')
                        document.querySelector('#twitch-form').classList.remove('is-hidden')

                        if (profile && profile.twitch) {
                          document.querySelector('#twitch-cancel').classList.remove('is-hidden')
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      Twitch
                    </p>

                    <p className={`subtitle mt-5 ${profile && profile.twitch ? '' : 'is-hidden'}`} id='twitch'>
                      <a href={`${profile && profile.twitch}`}>{profile && profile.twitch}</a>
                    </p>

                    <form
                      id='twitch-form'
                      className={`is-flex ${profile && profile.twitch ? 'is-hidden' : ''}`}
                      onSubmit={async (event) => {
                        event.preventDefault()

                        const button = document.querySelector('#twitch-save') as HTMLButtonElement
                        button.disabled = true
                        button.classList.add('is-loading')

                        await fetch(`/api/users/${profile._id}`, {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ twitch }),
                        })

                        setProfile({ ...profile, twitch })

                        document.querySelector('#twitch-form').classList.add('is-hidden')
                        document.querySelector('#twitch').classList.remove('is-hidden')

                        button.disabled = false
                        button.classList.remove('is-loading')
                      }}
                    >
                      <input
                        type='text'
                        className='input is-large'
                        placeholder='Digite o link do seu canal na Twitch'
                        value={twitch}
                        autoFocus
                        onChange={(event) => setTwitch(event.target.value)}
                      />
                      <button className='button is-primary ml-2 is-large' id='twitch-save'>
                        Salvar
                      </button>
                      <button
                        className='button ml-2 is-large is-hidden'
                        type='button'
                        id='twitch-cancel'
                        onClick={() => {
                          document.querySelector('#twitch-form').classList.add('is-hidden')
                          document.querySelector('#twitch').classList.remove('is-hidden')
                        }}
                      >
                        Cancelar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>

            <section className='hero is-small'>
              <div className='hero-body'>
                <div className='is-flex'>
                  <div>
                    <figure className='image is-96x96 mr-5'>
                      <svg
                        aria-hidden='true'
                        focusable='false'
                        data-prefix='fab'
                        data-icon='instagram'
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 448 512'
                        className='svg-inline--fa fa-instagram fa-w-14 fa-3x'
                      >
                        <path
                          fill='currentColor'
                          d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z'
                          className=''
                        />
                      </svg>
                    </figure>
                  </div>

                  <div style={{ width: '48rem' }}>
                    <p
                      className='title on-hover-grow'
                      onClick={() => {
                        document.querySelector('#instagram').classList.add('is-hidden')
                        document.querySelector('#instagram-form').classList.remove('is-hidden')

                        if (profile && profile.instagram) {
                          document.querySelector('#instagram-cancel').classList.remove('is-hidden')
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      Instagram
                    </p>
                    <p className={`subtitle mt-5 ${profile && profile.instagram ? '' : 'is-hidden'}`} id='instagram'>
                      <a href={`${profile && profile.instagram}`}>{profile && profile.instagram}</a>
                    </p>

                    <form
                      id='instagram-form'
                      className={`is-flex ${profile && profile.instagram ? 'is-hidden' : ''}`}
                      onSubmit={async (event) => {
                        event.preventDefault()

                        const button = document.querySelector('#instagram-save') as HTMLButtonElement
                        button.disabled = true
                        button.classList.add('is-loading')

                        await fetch(`/api/users/${profile._id}`, {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ instagram }),
                        })

                        setProfile({ ...profile, instagram })

                        document.querySelector('#instagram-form').classList.add('is-hidden')
                        document.querySelector('#instagram').classList.remove('is-hidden')

                        button.disabled = false
                        button.classList.remove('is-loading')
                      }}
                    >
                      <input
                        type='text'
                        className='input is-large'
                        placeholder='Digite o link do seu Instagram'
                        value={instagram}
                        autoFocus
                        onChange={(event) => setInstagram(event.target.value)}
                      />
                      <button className='button is-primary ml-2 is-large' id='instagram-save'>
                        Salvar
                      </button>
                      <button
                        className='button ml-2 is-large is-hidden'
                        type='button'
                        id='instagram-cancel'
                        onClick={() => {
                          document.querySelector('#instagram-form').classList.add('is-hidden')
                          document.querySelector('#instagram').classList.remove('is-hidden')
                        }}
                      >
                        Cancelar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>

            <section className='hero is-small'>
              <div className='hero-body'>
                <div className='is-flex'>
                  <div>
                    <figure className='image is-96x96 mr-5'>
                      <svg
                        aria-hidden='true'
                        focusable='false'
                        data-prefix='fab'
                        data-icon='facebook'
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 512 512'
                        className='svg-inline--fa fa-facebook fa-w-16 fa-3x'
                      >
                        <path
                          fill='currentColor'
                          d='M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z'
                          className=''
                        />
                      </svg>
                    </figure>
                  </div>
                  <div style={{ width: '48rem' }}>
                    <p
                      className='title on-hover-grow'
                      onClick={() => {
                        document.querySelector('#facebook').classList.add('is-hidden')
                        document.querySelector('#facebook-form').classList.remove('is-hidden')

                        if (profile && profile.facebook) {
                          document.querySelector('#facebook-cancel').classList.remove('is-hidden')
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      Facebook
                    </p>
                    <p className={`subtitle mt-5 ${profile && profile.facebook ? '' : 'is-hidden'}`} id='facebook'>
                      <a href={`${profile && profile.facebook}`}>{profile && profile.facebook}</a>
                    </p>

                    <form
                      id='facebook-form'
                      className={`is-flex ${profile && profile.facebook ? 'is-hidden' : ''}`}
                      onSubmit={async (event) => {
                        event.preventDefault()

                        const button = document.querySelector('#facebook-save') as HTMLButtonElement
                        button.disabled = true
                        button.classList.add('is-loading')

                        await fetch(`/api/users/${profile._id}`, {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ facebook }),
                        })

                        setProfile({ ...profile, facebook })

                        document.querySelector('#facebook-form').classList.add('is-hidden')
                        document.querySelector('#facebook').classList.remove('is-hidden')

                        button.disabled = false
                        button.classList.remove('is-loading')
                      }}
                    >
                      <input
                        type='text'
                        className='input is-large'
                        placeholder='Digite o link do seu facebook'
                        value={facebook}
                        autoFocus
                        onChange={(event) => setFacebook(event.target.value)}
                      />
                      <button className='button is-primary ml-2 is-large' id='facebook-save'>
                        Salvar
                      </button>
                      <button
                        className='button ml-2 is-large is-hidden'
                        type='button'
                        id='facebook-cancel'
                        onClick={() => {
                          document.querySelector('#facebook-form').classList.add('is-hidden')
                          document.querySelector('#facebook').classList.remove('is-hidden')
                        }}
                      >
                        Cancelar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className='card-content is-hidden' id='smurfs-card'>
            Smurfs
          </div>
        </div>
      </div>

      <div className='modal'>
        <div className='modal-background' onClick={() => closeLeagueAccountModal()} style={{ cursor: 'pointer' }} />

        <div className='modal-content'>
          <div className='card'>
            <header className='card-header'>
              <p className='card-header-title'>Adicionar conta</p>
            </header>
            <div className='card-content'>
              <div className='content'>
                <form
                  action=''
                  onSubmit={async (event) => {
                    event.preventDefault()

                    const button = document.querySelector('#nickname-search')
                    button.classList.add('is-loading')

                    const nickname = (document.querySelector('#nickname-input') as HTMLInputElement).value
                    const response = await fetch(`api/riot/summoner?nickname=${nickname}`)
                    const responseJson = await response.json()

                    if (responseJson.errors) {
                      document.querySelector('#find-nick-error').classList.remove('is-hidden')
                      document.querySelector('#nickname-input').classList.add('is-danger')
                      document.querySelector('#nickname-change').classList.add('is-hidden')
                      document.querySelector('#nickname-confirm').classList.add('is-hidden')
                    } else {
                      document.querySelector('#find-nick-error').classList.add('is-hidden')
                      document.querySelector('#nickname-input').classList.remove('is-danger')
                      document.querySelector('#nickname-confirm').classList.remove('is-hidden')
                      document.querySelector('#nickname-footer').classList.remove('is-hidden')

                      setLeagueAccount({
                        ...responseJson,
                        confirmationIconId: generateProfileIconId(leagueAccount.profileIconId),
                      })

                      document.querySelector('#nickname-change').classList.remove('is-hidden')
                    }

                    button.classList.remove('is-loading')
                  }}
                >
                  <div className='field'>
                    <label className='label'>Nickname</label>
                    <div className='control is-flex'>
                      <input
                        className='input is-large'
                        type='text'
                        id='nickname-input'
                        placeholder='Digite o seu nome de invocador'
                      />

                      <button className='button is-large is-primary ml-2' id='nickname-search'>
                        Pesquisar
                      </button>
                    </div>
                  </div>

                  <div className='field is-hidden' id='find-nick-error'>
                    <p className='has-text-danger'>Erro: Nickname não encontrado</p>
                  </div>
                </form>

                <form className='is-hidden mt-5' id='nickname-change'>
                  <div className='field'>
                    <label className='label'>Agora, altere o seu ícone de invocador</label>

                    <div className='control is-flex'>
                      <figure className='image is-128x128 mb-0'>
                        <Image src={`/icons/${leagueAccount.confirmationIconId}.png`} layout='fill' />
                      </figure>
                    </div>

                    <p className='has-text-danger-dark pt-3 is-hidden' id='nickname-error'>
                      Erro: O ícone da conta não está igual ao solicitado
                    </p>
                  </div>
                </form>
              </div>
            </div>
            <footer className='card-footer is-hidden' id='nickname-footer'>
              <a
                type='button'
                className='card-footer-item'
                id='nickname-confirm'
                onClick={async () => {
                  const button = document.querySelector('#nickname-confirm')
                  const buttonLoading = document.querySelector('#nickname-loading')

                  button.classList.add('is-hidden')
                  buttonLoading.classList.remove('is-hidden')

                  const response = await fetch(`api/riot/summoner?nickname=${leagueAccount.name}`)
                  const { profileIconId } = await response.json()

                  if (profileIconId === leagueAccount.confirmationIconId) {
                    await fetch(`/api/leagueAccounts/${profile.player.leagueAccounts[0]._id}`, {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        summonerId: leagueAccount.id,
                        accountId: leagueAccount.accountId,
                        puuid: leagueAccount.puuid,
                        nickname: leagueAccount.name,
                        leaguePoints: leagueAccount.leaguePoints ? leagueAccount.leaguePoints : 0,
                        wins: leagueAccount.wins ? leagueAccount.wins : 0,
                        losses: leagueAccount.losses ? leagueAccount.losses : 0,
                        tier: leagueAccount.tier ? leagueAccount.tier : 'UNRANKED',
                        rank: leagueAccount.rank ? leagueAccount.rank : '',
                      }),
                    })

                    setProfile({
                      ...profile,
                      player: {
                        ...profile.player,
                        leagueAccounts: [
                          {
                            ...profile.player.leagueAccounts[0],
                            nickname: leagueAccount.name,
                            tier: leagueAccount.tier ? leagueAccount.tier : 'UNRANKED',
                            rank: leagueAccount.rank ? leagueAccount.rank : '',
                            wins: leagueAccount.wins ? leagueAccount.wins : 0,
                            losses: leagueAccount.losses ? leagueAccount.losses : 0,
                            leaguePoints: leagueAccount.leaguePoints ? leagueAccount.leaguePoints : 0,
                          },
                        ],
                      },
                    })

                    buttonLoading.classList.add('is-hidden')
                    button.classList.remove('is-hidden')

                    document.querySelector('#add-account-button').classList.add('is-hidden')
                    document.querySelector('#nickname-cancel').classList.add('is-hidden')
                    document.querySelector('#nickname-error').classList.add('is-hidden')
                    document.querySelector('#player-nick').classList.remove('is-hidden')

                    closeLeagueAccountModal()
                  } else {
                    document.querySelector('#nickname-error').classList.remove('is-hidden')
                    buttonLoading.classList.add('is-hidden')
                    button.classList.remove('is-hidden')
                  }
                }}
              >
                Salvar
              </a>
              <button className='button card-footer-item is-loading is-hidden' id='nickname-loading' />
            </footer>
          </div>
        </div>

        <button className='modal-close is-large' aria-label='close' onClick={() => closeLeagueAccountModal()} />
      </div>

      <div className='is-flex is-justify-content-center'>
        <div style={{ margin: '0', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>
          <button className='button is-loading is-large' id='loading' />
        </div>
      </div>
    </div>
  )
}
