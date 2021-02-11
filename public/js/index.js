import '../socket.io/socket.io.js'

const gitTemplate = document.querySelector('#git-template')

const baseURL = document.querySelector('base').getAttribute('href')

// If taskTemplate is not present on the page, just ignore and do not listen for tasks
if (gitTemplate) {
  console.log('IF-GIT-TEMPLATE')
  // Create a Handlebars template from the template-tag (rendered from index.hbs)
  const hbsTemplate = window.Handlebars.compile(gitTemplate.innerHTML)

  // Create a socket connection using Socket.io
  const socket = window.io({ path: `${baseURL}socket.io` })

  // Listen for message "new task" from the server
  socket.on('issue', arg => {
    console.log('SOCKETON--------------------')
    console.log(arg)
    const taskString = hbsTemplate(arg)
    const div = document.createElement('div')
    div.classList = 'issue-box'
    div.innerHTML = taskString

    const taskList = document.querySelector('#issue-list')
    taskList.appendChild(div)
  })
}
