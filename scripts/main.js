const render = require('./render')
// const baseURL = 'http://localhost:3000'
const baseURL = `https://mighty-chamber-18947.herokuapp.com`
render.getBlogPosts()


const createNewPostBtn = document.querySelector('#create-new-blog-btn')
createNewPostBtn.addEventListener('click', render.showNewBlogSection)

const submitNewBlogForm = document.querySelector('#blog-form')
submitNewBlogForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const title = event.target.title.value
  const description = event.target.description.value
  const date = new Date()
  const body = { title, description, date }
  const id = document.querySelector('.form-group').classList[1]
  
  if (!id) {
    axios.post(`${baseURL}/blogs`, body)
      .then(res => render.getBlogPosts())
      .catch(console.log)
  } else {
    axios.put(`${baseURL}/blogs/${id}`, body)
      .then(res =>  render.getBlogPosts())
      .catch(e => console.log(e))
  }
})


