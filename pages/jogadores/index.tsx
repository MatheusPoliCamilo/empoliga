import { useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar'

function chunkArray(array, chunkSize) {
  const chunks = []

  while (array.length) {
    chunks.push(array.splice(0, chunkSize))
  }

  return chunks
}

function takeCards(users) {}

function Card({ player }) {
  console.log(player)

  return (
    <div className='card'>
      <header className='card-header'>
        <p className='card-header-title' style={{ justifyContent: 'center' }}>
          TOP
        </p>
      </header>

      <div className='card-image'>
        <figure className='image is-4by3'>
          <img src='https://bulma.io/images/placeholders/1280x960.png' alt='Placeholder image' />
        </figure>
      </div>

      <div className='card-content'>
        <div className='media'>
          <div className='media-left' title='Mestre'>
            <figure className='image is-48x48'>
              <img src='https://bulma.io/images/placeholders/96x96.png' alt='Elo' />
            </figure>
          </div>
          <div className='media-content'>
            <p className='title is-4' style={{ textTransform: 'none' }}>
              yBrother
            </p>
            <p className='subtitle is-6'>Fernando Henrique de Souza Santos</p>
          </div>
        </div>

        <div className='content'>
          Itajaí - Santa Catarina
          <br />
          <a href='#'>Furnace e-Sports - Major A</a>
        </div>
      </div>

      <footer className='card-footer'>
        <p className='card-header-title' style={{ justifyContent: 'center' }}>
          Mestre - 8 pontos
        </p>
      </footer>
    </div>
  )
}

function Cards({ cards }) {
  return cards.map((cardChunk, key) => (
    <div className='columns' key={key}>
      {[cardChunk[0], cardChunk[1], cardChunk[2], cardChunk[3], cardChunk[4], cardChunk[5]].map((card, key) => (
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

                const cards = chunkArray(users, 5)
                setCards(cards)

                button.classList.remove('is-loading')
                button.disabled = false
              }}
            >
              <div className='field'>
                <label className='label'>Jogador</label>
                <div className='control is-flex'>
                  <input
                    className='input is-large'
                    type='text'
                    id='nickname'
                    placeholder='Digite o nickname do jogador'
                  />
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
