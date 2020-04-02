var url = require('/url.js');
module.exports = {
  except: except,
  removeEmpty: removeEmpty,
  getKeyvalue: getKeyvalue
}
function getKeyvalue(json){
  var obj = {}
  for (var key in json){
    if (json[key]){
      obj[key] = json[key]
    }
  }
  return obj
}
function except(dict) {
  var str="";
  var cc = removeEmpty(dict)
  var arr = addArr(cc);
  str = arr.join("&")
return str+"&key="+url.key
}
function removeEmpty(obj) {
  //去除value为空的元素
  Object.keys(obj).forEach(function (key) {
    (obj[key] && typeof obj[key] === 'object') && removeEmpty(obj[key]) ||
      (obj[key] === undefined || obj[key] === null) && delete obj[key]
  });
  return obj;
};
function addArr(obj) {
  var arr = [];
  Object.keys(obj).forEach(function (key) {
    if (typeof (obj[key]) =='object'){
      var str = key + "=" + JSON.stringify(obj[key])
    }else{
      var str = key + "=" + (obj[key])
    }
    arr.push(str)
  });
  return arr.sort();
};