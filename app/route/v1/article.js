var express   = require('express');
var router    = express.Router();
var ArticleModel = require('../../models/articleModel.js');
const imageCre = require("../../img")
const fs = require("fs")
const kVs = require("../../util/oUtil")
const imgSave = require("../../util/testSharp")
const request = require("request")
//const uuid = require("node-uuid");
//const { resolve } = require('path');
const { validationResult } = require("express-validator")
const articleValidator = require("../../util/articleValidator");
const { resolve } = require('path');
const qs = require('querystring');
const { push } = require('../../util/articleValidator');
const { json } = require('body-parser');


router.get('/:id', function(req,res){
    console.log(req.params.id)
    const saveID = req.params.id
    const itemArr = []
    const codeArr = []
    const commentArr =[]
    const imageArr = []
    let cnt = 0
    ArticleModel.find({saveID:saveID}).then((articles)=>{
        //todo
        //json内容
        //タイトル
        //itemへのコメント
        //アフィリエイトリンク作成url
            //todo items.itemCodeで検索する
            //console.log("articlesの中身："+articles[0].items[0].itemCode)
            //articlesの中身の配列は一つしかない
            console.log("順番確認：　"+articles[0].items[0])
            articles[0].items.forEach((ele)=>{
                itemArr.push(ele)
            });
            console.log("順番確認2：　"+itemArr[0])
            itemArr.forEach((ele,ind,arr)=>{
                codeArr.push(ele.itemCode)
                commentArr.push(ele.itemComment)
                imageArr.push(ele.mediumImage)
            })  
             console.log("codeArr: "+codeArr)
            // console.log("commentArr: "+commentArr)
            // console.log("imageArr: "+imageArr)
            makeResItems(codeArr).then((data)=>{
                //中身がなかったら。。。


                const resItemArr = []
                //objからarrに変換
                //const chgArr = Array.prototype.slice.call(data)
                //console.log("とりあえずここまで："+ Object.keys(chgArr[1].Items[0]))
                //console.log("とりあえずここまで："+ Object.keys(chgArr))
                data.forEach((ele,idx,arr)=>{
                    const creResObj = {}
                    //console.log("key確認："+Object.keys(ele.Items[0].Item))
                    const jsonEle = ele.Items[0].Item

                    //console.log("jsonele :"+jsonEle.itemName)
                    creResObj.itemName = jsonEle.itemName
                    console.log("creResObj.itemName :"+creResObj.itemName)
                    creResObj.itemCaption = jsonEle.itemCaption
                    creResObj.affiliateUrl = jsonEle.affiliateUrl
                    //console.log("creRedObj :"+creResObj)
                    resItemArr.push(creResObj)
                })
                console.log("itemsのarr:"+resItemArr[0])
                return resolve("OKOKTEST")

                
            }).chatch(err =>{
                console.log("errorですです"+err)
            })

            //todo APIをrequestするitemsに入れる
            //articles.items.forEach

        //res.json(articles);
        //console.log(articles);
        res.json({ 
            message: 'Success!!',
            title: articles[0].title,
            imageTileMode: articles[0].imageTileMode,
            items: [{
                imgURL400: "https://thumbnail.image.rakuten.co.jp/@0_mall/waabbit/cabinet/k/cu/crash270/crash270_4_thum-1.jpg?_ex=400x400",
                affiliateUrl: "https://hb.afl.rakuten.co.jp/hgc/g00rj7l7.q6kfz191.g00rj7l7.q6kg0f0a/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fwaabbit%2F089%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fwaabbit%2Fi%2F10000099%2F",
                itemName:"【お試しセット】日本製 選べる割れないタンブラー4個セット クラッシュ 割れない コップ 割れない グラス ギフト キャンプ 食器 セット 送料無料 食洗機OK プラスチック1980円 トライタン タンブラー おしゃれ BBQ レンジ キッズ お酒 介護 ペア セット アウトドア",
                itemCaption:"割れないタンブラー 270cc 4個セット 2014年10月27日　キッチン用品・食器・調理器具カテゴリ1位/洋食器カテゴリ1位/コップカテゴリ1位 商品名 Plakira トライタンタンブラー4個セット 商品説明 まるでガラスのような透明感を持つ、プラスチックのタンブラーが登場！ トライタンとはアメリカ　イーストマン社の素材で 環境ホルモン非含有、食洗機OK、アルコールを入れてもOK。 欧米スタンダードの素材を日本国内の工場で製造しております。 小さなお子様はもちろん、家族みんなで安心してお使いいただけます。 ※底形状・改良しました！ サイズ 270cc　Wφ80×H90mm カラー ピンク、グリーン、イエロー、アンバー、ブルー、クリア、スモーク 欠品の色をお選びになると、納期がかかります。 ご了承くださいませ。 素材 飽和ポリエステル(トライタン) 製造国 日本 ラッピング 可 ※電子レンジで内容物を温める事が出来ます(80℃程度)。調理目的に使用しないでください。空炊きしないでください。電子レンジの加熱時間の設定に当たって塩分、油分が多い、水分が少ない等、食品によっては長時間加熱すると高温になるものがありますので、耐熱温度を超えないように加熱時間を控えめにしてください。ラップを掛けて長時間保存したり、電子レンジで加熱しないでください。本体にくっついてはがれなくなる恐れがあります。",
                itemText:"コップです"
            },{
                imgURL400:"https://thumbnail.image.rakuten.co.jp/@0_mall/rewind/cabinet/yyf/imgrc0065323007.jpg?_ex=400x400",
                affiliateUrl: "https://hb.afl.rakuten.co.jp/hgc/g00r6337.q6kfzaa3.g00r6337.q6kg0fea/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Frewind%2Fyyf-spinstar1%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Frewind%2Fi%2F10001131%2F",
                itemName:"ヨーヨー スピンスター 【初心者向けDVDプレゼント】【室内遊び】 【ヨーヨーファクトリー YOYOFACTORY YYF】",
                itemCaption:"　お得なセットはこちら",
                itemText:"Keep Yo Soul"
            },{
                imgURL400:"https://thumbnail.image.rakuten.co.jp/@0_mall/e-kitchen/cabinet/jishahin24/527578.jpg?_ex=400x400",
                affiliateUrl: "https://hb.afl.rakuten.co.jp/hgc/g00qwnl7.q6kfz615.g00qwnl7.q6kg018f/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fe-kitchen%2F527578%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fe-kitchen%2Fi%2F10096048%2F",
                itemName:"【ポイント10倍!!7/7(火)22:00〜7/9(木)8:59】フライパン セット 12点セット アイリスオーヤマ GS-SE12 ガス火対応 ダイヤモンドコートパン セット 蓋 26cm 20cm 深型 アイリス 26cm 20 20cm 焦げない ダイヤモンド ガス火専用 取っ手のとれる【予約】",
                itemCaption:"ダイヤモンドコーティングを使用した、こびりつきにくく丈夫で長持ちするガス火対応のフライパンセットです。取手がとれるので調理・食卓・保存をこれ一台ででき、収納も簡単です。ダイヤモンドコーティングとは、人工ダイヤモンドを細かい粒子状にしてフッ素樹脂コーティングに配合したものです。調理面の耐摩耗性試験を50万回クリアしています。●セット内容フライパン26cm、炒めなべ26cm、なべ20cm、なべ16cm、エッグパン、ガラスふた26cm、ガラスふた20cm、ガラスふた16cm、PEシールふた20cm、PEシールふた16cm、マルチハンドル2本●パッケージサイズ（cm）幅約28.5×奥行約28×高さ約20.9●パッケージ重量約5.05kg●単品サイズ（cm）／重量フライパン26cm：直径27.8×高さ約6／約565g炒めなべ26cm：直径27.3×高さ約7.1／約718gなべ20cm：直径21.8×高さ約9.5／約500gなべ16cm：直径約17.8×高さ約8／約350gエッグパン：幅約22.5×奥行約13.9×高さ約5.3／約420gガラスふた26cm：直径約27.7×高さ約4.4／約660gガラスふた20cm：直径約21.7×高さ約4.4／約420gガラスふた16cm：直径約17.8×高さ約4.4／約280gPEシールふた20cm：直径約23.3×奥行約21.8×高さ約0.9／約70gPEシールふた16cm：直径約19.2×奥行約17.8×高さ約0.9／約48gマルチハンドル：幅約18.7×奥行約4.1×高さ約5.6／約200g≪フライパン≫●表面加工内側：ダイヤモンドコーティング外側：焼付塗装加工●材料の種類本体：アルミニウム合金（底の厚さ2.5mm）●寸法26cm●満水容量2.7L≪炒めなべ≫●表面加工内側：ダイヤモンドコーティング外側：焼付塗装加工●材料の種類本体：アルミニウム合金（底の厚さ2.5mm）●寸法26cm●満水容量3.0L≪なべ≫●表面加工内側：ダイヤモンドコーティング外側：焼付塗装加工●材料の種類本体：アルミニウム合金（底の厚さ2.5mm）●寸法20cm／16cm●満水容量2.8L／1.5L≪エッグパン≫●表面加工内側：ダイヤモンドコーティング外側：焼付塗装加工●材料の種類本体：アルミニウム合金はり底：ステンレス鋼（クロム16％）底の厚さ：5.0mm（はり底含む）●寸法20×13cm●満水容量1.2L≪ガラスふた≫●品名強化ガラス製器具●強化の種類全面物理強化●ゴム部シリコン樹脂（耐熱温度220℃）≪PEシールふた≫●原料樹脂ポリエチレン（耐熱温度80℃）≪マルチハンドル≫●材質樹脂上部：ガラス入りナイロン（50％）（耐熱温度180℃）樹脂下部：フェノール樹脂（耐熱温度150℃）金属部：ステンレス鋼ゴム部：シリコン樹脂（耐熱温度220℃）★ご注文前のよくある質問についてご確認下さい★",
                itemText:"フライパン"
            },{
                imgURL400: "https://thumbnail.image.rakuten.co.jp/@0_mall/shizennoyakata/cabinet/item_img/item001/suyaki850g1.jpg?_ex=400x400",
                affiliateUrl: "https://hb.afl.rakuten.co.jp/hgc/g00pvla7.q6kfz902.g00pvla7.q6kg0a63/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fshizennoyakata%2F10051%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fshizennoyakata%2Fi%2F10002851%2F",
                itemName:"2019楽天年間ランキング・グルメ大賞ダブル受賞 アーモンド 無塩・有塩 850g (425g×2袋) 選べるタイプ [ 素焼き カーメル種 素焼きアーモンド ナッツ ロースト 1kgより少し少ない850g 無添加 送料無料 家飲み 宅飲み 保存食 ]",
                itemCaption:"▼ 無塩・有塩 選べる 素焼きアーモンド850g (425g×2袋)▼ 特徴 アーモンドだけでなく、焙煎方法にもこだわっております。創業60年以上のナッツ専門加工業者で、ナッツ一筋30年以上のベテラン職人さんが選び抜いたアーモンドを、遠赤外線熱風ロースターで丁寧に焙煎しておりますので、香ばしさ・ナッツの甘さも他とは一味も二味も異なります。年間約25トンもの加工をしていますので、鮮度が良い煎りたてをお届けできます！ アーモンド 無塩 素焼き850g (425g×2袋)送料無料 名称 木の実 原材料名 ■無塩：アーモンド ■有塩：アーモンド、食塩 原産国 アメリカ 内容量 850g (425g×2袋) 賞味期限 製造日より約185日 保存方法 直射日光、高温・多湿を避けて、常温で保存下さい。 製造者 有限会社　味源 （美味しさは元気の源　自然の館） 香川県仲多度郡まんのう町宮田1019-16　TEL0877−75−3181 お召し上がり方 おやつに、おつまみに、そのままお召し上がりください。また無塩タイプは料理やお菓子作りにも使いやすく便利です。 ご注意 開封後はお早めにお召上がり下さい。 商品は万全を期しておりますが、自然の原料を使用しているため、まれに硬い原料が混ざっている場合がございますので、十分にご注意ください。 温度帯 のし 備考 アーモンドについて 収穫年度や畑の状況、木の個体差により粒の大きさに多少の差異が生じます。自然由来の食品につき何卒ご了承ください。 生のアーモンドに比べ水分含有量が低く、割れやすくなっております。ご自宅用としてのご利用をおすすめします。※当工場では、小麦、そば、卵、乳成分、落花生、エビ、カニ、 くるみ 、 アーモンド を含む製品を製造しています。",
                itemText:"あーーもんど"
            },{
                imgURL400: "https://thumbnail.image.rakuten.co.jp/@0_mall/letao/cabinet/item/f808/f808-2005-m1.jpg?_ex=400x400",
                affiliateUrl: "https://hb.afl.rakuten.co.jp/hgc/g00rjik7.q6kfz599.g00rjik7.q6kg07bc/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fletao%2Ff808%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fletao%2Fi%2F10000923%2F",
                itemName:"ルタオ ドゥーブルフロマージュ 食べ比べセット 4号 (2〜4名様) お中元 ギフト チーズケーキ プレゼント スイーツ ランキング お取り寄せ 北海道 お返し 記念日 おすすめ 人気 おくりもの 冷凍 お礼 夏ギフト サマーギフト 父の日",
                itemCaption:"テレビ朝日にて放送されました「ハナタレナックス EX特別編」で、ドゥーブルフロマージュが紹介されました！ ルタオを代表するチーズケーキ「ドゥーブルフロマージュ」と、 お好きなドゥーブルをお選びいただけるお得なセット。お好きな味わいを、ぜひ食べ比べてみてください。 商品名 ドゥーブルフロマージュ 食べ比べセット 内容量 1品目： ドゥーブルフロマージュ　4号（直径12cm） 選べる2品目： ドゥーブルフロマージュ　4号（直径12cm） ショコラドゥーブル　4号（直径12cm） ［期間限定］メロンドゥーブル〜北海道産赤肉メロン〜　4号（直径12cm） 賞味期限 商品記載の賞味期限内に10℃以下の冷蔵庫内で解凍してください。 5〜8時間で解凍されます。解凍後は冷蔵庫に保管の上、解凍を開始してから48時間以内に召し上がりください。 保存方法 冷凍(-18℃以下)で保存してください。 解凍後は冷蔵(10℃以下)で保存してください。 アレルギー ドゥーブルフロマージュ：小麦、卵、乳成分、ゼラチン ショコラドゥーブル：小麦、卵、乳成分、大豆、ゼラチン メロンドゥーブル〜北海道産赤肉メロン〜：小麦、卵、乳成分、ゼラチン [アーモンドアレルギーをお持ちの方へ] 当店のアレルギー表示に関しましては、食品表示法で表示義務に定められている「特定原材料7品目」と表示推奨とされている「特定原材料に準ずる21品目」にて表示を行なっておりますが、 原材料の調査に時間を要するため、アレルギー表示に「アーモンド」が追加されている商品と追加されていない商品が混在しております。 アーモンドのアレルギーをお持ちのお客様は、商品購入前にお問い合わせください。 原材料 ■ドゥーブルフロマージュ：生クリーム、クリームチーズ、砂糖、全卵、マスカルポーネチーズ、小麦粉、卵黄、ゼラチン／安定剤（ローカストビーンガム） ■ショコラドゥーブル：生クリーム、クリームチーズ、砂糖、全卵、マスカルポーネチーズ、卵黄、チョコレート、小麦粉、ココアパウダー、ゼラチン／安定剤（ローカストビーンガム）、乳化剤（大豆由来）、香料 ■メロンドゥーブル〜北海道産赤肉メロン〜：生クリーム、クリームチーズ、砂糖、マスカルポーネチーズ、全卵、メロンピューレ、卵黄、小麦粉、卵白、ゼラチン／安定剤（ローカストビーンガム）、着色料（クチナシ、紅麹）、香料 製造者 株式会社ケイシイシイ 〒066-0051　北海道千歳市泉沢1007番地111 備考 ※化粧箱のご用意はありません。 ※写真はイメージです。パッケージ、付属のオーナメントなどは予告なく変更になる場合がございます。ルタオを代表するチーズケーキ「ドゥーブルフロマージュ」と、 お好きなドゥーブルをお選びいただけるお得なセット。 お好きな味わいを、ぜひ食べ比べてみてください。 ドゥーブルフロマージュ食べ比べセット 送料込み 3,990円（税込） ■送料について こちらの商品は送料込みです。 ※海外への発送は承っておりません。 ■ルタオのスイーツは様々なご用途でご利用いただいております。 ※商品によっては賞味期限の関係上季節のギフトなどご希望のご用途に対応できない場合もございます、予めご了承下さい。 内祝い・お返し 出産内祝い 結婚内祝い 新築内祝い 快気祝い 入学内祝い 結納返し 香典返し 引き出物 結婚式 引出物 法事 引出物　お礼 謝礼 御礼 お祝い返し お祝い 成人祝い 卒業祝い 結婚祝い 出産祝い 誕生祝い 初節句祝い 入学祝い 就職祝い 新築祝い 開店祝い 移転祝い 退職祝い 還暦祝い 古希祝い 喜寿祝い 米寿祝い 退院祝い 昇進祝い 栄転祝い 叙勲祝い その他ギフト 法人向け プレゼント お土産 手土産 プチギフト お見舞 ご挨拶 引越しの挨拶 誕生日 バースデー 記念日 お取り寄せ 開店祝い 開業祝い 周年記念 記念品 お茶請け 菓子折り おもたせ 贈答品 挨拶回り 定年退職 転勤 来客 ご来場プレゼント ご成約記念 表彰 ご贈答先様 お父さん お母さん 兄弟 姉妹 子供 おばあちゃん おじいちゃん 奥さん 彼女 旦那さん 彼氏 友達 仲良し 先生 職場 先輩 後輩 同僚 取引先 お客様 20代 30代 40代 50代 60代 70代 80代 様々な理由でお選び頂きました※商品レビューより 高級感 美味しい 上品さ 評判が良い 人気 おすすめ 小分け袋 メッセージ単語文例 ハッピーバースデー Happy Birthday! お疲れさま ありがとう ありがとうございます 感謝しています おめでとう お世話になりました よろしく ごめんね 頑張ってください 頑張れ！ 気持ちです 心を込めて 季節のギフト ハレの日 1月 お年賀 正月 成人の日2月 節分 旧正月 バレンタインデー3月 ひな祭り ホワイトデー 春分の日 卒業 卒園 お花見 春休み4月 イースター 入学 就職 入社 新生活 新年度 春の行楽5月 ゴールデンウィーク こどもの日 母の日6月 父の日 7月 七夕 お中元 暑中見舞8月 夏休み 残暑見舞い お盆 帰省9月 敬老の日 シルバーウィーク10月 孫の日 運動会 学園祭 ブライダル ハロウィン11月 七五三 勤労感謝の日12月 お歳暮 クリスマス 大晦日 冬休み 寒中見舞い",
                itemText:"チーズケーキ"
            }
            ]})

        
    })
    })


