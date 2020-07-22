const sharp = require("sharp");
const fs = require("fs")
const uuid = require("node-uuid");
const { resolve } = require("path");

//todo エラー処理を入れる

async function creImg(imgPath)  { //promiseでラップしないとただのpromiseオブジェクトを投げるだけ
    const imagePaths = imgPath  
    const saveId = uuid.v4().split('-').join('');
  //const imagePaths = ["79a997b1f07a47b09d7394f81834a98b.jpg", "116fb52d31d84150b29963e234972b02.jpg","db344d7e85fb4f02825153cdd6efb231.jpg"];
   //console.log("imagePaths:"+imagePaths)
    const imageAttrs = [];
  
    // 連結する画像の情報取得
    const promises = [];
    const imagePromise = path =>
      new Promise(async resolve => {
        const image = await sharp(path);
        let width = 0,
          height = 0;
        await image
          .metadata()
          .then(meta => ([width, height] = [meta.width, meta.height]));
        const buf = await image.toBuffer();
        resolve({ width, height, buf });
      });
    imagePaths.forEach(path => promises.push(imagePromise(path)));
    await Promise.all(promises).then(values => {
      values.forEach(value => imageAttrs.push(value));
    });
  
    // outputする画像の設定
    const outputImgWidth = imageAttrs.reduce((acc, cur) => acc + cur.width, 0);
    const outputImgHeight = Math.max(...imageAttrs.map(v => v.height));
    let totalLeft = 0;
    const compositeParams = imageAttrs.map(image => {
      const left = totalLeft;
      totalLeft += image.width;
      return {
        input: image.buf,
        gravity: "northwest",
        left: left,
        top: 0
      };
    });
    
    // 連結処理
    sharp({
      create: {
        width: outputImgWidth,
        height: outputImgHeight,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      }
    })
      .composite(compositeParams)
      .toFile('images/'+saveId+".jpg");

      //twitterCard
      makeTwitterCard(saveId);
      console.log("saveId img.js: "+saveId)
      return saveId
      //return reject(new Error("sharp NG"))
  };
  
  function makeTwitterCard(saveId){
    //make META file
    return new Promise(function(resolve,reject){
        fs.writeFile('images/'+saveId+'.html', `
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@flickr" />
  <meta name="twitter:title" content="おすすめアイテム５選！！！" />
  <meta name="twitter:description" content="View the album on Flickr." />
  <meta name="twitter:image" content="http://692c58c1671c.ngrok.io/images/`+saveId+`.jpg" />
  <meta name="twitter:url" content="http://692c58c1671c.ngrok.io/api/v1/`+saveId+`/" />
    `
    , function (err) {
        if (err) { throw err; }
        //console.log('fsOK');
    });
    })
  }

  function makeSaveId(arr){
    return new Promise(function(resolve,reject){
        var ouid = uuid.v4().split('-').join('');
        resolve([arr,ouid])
      })
    } 

// (async () => {
//   const imagePaths = ["79a997b1f07a47b09d7394f81834a98b.jpg", "116fb52d31d84150b29963e234972b02.jpg","db344d7e85fb4f02825153cdd6efb231.jpg"];
//   const imageAttrs = [];

//   // 連結する画像の情報取得
//   const promises = [];
//   const imagePromise = path =>
//     new Promise(async resolve => {
//       const image = await sharp(path);
//       let width = 0,
//         height = 0;
//       await image
//         .metadata()
//         .then(meta => ([width, height] = [meta.width, meta.height]));
//       const buf = await image.toBuffer();
//       resolve({ width, height, buf });
//     });
//   imagePaths.forEach(path => promises.push(imagePromise(path)));
//   await Promise.all(promises).then(values => {
//     values.forEach(value => imageAttrs.push(value));
//   });

//   // outputする画像の設定
//   const outputImgWidth = imageAttrs.reduce((acc, cur) => acc + cur.width, 0);
//   const outputImgHeight = Math.max(...imageAttrs.map(v => v.height));
//   let totalLeft = 0;
//   const compositeParams = imageAttrs.map(image => {
//     const left = totalLeft;
//     totalLeft += image.width;
//     return {
//       input: image.buf,
//       gravity: "northwest",
//       left: left,
//       top: 0
//     };
//   });

//   // 連結処理
//   sharp({
//     create: {
//       width: outputImgWidth,
//       height: outputImgHeight,
//       channels: 4,
//       background: { r: 255, g: 255, b: 255, alpha: 0 }
//     }
//   })
//     .composite(compositeParams)
//     .toFile("output.png");
// })();


module.exports = creImg;