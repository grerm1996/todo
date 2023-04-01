const d = document;
const headerslot = d.getElementById('headerslot');
const header = d.getElementById('header');
const array = [];
let currentproj = 'Untitled';
const tasktable = d.getElementById('tasktable');
// date is set to today by default
const today = new Date().toISOString().substr(0, 10);
document.querySelector('#taskdate').value = today;

// project renamer
const projRenamer = () => {
  const newname = prompt('Rename project:').trim();
  if (newname == null) {
    console.log('no project name entered, aborting rename');
    return;
  }
  header.innerHTML = `${newname}<span class="material-symbols-outlined" id='projrenamer'>edit_square</span>`;
  const renamedLink = d.getElementById(currentproj);
  renamedLink.innerHTML = newname;
  renamedLink.setAttribute('id', newname);
  // update preexisting tasks with new proj name
  const relabeledTasks = array.filter((item) => {
    if (item.project == currentproj) {
      item.project = newname;
    }
  });
  currentproj = newname;
  setupRenameButton();
};
// rename button
let setupRenameButton = () => {
  const projrenamebtn = d.getElementById('projrenamer');
  projrenamebtn.addEventListener('click', projRenamer);
};

// mechanism to create one row in table
const createRow = (element) => {
  const row = tasktable.insertRow(0);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  cell1.textContent = element.task;
  cell2.innerHTML = element.date;
};

// the table updater
const tableRefresh = () => {
  tasktable.innerHTML = '';
  const relevantitems = array.filter((element) => element.project == currentproj);
  relevantitems.forEach(createRow);
};

// validity checker -- is the "task" input empty?
const validityCheck = () => {
  if (document.getElementById('taskname').value.trim() == '') {
    console.log('empty input, no task added');
    return true;
  }
};

// click navbar proj
const navbarClick = (e) => {
  currentproj = e.target.id;
  header.innerHTML = `${currentproj}<span class="material-symbols-outlined" id='projrenamer'>edit_square</span>`;
  addActiveClasstoLi();
  tableRefresh();
  setupRenameButton();
};

// store form input in obj
const getObj = () => {
  const newtask = {
    task: document.getElementById('taskname').value.trim(),
    date: document.getElementById('taskdate').value,
    project: currentproj,
  };
  array.push(newtask);
  tableRefresh();
  console.log(array);
};

// "Add task" button
const addTask = (e) => {
  e.preventDefault();
  if (validityCheck() == true) {
    return;
  } getObj();
  d.querySelector('form').reset();
  document.querySelector('#taskdate').value = today;
};

// update new proj w "active" status in navbar
let addActiveClasstoLi = () => {
  const allNavLinks = document.querySelectorAll('li');
  allNavLinks.forEach((link) => {
    link.classList.remove('activeproj');
  });
  let newlink = d.getElementById(currentproj);
  newlink.classList.add('activeproj');
};
// "Add new project" button
const addNewProj = () => {
  const projname = prompt('Project name:')?.trim() ?? '';
  if (projname == null || projname == '') {
    console.log('no name entered for new project; aborting new project');
    return;
  }
  // update header + navbar w/ current project
  header.innerHTML = `${projname}<span class="material-symbols-outlined" id='projrenamer'>edit_square</span>`;
  setupRenameButton();
  const newlink = d.createElement('li');
  projectlist.appendChild(newlink);
  newlink.setAttribute('id', projname);
  newlink.addEventListener('click', navbarClick);
  newlink.innerHTML = `${projname} <span class="material-symbols-outlined delprojbtn">delete</span>`;
  // set up an "active" proj
  currentproj = projname;
  addActiveClasstoLi();
  tableRefresh();
  /*

    let projdelbtn = document.querySelector('.delprojbtn');
    projdelbtn.addEventListener('click', projDeleter);

  let projRenamer = (newlink) => {
    let newname = prompt('New Project name:');
    header.innerHTML = `${newname}<span class="material-symbols-outlined" id='projrenamer'>edit_square</span>`;
    newlink.textContent = newname;
  }; */
};

// button event listeners
const newProjBtn = d.getElementById('newprojbtn');
newProjBtn.addEventListener('click', addNewProj);
const addTaskBtn = d.getElementById('addbtn');
addTaskBtn.addEventListener('click', addTask);
setupRenameButton();
let untitledBtn = d.getElementById('Untitled');
untitledBtn.addEventListener('click', navbarClick);
