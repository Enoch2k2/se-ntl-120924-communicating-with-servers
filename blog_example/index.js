const baseUrl = 'http://localhost:3000'

const form = document.querySelector('form')

form.addEventListener('submit', handleSubmit)

getBlogs()

async function getBlogs() {
  const resp = await fetch(baseUrl + "/blogs")
  const data = await resp.json()
  displayBlogs(data)
}

function displayBlogs(data) {
  data.forEach(displayBlog)
}

function displayBlog(blog) {
  const blogsDiv = document.querySelector('#blogs div')
  const div = document.createElement('div')
  const h3 = document.createElement('h3')
  const authorP = document.createElement('p')
  const contentP = document.createElement('p')
  
  h3.innerText = blog.title
  authorP.innerText = `By: ${blog.author}`
  contentP.innerText = blog.content
  
  div.appendChild(h3)
  div.appendChild(authorP)
  div.appendChild(contentP)

  blogsDiv.appendChild(div)
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

  const options = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"  
    },
    body: JSON.stringify(blogValues)
  }

  const resp = await fetch(baseUrl + '/blogs', options)
  const blog = await resp.json()
  displayBlog(blog)

  // titleInput.value = ""
  // authorInput.value = ""
  // contentInput.value = ""

  form.reset()
}