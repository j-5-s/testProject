    
io.socket.on('connect', function(){
    console.log('connected')
    
    io.socket.on('task', function(message){
        
        console.log('task: ', message)

    });

    io.socket.get('/task', {}, function(message) { console.log(message)});
});

