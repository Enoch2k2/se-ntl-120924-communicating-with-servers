class Blog {
  static all = []

  constructor(title, author, content, id) {
    this.title = title
    this.author = author
    this.content = content
    this.id = id
  }

  save() {
    Blog.all.push(this)
  }

  static async getBlogs() {
    const resp = await fetch(baseUrl + "/blogs")
    const data = await resp.json()
    data.forEach(blog => {
      let b = new Blog(blog.title, blog.author, blog.content, blog.id)
      b.save()
    })
    Blog.displayBlogs()
  }

  deleteBlog(event) {
    const id = this.id
  
    const options = {
      method: "DELETE"
    }
  
    fetch(baseUrl + "/blogs/" + id, options)
      .then(resp => {
        if(resp.status === 200) {
          Blog.all = Blog.all.filter(blog => blog.id != id)
          Blog.displayBlogs()
        }
      })
  }

  static async handleSubmit(event) {
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
      Blog.all = Blog.all.map(blog => {
        if(blog.id == data.id) {
          return new Blog(data.title, data.author, data.content, data.id)
        } else {
          return blog
        }
      })
      Blog.displayBlogs()
      toggleForm()
    } else {
      let blog = new Blog(data.title, data.author, data.content, data.id)
      blog.save()
      blog.display()
    }
  
    // titleInput.value = ""
    // authorInput.value = ""
    // contentInput.value = ""
  
    form.reset()
  }

  static displayBlogs() {
    blogsDiv.innerHTML = ''
    Blog.all.forEach(blog => blog.display())
  }

  display() {
    const div = document.createElement('div')
    const h3 = document.createElement('h3')
    const authorP = document.createElement('p')
    const contentP = document.createElement('p')
    const editBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')
    
    h3.innerText = this.title
    authorP.innerText = `By: ${this.author}`
    contentP.innerText = this.content
    editBtn.innerText = 'Edit'
    deleteBtn.innerText = 'Delete'
  
    deleteBtn.dataset.id = this.id
    editBtn.dataset.id = this.id
    
    div.appendChild(h3)
    div.appendChild(authorP)
    div.appendChild(contentP)
    div.appendChild(editBtn)
    div.appendChild(deleteBtn)
  
    deleteBtn.addEventListener('click', this.deleteBlog.bind(this))
    editBtn.addEventListener('click', editBlog)
  
    blogsDiv.appendChild(div)
  }
}