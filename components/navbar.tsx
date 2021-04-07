import { useState } from 'react'
import Image from 'next/image'

function Navbar() {
  const [active, setActive] = useState(false)

  return (
    <nav className='navbar is-fixed-top is-dark' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand ml-5 mr-5'>
        <a href='https://empoliga.vercel.app' className='pt-1'>
          <Image src='/logo.svg' width={75} height={70} alt='Logo da Empoliga' />
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
          <div className='navbar-item has-dropdown is-hoverable'>
            <a className='navbar-link pl-5'>Ligas</a>

            <div className='navbar-dropdown'>
              <a className='navbar-item'>Minor</a>
              <a className='navbar-item'>Tradicional</a>
              <a className='navbar-item'>Major</a>
              <hr className='navbar-divider' />
              <a className='navbar-item has-text-grey-light' style={{ pointerEvents: 'none' }}>
                Wild Rift
              </a>
            </div>
          </div>

          <a className='navbar-item is-justify-content-center pl-5 pr-5'>Equipes</a>

          <a className='navbar-item pl-5 pr-5'>Jogadores</a>
        </div>

        <div className='navbar-end mr-6'>
          <div className='navbar-item'>
            <div className='buttons'>
              <a className='button is-dark pl-5 pr-5'>Login</a>
              <a className='button is-primary p-5' style={{ borderRadius: 'unset' }}>
                <strong>Cadastre-se</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export { Navbar }
