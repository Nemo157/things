import h from 'virtual-dom/h'

export default function render (state) {
  return h('div', [
    h('div', {
      style: {
        textAlign: 'center',
        lineHeight: '50px',
        border: '10px solid blue',
        width: '50px',
        height: '50px'
      },
    }, [
      `${state.count}`,
    ]),
    state.stories && renderStories(state.stories),
  ])
}

function renderStories (stories) {
  return h('div', [
    h('h2', ['Stories']),
    h('ol', stories.map(story => h('li', [renderStory(story)]))),
  ])
}

function renderStory (story) {
  return h('div', [
    h('a', {
      href: story.url,
    }, [
      `${story.title}`,
    ]),
    ` submitted by `,
    h('i', [story.by]),
  ])
}
