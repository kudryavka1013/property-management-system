var validAccountKeyup = function (string) {
    //过滤不合法字符
    if (string != null) {
        var str = "";
        for (let i = 0; i < string.length; i++) {
            var charCode = string.charCodeAt(i);
            if (charCode >= 48 && charCode <= 57) {
                str += string.charAt(i);
            }
        }
        return str;
    }
};
var accountKeydownIsValid = function (keyCode) {
    if ((keyCode >= 48 && keyCode <= 57) || keyCode == 8) {
        // 这是数字或者退格
        return true;
    } else {
        return false;
    }
};
var validPasswordKeyup = function (string) {
    //过滤不合法字符
    if (string != null) {
        var str = "";
        for (let i = 0; i < string.length; i++) {
            var charCode = string.charCodeAt(i);
            if (charCode >= 33 && charCode <= 127) {
                str += string.charAt(i);
            }
        }
        return str.slice(0, 16);
    }
};
var passwordKeydownIsValid = function (keyCode) {
    if ((keyCode >= 33 && keyCode <= 127) || keyCode == 8) {
        // 这是合法字符或者退格
        return true;
    } else {
        return false;
    }
};
export {
    validAccountKeyup,
    accountKeydownIsValid,
    validPasswordKeyup,
    passwordKeydownIsValid
}