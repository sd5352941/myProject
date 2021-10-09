<template>
  <Row>
    <Col span="18">
    <div id="Mvisite"></div>
    </Col>
    <Col span="6">
    <div>
      <div id="MuserVisit">
      </div>
    </div>
    </Col>
  </Row>
</template>

<script>
  var echarts = require('echarts')

  export default{
    props: [
      "visitData",
    ],
    methods: {
      echartInit(){
        var option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: this.visitData
            }
          ]
        };
        echarts.init(document.getElementById('Mvisite')).setOption(option);
      },
      userVisitInit(){
        var option1 = {
          color: ['#3398DB'],
          title: {
            text: '用户登陆次数排行',
            subtext: '近期统计'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['asd','dsa','asd','dsa','asds','张三']
          },
          series: [
            {
              type: 'bar',
              data: [11, 12, 13, 14, 15, 20]
            },
          ]
        };
        echarts.init(document.getElementById('MuserVisit')).setOption(option1);
      },
    },

    mounted: function () {
      this.echartInit()
      this.userVisitInit()
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  #Mvisite {
    height: 300px;
    width: 100%;
  }
  #MuserVisit{
    height: 300px;
    width: 100%;
  }
</style>
