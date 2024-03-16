import esUncuil from "./validar-cuil.js";
import esMayorDeEdad from "./validad-edad.js";




const camposDeFormulario  = document.querySelectorAll('[required]');
const formulario = document.querySelector('[data-formulario]');



formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const listaRespuestas = {
        nombre: e.target.elements['nombre'].value,
        email: e.target.elements['email'].value,
        identificacion: e.target.elements['identificacion'].value,
        cuil: e.target.elements['cuil'].value,
        fecha_nacimiento: e.target.elements['fecha_nacimiento'].value,
    };

    localStorage.setItem('registro', JSON.stringify(listaRespuestas));

    window.location.href = './abrir-cuenta-form-2.html';
});


   

camposDeFormulario.forEach((campo)=>{
    campo.addEventListener('blur',()=> verificarCampo(campo));
    campo.addEventListener('invalid', evento => evento.preventDefault())
});



const tiposError=['valueMising', 'typeMismatch', 'patternMismatch', 'tooShort', 'customError'];


const mensajes = {
    nombre: {
      valueMissing: "El campo nombre no puede estar vacío.",
      patternMismatch: "Por favor, ingrese un nombre válido.",
      tooShort: "Por favor, ingrese un nombre válido.",
    },
    email: {
      valueMissing: "El campo email no puede estar vacío.",
      typeMismatch: "Por favor, ingrese un email válido.",
      tooShort: "Por favor, ingrese un e-mail válido.",
    },
    identificacion: {
      valueMissing: "El campo identificación no puede estar vacío.",
      patternMismatch: "Por favor, ingrese un número de identificación válido.",
      tooShort: "El campo no tiene caracteres suficientes.",
    },
    cuil: {
      valueMissing: "El campo cuil/cuit no puede estar vacío.",
      patternMismatch: "Por favor, ingrese un cuil/cuit válido.",
      customError: "El cuil/cuit ingresado no existe.",
      tooShort: "El campo no tiene caracteres suficientes.",
    },
    fecha_nacimiento: {
      valueMissing: "El campo fecha nacimiento no puede estar vacío.",
      customError: "Debes ser mayor de 18 años para registrarte.",
    },
    terminos: {
      valueMissing: "Debes aceptar los términos antes de continuar.",
    },
  };
  


    function verificarCampo(campo){

        let mensaje = '';
        campo.setCustomValidity('');

        if (campo.name == 'cuil' && campo.value.length >= 11) {
            esUncuil(campo);
        };



        if (campo.name == 'fecha_nacimiento' && campo.value != '') {
            esMayorDeEdad(campo);
        };



        tiposError.forEach(error => {
            if (campo.validity[error]) {
                mensaje = mensajes[campo.name][error]
            };

        });


        const mensajeError = campo.parentNode.querySelector('.mensaje-error');
        const validarInputCheck = campo.checkValidity();


    if (!validarInputCheck) {
        mensajeError.textContent = mensaje;
    } else {
        mensajeError.textContent = '';
    };

};












    

    

    











