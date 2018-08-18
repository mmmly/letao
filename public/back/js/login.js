/**
 * Created by Lenovo on 2018/8/18.
 */
$(function(){
  //1.进行表单校验
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      username:{
        validators:{
            notEmpty:{
              message:"用户名不能为空"
            },
          stringLength:{
            min:2,
            max:6,
            message:'用户名长度必须在2-6之间'
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
    password:{
      validators:{
        notEmpty:{
          message:'密码不能为空'
        },
        stringLength:{
          min:6,
          max:12,
          message:'密码长度必须在6-12之间'
        },
        callback:{
          message:"密码错误"
        }
      }
    }
    }
  });


  //2.登录功能
  //表单校验插件会在提交表单时进行校验
  //(1)校验成功,默认就提交表单,会发生页面跳转
  // 我们需要注册表单校验成功事件,阻止默认行为,通过ajax提交
  //(2)
  $('#form').on("success.form.bv",function(e){
    //阻止默认行为
    e.preventDefault();
    //发送ajax请求
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$('#form').serialize(),
      success:function(info){
        if(info.success){
          location.href = "index.html";
        }
        if(info.error === 1000){
          $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }
        if(info.error === 1001){
          $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
      }
    })
  })

  //重置功能
  $('[type="reset"]').on("click",function(){
    $('#form').data('bootstrapValidator').resetForm();
    //console.log(1);
  })
});