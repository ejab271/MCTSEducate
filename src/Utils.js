

function checkChanges(a,b){
    let change = 0;
    for (var k = 0; k< a.length; k++){
        if(a[k] !==b[k] ){
            change = k;
        }
       
      }
      return change;
};


const Utils = {
    checkChanges,
};

export default Utils;