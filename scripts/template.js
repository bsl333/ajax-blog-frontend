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
    <div class="d-flex justify-content-end" ${id && `id="${id}"`}">
      <button class="btn btn-outline-primary mr-2" id="update-blog-btn">Update</button>
      <button class="btn btn-outline-danger ml-2" id="delete-blog-btn">Delete</button>
    </div>
  </a>
  `
}

// <small id=${id}>${tags ? tags.join(' ') : ''}<a href="#" id="update-blog-btn">Edit</a> <a href="#" style="color: red" id="delete-blog-btn">Delete</a></small> 