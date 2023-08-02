import { getNode, deleteStorage } from '../lib/index.js';
const memberSystemLogout = getNode('.memberSystemLogout');

if (memberSystemLogout) {
  memberSystemLogout.addEventListener('click', handleLogout);
}


function handleLogout(e) {
  e.preventDefault();
  deleteStorage();
  window.location.reload('/');
}

// memberSystemLogout.addEventListener('click', handleLogout);
