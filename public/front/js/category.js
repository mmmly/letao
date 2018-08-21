/**
 * Created by Lenovo on 2018/8/21.
 */
console.log($('.lt_footer ul li a[href^="category.html"]'));
//点击分类页时,发ajax请求,获取分类数据
render();
function render(){
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    dataType:"json",
    success:function(info){
      console.log(info);
      var htmlStr = template("leftTpl",info);
      $('.lt_left ul').html(htmlStr);
    }
  })
}