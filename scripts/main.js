const render = require('./render')
const baseURL = 'http://localhost:3000'
axios.get(`${baseURL}/blog-post`)
  .then(res => {
    const ul = document.getElementById('previous-post')
    const data = res.data.data
    data.forEach(el => render.previousPosts(ul, el));
    render.createEventListenersForPrevPosts()
  })
  .catch(e => console.log(e))
