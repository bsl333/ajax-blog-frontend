const template = require('./template')

const previousBlogs = (container, data) => {
  // container.innerHTML = ''
  const result = template.previousBlogs(data)
  container.innerHTML += result
}

const createEventListenersForPrevPosts = (data) => {
  const previousBlogs = Array.from(document.getElementsByClassName('previous-blogs'))
  previousBlogs.forEach(blog => blog.addEventListener('click', (event) => {
    removeActiveClassFromPreviousBlogs()
    event.target.classList.add('active')
    const blog = data.find(el => el.id === event.target.id)
    selectedBlog(blog)
    showSelectedBlog()
    })
  )
}

const selectedBlog = (blog) => {
  const container = document.querySelector('#selected-blog-content')
  container.innerHTML = template.selectedBlog(blog)
}
const showSelectedBlog = () => {
  const selectedBlog1 = document.querySelector('#selected-blog-div')
  const newBlogForm = document.querySelector('#new-blog-form')

  selectedBlog1.classList.remove('d-none')
  newBlogForm.classList.add('d-none')
}
const showNewestBlog = (data) => {
  const newestBlog = data.slice(-1)[0]
  selectedBlog(newestBlog)
  showSelectedBlog()
}


const showNewBlogSection = (data) => {
  const selectedBlog = document.querySelector('#selected-blog-div')
  const newBlogForm = document.querySelector('#new-blog-form')
  selectedBlog.classList.add('d-none')
  newBlogForm.classList.remove('d-none')
  removeActiveClassFromPreviousBlogs()
}
const removeActiveClassFromPreviousBlogs = () => {
  const previousBlogs = Array.from(document.getElementsByClassName('previous-blogs'))
  previousBlogs.forEach(blog => blog.classList.remove('active'))
}

module.exports = {
  previousBlogs,
  createEventListenersForPrevPosts,
  showNewBlogSection,
  selectedBlog,
  showSelectedBlog,
  showNewestBlog
}