import { deleteTask, updateTask } from './fetch.service.js'


export const addTaskToDom = (label, desc, endDate, taskListElem, startDate) => {
  let newTaskElem = buildTaskElem(label, desc, startDate);
  let checkBoxElem = buildCheckboxElem(label, endDate);
  let deleteBtnElem = buildDeleteBtnElem(label, newTaskElem.id, taskListElem);

  newTaskElem.insertBefore(checkBoxElem, newTaskElem.firstElementChild);
  newTaskElem.appendChild(deleteBtnElem);

  taskListElem.appendChild(newTaskElem);
}

export const removeTaskfromDom = (id, taskListElem) => {
  const taskToDeleteElem = taskListElem.querySelector(`#${id}`);
  taskListElem.removeChild(taskToDeleteElem);
}

export const buildTaskElem = (label, desc, startDate) => {
  let newTaskElem = document.createElement('div');
  newTaskElem.id = "id-" + Math.random().toString(16).slice(2);
  newTaskElem.className = 'task'
  newTaskElem.innerHTML = `
    <div class="label-container">
      <p>${label}</p>
      <p>${desc}</p>
      <div class="date-container">
        <span>${startDate.toDateString().split(' ').slice(1).join(' ')}</span>
      </div>
    </div>
  `;

  return newTaskElem;
}

export const buildCheckboxElem = (label, endDate) => {
  let checkBoxElem = document.createElement('span');
  checkBoxElem.className = endDate && new Date(endDate).toISOString() !== new Date(0).toISOString() ? 'icon-checkbox-checked' : 'icon-checkbox-unchecked';
  checkBoxElem.onclick = async () => {
    if (checkBoxElem.classList.contains('icon-checkbox-unchecked')) {
      if (await updateTask(label, new Date().toISOString())) checkBoxElem.className = 'icon-checkbox-checked';
    } else {
      if (await updateTask(label, new Date(0))) checkBoxElem.className = 'icon-checkbox-unchecked';
    }
  }

  return checkBoxElem;
}

export const buildDeleteBtnElem = (label, id, taskListElem) => {  
  const deleteBtnElem = document.createElement('span');
  deleteBtnElem.className = 'icon-bin';
  deleteBtnElem.onclick = async () => { if (await deleteTask(label)) removeTaskfromDom(id, taskListElem); };

  return deleteBtnElem;
}


