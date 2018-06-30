module.exports.previousBlogs = ({ title, date, id}) => {
  return `
   <li class="list-group-item list-group-item-action previous-blogs" id="${id}">${title} -- ${date}
    </li>
  `
}

module.exports.selectedBlog = ({ title, description, tags, date }) => {
  return `
  <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">
        ${title}
      </h5>
    </div>
    <p class="mb-1">
      ${description}
    </p>
    <small>${tags.join(' ')}</small>
  </a>
  `
}