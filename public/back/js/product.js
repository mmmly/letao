/**
 * Created by Lenovo on 2018/8/20.
 */
$(function(){
  var currentPage = 1;
  var pageSize = 5;
  var picStr = '';
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
        //分页插件初始化
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil( info.total / info.size),//总页数
          //size:"small",//设置控件的大小，mini, small, normal,large
          itemTexts:function(type,page, current){//文字翻译
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return page;
            }
          },
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
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
    $('#form').data("bootstrapValidator").updateStatus("brandId","VALID")
  })

  //文件上传插件初始化
  $('#fileUpload').fileupload({
    dataType:"json",
    done:function(e,data){
      picArr.unshift(data.result);
      $('#imgBox1').prepend('<img src="'+ picArr[0].picAddr +'" >');
      if(picArr.length > 3){
        picArr.pop();
        $('#imgBox1 img:last-of-type').remove();
      }
      if(picArr.length === 3){
        //当上传图片为3张时,手动重置校验状态
        $('#form').data("bootstrapValidator").updateStatus("brandLogo","VALID");


        picArr.forEach(function(v,i){
          picStr += "&"+v.picAddr+"&"+v.picName;
        })
        //console.log(picStr);
        //$('#picHid').val(picStr);
      }
    }
  })


  //正则校验
  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },
      brandId:{
        validators:{
          notEmpty:{
            message:"请选择二级分类"
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品描述"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"请输入商品库存"
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:"请输入商品尺码"
          },
          //正则校验
          regexp: {
            regexp: /\d{2}-\d{2}/,
            message: '尺码格式, 必须是 32-40'
          }
        }
      },
      proName:{
        oldPrice:{
          notEmpty:{
            message:"请输入商品原价"
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品原价"
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:"请输入商品价格"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传3张图片"
          }
        }
      }
    }
  })


  //表单校验成功后,阻止默认行为,发送请求提交信息
  $('#form').on("success.form.bv",function(e){
    e.preventDefault();
    //发送ajax请求,上传填写的内容
    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:$('#form').serialize()+picStr,
      dataType:"json",
      success:function(info){
        console.log(info);
        //上传成功后,关闭模态框
        $('#addProduct').modal('hide');
        //重新渲染页面
        render();
        //重置表单元素
        $('#form').data("bootstrapValidator").resetForm(true);
        //重置非表单元素
        $('#dropdownText').text("请选择二级分类");
        $('#imgBox1').html("");
      }
    })
  })
})