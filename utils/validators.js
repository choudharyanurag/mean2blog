

var regexp = function (strvar, expression) {
    let regexer = new RegExp(expression);
    if (!strvar) {
        return false;
    } else {
        return regexer.test(strvar);
    }
}

var vallength = function (strvar, minlen, maxlen) {
    if (!strvar) {
        return false;
    } else {
        if (strvar.length < minlen || strvar.length > maxlen) {
            return false;
        } else {
            return true;
        }
    }
}


module.exports.Validate = {
    regexp : regexp,
    vallength : vallength
};







