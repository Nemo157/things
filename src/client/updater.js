import fetch from 'isomorphic-fetch'

import p from '../shared/p'
var update = require('../shared/update').default
if (module.hot) {
  module.hot.accept('../shared/update', () => {
    update = require('../shared/update').default
  })
}
//import actions from '../shared/actions'

const queueTick = _ => {
  p.post('action.queue', update)
  setTimeout(queueTick, 1000)
}

setTimeout(queueTick, 1000)

// state: Promise<State>
// action: State => State | Promise<State>
const enqueue = state => (
  state.then(newState => p.post('state.update', newState)),
  action => p.once('action.queue', enqueue(state.then(action))))

const initialState = { count: 0 }
p.once('action.queue', enqueue(Promise.resolve(initialState)))

p.post(
  'action.queue',
  state =>
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(res => res.json())
      .then(ids =>
        Promise.all(
          ids.slice(0, 10)
            .map((id, index) =>
              fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                .then(res => res.json())
                .then(res => { res.index = index; return res })))
        .then(stories => ({
          count: state.count,
          stories,
        }))))
