const {app} =require('./app')
const port = 8080

app.listen(port, () => {
    console.log("server started at the port : " + port + ".")
})