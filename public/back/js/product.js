/**
 * Created by Lenovo on 2018/8/20.
 */
$(function(){
  var currentPage = 1;
  var pageSize = 5;
  //定义一个数组存储上传到额图片
  var picArr = [];
  render();
  //发送ajax,对页面进行渲染
  function render(){
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        //console.log(info);
        var htmlStr = template("productTpl",info);
        $('.lt_content tbody').html(htmlStr);
      }
    })
  }

  //给添加商品按钮注册点击事件,点击后弹出模态框
  $('#addBtn').on("click",function(){
    $('#addProduct').modal('show');
    //发送请求获取二级分类数据并进行渲染
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize:"1000"
      },
      dataType:"json",
      success:function(info){
        //console.log(info);
        var htmlStr = template('secTpl',info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  })


  //选择二级分类后,将数据id同步到隐藏域
  $('.dropdown-menu').on("click"," li",function(){
    var id = $(this).data("id");
    $('[name="brandId"]').val(id);
    $('#dropdownText').text($(this).children().text());
  })

  //文件上传插件初始化
  $('#fileUpload').fileupload({
    dataType:"json",
    done:function(e,data){
      console.log(data.result);
      picArr.unshift(data.result);
      console.log(picArr);
      if(picArr.length > 3){
        picArr.pop();
      }
      if(picArr.length === 3){
        console.log(picArr[2].picAddr);
        $('#imgBox1').prepend('<img src="'+ picArr[2].picAddr +'" >');
        $('#imgBox1').prepend('<img src="'+ picArr[1].picAddr +'" >');
        $('#imgBox1').prepend('<img src="'+ picArr[0].picAddr +'" >');
        var picStr = '';
        picArr.forEach(function(v,i){
          picStr += v.picAddr1&picName1
        })
      }
    }
  })

})