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

var checkAccountValid = function (account) {
    if (account.length != 11) {
        return false
    } else {
        for (let i = 0; i < account.length; i++) {
            var charCode = account.charCodeAt(i);
            if (charCode < 48 || charCode > 57) {
                return false
            }
        }
        return true
    }
}

var checkPasswordValid = function(password){
    if(password.length < 6 || password.length > 16){
        return false
    }else{
        for (let i = 0; i < password.length; i++) {
            var charCode = password.charCodeAt(i);
            if (charCode < 33 || charCode > 127) {
                return false
            }
        }
        return true
    }
}

var checkUsernameValid = function(username){
    if(username.length < 2 || username.length > 12){
        return false
    }else{
        return true
    }
}

export {
    validAccountKeyup,
    accountKeydownIsValid,
    validPasswordKeyup,
    passwordKeydownIsValid,
    checkAccountValid,
    checkPasswordValid,
    checkUsernameValid
}