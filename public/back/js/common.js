/**
 * Created by Lenovo on 2018/8/18.
 */
/*进度条*/
$(function(){
  $(document).ajaxStart(function(){
    NProgress.start();
  });
  $(document).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done();
    },500);
  })
});
/*登录拦截功能*/
/*indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置*/
$(function(){
  if(location.href.indexOf("login.html") === -1){
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      dataType:"json",
      success:function(info){
        //console.log(info);
        //console.log(1);
        if(info.error === 400){
          location.href = "login.html";
        }
      }
    })
  }
})
/*侧边栏显示隐藏*/
$(function(){
  $('.icon_menu').click(function(){
    $('.lt_aside').toggleClass("hideMenu");
    $('.lt_topBar').toggleClass("hideMenu");
    $('.lt_main').toggleClass("hideMenu");
  });
  /*侧边栏二级导航显示与隐藏*/
  $('.category').on("click",function(){
    $('.child').stop().slideToggle();
  });
  /*退出功能*/
  $(".icon_logout").on("click",function(){
    $('#modalLogout').modal('show');
  });
  $('.logoutBtn').on("click",function(){
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          location.href = "login.html";
        }
      }
    })
  })
})