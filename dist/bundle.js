(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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


},{"./render":2}],2:[function(require,module,exports){
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

const selectedBlog = (data) => {
  const container = document.querySelector('#selected-blog-content')
  container.innerHTML = template.selectedBlog(data)
}

const showNewBlogSection = () => {
  const selectedBlog = document.querySelector('#selected-blog-div')
  const newBlogForm = document.querySelector('#new-blog-form')
  selectedBlog.classList.add('d-none')
  newBlogForm.classList.remove('d-none')
  removeActiveClassFromPreviousBlogs()
}

const showSelectedBlog = () => {
  const selectedBlog1 = document.querySelector('#selected-blog-div')
  const newBlogForm = document.querySelector('#new-blog-form')

  selectedBlog1.classList.remove('d-none')
  newBlogForm.classList.add('d-none')
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
  showSelectedBlog

}
},{"./template":3}],3:[function(require,module,exports){
module.exports.previousBlogs = ({ title, date, id}) => {
  return `
   <li class="list-group-item list-group-item-action previous-blogs" id="${id}">${title} -- ${date}
    </li>
  `
}

module.exports.selectedBlog = ({ title, description, tags, date }) => {
  return `
  <a href="#" class="list-group-item list-group-item-action flex-column align-items-start mt-3">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">
        ${title}
      </h5>
    </div>
    <hr>
    <p class="mb-1">
      ${description}
    </p>
    <hr>
    <small>${tags ? tags.join(' ') : ''}<a href="#" id="update-blog-btn">Edit</a> <a href="#" style="color: red" id="delete-blog-btn">Delete</a></small> 
  </a>
  `
}
},{}]},{},[1]);
