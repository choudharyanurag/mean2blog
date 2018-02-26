var Validate = module.exports =function Validate() { 

};


Validate.prototype.vallength = function (strvar, minlen, maxlen) {
    if (!strvar) {
        return false;
    } else {
        if (strvar.length < minlen || strvar.length > maxlen) {
            return false;
        } else {
            return true;
        }
    }
};

Validate.prototype.regex = function (strvar, expression) {
    let regexer = new RegExp(expression);
    if (!strvar) {
        return false;
    } else {
        return regexer.test(strvar);
    }
};



