const baseUrl = 'http://localhost:3000'
const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"  
}

let editing = false
let editedBlog = null

const form = document.querySelector('form')
const blogsDiv = document.querySelector('#blogs div')