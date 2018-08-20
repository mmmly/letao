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
    var id = $(this).data("id");
    //隐藏域表单信息同步
    $('#dropHid').val(id);
    //重置表单
    $('#form').data("bootstrapValidator").updateStatus("categoryId","VALID");
  });
  //上传图片预览
  $('#fileUpload').fileupload({
      dataType:"json",
      done:function(e,data){
      //console.log(data);
      var imgUrl = data.result.picAddr;
        $('#imgBox img').attr("src",imgUrl);
        //隐藏域表单信息同步
        $('#picHid').val(imgUrl);
        //重置表单
        $('#form').data("bootstrapValidator").updateStatus("brandLogo","VALID");
    }
  });




  //二级分类页的表单校验
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入二级分类名称"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传文件"
          }
        }
      }
    }
  });
  //表单校验成功后,阻止默认事件
  $('#form').on("success.form.bv",function(e){
    e.preventDefault();
  //发送ajax请求
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$('#form').serialize(),
      dataType:"json",
      success:function(info){
        console.log(info);
        //发送成功后,关闭模态框,重新渲染数据
        $('#addSecond').modal('hide');
        currentPage = 1;
        render()
      }
    })

  })
})