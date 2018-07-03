const render = require('./render')
const baseURL = 'http://localhost:3000'
function getBlogPosts() {
  return axios.get(`${baseURL}/blog-post`)
    .then(res => {
      const ul = document.getElementById('previous-blogs')
      ul.innerHTML = ''
      const data = res.data.data
      data.forEach(el => render.previousBlogs(ul, el));
      render.createEventListenersForPrevPosts(data)
      render.showNewestBlog(data)
      addUpdateBtn()
      addDeleteBtn()
    })
    .catch(e => console.log(e))
}

getBlogPosts()

const createNewPostBtn = document.querySelector('#create-new-blog-btn')
createNewPostBtn.addEventListener('click', render.showNewBlogSection)

const submitNewBlogForm = document.querySelector('#blog-form')
submitNewBlogForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const title = event.target.title.value
  const description = event.target.description.value
  const date = new Date()
  const body = { title, description, date }

  axios.post(`${baseURL}/blog-post`, body)
    .then(res => {
      getBlogPosts()
    })
    .catch(console.log)
})

function addDeleteBtn() {
  const deleteBlogBtn = document.querySelector('#delete-blog-btn')

  deleteBlogBtn.addEventListener('click', (event) => {
    event.preventDefault()
    const id = event.target.parentElement.id
    console.log(id)
    axios.delete(`${baseURL}/blog-post/${id}`)
      .then(res => getBlogPosts())
      .catch(e => console.log(e))
  })
}

function addUpdateBtn () {
  const updateBlogBtn = document.querySelector('#update-blog-btn')
  updateBlogBtn.addEventListener('click', (event) => {
    event.preventDefault()
    const id = event.target.parentElement.id
    console.log(id)
    const title = document.querySelector('#blog-title').textContent.trim()
    const description = document.querySelector('#blog-description').textContent.trim()
    console.log(title, description)
  })
}


