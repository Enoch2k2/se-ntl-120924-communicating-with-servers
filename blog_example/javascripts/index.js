form.addEventListener('submit', Blog.handleSubmit)

Blog.getBlogs()

function editBlog(event) {
  console.log('hi')
  const id =  event.target.dataset.id
  editedBlog = Blog.all.find(b => b.id === id)
  toggleForm()
}

function toggleForm() {
  editing = !editing
  if(editing) {
    form.parentNode.querySelector('h1').innerText = "Edit Blog"
    form[0].value = editedBlog.title
    form[1].value = editedBlog.author
    form[2].value = editedBlog.content
    form[3].innerText = "Update Blog"
  } else {
    form.parentNode.querySelector('h1').innerText = "Create Blog"
    form[0].value = ""
    form[1].value = ""
    form[2].value = ""
    form[3].innerText = "Create Blog"
    editedBlog = null
  }
}
