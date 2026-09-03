const dialog = document.querySelector('#photo-dialog');
const openButton = document.querySelector('#open-photo');

openButton.addEventListener('click', () => dialog.showModal());

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
