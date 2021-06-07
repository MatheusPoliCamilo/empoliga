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
      const button = document.querySelector('#create-team')

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

              const fileInput = document.querySelector('#logo') as HTMLInputElement

              if (fileInput.files.length > 0) {
                const file = (document.querySelector('#logo') as HTMLInputElement).files[0]

                const { publicRuntimeConfig } = getConfig()
                const formData = new FormData()
                formData.append('file', file)
                formData.append('upload_preset', publicRuntimeConfig.CLOUDINARY_UPLOAD_PRESET)

                fetch(publicRuntimeConfig.CLOUDINARY_URL, {
                  method: 'POST',
                  body: formData,
                })
                  .then((response) => response.json())
                  .then(async (data) => {
                    if (data.secure_url !== '') {
                      const logo = data.secure_url
                      const acronym = (document.querySelector('#acronym') as HTMLInputElement).value
                      const name = (document.querySelector('#name') as HTMLInputElement).value

                      await fetch(`/api/teams`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ logo, acronym, name, captain: currentUser._id }),
                      }).then((response) => {
                        response.json().then(({ team }) => {
                          window.location.href = `/equipe/${team._id}`
                        })
                      })
                    }
                  })
                  .catch((err) => {
                    console.error(err)
                  })
              }
            }}
          >
            <div className='field'>
              <h1 className='title is-1' style={{ textTransform: 'none' }}>
                Crie sua equipe:
              </h1>
            </div>

            <div className='field mt-6'>
              <div className='file is-centered is-boxed is-primary has-name'>
                <label className='file-label'>
                  <input
                    className='file-input'
                    type='file'
                    id='logo'
                    name='logo'
                    onChange={() => {
                      const fileInput = document.querySelector('#logo') as HTMLInputElement

                      if (fileInput.files.length > 0) {
                        const fileName = document.querySelector('.file-name')
                        fileName.textContent = fileInput.files[0].name
                      }
                    }}
                  />
                  <span className='file-cta'>
                    <span className='file-icon'>
                      <svg
                        aria-hidden='true'
                        focusable='false'
                        data-prefix='fas'
                        data-icon='upload'
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 512 512'
                        className='svg-inline--fa fa-upload fa-w-16 fa-3x'
                      >
                        <path
                          fill='currentColor'
                          d='M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'
                          className=''
                        />
                      </svg>
                    </span>
                    <span className='file-label'>Logo da equipe</span>
                  </span>
                  <span className='file-name'>Escolha a logo da equipe</span>
                </label>
              </div>
            </div>

            <div className='field'>
              <label className='label'>Sigla da equipe</label>
              <div className='control'>
                <input
                  name='acronym'
                  type='text'
                  id='acronym'
                  className='input'
                  placeholder='Informe a sigla da equipe'
                />
              </div>
            </div>

            <div className='field'>
              <label className='label'>Nome da equipe</label>
              <div className='control'>
                <input name='name' type='text' id='name' className='input' placeholder='Informe o nome da equipe' />
              </div>
            </div>

            <div className='field'>
              <div className='control'>
                <button className='button is-primary is-medium is-loading' id='create-team' disabled>
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
