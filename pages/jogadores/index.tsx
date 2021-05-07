import { useEffect } from 'react'
import { Navbar } from '../../components/navbar'

function Card() {
  return (
    <div className='card'>
      <div className='card-image'>
        <figure className='image is-4by3'>
          <img src='https://bulma.io/images/placeholders/1280x960.png' alt='Placeholder image' />
        </figure>
      </div>
      <div className='card-content'>
        <div className='media'>
          <div className='media-left' title='Diamante 1'>
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
    </div>
  )
}

export default function Index() {
  useEffect(() => {
    document.querySelector('body').classList.add('has-navbar-fixed-top')
  })

  return (
    <div className='has-text-weight-bold'>
      <Navbar />

      <div className='p-6'>
        <div className='columns'>
          <div className='column'>
            <form action=''>
              <div className='field'>
                <label className='label'>Jogador</label>
                <div className='control is-flex'>
                  <input className='input is-large' type='text' placeholder='Digite o nick ou nome do jogador' />
                </div>
              </div>

              <div className='field'>
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
              </div>

              <div className='field is-grouped'>
                <div className='control'>
                  <button className='button is-medium is-primary'>Pesquisar</button>
                </div>
              </div>
            </form>
          </div>
          <div className='column' />
        </div>

        <div className='columns'>
          <div className='column'>
            <Card />
          </div>
          <div className='column'>
            <Card />
          </div>
          <div className='column'>
            <Card />
          </div>
          <div className='column'>
            <Card />
          </div>
          <div className='column'>
            <Card />
          </div>
        </div>

        <div className='columns'>
          <div className='column'>
            <Card />
          </div>
          <div className='column'>
            <Card />
          </div>
          <div className='column'>
            <Card />
          </div>
          <div className='column'>
            <Card />
          </div>
          <div className='column'>
            <Card />
          </div>
        </div>

        <div className='columns'>
          <div className='column'>
            <Card />
          </div>
          <div className='column'>
            <Card />
          </div>
          <div className='column'>
            <Card />
          </div>
          <div className='column'>
            <Card />
          </div>
          <div className='column'>
            <Card />
          </div>
        </div>
      </div>
    </div>
  )
}
