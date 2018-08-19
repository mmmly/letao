/**
 * Created by Lenovo on 2018/8/18.
 */
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.querySelector('.bar'));
var piechart = echarts.init(document.querySelector('.pie'));
// 指定图表的配置项和数据
var option = {
  //标题文本
  title:{
    text:'2017年注册人数'
  },
  //图例
  legend:{
    data:['人数']//要和series中的name名称相同
  },
  //提示框组件
  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} "
  },
  //x轴的刻度
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  //y轴的刻度,一般不设置,根据数据动态生成
  yAxis: {
    type: 'value',

  },
  //数据项列表
  series: [{
    data: [1000, 1500, 1800, 1200, 1000, 500],
    type: 'bar',//图表类型
    name: '人数'
  }],
  itemStyle: {
    emphasis: {
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowColor: 'rgba(0, 0, 0, 0.5)'
    }
  }

};
var options = {
  title : {
    text: '热门品牌销售',
    //副标题
    subtext: '2017年6月',
    x:'center'
  },
  tooltip : {
    trigger: 'item',
    //配置提示信息
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['耐克','阿迪','新百伦','李宁','阿迪王']
  },
  series : [
    {
      name: '访问来源',
      type: 'pie',
      radius : '55%',
      center: ['50%', '60%'],
      data:[
        {value:335, name:'耐克'},
        {value:310, name:'阿迪'},
        {value:234, name:'新百伦'},
        {value:135, name:'李宁'},
        {value:1548, name:'阿迪王'}
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
piechart.setOption(options);
