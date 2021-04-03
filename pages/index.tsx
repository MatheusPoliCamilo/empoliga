import Head from 'next/head'

export default function Index () {
  return (
    <div>
      <Head>
        <title>Empoliga</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <a className="button is-primary">
        Button
      </a>
      <p>Hello Next.js</p>
    </div>
  )
}
