const express = require('express')
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require('socket.io')
const router=express.Router()

let corsOptions={
    origin:[
        'https://lolmadmovie.vercel.app',
        'http://localhost:3000',
    ],
    credentials:true
}
app.use(cors(corsOptions))

const server = http.createServer(app).listen(3002)


const io = new Server(server
    , {
    cors: {
        origin: [
            'https://lolmadmovie.vercel.app',
            // "https://socketio.bloggernepal.com",
            "http://localhost:3000",
        ],
        credentials:true,
        // method: ["GET", "POST"]
    }
}
)

// const io=socketio(server)
// io.use((socket, next)=>{
//     let key=socket.handshake.query.key
//     if(key){
//         next()
//         socket.user={name:key}
//     }
// })

io.on("connection", (socket)=>{
    console.log(`유저 연결 : ${socket.id}`)

    // socket.on('message', (data)=>{
    //     let message=data.message
    //     console.log(data)
    //     console.log(`Got message ${message} from ${socket.user.name}`)
    //     socket.broadcast.emit('message', {
    //         message,
    //         sender:socket.user
    //     })
    // })

    // socket.on("join_room", (data)=>{
    //     socket.join(data)
    //     console.log(data)
    //     console.log(`user with id: ${socket.id} joined room : ${data}`)
    // })
    //
    // socket.on("send_message", (data)=>{
    //     console.log(data)
    //     socket.to(data.room).emit("receive_message", data)
    //
    // })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log(msg)
    });

    socket.on("disconnect", ()=>{
        console.log("user disconnected", socket.id)
    })
})

router.get('/', function (req,res){
    res.render('index', {title:'i love you'})
})


// server.listen(process.env.PORT ||3002, () => {
//     console.log("server running")
// })