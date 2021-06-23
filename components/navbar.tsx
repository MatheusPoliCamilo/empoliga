import { useState, useContext } from 'react'
import Image from 'next/image'
import { CurrentUserContext } from '../context/state'
import Cookie from 'js-cookie'

function Navbar() {
  const [active, setActive] = useState(false)
  const { user } = useContext(CurrentUserContext)

  return (
    <nav className='navbar is-fixed-top is-dark' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand ml-5 mr-5'>
        <a href='/' className='pt-1 grow-on-hover'>
          <Image src='/tradicional.svg' width={75} height={70} alt='Logo da Empoliga' />
        </a>

        <span
          className='ml-5 mr-5 mt-5'
          style={{
            borderLeft: '2px solid #3C3C3C',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            maxHeight: '2rem',
          }}
        />

        <Image src='/lol.svg' width={45} height={45} alt='Logo da Empoliga' />

        <a
          role='button'
          className={active ? 'navbar-burger is-active' : 'navbar-burger'}
          aria-label='menu'
          aria-expanded='false'
          data-target='empoliga-navbar'
          onClick={() => setActive(!active)}
        >
          <span aria-hidden='true' />
          <span aria-hidden='true' />
          <span aria-hidden='true' />
        </a>
      </div>

      <div id='empoliga-navbar' className={active ? 'navbar-menu is-active' : 'navbar-menu'}>
        <div className='navbar-start'>
          {/* <div className='navbar-item has-dropdown is-hoverable'>
            <a className='navbar-link pl-5'>Ligas</a>

            <div className='navbar-dropdown'>
              <a className='navbar-item has-text-grey-light'>Minor</a>
              <a className='navbar-item has-text-grey-light'>Tradicional</a>
              <a className='navbar-item has-text-grey-light'>Major</a>
              <hr className='navbar-divider' />
              <a className='navbar-item has-text-grey-light' style={{ pointerEvents: 'none' }}>
                Wild Rift
              </a>
            </div>
          </div> */}

          <a className='navbar-item is-justify-content-center pl-5 pr-5' href='/equipes'>
            Equipes
          </a>

          <a className='navbar-item pl-5 pr-5' href='/jogadores'>
            Jogadores
          </a>

          <a className='navbar-item pl-5 pr-5' href='https://www.twitch.tv/team/empoliga'>
            Streamers
          </a>

          <div className='navbar-item has-dropdown is-hoverable'>
            <a className='navbar-link pl-5'>Regulamentos</a>

            <div className='navbar-dropdown'>
              <a
                className='navbar-item'
                href='https://docs.google.com/document/d/1sTtJEy3tyIg96vmY8N4KQlR8PTqNpX71maiARDbhuAg/edit'
              >
                Tradicional 2021-1
              </a>
              <a className='navbar-item' href='https://drive.google.com/file/d/1ZT6rru4p5nB7trGTHHEAiGcqbVPwezdH/view'>
                Major 2021-1
              </a>
            </div>
          </div>

          <div className='navbar-item has-dropdown is-hoverable'>
            <a className='navbar-link pl-5'>Informações</a>

            <div className='navbar-dropdown'>
              <a className='navbar-item' href='https://empoliga.com/'>
                Notícias
              </a>
              <a className='navbar-item' href='https://empoliga.com/category/empoliga/comunicados-de-penalidade/'>
                Penalidades
              </a>
            </div>
          </div>
        </div>

        <div className='navbar-end mr-6'>
          <div className='navbar-item'>
            <div className='buttons'>
              {user && user._id ? (
                <>
                  <button
                    className='button is-dark p-5 has-text-weight-bold'
                    type='button'
                    onClick={() => {
                      Cookie.remove('token')
                      Cookie.remove('currentUser')
                      window.location.reload()
                    }}
                    style={{ textTransform: 'uppercase' }}
                  >
                    Sair
                  </button>
                  <a href='/perfil' className='button is-primary p-5 ml-1'>
                    Minha conta
                  </a>
                </>
              ) : (
                <>
                  <a className='button is-dark p-5' href='/login'>
                    Login
                  </a>
                  <a className='button is-primary p-5' href='/cadastrar'>
                    <strong>Cadastre-se</strong>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export { Navbar }
