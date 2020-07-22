const sharp = require("sharp")
const request = require("request")
const uuid = require("node-uuid")
// const getBody = (url: string): Promise<Buffer> => new Promise<Buffer>)((resolve, reject) => {
//     // `encoding: null` is important - otherwise you'll get non-buffer response body
//     request({ url, encoding: null }, (e, res, body) => {
//       if (e) { return reject(e); }
//       else if (200 <= res.statusCode && res.statusCode < 300) {
//          return resolve(body);
//       } else {
//         return reject(new Error(`Unexpected response status ${res.statusCode}`));
//       }
//     });
//   });

//const outDir = './output/'

//await処理 Promise実装

function imgCre (imageURL){

  　return new Promise(function (resolve,reject){

 
    url = imageURL
    request(url, {encoding: null }, function(error, response, body) {
      if(!error&& response.statusCode === 200) {
        //成功したらid発行 指定フォルダに格納
        //id発行
         var ouid = uuid.v4().split('-').join('');
         //console.log(ouid)

        sharp(body).toFile('images/'+ ouid + ".jpg").then(function(data) {
          resolve(ouid)
        })
      }　else {
        throw error
      }
    })
    })

//リクエストして戻ってきたものを配列に入れる
//配列を
    

  
  
//リターン画像のid
 //return uuid

}

module.exports = imgCre;

// sharp('test.jpg')
//   .grayscale()    
//   .toFile('output.jpg', (err, info)=>{
//     if(err){
//       throw err
//     }
//     console.log(info)
//   })

// await sharp("https://thumbnail.image.rakuten.co.jp/@0_mall/afternoon-tea-living/cabinet/item/462/ar7462-01_1.jpg?_ex=128x128")
//     .grayscale()
//     .toFile("resize.jpg")


// (async () => {
//     const imagePaths = ["https://thumbnail.image.rakuten.co.jp/@0_mall/afternoon-tea-living/cabinet/item/462/ar7462-01_1.jpg?_ex=128x128","https://thumbnail.image.rakuten.co.jp/@0_mall/finebookpremiere/cabinet/imgrc0076873842.jpg?_ex=128x128"]
//     const imageAttrs = []

//     const promises = [];
//     const imagePromise = path =>
//     new Promise(async resolve => {
//       const image = await sharp(path);
//       let width = 0,
//         height = 0;
//       await image
//         .metadata()
//         .then(meta => ([width, height] = [meta.width, meta.height]));
//         const buf = await image.toBuffer();
//         resolve({width,height,buf})
//         }) 
    
// })