const list = [{
               "itemCode":"jyya:10000039",
               "itemComment":"Keep YO soul",
               "mediumImage":"https://thumbnail.image.rakuten.co.jp/@0_mall/jyya/cabinet/hy-srai-01.jpg?_ex=128x128"},
               {
               "itemCode":"shimataro:10000107",
               "itemComment":"Saiko-saiko-",
               "mediumImage":"https://thumbnail.image.rakuten.co.jp/@0_mall/shimataro/cabinet/compass1550476346.jpg?_ex=128x128"}
               ]

var cnt = 0
const myList = []
list.forEach((ele,idx,arr) => {
    ++cnt
    myList.push(ele.itemCode)
    if(cnt === arr.length){
    console.log(myList)
    }
})
