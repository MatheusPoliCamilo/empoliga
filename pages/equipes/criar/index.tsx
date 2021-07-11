import { useEffect, useState } from 'react'
import { Navbar } from '../../../components/navbar'
import Cookie from 'js-cookie'
import getConfig from 'next/config'

export default function Index() {
  const [currentUser, setCurrentUser] = useState({ _id: '' })

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

    document.querySelector('body').classList.add('has-navbar-fixed-top')
  }, [])

  useEffect(() => {
    if (currentUser._id) {
      const button = document.querySelector('#create-team') as HTMLButtonElement

      button.disabled = false
      button.classList.remove('is-loading')
    }
  }, [currentUser])

  return (
    <div className='has-text-weight-bold'>
      <Navbar />

      <div className='p-5'>
        <div className='columns'>
          <form
            className='column is-one-third'
            onSubmit={async (event) => {
              event.preventDefault()

              document.querySelector('#create-team').classList.add('is-loading')

              const acronym = (document.querySelector('#acronym') as HTMLInputElement).value
              const name = (document.querySelector('#name') as HTMLInputElement).value
              const logo = (document.querySelector('#logo') as HTMLInputElement).value

              await fetch(`/api/teams`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ logo, acronym, name, captain: currentUser._id }),
              }).then((response) => {
                response
                  .json()
                  .then(({ team }) => {
                    window.location.href = `/equipe/${team._id}`
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              })
            }}
          >
            <div className='field'>
              <h1 className='title is-1' style={{ textTransform: 'none' }}>
                Crie sua equipe
              </h1>
            </div>

            <div className='field mt-6'>
              <label className='label'>Link da logo</label>
              <input type='text' id='logo' className='input is-large' placeholder='Informe o link da logo' />
            </div>

            <div className='field'>
              <label className='label'>Sigla</label>
              <div className='control'>
                <input
                  name='acronym'
                  type='text'
                  id='acronym'
                  className='input is-large'
                  placeholder='Informe a sigla'
                />
              </div>
            </div>

            <div className='field'>
              <label className='label'>Nome</label>
              <div className='control'>
                <input name='name' type='text' id='name' className='input is-large' placeholder='Informe o nome' />
              </div>
            </div>

            <div className='field'>
              <div className='control'>
                <button className='button is-primary is-large is-loading' id='create-team' disabled>
                  Criar equipe
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
