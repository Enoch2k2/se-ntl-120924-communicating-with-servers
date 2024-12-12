const baseUrl = 'http://localhost:3000'

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