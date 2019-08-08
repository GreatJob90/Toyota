import $ from 'jquery';

 $(document).ready(function () {
     let modalBack = document.getElementById('js-modal-form-bg'),
         modalForm = document.getElementById('js-modal-form'),
         getOffer = document.getElementById('js-get-offer'),
         modalClose = document.getElementById('js-modal-close');

     getOffer.onclick = () => {
         modalBack.className = 'modal-form-bg modal-open';
     }

     modalClose.onclick = () => {
         modalBack.className = 'modal-form-bg modal-close';
     }

     modalBack.onclick = () => {
         modalBack.className = 'modal-form-bg modal-close';
     }     

     modalForm.onclick = (event) => {
         event = event || window.event;
         if (event.stopPropagation) {
             event.stopPropagation();
         } else {
             event.cancelBuble = true;
         }
     } 
});