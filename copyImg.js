const https = require('https')
const req = require('request')
var fs = require("fs")
var imgList = ["https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/logo/5abdb84b-119d-4050-b1a2-16b16eab8c7e.png/:/rs=h:1050/qt=q:95 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/logo/5abdb84b-119d-4050-b1a2-16b16eab8c7e.png/:/rs=h:1050/qt=q:95 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/5000x5000.jpg/:/","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/2000x2000.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1200,cg:true 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/7-%E9%80%82%E9%85%8D%E5%9C%BA%E6%99%AF10%E4%B8%AA.jpg/:/rs=w:1200,h:1500,cg:true,m/cr=w:2400,h:1500,a:cc 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/5-HDMI-%E4%B8%A4%E4%B8%AA%E5%A4%B4%E9%80%82%E9%85%8D%E8%AE%BE%E5%A4%873-1-1.jpg/:/rs=w:1200,h:1500,cg:true,m/cr=w:2400,h:1500,a:cc 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/2000x2000.jpg/:/rs=w:1200,h:1500,cg:true,m/cr=w:2400,h:1500,a:cc 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/2-HDMI-pcb.jpg/:/rs=w:1200,h:1500,cg:true,m/cr=w:2400,h:1500,a:cc 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/3-HDMI-%E7%BA%BF%E5%89%96%E5%BC%80%E5%9B%BE.jpg/:/rs=w:1200,h:1500,cg:true,m/cr=w:2400,h:1500,a:cc 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/6-HDMI-100_%E9%80%9A%E8%BF%87%E6%A3%80%E6%B5%8B.jpg/:/rs=w:1200,h:1500,cg:true,m/cr=w:2400,h:1500,a:cc 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/4-HDMI-%E8%93%9D%E5%85%89%E8%BF%9E%E6%8E%A5%E7%94%B5%E8%A7%86.jpg/:/rs=w:1200,h:1500,cg:true,m/cr=w:2400,h:1500,a:cc 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/7-%E9%80%82%E9%85%8D%E5%9C%BA%E6%99%AF10%E4%B8%AA.jpg/:/rs=w:1200,h:1500,cg:true,m/cr=w:2400,h:1500,a:cc 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/5-HDMI-%E4%B8%A4%E4%B8%AA%E5%A4%B4%E9%80%82%E9%85%8D%E8%AE%BE%E5%A4%873-1-1.jpg/:/rs=w:1200,h:1500,cg:true,m/cr=w:2400,h:1500,a:cc 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/2000x2000.jpg/:/rs=w:1200,h:1500,cg:true,m/cr=w:2400,h:1500,a:cc 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/2-HDMI-pcb.jpg/:/rs=w:1200,h:1500,cg:true,m/cr=w:2400,h:1500,a:cc 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/2000x2000.jpg/:/rs=w:300,h:210,cg:true,m/cr=w:300,h:210,a:cc 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/2-HDMI-pcb.jpg/:/rs=w:300,h:210,cg:true,m/cr=w:300,h:210,a:cc 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/3-HDMI-%E7%BA%BF%E5%89%96%E5%BC%80%E5%9B%BE.jpg/:/rs=w:300,h:210,cg:true,m/cr=w:300,h:210,a:cc 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/6-HDMI-100_%E9%80%9A%E8%BF%87%E6%A3%80%E6%B5%8B.jpg/:/rs=w:300,h:210,cg:true,m/cr=w:300,h:210,a:cc 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/4-HDMI-%E8%93%9D%E5%85%89%E8%BF%9E%E6%8E%A5%E7%94%B5%E8%A7%86.jpg/:/rs=w:300,h:210,cg:true,m/cr=w:300,h:210,a:cc 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/7-%E9%80%82%E9%85%8D%E5%9C%BA%E6%99%AF10%E4%B8%AA.jpg/:/rs=w:300,h:210,cg:true,m/cr=w:300,h:210,a:cc 3x","https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/5-HDMI-%E4%B8%A4%E4%B8%AA%E5%A4%B4%E9%80%82%E9%85%8D%E8%AE%BE%E5%A4%873-1-1.jpg/:/rs=w:300,h:210,cg:true,m/cr=w:300,h:210,a:cc 3x"]

var dirList = [ 'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/logo',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/logo',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b',
'static/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b' ]

