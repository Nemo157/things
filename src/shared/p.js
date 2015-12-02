let onces = {}

export const once = (id, callback) => (onces[id] || (onces[id] = [])).push(callback)
export const post = (id, data) => {
  let callbacks = onces[id] || []
  onces[id] = []
  callbacks.forEach(c => c(data))
}

const p = { once, post }
export default p
