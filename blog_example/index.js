const baseUrl = 'http://localhost:3000'
let blogs = []
const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"  
}

let editing = false
let editedBlog = null

const form = document.querySelector('form')
const blogsDiv = document.querySelector('#blogs div')

form.addEventListener('submit', handleSubmit)

getBlogs()

async function getBlogs() {
  const resp = await fetch(baseUrl + "/blogs")
  const data = await resp.json()
  console.log(data)
  blogs = data
  displayBlogs()
}

function displayBlogs() {
  blogsDiv.innerHTML = ''
  blogs.forEach(displayBlog)
}

function displayBlog(blog) {
  const div = document.createElement('div')
  const h3 = document.createElement('h3')
  const authorP = document.createElement('p')
  const contentP = document.createElement('p')
  const editBtn = document.createElement('button')
  const deleteBtn = document.createElement('button')
  
  h3.innerText = blog.title
  authorP.innerText = `By: ${blog.author}`
  contentP.innerText = blog.content
  editBtn.innerText = 'Edit'
  deleteBtn.innerText = 'Delete'

  deleteBtn.dataset.id = blog.id
  editBtn.dataset.id = blog.id
  
  div.appendChild(h3)
  div.appendChild(authorP)
  div.appendChild(contentP)
  div.appendChild(editBtn)
  div.appendChild(deleteBtn)

  deleteBtn.addEventListener('click', deleteBlog)
  editBtn.addEventListener('click', editBlog)

  blogsDiv.appendChild(div)
}

function deleteBlog(event) {
  const id = event.target.dataset.id

  const options = {
    method: "DELETE"
  }

  fetch(baseUrl + "/blogs/" + id, options)
    .then(resp => {
      if(resp.status === 200) {
        blogs = blogs.filter(blog => blog.id != id)
        displayBlogs()
      }
    })


}

function editBlog(event) {
  console.log('hi')
  const id =  event.target.dataset.id
  editedBlog = blogs.find(b => b.id === id)
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

// function handleSubmit(event) {
//   event.preventDefault()
//   // we need the title, author, the content! - x
//   const titleInput = form[0]
//   const authorInput = form[1]
//   const contentInput = form[2]

//   const title = titleInput.value
//   const author = authorInput.value
//   const content = contentInput.value
//   // POST request to the json server! - x

//   const options = {
//     method: "POST",
//     headers: {
//       "Accept": "application/json",
//       "Content-Type": "application/json"  
//     },
//     body: JSON.stringify({title, author, content})
//   }

//   fetch(baseUrl + '/blogs', options)
//     .then(resp => resp.json())
//     .then(blog => displayBlog(blog))
// }
async function handleSubmit(event) {
  event.preventDefault()
  // we need the title, author, the content! - x
  const titleInput = form[0]
  const authorInput = form[1]
  const contentInput = form[2]

  const blogValues = {
    title: titleInput.value,
    author: authorInput.value,
    content: contentInput.value
  }
  // POST request to the json server! - x

  // condition ? valueIfTrue : valueIfFalse

  const options = {
    method: editing ? "PATCH" : "POST",
    headers,
    body: JSON.stringify(blogValues)
  }

  const url = editing ? baseUrl + "/blogs/" + editedBlog.id : baseUrl + '/blogs'

  const resp = await fetch(url, options)
  const data = await resp.json() // data is the blog!
  if(editing) {
    // do a map
    blogs = blogs.map(blog => {
      if(blog.id == data.id) {
        return data
      } else {
        return blog
      }
    })
    displayBlogs()
    toggleForm()
  } else {
    blogs.push(data)
    displayBlog(data)
  }

  // titleInput.value = ""
  // authorInput.value = ""
  // contentInput.value = ""

  form.reset()
}