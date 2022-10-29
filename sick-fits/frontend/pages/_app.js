import React from 'react'
import NProgress from 'nprogress'
import Page from '../components/Page'
import Router from 'next/router'
import '../components/styles/nprogress.css'

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})
Router.events.on('routeChangeError', () => {
  NProgress.start()
})


export default function MyApp({ Component, pageProps }) {
  return (
    <Page cool="is cool">
      <Component {...pageProps} />
    </Page>
  )
}
