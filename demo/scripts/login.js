
$("#log").click(function () {


  //取出cookie数据
  let cookieJson = getCookie("userinfo");

  if (cookieJson) {
    //如果有cookie 登录 取出用户名字和用户密码
    let userPhone = $("#userPhone").val();
    let passWord = $("#passWord").val();
    if (userPhone === cookieJson.userPhone && passWord === cookieJson.passWord) {
      location.href = "http://127.0.0.1/demo/list.html";
    } else {
      alert("用户或用户名输入错误，请重新输入");
      $("#userPhone").val("");
      $("#passWord").val("");
    }
  }
})