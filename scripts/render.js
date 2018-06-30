const template = require('./template')

const previousPosts = (container, data) => {
  const result = template.previousPosts(data)
  container.innerHTML += result
}

const createEventListenersForPrevPosts = () => {
  Array.from(document.getElementsByClassName('previous-post')).forEach(post => post.addEventListener('click', (event) => {
      console.log(event.target)
    })
  )
}

module.exports = {
  previousPosts,
  createEventListenersForPrevPosts
}