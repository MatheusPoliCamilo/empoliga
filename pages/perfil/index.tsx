import { useEffect } from 'react'
import { Navbar } from '../../components/navbar'

function openProfilePictureModal() {
  document.querySelector('html').classList.add('is-clipped')
  document.querySelector('.modal').classList.add('is-active')
}

function closeProfilePictureModal() {
  document.querySelector('html').classList.remove('is-clipped')
  document.querySelector('.modal').classList.remove('is-active')
}

export default function Index() {
  useEffect(() => {
    document.querySelector('body').classList.add('has-navbar-fixed-top')
  })

  return (
    <div className='has-text-weight-bold'>
      <Navbar />

      <div className='columns'>
        <div className='column is-one-fifth' style={{ height: '55rem' }}>
          <figure className='image is-4by3' onClick={() => openProfilePictureModal()} style={{ cursor: 'pointer' }}>
            <img src='https://bulma.io/images/placeholders/1280x960.png' alt='Placeholder image' />
          </figure>
        </div>
        <div className='column' style={{ height: '55rem' }} />
      </div>

      <div className='modal'>
        <div className='modal-background' onClick={() => closeProfilePictureModal()} style={{ cursor: 'pointer' }} />
        <div className='modal-content'>
          <p className='image is-4by3'>
            <img src='https://bulma.io/images/placeholders/1280x960.png' />
          </p>
        </div>
        <button className='modal-close is-large' aria-label='close' onClick={() => closeProfilePictureModal()} />
      </div>
    </div>
  )
}
