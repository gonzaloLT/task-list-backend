const express = require('express')
const tasksRoutes = require('./routes/task.routes')
const PORT = 3000;
const app = express()
app.use(express.json());


app.use("/tasks", tasksRoutes);

app.listen(PORT, ()=>{
    console.log('Escuchando el puerto 3000')
})
