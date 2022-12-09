function errorMessage(err){
  console.log('[ErrorHelper]');
  if (typeof (err) === 'string') {
    return { Message: err };
  }
  if (err.name === 'CastError') {
    return CastError(err);
  }
  if (err.name === 'ValidationError') {
    return ValidatorError(err.errors);
  }
  if (err.name === 'UnhandledPromiseRejectionWarning'){
    return { Message: err.message}
  }
  return {Message: err+''};
}
function ValidatorError(err) {
  for (var key in err) {
    if (err.hasOwnProperty(key)) {
      err[key] = err[key].message;
    }
  }
  var arrayToString = JSON.stringify(err);
  var stringToJSON = JSON.parse(arrayToString);
  var topDownValidation = stringToJSON[Object.keys(stringToJSON)[0]];
  return {Message: topDownValidation};
}
function CastError(err) {
  return {
    Name : err.name,
    Path : err.path,
    Message : 'Failed to cast' + err.path
  }
}
export default errorMessage;