const req = require('request')
var fs = require("fs")

var scriptList = ["https://img1.wsimg.com/poly/v2/polyfill.min.js", "https://img1.wsimg.com/blobby/go/gpub/2eafea827af3b752/script.js", "https://img1.wsimg.com/ceph-p3-01/website-builder-data-prod/static/widgets/UX.3.49.2.js", "https://img1.wsimg.com/blobby/go/gpub/8c9d8c6e87277db/script.js", "https://img1.wsimg.com/blobby/go/gpub/4d531df9288dac1d/script.js", "https://img1.wsimg.com/blobby/go/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/gpub/1d39522c37e7dff9/script.js", "https://img1.wsimg.com/blobby/go/gpub/cebbfd71c837a3d/script.js", "https://img1.wsimg.com/blobby/go/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/gpub/8b6b95d009ccfb46/script.js", "https://img1.wsimg.com/tcc/tcc_l.combined.1.0.6.min.js"]
var linkList = ["https://img1.wsimg.com/blobby/go/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/gpub/6b70c13cf81664b3/styles.css","https://img1.wsimg.com/blobby/go/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/gpub/360b589904a83ccf/styles.css","https://img1.wsimg.com/blobby/go/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/gpub/75f1a79144e0af9c/styles.css"]

const createDir = (path, spliceIndex = 1, data, arr)=> {

    var isPath = ''
    var allPath = path
    for (let index = 0; index < spliceIndex; index++) {
       var pathIndex = path.indexOf('/')
        if(isPath){
           
            isPath = isPath + '/' + path.slice(0,(pathIndex == -1 ?  path.length : pathIndex))
          
        }else{
            isPath = isPath + path.slice(0,pathIndex)
        }
        path = path.substr(pathIndex+1)
    }
    
    
   
    fs.exists(isPath, function (exists) {
        
        
        if((isPath.indexOf('.')+1) && !exists){ // 当文件夹下没有文件时; 并且 是为file  写入文件
            fs.writeFile(isPath, data, err => {
                if(err) return console.log(err)
               
                console.log(`write file ${isPath} success !`)
               
                 arr.splice(0,1)
                
                 request(arr)

            })
            return false
        }
        if(!exists){ //没有创建文件夹
            fs.mkdir(isPath, (err) => {
                if(err) return console.log(err)
               
            })
        }
        spliceIndex ++ 
        createDir(allPath, spliceIndex, data, arr)
        
    
        
    });
   
} 

// 请求
request = (arr) => {

    scriptSrc = arr[0]
  
    if(!scriptSrc) return console.log('over !!!!!') 
    req(scriptSrc, (err, res, body) => {
        if(err) return  console.log(err)
        var path = 'static' + res.req.path
      
        createDir(path, 1, body, arr)
       
    } )
}
// request(linkList)


var src = "https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/logo/5abdb84b-119d-4050-b1a2-16b16eab8c7e.png/:/rs=h:525/qt=q:95%201.5x";




// getImgList = (allNode) => {
//     for(var i = 0; i < nodeImg.length; i++){
//         var itemScript = nodeImg[i]
//         var src = ''
//         if(itemScript.srcset){
//             src = itemScript.srcset;
//             var srcList = src.split(',\n')
//             console.log(srcList )
//             src = srcList[srcList.length-1]
    
    
            
//         }else{
//             src = itemScript.src
//         }
        
        
        
    
//         if(src.length == 0) continue;
        
//         //if(src.indexOf('?')+1) src = src.substr(0, src.indexOf("?"))
//         imgList .push(src)
//     }
// }