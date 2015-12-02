import h from 'virtual-dom/h'
import http from 'http'
import toHTML from 'vdom-to-html'

let render = require('../shared/render').default
if (module.hot) {
  module.hot.accept('../shared/render', () => {
    render = require('../shared/render').default
  })
}

export function init (port) {
  return http.createServer()
    .on('listening', () => console.log('Server listening on', port))
    .on('close', () => console.log('Shutting down'))
    .on('error', (err) => console.log('Server error:', err))
    .on('clientError', (err) => console.log('Client error:', err))
    .on('request', (req, res) => {
      console.log(req.url)
      let body = toHTML(
        h('html', [
          h('body', [
            h('div', { id: 'root' }, [
              render({ count: 0 }),
            ]),
            h('script', { src: '/dist/client.js' }),
          ])
        ]))
      res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': body.length })
      res.write(body, () => res.end())
    })
    .listen(port)
}
