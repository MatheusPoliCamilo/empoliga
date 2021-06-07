import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Navbar } from '../../components/navbar'

async function fetchTeam(teamId) {
  const response = await fetch(`/api/teams/${teamId}`)
  return await response.json()
}

function Player({ teamPlayer, captain }) {
  console.log(teamPlayer)

  return (
    <div className='columns'>
      <div className='column has-text-centered'>
        <div>
          <figure
            className='image m-0 is-flex is-flex-direction-column is-justify-content-center'
            style={{
              width: '6rem',
              minWidth: '6rem',
              height: '6rem',
              maxHeight: '6rem',
            }}
          >
            <img className='is-rounded' src={teamPlayer.player.player.profilePicture} style={{ maxHeight: '20rem' }} />
          </figure>
        </div>
      </div>

      <div className='column is-flex is-flex-direction-column is-justify-content-center has-text-centered'>
        <p className='title'>{teamPlayer.player.player.leagueAccounts[0].nickname}</p>
      </div>

      <div className='column is-flex is-flex-direction-column is-justify-content-center has-text-centered'>
        <p className='title'>{captain ? 'Capitão' : ''}</p>
      </div>

      <div className='column is-flex is-flex-direction-column is-justify-content-center has-text-centered'>
        <p className='title'>{teamPlayer.player.player.role}</p>
      </div>
    </div>
  )
}

function Players({ teamPlayers, captain }) {
  return teamPlayers.map((teamPlayer, key) => {
    const isCaptain = teamPlayer.player._id === captain._id

    return <Player teamPlayer={teamPlayer} key={key} captain={isCaptain} />
  })
}

export default function Index() {
  const router = useRouter()
  const { teamId } = router.query
  const [team, setTeam] = useState({ logo: '', acronym: '', name: '', players: [] })

  useEffect(() => {
    document.querySelector('body').classList.add('has-navbar-fixed-top')
    document.querySelector('html').style.backgroundColor = 'black'

    if (teamId) {
      fetchTeam(teamId).then(async (team) => {
        setTeam(team)

        document.querySelector('#loading').classList.add('is-hidden')
        document.querySelector('#card').classList.remove('is-hidden')
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

                {team.players && <Players teamPlayers={team.players} captain={team.captain} />}
              </div>
            </div>
          </div>

          <button className='button is-large is-loading' id='loading' />
        </div>
      </div>
    </div>
  )
}
