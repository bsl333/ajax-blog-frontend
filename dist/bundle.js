(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./render":2}],2:[function(require,module,exports){
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
    <small>${tags.join(' ')}<a href="#">edit</a> <a href="#" style="color: red">delete</a></small> 
  </a>
  `
}
},{}]},{},[1]);
