/* 
let center = document.getElementById('container');
let projectarr = [];
let projectlist = document.getElementById('projectlist');
let headerslot = document.getElementById('headerslot');


let renderEntryForm = (projname) => {
  // Task is added to DOM table + array when "Add Task" is pressed
  let callbackFunction = (e) => {
    e.preventDefault();
    console.log(taskname);
    console.log(taskdate);
    let newtask = {
      task: document.getElementById('taskname').value,
      date: document.getElementById('taskdate').value,
      project: projname,
    };
    projectarr.push(newtask);
    console.log(projectarr);

    let row = tasktable.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.textContent = document.getElementById('taskname').value;
    cell2.innerHTML = document.getElementById('taskdate').value;

    document.querySelector('form').reset();
  };

  let formContainer = document.createElement('div');
  center.appendChild(formContainer);
  formContainer.classList.add('formContainer');
  let today = new Date().toISOString().substr(0, 10);
  document.querySelector('#taskdate').value = today;
  let addBtn = document.getElementById('addbtn');
  const form = document.getElementById('form');
  addBtn.addEventListener('click', callbackFunction);
  let tasktable = document.createElement('table');
  center.appendChild(tasktable);
};

// What happens when you start a new project
let addProj = () => {
  let header = document.createElement('h1');

  let projRenamer = (newlink) => {
    let newname = prompt('New Project name:');
    header.innerHTML = `${newname}<span class="material-symbols-outlined" id='projrenamer'>edit_square</span>`;
    newlink.textContent = newname;
  };

  // "Delete project" button
  let projDeleter = () => {
    console.log('deleted!');
  };

  let renderNewProjPage = (projname) => {
    center.innerHTML = '';
    header.innerHTML = `${projname}<span class="material-symbols-outlined" id='projrenamer'>edit_square</span>`;
    headerslot.appendChild(header);
    let projrenamebtn = document.getElementById('projrenamer');
    projrenamebtn.addEventListener('click', projRenamer);
    // Add newly created project to list in navbar
    let newlink = document.createElement('li');
    projectlist.appendChild(newlink);
    newlink.setAttribute('id', projname);
    newlink.classList.add('active');
    newlink.innerHTML = `${projname} <span class="material-symbols-outlined delprojbtn">delete</span>`;
    let projdelbtn = document.querySelector('.delprojbtn');
    projdelbtn.addEventListener('click', projDeleter);
    renderEntryForm(projname);
  };

  let projname = prompt('Project name:');
  renderNewProjPage(projname);
};



// "Add new project" sidebar listener
let newproj = document.getElementById('newproj');
newproj.addEventListener('click', addProj); */