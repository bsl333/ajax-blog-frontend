const template = require('./template')

const previousBlogs = (container, data) => {
  const result = template.previousBlogs(data)
  container.innerHTML += result
}



const createEventListenersForPrevPosts = (data) => {
  const previousBlogs = Array.from(document.getElementsByClassName('previous-blogs'))
  console.log(previousBlogs)
  previousBlogs.forEach(blog => blog.addEventListener('click', (event) => {
    previousBlogs.forEach(blog => blog.classList.remove('active'))
    event.target.classList.add('active')
    const blog = data.find(el => el.id === event.target.id)
    selectedBlog(blog)
    })
  )
}

const selectedBlog = (data) => {
  console.log(data)
  const container = document.querySelector('#selected-blog')
  container.innerHTML = template.selectedBlog(data) 
}

module.exports = {
  previousBlogs,
  createEventListenersForPrevPosts
}