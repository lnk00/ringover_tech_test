import { addTaskToDom } from './js/builder.service.js';
import { getTasks, addTask } from './js/fetch.service.js'

let taskFormElem = document.querySelector('#add-task-form');
let taskInputElem = document.querySelector('#add-task-input');
let descInputElem = document.querySelector('#add-desc-input');
let taskListElem = document.querySelector('#task-list');
let searchInputElem = document.querySelector('#search-input');

searchInputElem.addEventListener('input', (e) => {
  const tasks = taskListElem.querySelectorAll('.task');
  if (e.target.value != '') {
    tasks.forEach((task) => {
      const label = task.querySelector('.label-container p');
      if (!label.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
        task.style.display = 'none';
      } else {
        task.style.display = 'flex'
      }
    })
  } else {
    tasks.forEach((task) => {
      task.style.display = 'flex'
    })
  }
})

taskFormElem.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (taskInputElem.value && await addTask(taskInputElem.value, descInputElem.value)) {
    addTaskToDom(taskInputElem.value, descInputElem.value || 'No description', undefined, taskListElem, new Date());
  }
  taskInputElem.value = '';
  descInputElem.value = '';
  taskInputElem.focus();
})

const tasks = await getTasks();
tasks.forEach((task) => addTaskToDom(task.label, task.description || 'No description', task.end_date, taskListElem, new Date(task.start_date)));
