/**
 * Created by Lenovo on 2018/8/19.
 */
$(function(){
  var currentPage = 1;
  var pageSize = 5;
  var currentId;
  var isDelete;
  render();
  //对页面进行渲染
  function render(){
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        //console.log(info);
        var htmlStr = template('tpl',info);
        $('tbody').html(htmlStr);
        //分页插件初始化
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total / info.size),//总页数
          //size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    })
  };

  //给操作按钮注册点击事件
  $('.lt_content tbody').on("click",'.btn',function(){
    //点击按钮显示模态框
    $('#userModal').modal('show');
    currentId = $(this).parent().data('id');
    //1启用 0禁用
    isDelete = $(this).hasClass('btn-danger') ? 0:1;
    //console.log(id);
  })
  $('#submitBtn').on('click',function(){
    //点击确定后发送ajax请求,修改数据库中的状态,并重新渲染页面
    $.ajax({
      type:"post",
      url:"/user/updateUser",
      data:{
        id:currentId,
        isDelete:isDelete
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          $('#userModal').modal('hide');
          //重新渲染
          render();
        }
      }
    })

  })




})