router.post('/',articleValidator,async function(req,res){
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })
    } 


    // モデル作成．
    var Article = new ArticleModel();
    
    
    
    //Article.setDate();

    //imageURLをimg.jpに渡す
        //変数に入れて変数を渡す
        const imgArr = []
        let cnt = 0
        let cnti = 0
        let newArr = []
    //Article.items = req.body.items
    //console.log(req.body.items)

    // makeImgListAsync(req.body.items,function(result){
    //     console.log("ooi:"+result)
    // })

    req.body.items.forEach((element,ind,arr)=>{
        cnt++
        imgArr.push(element.mediumImage)
        if (cnt === arr.length){
              itemsImgdataRequest(imgArr)
              .then((value)=>{
                  return imgSave(value)
            })
                .catch((error)=>{
                    console.log("create image error :"+error)
                })
            .then((value)=>{
                console.log("saveId article.js:"+ value)　
                Article.items = req.body.items
                Article.saveID = value
                Article.title = req.body.title;
                Article.imageTileMode = req.body.imageTileMode

                Article.save(function(err) {
                                     if (err){
                                         // エラーがあった場合エラーメッセージを返す
                                         res.send(err);
                                    } else {
                                        // エラーがなければ「Success!!」
                                        res.status(201).json({ 
                                            message: 'Success!!',
                                            showUrl: "http://"+kVs.kBaseUrl+'/api/v1/article/'+Article.saveID, //need fix todo
                                            twitterCardUrl:"http://"+kVs.kBaseUrl+"/images/"+Article.saveID+".html", //need fix todo
                            
                                    });}})

            }).catch((error)=>{
                console.log("save Article error: "+error)
            })
        }
    })

    //mapで書く
    //   let resultArr =  req.body.items.forEach((element,ind,arr) => {
    //        cnt++
    //        imgArr.push(element.mediumImage)
    //        if(cnt === arr.length){
               //リクエストしてbodyを
               //promiseの範囲
            //    const requestPromise = new Promise(function(resolve,reject){
            //        console.log("Promiseの中")

            //     imgArr.map((i,dex,arr) => {
            //         console.log("mapの中:"+i)
            //        request(i,{encoding: null }, function(error, response, body) {
            //            cnti++
            //            console.log("cnti:"+cnti)
                       //console.log("body:"+body)
                       
                       //console.log(newArr)
                    //    newArr.push(body)
                    //    console.log("newArr長さ： "+newArr.length)
                    //    if(cnti === arr.length){
                    //    resolve(newArr)
                    //    cnti = 0
                    //     } else {
                    //         console.log("送らない")
                    //     }
                 //  })
            //    })}).then(function(data){
            //             makeSaveId(data).then(function(data){
                        
            //             Article.saveID = data[1]
            //             Article.title = req.body.title;
            //             Article.imageTileMode = req.body.imageTileMode
                        
            //             //console.log('saveID :'+data[1])
            //             //console.log('AsaveID :'+Article.saveID)
            //             //saveId = data[1]
            //             imgSave(data[0],data[1])
            //             Article.save(function(err) {
            //                 if (err){
            //                     // エラーがあった場合エラーメッセージを返す
            //                     res.send(err);
            //                 } else {
            //                     // エラーがなければ「Success!!」
            //                     res.status(201).json({ 
            //                         message: 'Success!!',
            //                         showUrl: "http://"+kVs.kBaseUrl+'/api/v1/article/'+Article.saveID, //need fix
            //                         twitterCardUrl:"http://"+kVs.kBaseUrl+"/images/"+Article.saveID+".html", //need fix
                    
            //                 });
                                
                                
            //                 }
            //             });
            //         })
            //    })
               //imagePromise(imgArr)
               //console.log(imgArr)
        //    }
        // })
    //     console.log(resultArr)aa
       //  imageCre(img).then(function(value){
    //Article.saveID = value
    //Article.saveID = saveId
    
    //Article.text = req.body.text;
    
    //保存終わってから作る方が良い
