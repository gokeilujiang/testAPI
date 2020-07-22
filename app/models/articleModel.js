const mongoose = require("mongoose")
const Schema = mongoose.Schema
const moment = require("moment")

const ArticleSchema = new Schema({
    title :String,
    imageTileMode:Boolean,
    //text: String,
    saveID : String,
    items:[
        {itemCode:String,
         itemComment:String,
         mediumImage:String,}

    ],
    // createDate : Date
})

// ArticleSchema.method.setDate = function(){
//     this.date = moment().format("YYYY-MM-DD HH:mm:ss")
// }

module.exports = mongoose.model('ArticleModel',ArticleSchema)