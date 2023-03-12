

const chat = require('../../models/chats').chatsModel


async function pushChats(req,res){
    console.log("this is body",req.body)
    let chatInf={
        sender:req.body.message.email,
        message:req.body.message.msg,
        dateTime:new Date()
    }
    let chatData = chat({
        persons:req.body.chatRoom,
        chats:[{
            sender:req.body.message.email,
            message:req.body.message.msg,
            dateTime:new Date()
        }]
        
    })
    await chat.findOne({persons:req.body.chatRoom}).then((resp)=>{
        console.log(resp)
        if(!resp){
            chatData.save((data,err)=>{
                if(err){
                    res.send(err)
                }else{
                    res.send(data)
                }
            })
        }
        else{
            chat.findOneAndUpdate({persons:req.body.chatRoom},{$push:{chats:chatInf}}).then((result,err)=>{
                res.send(result)
            })
        }
    })
}

function getChats(req,res){
    console.log(req.body.chatRoom)
    chat.findOne({persons:req.body.chatRoom},(result,err)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}

function getUserChats(req,res){
    console.log(req.body)
    let k = req.body.email
    chat.find({persons:{$regex:k}}).then((resp)=>{
        res.send(resp)
    })

}

module.exports = {pushChats , getChats, getUserChats}