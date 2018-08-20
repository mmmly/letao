/**
 * Created by Lenovo on 2018/8/19.
 */
$(function(){
  var currentPage = 1;
  var pageSize = 5;
  render();


  //发送ajax请求,获取一级分类数据,进行渲染
  function render(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(Math.ceil( info.total / info.size));
        var htmlStr = template("firstTpl",info);
        $('.lt_content tbody').html(htmlStr);
        //分页功能实现
        $('#paginator').bootstrapPaginator({
          //设置bootstrap版本,如果是3,这个参数一定要设置
          bootstrapMajorVersion:3,
          //设置当前页
          currentPage:info.page,
          //设置总页数
          totalPages:Math.ceil( info.total / info.size),
          //为分页按钮绑定点击事件,page就是当前点击的按钮值
          onPageClicked:function(a,b,c,page){
            //点击分页后重新进行渲染
            //console.log("重新渲染");
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  //点击添加分类按钮,弹出模态框,填写分类
  $('#addBtn').on("click",function(){
    $('#addModal').modal('show');
  })
  //对填写的分类进行表单验证
  $('#form').bootstrapValidator({
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类名称"
          }
        }
      }
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }
  });
  //阻止默认跳转
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
  })

  //添加完成后,发送ajax请求,添加数据并重新渲染页面
  $('#submitBtn').on("click",function(){
    var text = $('#addCategory').val();
    //console.log(text);
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:{
        categoryName:text
      },dataType:"json",
      success:function(info){
        //console.log(info);
        if (info.success){
          //关闭模态框
          $('#addModal').modal('hide');
          //重新渲染数据
          currentPage = 1;
          render();
          //表单重置
          $('#form').data('bootstrapValidator').resetForm(true);
        }
      }

    })
  })
})