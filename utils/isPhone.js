

module.exports = {
  phone: abc
}

function abc(phone) {
  var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  console.log(phone);
  if (!myreg.test(phone)) {

    return false;
  } else {
    return true;
  }
  callback();
}
