// import cowsay from 'cowsay-browser'

// export default () =>
//   <pre>
//     {cowsay.say({ text: 'hi there!' })}
//   </pre>

// export default () => <p style={{ color: 'red' }}>hi there</p>

// export default () => <img src="/static/my-image.png" alt="my image" />

// export default () =>
//   <div>
//     Hello world
//     <p>scoped!</p>
//     <style jsx>{`
//       p {
//         color: blue;
//       }
//       div {
//         background: red;
//       }
//       @media (max-width: 600px) {
//         div {
//           background: blue;
//         }
//       }
//     `}</style>
//     <style global jsx>{`
//       body {
//         background: black;
//       }
//     `}</style>
//   </div>

// import Head from 'next/head'

// export default () =>
//   <div>
//     <Head>
//       <title>My page title</title>
//       <meta name="viewport" content="initial-scale=1.0, width=device-width" />
//     </Head>
//     <p>Hello world!</p>
//   </div>


// import Head from 'next/head'
// export default () => (
//   <div>
//     <Head>
//       <title>My page title</title>
//       <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
//     </Head>
//     <Head>
//       <meta name="viewport" content="initial-scale=1.2, width=device-width" key="viewport" />
//     </Head>
//     <p>Hello world!</p>
//   </div>
// )

// import React from 'react'

// export default class extends React.Component {
//   static async getInitialProps({ req }) {
//     const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
//     return { userAgent }
//   }

//   render() {
//     return (
//       <div>
//         Hello World {this.props.userAgent}
//       </div>
//     )
//   }
// }


// const Page = ({ stars }) =>
//   <div>
//     Next stars: {stars}
//   </div>

// Page.getInitialProps = async ({ req }) => {
//   const res = await fetch('https://api.github.com/repos/zeit/next.js')
//   const json = await res.json()
//   return { stars: json.stargazers_count }
// }

// export default Page

// pages/index.js
// import Link from 'next/link'

// export default () =>
//   <div>
//     Click{' '}
//     <Link href="/about">
//       <a>here</a>
//     </Link>{' '}
//     to read more
//   </div>

// pages/index.js
// import Link from 'next/link'

// export default () =>
//   <div>
//     Click{' '}
//     <Link href={{ pathname: '/about', query: { name: 'Zeit' } }}>
//       <a>here</a>
//     </Link>{' '}
//     to read more
//   </div>


// import Link from 'next/link'

// export default () =>
//   <div>
//     Click{' '}
//     <Link href="/about" replace>
//       <a>here</a>
//     </Link>{' '}
//     to read more
//   </div>


// import Link from 'next/link'

// export default () =>
//   <div>
//     Click{' '}
//     <Link href="/about">
//       <img src="/static/image.png" alt="image" />
//     </Link>
//   </div>

// import Router from 'next/router'

// export default () =>
//   <div>
//     Click <span onClick={() => Router.push('/about')}>here</span> to read more
//   </div>

// import Router from 'next/router'

// Router.beforePopState(({ url, as, options }) => {
//   // I only want to allow these two routes!
//   if (as !== "/" || as !== "/other") {
//     // Have SSR render bad routes as a 404.
//     window.location.href = as
//     return false
//   }

//   return true
// });


// import Link from 'next/link'

// // example header component
// export default () =>
//   <nav>
//     <ul>
//       <li>
//         <Link prefetch href="/">
//           <a>Home</a>
//         </Link>
//       </li>
//       <li>
//         <Link prefetch href="/about">
//           <a>About</a>
//         </Link>
//       </li>
//       <li>
//         <Link prefetch href="/contact">
//           <a>Contact</a>
//         </Link>
//       </li>
//     </ul>
//   </nav>


// import React from 'react'
// import { withRouter } from 'next/router'

// class MyLink extends React.Component {
//   componentDidMount() {
//     const { router } = this.props
//     router.prefetch('/dynamic')
//   }

//   render() {
//     const { router } = this.props
//     return (
//       <div>
//         <a onClick={() => setTimeout(() => router.push('/dynamic'), 100)}>
//           A route transition will happen after 100ms
//         </a>
//       </div>
//     )
//   }
// }
// export default withRouter(MyLink)

const next = require('next')
const micro = require('micro')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handleNextRequests = app.getRequestHandler()

app.prepare().then(() => {
  const server = micro((req, res) => {
    // Add assetPrefix support based on the hostname
    if (req.headers.host === 'my-app.com') {
      app.setAssetPrefix('http://cdn.com/myapp')
    } else {
      app.setAssetPrefix('')
    }

    handleNextRequests(req, res)
  })

  server.listen(port, (err) => {
    if (err) {
      throw err
    }

    console.log(`> Ready on http://localhost:${port}`)
  })
})