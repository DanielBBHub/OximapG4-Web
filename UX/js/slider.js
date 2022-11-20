
// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------
// Path: UX\js\slider.js
// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------

const  slider = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider_section");
let sliderSectionLast = sliderSection[sliderSection.length -1];

const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-right");
slider.insertAdjacentElement('afterbegin', sliderSectionLast);

// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------

/*
* brief: Funcion que se ejecuta cuando se pulsa el boton de la izquierda
* @param {void}
* @returns {void}
*/

function Next(){
    let sliderSectionFirst = document.querySelectorAll(".slider_section")[0];
    slider.style.marginLeft = "-200%";
    slider.style.transition = "all 0.5s";
    setTimeout(function (){
        slider.style.transition = "none";
        slider.insertAdjacentElement('beforeend', sliderSectionFirst);
        slider.style.marginLeft = "-100%";
    }, 500);
}

// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------

/*
* brief: Funcion que se ejecuta cuando se pulsa el boton de la derecha
* @param {void}
* @returns {void}
*/

function Prev() {
    let sliderSection = document.querySelectorAll(".slider_section");
    let  sliderSelectionLast = sliderSection[sliderSection.length-1];
    slider.style.marginLeft = "0";
    slider.style.transition = "all 0.5s";
    setTimeout(function (){
        slider.style.transition = "none";
        slider.insertAdjacentElement('beforeend', sliderSectionLast);
        slider.style.marginLeft = "-100%";
    }, 500);
}

// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------

// Llamada a funcion Next() cuando se pulsa el boton de la derecha

btnRight.addEventListener('click', function (){
    Next();
});

// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------

// Llamada a funcion Prev() cuando se pulsa el boton de la izquierdaç

btnLeft.addEventListener('click', function (){
    Prev();
});

// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------

// Intyervalo de tiempo para que se mueva el slider automaticamente

setInterval(function (){
    Next();
},10000)

// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------