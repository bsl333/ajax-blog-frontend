const render = require('./render')
const baseURL = 'http://localhost:3000'
function getBlogPosts() {
  axios.get(`${baseURL}/blog-post`)
    .then(res => {
      const ul = document.getElementById('previous-blogs')
      ul.innerHTML = ''
      const data = res.data.data
      data.forEach(el => render.previousBlogs(ul, el));
      render.createEventListenersForPrevPosts(data)
      return data
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
        .then(resp => {
          console.log(resp)
          const newest = resp.slice(-1)[0]
          render.selectedBlog(newest)
          render.showSelectedBlog()
        })
    })
    .catch(console.log)
})

const updateBlog = document.querySelector('#update-blog-btn')

updateBlog.addEventListener('click', (event) => {
  event.preventDefault()
})

