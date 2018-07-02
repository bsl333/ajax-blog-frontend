const render = require('./render')
const baseURL = 'http://localhost:3000'
axios.get(`${baseURL}/blog-post`)
  .then(res => {
    const ul = document.getElementById('previous-blogs')
    const data = res.data.data
    data.forEach(el => render.previousBlogs(ul, el));
    render.createEventListenersForPrevPosts(data)
  })
  .catch(e => console.log(e))

  const createNewPostBtn = document.querySelector('#create-new-blog-btn')

  createNewPostBtn.addEventListener('click', render.showNewBlogSection)
