const clavesEncriptacion = {
    'e': 'enter', 'i': 'imes', 'a': 'ai', 'o': 'ober', 'u': 'ufat'
};

function procesarTexto(accion) {
    const textoEntrada = document.getElementById('textoEntrada').value.toLowerCase();
    if (!/^[a-z\s]*$/.test(textoEntrada)) {
        return;
    }

    let resultado = accion === 'encriptar' ? encriptar(textoEntrada) : desencriptar(textoEntrada);
    mostrarResultado(resultado);
}

function encriptar(texto) {
    return texto.replace(/[aeiou]/g, letra => clavesEncriptacion[letra]);
}

function desencriptar(texto) {
    let desencriptado = texto;
    for (let [clave, valor] of Object.entries(clavesEncriptacion)) {
        desencriptado = desencriptado.replaceAll(valor, clave);
    }
    return desencriptado;
}

function mostrarResultado(texto) {
    document.getElementById('iconoPredeterminado').style.display = 'none';
    document.getElementById('tituloPredeterminado').style.display = 'none';
    document.getElementById('textoPredeterminado').style.display = 'none';
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('botonesCopiar').style.display = 'flex';
    document.getElementById('resultado').value = texto;
}

function copiarTexto() {
    const textoResultado = document.getElementById('resultado');
    textoResultado.select();
    document.execCommand('copy');
}

function limpiarTexto() {
    const textoEntrada = document.getElementById('textoEntrada');
    textoEntrada.placeholder = '';
    textoEntrada.removeEventListener('focus', limpiarTexto);
}

document.querySelector('.encriptar').addEventListener('click', () => procesarTexto('encriptar'));
document.querySelector('.desencriptar').addEventListener('click', () => procesarTexto('desencriptar'));
document.getElementById('botonCopiar').addEventListener('click', copiarTexto);
document.getElementById('textoEntrada').addEventListener('focus', limpiarTexto);