//     fs.writeFile('images/'+value+'.html', `
//     <meta name="twitter:card" content="summary" />
// <meta name="twitter:site" content="@flickr" />
// <meta name="twitter:title" content="Small Island Developing States Photo Submission" />
// <meta name="twitter:description" content="View the album on Flickr." />
// <meta name="twitter:image" content="http://55fe331ab852.ngrok.io/images/`+value+`.jpg" />
// <meta name="twitter:url" content="https://www.flickr.com/photos/unicphoto/sets/72157645001703785/" />
//     `
//     , function (err) {
//         if (err) { throw err; }
//         console.log('fsOK');
//     });

    

    
    //商品も追加
    
    
    // Article.save(function(err) {
    //     if (err){
    //         // エラーがあった場合エラーメッセージを返す
    //         res.send(err);
    //     } else {
    //         // エラーがなければ「Success!!」
    //         res.json({ 
    //             message: 'Success!!',
    //             //showUrl: kVs.kBaseUrl+'/article/'+value,
    //             //twitterCardUrl:kVs.kBaseUrl+"/images/"+value+".html",

    //     });
            
            
    //     }
    // });
       });
    
//});

function makeImgListAsync(list,callback){
 list.forEach(ele => {
     list.push(ele.mediumImage);
     callback(list);
 })
}

