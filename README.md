# testProject

Trying to figure out why create messages are not getting sent through socket IO but destroy is.

## Steps to repoproduce the issues
- clone this repo.
- use postman to to create a few Tasks (the only model) with one attribute `text`

### Example Request
```text
POST /task HTTP/1.1
Host: localhost:1337
Cache-Control: no-cache

----WebKitFormBoundaryE19zNvXGzXaLvS5C
Content-Disposition: form-data; name="text"

bsddella
----WebKitFormBoundaryE19zNvXGzXaLvS5C
```

### Example Response
```json
{
    "text": "bsddella",
    "createdAt": "2014-06-07T18:26:40.053Z",
    "updatedAt": "2014-06-07T18:26:40.053Z",
    "id": 16
}
```

- Open DevTools and see the initial tasks populate to the console log from the js `js/dependencies/socket-test.js`

```javascript
io.socket.on('connect', function(){
    console.log('connected')
    
    io.socket.on('task', function(message){
        //this online fires on delete, not create
        console.log('task: ', message)

    });

    io.socket.get('/task', {}, function(message) { console.log(message)});
});
```

The Task model defined in `api/models/Task.js`:
```javascript
module.exports = {
  autosubscribe: ['destroy', 'create', 'update'],
  attributes: {
    text: 'string'
  }
};
```
