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

// Configuração dos slid

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
// Remove a classe active do slide atual e adiciona exit para sair da tela
slides[currentSlide].classList.remove('active');
slides[currentSlide].classList.add('exit');

// Atualiza o índice do slide atual
currentSlide = (index + 1) % slides.length;

// Mostra o novo slide
slides[currentSlide].classList.remove('exit');
slides[currentSlide].classList.add('active');
}

// Mostra o primeiro slide ao carregar
slides[currentSlide].classList.add('active');

// Troca os slides automaticamente a cada 5 segundos
setInterval(() => showSlide(currentSlide), 5000);

