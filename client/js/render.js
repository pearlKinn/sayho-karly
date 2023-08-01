import { getNode, loadStorage, makeHidden, makeVisible } from '../lib/index.js';

window.addEventListener('load', () => {
  loadStorage('uniqueID').then((res) => {
    if (res) {
      const memberSystemLogout = getNode('.memberSystemLogout');
      const memberSystemRegister = getNode('.memberSystemRegister');
      const memberSystemLogin = getNode('.memberSystemLogin');

      makeVisible(memberSystemLogout);
      makeHidden(memberSystemRegister, memberSystemLogin);
    }
  });
});

window.addEventListener('load', () => {
  loadStorage('uniqueID').then((res) => {
    if (!res) {
      const memberSystemLogout = getNode('.memberSystemLogout');
      const memberSystemRegister = getNode('.memberSystemRegister');
      const memberSystemLogin = getNode('.memberSystemLogin');

      makeVisible(memberSystemRegister, memberSystemLogin);
      makeHidden(memberSystemLogout);
    }
  });
});
