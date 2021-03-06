import { useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar'
import Cookie from 'js-cookie'
// import { generateRankString } from '../../services/generateRankString'

function chunkArray(array, chunkSize) {
  const chunks = []

  while (array.length) {
    chunks.push(array.splice(0, chunkSize))
  }

  return chunks
}

function takeCards(users) {
  return users.filter((user) => {
    const validUser = user.gender && user.birthDate && user.name && user.email && user.player
    const player = user.player

    if (validUser) {
      const leagueAccount = player && player.leagueAccounts[0]
      const validLeagueAccout = leagueAccount && leagueAccount.accountId

      if (validLeagueAccout) {
        return user
      }
    }

    return false
  })
}

function Card({ player }) {
  const [currentUser, setCurrentUser] = useState({ _id: '' })
  const [url, setUrl] = useState('#')

  useEffect(() => {
    const currentUserCookie = Cookie.get('currentUser')

    if (currentUserCookie) {
      setCurrentUser(JSON.parse(currentUserCookie))
    }
  }, [])

  useEffect(() => {
    setUrl(currentUser._id === player._id ? '/perfil' : `/jogador/${player._id}`)
  }, [player, currentUser])

  return (
    <a href={url}>
      <div className='card on-hover-grow'>
        <header className='card-header'>
          <p
            className='card-header-title'
            style={{ justifyContent: 'center', textTransform: 'none', minHeight: '4.5rem' }}
          >
            {player.player.leagueAccounts[0].nickname}
          </p>
        </header>

        <div className='card-image'>
          <figure className='image is-1by1'>
            {player.player.profilePicture && <img src={player.player.profilePicture} />}
          </figure>
        </div>

        <div className='card-content is-flex is-justify-content-center p-4'>
          <div>
            <div className='is-flex is-justify-content-center'>
              <figure className='image mb-4 is-64x64'>
                <img
                  src={`/elo/${
                    player.player.leagueAccounts[0].tier ? player.player.leagueAccounts[0].tier : 'UNRANKED'
                  }.png`}
                  alt='Elo'
                />
              </figure>
            </div>
            <div className='is-flex is-justify-content-center'>
              <p className='title is-4' style={{ textAlign: 'center' }}>
                {player.player.role ? player.player.role : 'Preencher'}
              </p>
            </div>
          </div>

          {/* <div className='content' style={{ minHeight: '3rem' }}> */}
          {/* {player.player.city && player.player.state && `${player.player.city} - ${player.player.state}`}
            <br />
            {player.teams.length > 0 && <b>{player.teams[0].name}</b>} */}
          {/* </div> */}
        </div>

        <footer className='card-footer'>
          <p className='card-header-title' style={{ justifyContent: 'center', textAlign: 'center', minHeight: '6rem' }}>
            {/* {generateRankString(player.player.leagueAccounts[0])} */}
            {player.teams.length > 0 ? <b>{player.teams[0].name}</b> : 'Free agent'}
          </p>
        </footer>
      </div>
    </a>
  )
}

function Cards({ cards }) {
  return cards.map((cardChunk, key) => (
    <div className='columns' key={key}>
      {[cardChunk[0], cardChunk[1], cardChunk[2], cardChunk[3], cardChunk[4]].map((card, key) => (
        <div className='column' key={key}>
          {card && <Card player={card} />}
        </div>
      ))}
    </div>
  ))
}

export default function Index() {
  const [users, setUsers] = useState([])
  const [cards, setCards] = useState([])

  useEffect(() => {
    fetch('/api/users').then((response) => {
      response.json().then(({ users }) => {
        setUsers(users)

        const searchButton = document.querySelector('#search-button') as HTMLButtonElement
        searchButton.classList.remove('is-loading')
        searchButton.disabled = false
      })
    })
  }, [])

  useEffect(() => {
    document.querySelector('body').classList.add('has-navbar-fixed-top')
  })

  useEffect(() => {
    const filteredUsers = takeCards(users)
    const cardsChunks = chunkArray(filteredUsers, 5)

    setCards(cardsChunks)
  }, [users])

  return (
    <div className='has-text-weight-bold'>
      <Navbar />

      <div className='p-6'>
        <div className='columns'>
          <div className='column'>
            <form
              action=''
              onSubmit={(event) => {
                event.preventDefault()

                const button = document.querySelector('#search-button') as HTMLButtonElement
                button.classList.add('is-loading')
                button.disabled = true

                const nickname = (document.querySelector('#nickname') as HTMLInputElement).value

                fetch(`/api/users?nickname=${nickname}`)
                  .then((response) => {
                    response.json().then(({ users }) => {
                      setUsers(users)
                    })
                  })
                  .then(() => {
                    const filteredUsers = takeCards(users)
                    const cardsChunks = chunkArray(filteredUsers, 5)

                    setCards(cardsChunks)

                    button.classList.remove('is-loading')
                    button.disabled = false
                  })
              }}
            >
              <div className='field'>
                <label className='label'>Jogador</label>
                <div className='control is-flex'>
                  <input className='input is-large' type='text' id='nickname' placeholder='Digite o nick' />

                  <button className='button is-large is-primary is-loading ml-3' id='search-button' disabled>
                    Pesquisar
                  </button>
                </div>
              </div>

              {/* <div className='field'>
                <div className='control'>
                  <label className='checkbox'>
                    <input type='checkbox' className='mr-1' defaultChecked />
                    Minor
                  </label>

                  <label className='checkbox ml-5'>
                    <input type='checkbox' className='mr-1' defaultChecked />
                    Tradicional
                  </label>

                  <label className='checkbox ml-5'>
                    <input type='checkbox' className='mr-1' defaultChecked />
                    Major
                  </label>

                  <label className='checkbox ml-5'>
                    <input type='checkbox' className='mr-1' defaultChecked />
                    Free Agent
                  </label>
                </div>
              </div> */}
            </form>
          </div>

          <div className='column' />
        </div>

        {cards.length > 0 && <Cards cards={cards} />}
      </div>
    </div>
  )
}
