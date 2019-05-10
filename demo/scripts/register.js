/**
 * 注册功能
 */
window.onload = function () {
    //注册 

    //获取手机号码
    let userPhone = $("#userPhone");
    //获取验证码

    let userPin = $("#userPin");
    //获取手机验证码
    let userPhonePin = $("#userPhonePin");
    //获取密码
    let passWord = $("#passWord");
    //获取二次密码
    let rePassWord = $("#rePassWord");
    let flag1 = false;
    let flag2 = false;
    let flag3 = false;
    let flag4 = false;
    let flag5 = false;


    //change  失去焦点事件
    userPhone.change(function () {

        if (userPhone.val().length == 0) {
            alert('用户名不能为空');
        }else{
            var reg = /^1[3579]\d{9}$/;
        if (!reg.test(userPhone.val())) {
            alert('用户名格式错误，请重新输入');
        } else {
            flag1 = true;
            alert('用户名输入正确');
        }
        }
        
    });
    userPin.change(function () {
        if (userPin.val().length == 0) {
            alert('验证码不能为空');
        }
        var reg = /^\d{6}$/;
        if (!reg.test(userPin.val())) {
            alert('验证码格式错误，请重新输入');
        } else {
            flag2 = true;
            alert('验证码格式输入正确');
        }
    });
    userPhonePin.change(function () {
        if (userPhonePin.val().length == 0) {
            alert('验证码不能为空');
        }
        var reg = /^\d{4}$/;
        if (!reg.test(userPhonePin.val())) {
            alert('手机验证码格式错误，请重新输入');
        } else {
            flag3 = true;
            alert('手机验证码输入正确');
        }
    });
    passWord.change(function () {
        if (passWord.val().length == 0) {
            alert('密码不能为空');

        }
        var reg = /^[A-Za-z0-9]{6,16}$/;
        if (!reg.test(passWord.val())) {
            alert('密码格式错误，请重新输入');
        } else {
            flag4 = true;
            alert('密码码输入正确');
        }
    });
    rePassWord.change(function () {
        if (rePassWord.val().length == 0) {
            alert('密码不能为空');

        }
        if (rePassWord.val() == passWord.val()) {
            alert('密码输入正确');
            flag5 = true;

        } else {
            alert('密码格式输入不一致，请重新输入');

        }
    });

    $("#reg").click(function (e) {
      e.preventDefault();
        if (flag1&&flag2&&flag3&&flag4&&flag5) {
            let  userPhone = $("#userPhone").val();
            console.log( userPhone);
            let passWord = $("#passWord").val();
            let userInfoJson = {
                "userPhone" :userPhone , 
                "passWord" : passWord
            }
            //将对象存入到cookie中
            setCookie("userinfo", JSON.stringify(userInfoJson));
            alert("注册成功");
            location.href = "http://127.0.0.1/demo/login.html";
            
        }
       
    })
}