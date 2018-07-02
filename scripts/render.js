const template = require('./template')

const previousBlogs = (container, data) => {
  const result = template.previousBlogs(data)
  container.innerHTML += result
}



const createEventListenersForPrevPosts = (data) => {
  const previousBlogs = Array.from(document.getElementsByClassName('previous-blogs'))
  previousBlogs.forEach(blog => blog.addEventListener('click', (event) => {
    previousBlogs.forEach(blog => blog.classList.remove('active'))
    event.target.classList.add('active')
    const blog = data.find(el => el.id === event.target.id)
    selectedBlog(blog)

    const selectedBlog1 = document.querySelector('#selected-blog-div')
    const newBlogForm = document.querySelector('#new-blog-form')

    // console.log(selectedBlog, newBlogForm)
    selectedBlog1.classList.remove('d-none')
    newBlogForm.classList.add('d-none')

    })
  )
}

const selectedBlog = (data) => {
  const container = document.querySelector('#selected-blog-content')
  container.innerHTML = template.selectedBlog(data) 
}

const showNewBlogSection = () => {
    const selectedBlog = document.querySelector('#selected-blog-div')
    const newBlogForm = document.querySelector('#new-blog-form')

    // console.log(selectedBlog, newBlogForm)
    selectedBlog.classList.add('d-none')
    newBlogForm.classList.remove('d-none')
}

module.exports = {
  previousBlogs,
  createEventListenersForPrevPosts,
  showNewBlogSection
}