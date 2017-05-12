
function run(runner,envOuter){
    var env={}
    function setter(name,value){
        env=envOuter[name]||value;
    }


    //create start
     env.test=11;
     env.test1=123
     
     for(var i=0;i<10;i++){
      runner.addHttpTask("www.baidu.com",'post');
     }
     
     runner.addFileJob("文件名")

     //create end    
}

export default run;


     