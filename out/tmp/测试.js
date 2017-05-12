
function run(runner,envOuter){
    var env={}
    function setter(name,value){
        env=envOuter[name]||value;
    }

    //create start
    var i;


env.method='get';
env.base='http://192.168.0.157:8080';
if (false) {
  env.base='http://115.28.68.224:8080';
  env.method='post';
}
for (i = 1; i <= 20; i++) {
  runner.addHttpTask(([(env.base),'/test?_f=1&test=',i].join('')),(env.method));
}

    //create end    
}

exports.default = run;
