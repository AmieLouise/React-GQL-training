import React from 'react'
import Page from '../components/Page'

export default function MyApp({ Component, pageProps }) {
  return (
    <Page cool="is cool">
      <Component {...pageProps} />
    </Page>
  )
}
