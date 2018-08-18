/**
 * Created by Lenovo on 2018/8/18.
 */
$(function(){
  $(document).ajaxStart(function(){
    NProgress.start();
  });
  $(document).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done();
    },500);
  })
})