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
    <a href={`/equipes/${team._id}`}>
      <div className='card'>
        <header className='card-header'>
          <p className='card-header-title' style={{ justifyContent: 'center' }}>
            [{team.acronym}] {team.name}
          </p>
        </header>

        <div className='card-image'>
          <figure className='image is-1by1'>
            <img src={team.logo} alt='Logo do time' />
          </figure>
        </div>

        <div className='card-content'>
          <div className='content'>
            <p className='title is-4' style={{ textTransform: 'none' }}>
              Capitão
            </p>
            <p className='subtitle is-6'>{team.captain.name}</p>
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

export default function Index() {
  const [teams, setTeams] = useState([])
  const [cards, setCards] = useState([])

  useEffect(() => {
    fetch('/api/teams').then((response) => {
      response.json().then(({ teams }) => {
        setTeams(teams)

        document.querySelector('#loading').classList.add('is-hidden')
      })
    })
  }, [])

  useEffect(() => {
    document.querySelector('body').classList.add('has-navbar-fixed-top')
  })

  useEffect(() => {
    const cardsChunks = chunkArray(teams, 5)

    setCards(cardsChunks)
  }, [teams])

  return (
    <div className='has-text-weight-bold'>
      <Navbar />

      <div className='p-6'>
        <div className='is-flex is-justify-content-center'>
          <button className='button is-large is-loading' id='loading' />
        </div>

        {cards.length > 0 && <Cards cards={cards} />}
      </div>
    </div>
  )
}
