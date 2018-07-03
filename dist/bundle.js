(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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



},{"./render":2}],2:[function(require,module,exports){
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
},{"./template":3}],3:[function(require,module,exports){
module.exports.previousBlogs = ({ title, date, id}) => {
  return `
   <li class="list-group-item list-group-item-action previous-blogs" id="${id}">${title}
    </li>
  `
}

module.exports.selectedBlog = ({ id, title, description, tags, date }) => {
  return `
  <a href="#" class="list-group-item list-group-item-action flex-column align-items-start mt-3">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1" id="blog-title">
        ${title}
      </h5>
    </div>
    <hr>
    <p class="mb-1" id="blog-description">
      ${description}
    </p>
    <hr>
    <div class="d-flex justify-content-between" id="${id}">
      <button class="btn btn-outline-primary" id="update-blog-btn">Update</button>
      <button class="btn btn-outline-danger" id="delete-blog-btn">Delete</button>
    </div>
  </a>
  `
}

// <small id=${id}>${tags ? tags.join(' ') : ''}<a href="#" id="update-blog-btn">Edit</a> <a href="#" style="color: red" id="delete-blog-btn">Delete</a></small> 
},{}]},{},[1]);
