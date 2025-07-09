const express = require("express")
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require('./models/chat.js');
const chat = require("./models/chat.js");
const methodOverride = require("method-override")

const PORT = process.env.PORT || 10000;

app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended:true })); //for parsing data
app.use(methodOverride("_method"))

main()
.then(()=> {console.log("connection successful");})
.catch((err)=> {
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// Index route 
app.get("/chats", async(req,res)=> {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", {chats});
})

// new route
app.get("/chats/new",(req,res)=> {
    res.render("new.ejs")
})

// Create route
app.post("/chats", (req,res)=>{
    let{to, from, msg} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    })
    newChat.save()
    .then((res)=> {
        console.log("Chat was saved");
    }).catch((err)=> {
        console.log(err)
    })
    res.redirect("/chats");
})

//Edit route
app.get("/chats/:id/edit", async(req,res)=> {
    let{id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat})
})

// Update route
app.put("/chats/:id",async(req,res)=> {
    let{id} = req.params;
    let{msg: newMsg} =req.body
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runValidators: true});
    res.redirect("/chats")
})

// Destroy Route
app.delete("/chats/:id", async(req,res)=> {
    let {id} = req.params;
    let deleteChat = await Chat.findByIdAndDelete(id);
    console.log(deleteChat);
    res.redirect("/chats")
})

app.get("/",(req,res)=> {
    res.send("Root is working")
})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})