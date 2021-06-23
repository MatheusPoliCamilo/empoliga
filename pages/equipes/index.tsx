import { useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar'
import Cookie from 'js-cookie'

function chunkArray(array, chunkSize) {
  const chunks = []

  while (array.length) {
    chunks.push(array.splice(0, chunkSize))
  }

  return chunks
}

function Card({ team }) {
  return (
    <a href={`/equipe/${team._id}`}>
      <div className='card'>
        <header className='card-header'>
          <p className='card-header-title' style={{ justifyContent: 'center' }}>
            [{team.acronym}] {team.name}
          </p>
        </header>

        <div className='card-image'>
          <figure className='image is-1by1'>
            <img src={team.logo} className='has-background-grey-lighter' />
          </figure>
        </div>

        <div className='card-content'>
          <div className='content'>
            <p className='title is-4' style={{ textTransform: 'none' }}>
              Capitão
            </p>
            <p className='subtitle is-6'>{team.captain.player.leagueAccounts[0]?.nickname}</p>
          </div>
        </div>
      </div>
    </a>
  )
}

function Cards({ cards }) {
  return cards.map((cardChunk, key) => (
    <div className='columns' key={key}>
      {[cardChunk[0], cardChunk[1], cardChunk[2], cardChunk[3], cardChunk[4]].map((card, key) => (
        <div className='column' key={key}>
          {card && <Card team={card} />}
        </div>
      ))}
    </div>
  ))
}

function Invite({ teamInvites, currentUserId, setCurrentUser }) {
  return teamInvites.map((team, key) => {
    console.log(team)
    return (
      <div className='columns' key={key}>
        <a href={`/equipe/${team._id}`}>
          <div className='column is-one-fifth'>
            <figure className='image has-background-grey-lighter' style={{ height: '4rem', width: '4rem' }}>
              <img src={team.logo} />
            </figure>
          </div>
        </a>

        <a href={`/equipe/${team._id}`} className='column is-align-self-center'>
          <p className='title'>
            [{team.acronym}] {team.name}
          </p>
        </a>

        <div className='column is-one-fifth'>
          <button
            className='button is-primary is-large'
            id={`accept-invite-${key}`}
            onClick={() => {
              const button = document.querySelector(`#accept-invite-${key}`) as HTMLButtonElement
              button.classList.add('is-loading')
              button.disabled = true

              fetch('/api/acceptTeam', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  playerId: currentUserId,
                  teamId: team._id,
                }),
              })
                .then((response) => response.json())
                .then(({ newPlayer }) => {
                  setCurrentUser(newPlayer)

                  button.classList.remove('is-loading')
                  button.disabled = false

                  document.querySelector('#li-cards').classList.add('is-active')
                  document.querySelector('#invites').classList.add('is-hidden')
                  document.querySelector('#cards').classList.remove('is-hidden')
                })
            }}
          >
            Aceitar
          </button>
        </div>
      </div>
    )
  })
}

export default function Index() {
  const [teams, setTeams] = useState([])
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({ _id: '', teamInvites: [], teams: [] })

  useEffect(() => {
    const currentUserCookie = Cookie.get('currentUser')

    if (currentUserCookie) {
      const id = JSON.parse(currentUserCookie)._id

      fetch(`/api/users/${id}`).then((response) => {
        response.json().then((user) => {
          setCurrentUser(user)
        })
      })
    }

    fetch('/api/teams')
      .then((response) => {
        response.json().then(({ teams }) => {
          setTeams(teams)
        })
      })
      .then(() => {
        document.querySelector('#loading').classList.add('is-hidden')
        document.querySelector('#tabs').classList.remove('is-hidden')
      })
  }, [])

  useEffect(() => {
    document.querySelector('body').classList.add('has-navbar-fixed-top')
  })

  useEffect(() => {
    const cardsChunks = chunkArray(teams, 5)

    setCards(cardsChunks)
  }, [teams])

  useEffect(() => {
    if (currentUser._id) document.querySelector('#equipe-button').classList.remove('is-hidden')
  }, [currentUser])

  return (
    <div className='has-text-weight-bold'>
      <Navbar />

      <div className='p-6'>
        {currentUser.teams.length > 0 && (
          <a
            className='button is-medium is-primary is-hidden'
            id='equipe-button'
            href={`/equipe/${currentUser.teams[0]._id}`}
          >
            Minha equipe
          </a>
        )}

        {!(currentUser.teams.length > 0) && currentUser._id && (
          <a className='button is-medium is-primary is-hidden' href='/equipes/criar' id='equipe-button'>
            Criar equipe
          </a>
        )}

        <div className='tabs is-centered is-boxed is-medium is-hidden' id='tabs'>
          <ul>
            <li className='is-active' id='li-cards'>
              <a
                onClick={() => {
                  document.querySelector('#li-cards').classList.add('is-active')
                  document.querySelector('#li-invites').classList.remove('is-active')
                  document.querySelector('#invites').classList.add('is-hidden')
                  document.querySelector('#cards').classList.remove('is-hidden')
                }}
              >
                <span>Equipes</span>
              </a>
            </li>

            {currentUser.teamInvites.length > 0 && (
              <li id='li-invites'>
                <a
                  onClick={() => {
                    document.querySelector('#li-invites').classList.add('is-active')
                    document.querySelector('#li-cards').classList.remove('is-active')
                    document.querySelector('#cards').classList.add('is-hidden')
                    document.querySelector('#invites').classList.remove('is-hidden')
                  }}
                >
                  <span>Meus convites</span>
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className='is-flex is-justify-content-center'>
          <button className='button is-large is-loading' id='loading' />
        </div>

        <div id='cards'>{cards.length > 0 && <Cards cards={cards} />}</div>

        <div className='content is-hidden is-flex is-justify-content-center' id='invites'>
          <div>
            <Invite
              teamInvites={currentUser.teamInvites}
              currentUserId={currentUser._id}
              setCurrentUser={setCurrentUser}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
