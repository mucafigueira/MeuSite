"use strict"
//configuração  do botão do menu
//selecionar o botão do menu e o proprio menu
const btnMenu = document.querySelector('.btnMenu');
const menu = document.querySelector('.menu');

//adicionar o event de click saos bostão;
btnMenu.addEventListener('click', function() {
    btnMenu.classList.toggle('active');
    menu.classList.toggle('activo');
});

