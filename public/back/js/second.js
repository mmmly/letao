/**
 * Created by Lenovo on 2018/8/19.
 */
$(function(){
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        //console.log(info);
        var htmlStr = template("secondTpl",info);
        $('.lt_content tbody').html(htmlStr);
        //分页插件初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil( info.total / info.size),
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          }
        })
      }
    })
  }

    //点击添加分类,模态框显示
  $('#addBtn').on("click",function(){
    $('#addSecond').modal('show');
    //发送ajax请求,获取一级分类数据
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function(info){
        //console.log(info);
        var htmlStr = template('cateTpl',info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  })
  //点击一级分类,button中显示对应文本
  $('.dropdown-menu').on("click","li",function(){
    //var currentId = $(this).data('id');
    //console.log(currentId);
    var text = $(this).text();
    //console.log(text);
    $('#dropdownText').text(text);
  });
  //上传图片
  $('#fileUpload').fileupload({
      dataType:"json",
      done:function(e,data){
      console.log(data);
      var imgUrl = data.result.picAddr;
        $('#imgBox img').attr("src",imgUrl);
    }
  });
})