// import React from 'react'
import Document, { Html, Head, NextScript, Main } from 'next/document'

export default class _document extends Document {
    render() {
        return (
            <Html lang='en-GB' >
                <body>
                {/* <Head></Head> */}
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}
