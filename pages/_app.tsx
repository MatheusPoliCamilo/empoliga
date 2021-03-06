import Head from 'next/head'
import '../styles/index.scss'
import React, { useEffect } from 'react'
import { hotjar } from 'react-hotjar'
import { AppWrapper } from '../context/state'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    hotjar.initialize(2338557, 6)
  })

  return (
    <>
      <Head>
        <title>Empoliga</title>

        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#b27826' />

        <meta
          name='description'
          content='Empoliga é um campeonato amador de League of Legends que busca sair dos moldes de torneios de tiro 
          curto e faz com que equipes e jogadores se sintam num ambiente competitivo similar ao profissional, com 
          transmissões, rivalidades, contratações, calendário, acesso e rebaixamento.'
        />

        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='msapplication-TileImage' content='/mstile-144x144.png' />
        <meta name='theme-color' content='#ff0000' />
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        <meta property='og:title' content='Empoliga' />
        <meta property='og:url' content='https://www.empoliga.games/' />
        <meta property='og:description' content='O maior campeonato amador de League of Legends do Brasil!' />
        <meta property='og:image' content='https://www.empoliga.games/android-chrome-512x512.png' />
        <meta property='og:locale' content='pt_BR' />

        <meta name='twitter:card' content='Empoliga - O maior campeonato amador de League of Legends do Brasil!' />
        <meta name='twitter:site' content='@empoligaoficial' />
        <meta name='twitter:creator' content='@matheuspcamilo' />

        {/* Global site tag (gtag.js) - Google Analytics */}
        <script async src='https://www.googletagmanager.com/gtag/js?id=G-J0356FEWDD' />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-J0356FEWDD');
            `,
          }}
        />
      </Head>

      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </>
  )
}