var imgNameList = ['5abdb84b-119d-4050-b1a2-16b16eab8c7e.png',
'5abdb84b-119d-4050-b1a2-16b16eab8c7e.png',
'5000x5000.jpg',
'2000x2000.jpg',
'7-%E9%80%82%E9%85%8D%E5%9C%BA%E6%99%AF10%E4%B8%AA.jpg',
'5-HDMI-%E4%B8%A4%E4%B8%AA%E5%A4%B4%E9%80%82%E9%85%8D%E8%AE%BE%E5%A4%873-1-1.jpg',
'2000x2000.jpg',
'2-HDMI-pcb.jpg',
'3-HDMI-%E7%BA%BF%E5%89%96%E5%BC%80%E5%9B%BE.jpg',
'6-HDMI-100_%E9%80%9A%E8%BF%87%E6%A3%80%E6%B5%8B.jpg',
'4-HDMI-%E8%93%9D%E5%85%89%E8%BF%9E%E6%8E%A5%E7%94%B5%E8%A7%86.jpg',
'7-%E9%80%82%E9%85%8D%E5%9C%BA%E6%99%AF10%E4%B8%AA.jpg',
'5-HDMI-%E4%B8%A4%E4%B8%AA%E5%A4%B4%E9%80%82%E9%85%8D%E8%AE%BE%E5%A4%873-1-1.jpg',
'2000x2000.jpg',
'2-HDMI-pcb.jpg',
'2000x2000.jpg',
'2-HDMI-pcb.jpg',
'3-HDMI-%E7%BA%BF%E5%89%96%E5%BC%80%E5%9B%BE.jpg',
'6-HDMI-100_%E9%80%9A%E8%BF%87%E6%A3%80%E6%B5%8B.jpg',
'4-HDMI-%E8%93%9D%E5%85%89%E8%BF%9E%E6%8E%A5%E7%94%B5%E8%A7%86.jpg',
'7-%E9%80%82%E9%85%8D%E5%9C%BA%E6%99%AF10%E4%B8%AA.jpg',
'5-HDMI-%E4%B8%A4%E4%B8%AA%E5%A4%B4%E9%80%82%E9%85%8D%E8%AE%BE%E5%A4%873-1-1.jpg' ]


dirList.some((item,i) => {
    dirList[i] = item + '/' + imgNameList[i]
})





const createDir = (path, spliceIndex = 1, arr)=> {

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
        if(!exists){ //没有创建文件夹
            fs.mkdir(isPath, (err) => {
                if(err) return console.log(err)
               
            })
        }

        if( allPath == isPath) {
            arr.splice(0,1)
            oneCreateDir(arr)
            return false
        }
        spliceIndex ++ 
        createDir(allPath, spliceIndex, arr)
        
    
        
    });
   
}




oneCreateDir = (arr) => {
    scriptSrc = arr[0]
    if(!scriptSrc) return console.log('over !!!!!') 
    createDir(scriptSrc, 1, arr)
}
// oneCreateDir(dirList)

createImg = (dirList, requestSrc) => {
    var filePath = dirList[0] 
    var src = requestSrc[0]
   
    if(!src) return console.log('over!!!!!') 
    dirList.splice(0,1)
    requestSrc.splice(0,1)
    
 
    new Promise((resolve)=> {
        fs.exists(filePath, exists => {
            resolve(exists)
        })
       
    }).then(exists => {
        console.log(exists)
        if(exists) { // 有图片

            createImg(dirList, requestSrc)
        }else{//没有图片
            
            https.get(src,function(res){
                var datas = [];
                var size = 0;
                res.on('data', function(data){
                    datas.push(data);
                    size += data.length;
                })
                res.on('end', function(data){
                    var buff = Buffer.concat(datas, size);
                   
                    fs.writeFile(filePath, buff, err => {
                        if(err) return console.log('写入失败')
                        console.log('写入成功')
                        setTimeout(() => {
                            createImg(dirList, requestSrc)
                        }, 2000)
                      
                    })
                  
                })
            }).on('error',function(err){
                
                
            })
        }
    })
    
}
createImg(dirList, imgList)
// var src = 'https://img1.wsimg.com/isteam/ip/ad3bbbb1-2e4c-48fb-9d5c-384892e8b61b/logo/5abdb84b-119d-4050-b1a2-16b16eab8c7e.png/:/rs=h:1050/qt=q:95 3x'

       
            
