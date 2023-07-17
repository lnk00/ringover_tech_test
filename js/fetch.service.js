import { showError } from './error.service.js';

const BASE_URL = 'http://127.0.0.1:9000/v1';

export const getTasks = async () => {
  try {
    const res = await fetch(`${BASE_URL}/tasks`);
    return res.status === 200 ? await res.json() : []
  } catch (error) {
    showError('An Error occured, we failed to fetch your tasks.');
    return [];
  }
};

export const addTask = async (label, desc) => {
  try {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      body: JSON.stringify(
        {
          label,
          description: desc,
          start_date: new Date()
        }
      )
    });
    if (res.status !== 201) {
      showError('An Error occured, we failed to add the task to your list.');
      return false;
    }

    return true;
  } catch (error) {
    showError('An Error occured, we failed to add the task to your list.');
    return false;
  }
}

export const deleteTask = async (label) => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${label}`, {
      method: 'DELETE',
    });

    if (res.status !== 200) {
      showError('An Error occured, we failed to delete the task from your list.');
      return false;
    }

    return true;
  } catch (error) {
    showError('An Error occured, we failed to delete the task from your list.');
    return false;
  }
}

export const updateTask = async (label, endDate) => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${label}`, {
      method: 'PUT',
      body: JSON.stringify(
        {
          end_date: endDate,
        }
      )
    });
    
    if (res.status !== 200) {
      showError('An Error occured, we failed to update the task from your list.');
      return false;
    }

    return true;
  } catch (error) {
    showError('An Error occured, we failed to update the task from your list.');
    return false;
  }
}
