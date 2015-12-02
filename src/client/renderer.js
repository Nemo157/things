import VPatch from 'virtual-dom/vnode/vpatch'
import createElement from 'virtual-dom/create-element'
import diff from 'virtual-dom/diff'
import h from 'virtual-dom/h'
import patch from 'virtual-dom/patch'
import virtualHtml from 'virtual-html'

import p from '../shared/p'

var render = require('../shared/render').default
if (module.hot) {
  module.hot.accept('../shared/render', () => {
    render = require('../shared/render').default
  })
}

const rerender = rootNode => tree => state => {
  const newTree = h('div', { id: 'root' }, [render(state)])
  const patches = diff(tree, newTree)
  const newRootNode = patch(rootNode, patches)
  p.once('state.update', rerender(newRootNode)(newTree))
}

const initialRootNode = document.getElementById('root')
const initialTree = virtualHtml(initialRootNode.outerHTML)
p.once('state.update', rerender(initialRootNode)(initialTree))
