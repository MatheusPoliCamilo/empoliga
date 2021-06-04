import { useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar'
import { generateRankString } from '../../services/generateRankString'

function chunkArray(array, chunkSize) {
  const chunks = []

  while (array.length) {
    chunks.push(array.splice(0, chunkSize))
  }

  return chunks
}

function takeCards(users) {
  return users.filter((user) => {
    const validUser =
      user.gender &&
      user.birthDate &&
      user.name &&
      user.email &&
      user.whatsapp &&
      user.twitter &&
      user.twitch &&
      user.instagram &&
      user.facebook

    if (validUser) {
      const player = user.player
      const validPlayer =
        player &&
        player.role &&
        player.state &&
        player.city &&
        player.profilePicture &&
        player.setupPhoto &&
        // player.rg &&
        // player.cpf &&
        player.address

      if (validPlayer) {
        const leagueAccount = player && player.leagueAccounts[0]
        const validLeagueAccout = leagueAccount && leagueAccount.accountId

        if (validLeagueAccout) {
          return user
        }
      }
    }

    return false
  })
}

function Card({ player }) {
  console.log(player)

  return (
    <div className='card'>
      <header className='card-header'>
        <p className='card-header-title' style={{ justifyContent: 'center' }}>
          {player.player.role}
        </p>
      </header>

      <div className='card-image'>
        <figure className='image is-1by1'>
          <img src={player.player.profilePicture} alt='Placeholder image' />
        </figure>
      </div>

      <div className='card-content'>
        <div className='media'>
          <div className='media-left'>
            <figure className='image' style={{ height: '50px', width: '63px' }}>
              <img
                src={`/elo/${
                  player.player.leagueAccounts[0].tier ? player.player.leagueAccounts[0].tier : 'UNRANKED'
                }.png`}
                alt='Elo'
              />
            </figure>
          </div>
          <div className='media-content'>
            <p className='title is-4' style={{ textTransform: 'none' }}>
              {player.player.leagueAccounts[0].nickname}
            </p>
            <p className='subtitle is-6' style={{ minHeight: '2.5rem' }}>
              {player.name}
            </p>
          </div>
        </div>

        <div className='content'>
          {player.player.city} - {player.player.state}
          <br />
          {/* <a href='#'>Furnace e-Sports - Major A</a> */}
        </div>
      </div>

      <footer className='card-footer'>
        <p className='card-header-title' style={{ justifyContent: 'center' }}>
          {generateRankString(player.player.leagueAccounts[0])}
        </p>
      </footer>
    </div>
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

              <div className='field is-grouped'>
                <div className='control'>
                  <button className='button is-medium is-primary is-loading' id='search-button' disabled>
                    Pesquisar
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className='column' />
        </div>

        {cards.length > 0 && <Cards cards={cards} />}
      </div>
    </div>
  )
}