function makeSaveId(arr){
    return new Promise(function(resolve,reject){
        var ouid = uuid.v4().split('-').join('');
        resolve([arr,ouid])
    })
    
}

 async function itemsImgdataRequest(imgUrl){
    return new Promise((resolve,reject)=>{
        let cnt = 0
        const resArr = imgUrl 
        const newArr = []
         resArr.map((i,dex,arr) => {
           request(i,{encoding: null }, function(error, response, body) {
               if(error){
                   reject(new Error("request error"+error))
               }
               cnt++
               //console.log("cnti:"+cnti)
               //console.log("body:"+body)
               
               //console.log(newArr)
               newArr.push(body)
               //console.log("newArr長さ： "+newArr.length)
               if(cnt === arr.length){
               resolve(newArr)
               cnt = 0
                } 
           })
       })
    })   


}

//promiseまとめて配列作るfunc
async function makeResItems(codeArr){
    return new Promise((resolve,reject)=>{
        let cnt = 0
        let promiseArr = []
        codeArr.forEach((ele,idx,arr)=>{
            cnt++
            promiseArr.push(rakutenRequest(ele))
            if(cnt === arr.length){
                //return resolve(Promise.all(promiseArr))
               Promise.all(promiseArr).then(value =>{
                   return resolve(value)
               })
            }
        })
    })
}
const rakutenRequest = (itemCode) => {
    return new Promise((resolve,reject)=>{
        const query = {applicationId:kVs.applicationId,itemCode: encodeURI(itemCode)}
        //console.log("itemcode確認："+itemCode)
        const url = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?format=json&"+qs.stringify(query)
        console.log("url確認："+url)
        // const options ={
        //     url: "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?",
        //     headers: {
        //         "Content-type": "application/x-www-form-urlencoded",
        //       },
        //     json:{
        //         applicationId: 1051449918157974234,
            //applicationId: kVs.applicationId,
          //  itemCode: itemCode,
            //affiliateId: kVs.affiliateId,
            //method: "POST",
           // }
       // }
        request.get({url:url}, (err,res,body)=>{
            if(err || res.statusCode !== 200){
                //rakutenapierr
                console.log("resが200じゃない:"+res.statusCode)
                console.log(err)
            } else {
                console.log("statusCode: "+res.statusCode)
                resolve(JSON.parse(body)) 
                //console.log("どっち？"+body)
            }
        })
    })
}


//routerをモジュールとして扱う準備
module.exports = router;