import Head from 'next/head'
import Image from 'next/image'

export default function Index () {
  return (
    <div>
      <Head>
        <title>Empoliga</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://empoliga.vercel.app">
            <Image src="/logo.png" width={100} height={100} alt="Logo da Empoliga" />
          </a>

          <span style={{ borderLeft: '2px solid #7E7E7E', paddingTop: '1rem', paddingBottom: '1rem' }}></span>

          <Image src="/lol.png" width={100} height={100} alt="Logo da Empoliga" />

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbar" className="navbar-menu">
          <div className="navbar-start">
          <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                Ligas
              </a>

              <div className="navbar-dropdown">
                <a className="navbar-item">
                  Minor
                </a>
                <a className="navbar-item">
                  Tradicional
                </a>
                <a className="navbar-item">
                  Major
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item">
                  Wild Rift
                </a>
              </div>
            </div>

            <a className="navbar-item">
              Equipes
            </a>

            <a className="navbar-item">
              Jogadores
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-light">
                  Login
                </a>
                <a className="button is-primary">
                  <strong>Cadastre-se</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
