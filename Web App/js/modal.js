document.addEventListener('DOMContentLoaded', function() {
  const modal = document.querySelector('[data-modal]');
  const closeButton = document.querySelector('.close');
  const viewLinks = document.querySelectorAll('.view');
  

  viewLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          modal.showModal(); // Show the modal
      });
  });
  
  closeButton.addEventListener('click', function() {
      modal.close();
  });
  
});