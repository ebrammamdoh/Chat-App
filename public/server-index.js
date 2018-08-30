var socket = io.connect('http://localhost:3000');

socket.on('tellAdmin',(data)=>{
    console.log('add client');
    $('#clientsLst').append($('<li>').attr('id',data.id).text(data.id));
});
socket.on('newMssg',(id)=>{
    $('#'+id).text(id+' new');
});
