const template = require('./template')
// const baseURL = 'http://localhost:3000'
const baseURL = `https://mighty-chamber-18947.herokuapp.com`

function getBlogPosts() {
  return axios.get(`${baseURL}/blogs`)
    .then(res => {
      const ul = document.getElementById('previous-blogs')
      ul.innerHTML = ''
      const data = res.data.data
      data.forEach(el => previousBlogs(ul, el));
      createEventListenersForPrevPosts(data)
      showNewestBlog(data)
      addUpdateBtn()
      addDeleteBtn()
    })
    .catch(e => console.log(e))
}
const createEventListenersForPrevPosts = (data) => {
  const previousBlogs = Array.from(document.getElementsByClassName('previous-blogs'))
  previousBlogs.forEach(blog => blog.addEventListener('click', (event) => {
    removeActiveClassFromPreviousBlogs()
    event.target.classList.add('active')
    const blog = data.find(el => el.id === event.target.id)
    selectedBlog(blog)
    showSelectedBlog()
    addDeleteBtn()
    addUpdateBtn()
    })
  )
}

const previousBlogs = (container, data) => {
  const result = template.previousBlogs(data)
  container.innerHTML += result
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


const showNewBlogSection = () => {
  const selectedBlog = document.querySelector('#selected-blog-div')
  const newBlogForm = document.querySelector('#new-blog-form')
  selectedBlog.classList.add('d-none')
  newBlogForm.classList.remove('d-none')
  document.querySelector('#title').value = ''
  document.querySelector('#description').value = ''
  document.querySelector('.form-group').className = 'form-group'
  removeActiveClassFromPreviousBlogs()
}
const removeActiveClassFromPreviousBlogs = () => {
  const previousBlogs = Array.from(document.getElementsByClassName('previous-blogs'))
  previousBlogs.forEach(blog => blog.classList.remove('active'))
}


function addDeleteBtn() {
  const deleteBlogBtn = document.querySelector('#delete-blog-btn')
  deleteBlogBtn.addEventListener('click', (event) => {
    event.preventDefault()
    const id = event.target.parentElement.id
    axios.delete(`${baseURL}/blogs/${id}`)
      .then(res => getBlogPosts())
      .catch(e => console.log(e))
  })
}

function addUpdateBtn () {
  const updateBlogBtn = document.querySelector('#update-blog-btn')
  updateBlogBtn.addEventListener('click', (event) => {
    event.preventDefault()
    const id = event.target.parentElement.id
    const title = document.querySelector('#blog-title').textContent.trim()
    const description = document.querySelector('#blog-description').textContent.trim()
    showNewBlogSection()
    document.querySelector('#title').value = title
    document.querySelector('#description').value = description
    document.querySelector('.form-group').className = `form-group ${id}`
  })
}

module.exports = {
  getBlogPosts,
  previousBlogs,
  createEventListenersForPrevPosts,
  showNewBlogSection,
  selectedBlog,
  showSelectedBlog,
  showNewestBlog
}