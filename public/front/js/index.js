/**
 * Created by Lenovo on 2018/8/20.
 */
$(function(){

  //获得slider插件对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
  });
})