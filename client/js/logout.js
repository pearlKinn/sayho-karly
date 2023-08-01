import { getNode, deleteStorage } from '../lib/index.js';
const memberSystemLogout = getNode('.memberSystemLogout');

function handleLogout(e) {
  e.preventDefault();
  deleteStorage();
  window.location.reload('/');
}

memberSystemLogout.addEventListener('click', handleLogout);
