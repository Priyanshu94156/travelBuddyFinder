const story = require("../../models/stories").storyModel;

function fetchStory(req, res){
    story.find({email:req.params.email},(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    })
}

module.exports = {fetchStory};   