import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Navbar } from '../../components/navbar'
import Cookie from 'js-cookie'

async function fetchTeam(teamId) {
  const response = await fetch(`/api/teams/${teamId}`)
  return await response.json()
}

function Player({ teamPlayer, captain, currentUser }) {
  return (
    <a href={teamPlayer.player._id === currentUser._id ? '/perfil' : `/jogador/${teamPlayer.player._id}`}>
      <div className='columns'>
        <div className='column has-text-centered'>
          <div>
            <figure className='image is-96x96 m-0 is-flex is-flex-direction-column is-justify-content-center'>
              <img className='is-rounded' src={teamPlayer.player.player.profilePicture} />
            </figure>
          </div>
        </div>

        <div className='column is-flex is-flex-direction-column is-justify-content-center has-text-centered'>
          <p className='title'>{teamPlayer?.player?.player?.leagueAccounts[0]?.nickname}</p>
        </div>

        <div className='column is-flex is-flex-direction-column is-justify-content-center has-text-centered'>
          <p className='title'>{captain ? 'Capitão' : ''}</p>
        </div>

        <div className='column is-flex is-flex-direction-column is-justify-content-center has-text-centered'>
          <p className='title'>{teamPlayer.player.player.role ? teamPlayer.player.player.role : 'Preencher'}</p>
        </div>
      </div>
    </a>
  )
}

function Players({ teamPlayers, captain, currentUser }) {
  return teamPlayers.map((teamPlayer, key) => {
    const isCaptain = teamPlayer.player._id === captain._id

    return <Player teamPlayer={teamPlayer} key={key} currentUser={currentUser} captain={isCaptain} />
  })
}

export default function Index() {
  const router = useRouter()
  const { teamId } = router.query
  const [team, setTeam] = useState({ logo: '', acronym: '', name: '', players: [], captain: {} })
  const [currentUser, setCurrentUser] = useState({ _id: '' })

  useEffect(() => {
    document.querySelector('body').classList.add('has-navbar-fixed-top')
    document.querySelector('html').style.backgroundColor = 'black'

    if (teamId) {
      fetchTeam(teamId).then(async (team) => {
        if (team._id) {
          setTeam(team)

          const currentUserCookie = Cookie.get('currentUser')

          if (currentUserCookie) {
            setCurrentUser(JSON.parse(currentUserCookie))
          }

          document.querySelector('#loading').classList.add('is-hidden')
          document.querySelector('#card').classList.remove('is-hidden')
        }
      })
    }
  }, [teamId])

  return (
    <div className='has-text-weight-bold'>
      <Navbar />

      <div className='p-5'>
        <div className='is-flex is-justify-content-center'>
          <div className='card is-hidden' style={{ backgroundColor: 'white', minWidth: '75rem' }} id='card'>
            <div className='card-content'>
              <div className='content'>
                <div className='is-flex p-2 mb-5' style={{ border: '1px solid lightgray' }}>
                  <figure
                    className='image ml-0 mt-0 mb-0 is-flex is-flex-direction-column is-justify-content-center has-background-grey-lighter'
                    style={{
                      width: '6rem',
                      minWidth: '6rem',
                      height: '6rem',
                      maxHeight: '6rem',
                    }}
                  >
                    <img src={team.logo} style={{ maxHeight: '20rem' }} />
                  </figure>

                  <div className='is-flex is-flex-direction-column is-justify-content-center'>
                    <p className='title is-1 mr-5'>{team.acronym}</p>
                  </div>

                  <div className='is-flex is-flex-direction-column is-justify-content-center'>
                    <p className='subtitle is-2'>{team.name}</p>
                  </div>
                </div>

                {team.players && (
                  <Players teamPlayers={team.players} captain={team.captain} currentUser={currentUser} />
                )}
              </div>
            </div>
          </div>

          <button className='button is-large is-loading' id='loading' />
        </div>
      </div>
    </div>
  )
}
