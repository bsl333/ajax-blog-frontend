(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./render":2}],2:[function(require,module,exports){
const template = require('./template')

const previousPosts = (container, data) => {
  const result = template.previousPosts(data)
  container.innerHTML += result
}

const createEventListenersForPrevPosts = () => {
  Array.from(document.getElementsByClassName('previous-post')).forEach(post => post.addEventListener('click', (event) => {
      console.log(event.target)
    })
  )
}

module.exports = {
  previousPosts,
  createEventListenersForPrevPosts
}
},{"./template":3}],3:[function(require,module,exports){
module.exports.previousPosts = ({ title, date }) => {
  return `
   <li class="list-group-item list-group-item-action previous-post">${title}</li>
  `
}
},{}]},{},[1]);
