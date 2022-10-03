//declaración de variables y constantes globales
// array de usuarios auxiliar usados para el contraste


//declaración de botones para eventos
const PATH_USUARIOS_REGISTRADOS = "json/usuariosRegistrados.json"

let botGuardar = document.getElementById('botGuardar')
botGuardar.addEventListener('click',submit)
let botCancelar = document.getElementById('botCancelar')
botCancelar.addEventListener('click',cancelar)


//--------FUNCIONES NAVEGACIÓN---------------
function aLogin(){
    window.location.href='../login.html'
}
//--------FUNCIONES EN LOGIN---------------

//limpia cajas

function limpiaCajas(){
    let inputs = document.getElementsByClassName('input')
    if(inputs.length != 0){
        for (const input of inputs){
            input.value = ""
        }
    }    
}

function cancelar(){
    limpiaCajas()
    aLogin()
}

//constructor de objeto USUARIO
function Usuario(nombre, apellido, mail, usuario, pass, estado, intentos){
    this.nombre = nombre
    this.apellido = apellido
    this.mail = mail
    this.usuario = usuario
    this.pass = pass
    this.estado = estado
    this.intentos = intentos
}


//determina indices

function determinaIndice(clave, valor, objeto){
    let indice = -1
    let aux = 0
    for(const row of objeto){
        aux += 1
        if(valor == row[clave]){
            indice = aux
            break
        }  
    }
    return indice
}


function validacion(usuarioIngresado,auxiliarArrayUsuarios){

let indiceUsuario = determinaIndice('usuario', usuarioIngresado.usuario,auxiliarArrayUsuarios)
    let aux = 0
    if(indiceUsuario > -1 ){
        aux = 1 // el usuario existe
    }
    return aux
    
}

function registraUsuario(usuarioIngresado,auxiliarArrayUsuarios){
    const usuarioNuevo =  {     
        nombre: usuarioIngresado.nombre,
        apellido: usuarioIngresado.apellido,
        mail: usuarioIngresado.mail,
        usuario:usuarioIngresado.usuario,
        pass:usuarioIngresado.pass,
        estado:usuarioIngresado.estado,
        intentos:usuarioIngresado.intentos
}
    //const enJson = JSON.parse(usuarioNuevo)
    auxiliarArrayUsuarios.push(usuarioNuevo)
    let listaAuxiliar = auxiliarArrayUsuarios
    console.log("tipo"+typeof listaAuxiliar)
    console.log("enJson"+listaAuxiliar)
    localStorage.setItem('usuariosRegistrados',JSON.stringify(listaAuxiliar))

    return 1 
}

function submit(){
    let inputNombre = document.getElementById('inputNombre')
    let inputApellido = document.getElementById('inputApellido')
    let inputMail = document.getElementById('inputMail')
    let inputUser = document.getElementById('inputUser')
    let inputPass = document.getElementById('inputPass')
    let bloqueado = 0
    let intentos = 0
    let reg = 0
    let usuarioIngresado = new Usuario(inputNombre.value,
        inputApellido.value,
        inputMail.value,
        inputUser.value,
        inputPass.value,
        bloqueado,
        intentos)
    let auxiliarArrayUsuarios = JSON.parse(localStorage.getItem('usuariosRegistrados'))
    //console.log(usuarioIngresado,auxiliarArrayUsuarios)
    let validado = validacion(usuarioIngresado,auxiliarArrayUsuarios)
    //console.log(validado)
    if (validado == 0){
        reg = registraUsuario(usuarioIngresado,auxiliarArrayUsuarios)
    }
    else{
        console.log("El usuario ingresado ya existe")
    }
    if (reg == 1){
        aLogin()
    }
}