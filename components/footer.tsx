import Image from 'next/image'

function Footer() {
  return (
    <footer className='footer'>
      <div className='content has-text-centered'>
        <Image src='/empoliga-preto-branco.svg' width={250} height={250} alt='Logo da Empoliga' />
      </div>

      <div className='has-text-weight-medium has-text-white' style={{ textTransform: 'initial' }}>
        <div className='is-flex is-justify-content-center'>
          <a href='https://www.twitch.tv/empoliga' className='white-hover' style={{ color: '#4a4a4a' }}>
            <svg
              aria-hidden='true'
              focusable='false'
              data-prefix='fab'
              data-icon='twitch'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'
              style={{ height: '3rem', width: '3rem' }}
            >
              <path
                fill='currentColor'
                d='M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z'
              />
            </svg>
          </a>

          <div className='ml-5' />

          <a
            href='https://www.youtube.com/channel/UCEFKywqjVfl0TG2gEYtcRLA'
            className='white-hover'
            style={{ color: '#4a4a4a' }}
          >
            <svg
              aria-hidden='true'
              focusable='false'
              data-prefix='fab'
              data-icon='youtube'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 576 512'
              style={{ height: '3rem', width: '3rem' }}
            >
              <path
                fill='currentColor'
                d='M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z'
              />
            </svg>
          </a>

          <div className='ml-5' />

          <a href='https://twitter.com/empoligaoficial' className='white-hover' style={{ color: '#4a4a4a' }}>
            <svg
              aria-hidden='true'
              focusable='false'
              data-prefix='fab'
              data-icon='twitter'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'
              style={{ height: '3rem', width: '3rem' }}
            >
              <path
                fill='currentColor'
                d='M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z'
              />
            </svg>
          </a>

          <div className='ml-5' />

          <a href='https://www.instagram.com/empoligaoficial' className='white-hover' style={{ color: '#4a4a4a' }}>
            <svg
              aria-hidden='true'
              focusable='false'
              data-prefix='fab'
              data-icon='instagram'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 448 512'
              style={{ height: '3rem', width: '3rem' }}
            >
              <path
                fill='currentColor'
                d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z'
              />
            </svg>
          </a>

          <div className='ml-5' />

          <a href='https://discord.com/invite/hfNQXaJxGf' className='white-hover' style={{ color: '#4a4a4a' }}>
            <svg
              aria-hidden='true'
              focusable='false'
              data-prefix='fab'
              data-icon='discord'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 448 512'
              style={{ height: '3rem', width: '3rem' }}
            >
              <path
                fill='currentColor'
                d='M297.216 243.2c0 15.616-11.52 28.416-26.112 28.416-14.336 0-26.112-12.8-26.112-28.416s11.52-28.416 26.112-28.416c14.592 0 26.112 12.8 26.112 28.416zm-119.552-28.416c-14.592 0-26.112 12.8-26.112 28.416s11.776 28.416 26.112 28.416c14.592 0 26.112-12.8 26.112-28.416.256-15.616-11.52-28.416-26.112-28.416zM448 52.736V512c-64.494-56.994-43.868-38.128-118.784-107.776l13.568 47.36H52.48C23.552 451.584 0 428.032 0 398.848V52.736C0 23.552 23.552 0 52.48 0h343.04C424.448 0 448 23.552 448 52.736zm-72.96 242.688c0-82.432-36.864-149.248-36.864-149.248-36.864-27.648-71.936-26.88-71.936-26.88l-3.584 4.096c43.52 13.312 63.744 32.512 63.744 32.512-60.811-33.329-132.244-33.335-191.232-7.424-9.472 4.352-15.104 7.424-15.104 7.424s21.248-20.224 67.328-33.536l-2.56-3.072s-35.072-.768-71.936 26.88c0 0-36.864 66.816-36.864 149.248 0 0 21.504 37.12 78.08 38.912 0 0 9.472-11.52 17.152-21.248-32.512-9.728-44.8-30.208-44.8-30.208 3.766 2.636 9.976 6.053 10.496 6.4 43.21 24.198 104.588 32.126 159.744 8.96 8.96-3.328 18.944-8.192 29.44-15.104 0 0-12.8 20.992-46.336 30.464 7.68 9.728 16.896 20.736 16.896 20.736 56.576-1.792 78.336-38.912 78.336-38.912z'
              />
            </svg>
          </a>
        </div>

        <div className='is-flex is-justify-content-center mt-5'>Todos os direitos reservados.</div>
        <div className='is-flex is-justify-content-center mt-5'>Desenvolvido por:</div>
        <div className='is-flex is-justify-content-center'>
          <a href='https://www.linkedin.com/in/matheus-poli/'>Matheus Poli Camilo</a>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
