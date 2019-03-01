var socket = io();
//constantes

const escritorioString = "Escritorio ";

socket.on('connect',function(){
    console.log('Conectado al servidor');
});

socket.on('disconnect',function(){
    console.log('Desconectado del servidor');
});

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error("El escritorio es necesario");
}

var escritorio = searchParams.get('escritorio');
console.log(escritorio);
var label = $('small');

$('#numeroEscritorio').text(escritorioString + escritorio);
$('#atenderSiguienteTicket').on('click',function(){
    socket.emit('atenderTicket',{escritorio : escritorio}, function(resp){
        console.log(resp);
        if(resp === 'No hay tickets'){
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket '+ resp.numero);
    });    
})
