const mongoose = require("mongoose");
const Chat = require('./models/chat.js');

main()
.then(()=> {console.log("connection successful");})
.catch((err)=> {
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}



let allChats = ([
    {
        from: "Aarav",
        to: "Neha",
        msg: "Have you submitted the assignment?",
        created_at: new Date("2025-06-25T10:15:30Z")
    },
    {
        from: "Priya",
        to: "Rohit",
        msg: "Let's meet in the library at 3 PM.",
        created_at: new Date("2025-07-01T14:05:00Z")
    },
    {
        from: "Karan",
        to: "Simran",
        msg: "Don’t forget your ID card tomorrow!",
        created_at: new Date("2025-06-29T08:47:20Z")
    },
    {
        from: "Himanshu",
        to: "Ayush",
        msg: "Did you get today’s lecture notes?",
        created_at: new Date("2025-07-03T16:10:00Z")
    },
    {
        from: "Meera",
        to: "Ankit",
        msg: "Group project deadline is extended!",
        created_at: new Date("2025-07-04T09:00:00Z")
    }
])

Chat.insertMany(allChats).then(res=> {
    console.log(res);
}).catch(err => {
    console.log(err);
})