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