import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Navbar } from '../../components/navbar'

async function fetchTeam(teamId) {
  const response = await fetch(`/api/teams/${teamId}`)
  return await response.json()
}

export default function Index() {
  const router = useRouter()
  const { teamId } = router.query
  const [team, setTeam] = useState({ logo: '' })

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

  console.log('teamId', teamId)
  console.log(team)

  return (
    <div className='has-text-weight-bold'>
      <Navbar />

      <div className='p-5'>
        <div className='is-flex is-justify-content-center'>
          <div className='card is-hidden' style={{ backgroundColor: 'white' }} id='card'>
            <div className='card-content'>
              <div className='content'>
                <div className='is-flex'>
                  <figure
                    className='image ml-0 mt-0 mb-5 is-flex is-flex-direction-column is-justify-content-center has-background-grey-lighter'
                    style={{
                      width: '6rem',
                      minWidth: '6rem',
                      height: '6rem',
                      maxHeight: '6rem',
                    }}
                  >
                    <img src={team.logo} style={{ maxHeight: '20rem' }} />
                  </figure>

                  <p className='title is-1'>{team.acronym}</p>

                  <p className='title is-2'>{team.name}</p>
                </div>
              </div>
            </div>
          </div>

          <button className='button is-large is-loading' id='loading' />
        </div>
      </div>
    </div>
  )
}
