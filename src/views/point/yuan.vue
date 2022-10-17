<template>
  <div class="app-container">
    <el-card>
      <el-form
        :inline="true"
        :model="searchObj"
        class="demo-form-inline"
        ref="searchObj"
        :rules="rules1"
      >
        <el-form-item label="采集点名称" prop="channelId">
          <el-select
            clearable
            v-model="searchObj.channelId"
            placeholder="请选择采集点"
          >
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.channelName"
              :value="item.channelId"
            />
          </el-select>
          <el-button type="primary" @click="gesDate()" plain>本周</el-button>
          <el-button type="primary" @click="getmonth()" plain>本月</el-button>
          <el-button type="primary" @click="getbeforemonth()" plain
            >上月</el-button
          >
          <el-button type="primary" @click="getnextmonth()" plain
            >下月</el-button
          >
          <el-form-item label="指定日期">
            <el-date-picker
              v-model="choseTimeHour.endTime"
              type="daterange"
              @change="queryHourData"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-form>
      <el-button
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-search"
        @click="getlist()"
        plain
        >查询</el-button
      >
      <el-button type="default" @click="resetForm('searchObj')">清空</el-button>
    </el-card>
    <el-card>
      <div>
        <el-form :inline="true">
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              @click="dialogFormVisible = true"
              >编辑排班</el-button
            >
            <el-button type="primary" size="mini">导入</el-button>
            <el-button type="primary" size="mini">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 工具条 -->
      <el-table
        :data="list"
        border
        class="table"
        ref="multipleTable"
      >
        <!--            第一列不显示el-tag-->
        <template v-for="(item, index) in TimeList">
          <el-table-column
            :key="index"
            :prop="item.prop"
            :label="item.label"
            align="center"
          >
            <template v-if="index == 0" slot-scope="scope">
              <p>{{ list[scope.$index][item.prop] }}</p>
              <el-tooltip
                class="item"
                effect="dark"
                :content="list[scope.$index][item.phone]"
                placement="right"
              >
                <i class="el-icon-phone"></i>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <p>{{ list[scope.$index][item.prop] }}</p>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <div class="block" style="margin-top: 15px">
        <el-pagination
          align="center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
//引入接口定义的js文件
import point from "@/api/point";
import common from "@/api/common";
import getDate from "@/api/moment";
export default {
  //定义变量和初始值
  data() {
    return {
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页的数据条数
      current: 0, //当前页
      limit: 7, //每页显示记录数
      searchObj: { channelId: "" }, //条件封装对象
      list: [], //每页数据集合
      total: 0, //总记录数
      channelList: [],
      tableDates: [],
      choseTimeHour: {
        endTime: "",
      },
      TimeList: [],
      rules1: {
        channelName: [
          { required: false, message: "请输入采样点名称", trigger: "change" },
        ],
        status: [
          { required: false, message: "请选择营业状态", trigger: "change" },
        ],
        samplingLeader: [
          { required: false, message: "请输入负责人", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.getChannel();
  },
  resetForm(formName) {
    this.$refs[formName].resetFields();
    //关闭弹窗
    this.dialogFormVisible = false;
  },
  methods: {
    link(row) {
      console.log(row);
    },
    //鼠标悬浮事件    @mouseover.native='hoves'
    //鼠标悬浮离开    @mouseout.native='hoves'
    hoves() {
      console.log(1);
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.list=this.tableDates.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    },
    //选择时间后调用
    queryHourData() {
      this.TimeList = [];
      this.TimeList.push({ label: "人员", prop: "姓名", phone: "phone" });
      // 获取入参字符串形式日期的Date型日期
      var d1 = this.choseTimeHour.endTime[0];
      var d2 = this.choseTimeHour.endTime[1];
      // 定义一天的毫秒数
      var dayMilliSeconds = 1000 * 60 * 60 * 24;
      // 获取输入日期的毫秒数
      var d1Ms = d1.getTime();
      var d2Ms = d2.getTime();
      // 定义返回值
      var ret;
      // 对日期毫秒数进行循环比较，直到d1Ms 大于等于 d2Ms 时退出循环
      // 每次循环结束，给d1Ms 增加一天
      for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {
        // 如果ret为空，则无需添加","作为分隔符
        if (!ret) {
          // 将给的毫秒数转换为Date日期
          var day = new Date(d1Ms);
          // 获取其年月日形式的字符串
          var propDate = day.getFullYear() + "-";
          var retDate = day.getFullYear() + "-";
          if (day.getMonth() + 1 < 10) {
            retDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            retDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            retDate += "0" + day.getDate();
          } else {
            retDate += day.getDate();
          }
          var propDate = day.getFullYear() + "-";
          if (day.getMonth() + 1 < 10) {
            propDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            propDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            propDate += "0" + day.getDate();
          } else {
            propDate += day.getDate();
          }
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          this.TimeList.push({ label: retDate, prop: propDate });
        } else {
          // 否则，给ret的每个字符日期间添加","作为分隔符
          var day = new Date(d1Ms);
          var retDate = day.getFullYear() + "-";
          if (day.getMonth() + 1 < 10) {
            retDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            retDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            retDate += "0" + day.getDate();
          } else {
            retDate += day.getDate();
          }
          var propDate = day.getFullYear() + "-";
          if (day.getMonth() + 1 < 10) {
            propDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            propDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            propDate += "0" + day.getDate();
          } else {
            propDate += day.getDate();
          }
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          this.TimeList.push({ label: retDate, prop: propDate });
        }
        this.getlist();
      }
    },
    //默认显示当前一周
    gesDate() {
      this.TimeList = [];
      //本周第一天
      var currentDate = new Date();
      var week = currentDate.getDay();
      var month = currentDate.getMonth() + 1;
      //一天的毫秒数
      var millisecond = 1000 * 60 * 60 * 24;
      //减去的天数
      var minusDay = week !== 0 ? week - 1 : 6;
      //本周 周一
      var monday = new Date(currentDate.getTime() - minusDay * millisecond);
      var retDate = monday.getFullYear() + "-";
      retDate += monday.getMonth() + 1 + "-";
      retDate += monday.getDate();
      //本周最后一天
      var currentDates = new Date();
      var weeks = currentDates.getDay();
      //一天的毫秒数
      var milliseconds = 1000 * 60 * 60 * 24;
      //减去的天数
      var minusDays = weeks !== 0 ? weeks - 1 : 6;
      //本周 周日
      var mondays = new Date(currentDates.getTime() - minusDays * milliseconds);
      var sunday = new Date(mondays.getTime() + 6 * milliseconds);
      var propDate = sunday.getFullYear() + "-";
      propDate += sunday.getMonth() + 1 + "-";
      propDate += sunday.getDate();
      this.choseTimeHour.endTime = [retDate, propDate];
      this.TimeList.push({ label: "人员", prop: "姓名", phone: "phone" });
      //需要获取未格式化前是时间戳
      // 获取入参字符串形式日期的Date型日期
      var d1 = monday;
      var d2 = sunday;
      // 定义一天的毫秒数
      var dayMilliSeconds = 1000 * 60 * 60 * 24;
      // 获取输入日期的毫秒数
      var d1Ms = d1.getTime();
      var d2Ms = d2.getTime();
      // 定义返回值
      var ret;
      // 对日期毫秒数进行循环比较，直到d1Ms 大于等于 d2Ms 时退出循环
      // 每次循环结束，给d1Ms 增加一天
      for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {
        // 如果ret为空，则无需添加","作为分隔符
        if (!ret) {
          // 将给的毫秒数转换为Date日期
          var day = new Date(d1Ms);
          // 获取其年月日形式的字符串
          var retDate = day.getFullYear() + "-";
          if (day.getMonth() + 1 < 10) {
            retDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            retDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            retDate += "0" + day.getDate();
          } else {
            retDate += day.getDate();
          }
          var propDate = day.getFullYear() + "-";
          if (day.getMonth() + 1 < 10) {
            propDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            propDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            propDate += "0" + day.getDate();
          } else {
            propDate += day.getDate();
          }
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          this.TimeList.push({ label: retDate, prop: propDate });
        } else {
          // 否则，给ret的每个字符日期间添加","作为分隔符
          var day = new Date(d1Ms);
          var retDate = day.getFullYear() + "-";
          retDate += day.getMonth() + 1 + "-";
          retDate += day.getDate();
          var propDate = day.getFullYear() + "-";
          propDate += day.getMonth() + 1 + "-";
          propDate += day.getDate();
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          this.TimeList.push({ label: retDate, prop: propDate });
        }
      }
    },
    //默认显示当前月份第一天到最后一天
    getmonth() {
      this.TimeList = [];
      //本周第一天
      var currentDate = new Date();
      //获取当前时间和月份
      var month = currentDate.getMonth();
      //获取当前月份的第一天
      var firstday = new Date(currentDate.getFullYear(), month, 1);
      var retDate = firstday.getFullYear() + "-";
      retDate += firstday.getMonth() + 1 + "-";
      retDate += firstday.getDate();
      //如果月份是1,3,5,7,8,10,12 显示31天
      if (
        month == 1 ||
        month == 3 ||
        month == 5 ||
        month == 7 ||
        month == 8 ||
        month == 10 ||
        month == 12
      ) {
        var days = 31;
      } else if (month == 4 || month == 6 || month == 9 || month == 11) {
        //如果月份是4,6,9,11 显示30天
        var days = 30;
      } else {
        //如果月份是2
        //如果是闰年显示29天
        if (this.isLeapYear(currentDate.getFullYear())) {
          var days = 29;
        } else {
          //如果不是闰年显示28天
          var days = 28;
        }
      }
      //获取当前月份的最后一天
      var lastday = new Date(currentDate.getFullYear(), month, days - 1);
      var propDate = lastday.getFullYear() + "-";
      propDate += lastday.getMonth() + 1 + "-";
      propDate += lastday.getDate();
      this.choseTimeHour.endTime = [retDate, propDate];
      this.TimeList.push({ label: "人员", prop: "姓名", phone: "phone" });
      //需要获取未格式化前是时间戳
      // 获取入参字符串形式日期的Date型日期
      var d1 = firstday;
      var d2 = lastday;
      // 定义一天的毫秒数
      var dayMilliSeconds = 1000 * 60 * 60 * 24;
      // 获取输入日期的毫秒数
      var d1Ms = d1.getTime();
      var d2Ms = d2.getTime();
      // 定义返回值
      var ret;
      // 对日期毫秒数进行循环比较，直到d1Ms 大于等于 d2Ms 时退出循环
      // 每次循环结束，给d1Ms 增加一天
      for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {
        // 如果ret为空，则无需添加","作为分隔符
        if (!ret) {
          // 将给的毫秒数转换为Date日期
          var day = new Date(d1Ms);
          // 获取其年月日形式的字符串
          var retDate = day.getFullYear() + "-";
          if (day.getMonth() < 10) {
            retDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            retDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            retDate += "0" + day.getDate();
          } else {
            retDate += day.getDate();
          }
          var propDate = day.getFullYear() + "-";
          if (day.getMonth() < 10) {
            propDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            propDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            propDate += "0" + day.getDate();
          } else {
            propDate += day.getDate();
          }
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          this.TimeList.push({ label: retDate, prop: propDate });
        } else {
          // 否则，给ret的每个字符日期间添加","作为分隔符
          var day = new Date(d1Ms);
          var retDate = day.getFullYear() + "-";
          retDate += day.getMonth() + "-";
          retDate += day.getDate();
          var propDate = day.getFullYear() + "-";
          propDate += day.getMonth() + "-";
          propDate += day.getDate();
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          this.TimeList.push({ label: retDate, prop: propDate });
        }
      }
    },
    getbeforemonth() {
      this.TimeList = [];
      //本周第一天
      let starttime = getDate.getLastMonthDays().starttime;
      let endtime = getDate.getLastMonthDays().endtime;
      var retDate = starttime;
      var propDate = endtime;
      this.choseTimeHour.endTime = [retDate, propDate];
      this.TimeList.push({ label: "人员", prop: "姓名", phone: "phone" });
      //需要获取未格式化前是时间戳
      // 获取入参字符串形式日期的Date型日期
      var d1 = new Date(starttime);
      var d2 = new Date(endtime);
      // 定义一天的毫秒数
      var dayMilliSeconds = 1000 * 60 * 60 * 24;
      // 获取输入日期的毫秒数
      var d1Ms = d1.getTime();
      var d2Ms = d2.getTime();
      // 定义返回值
      var ret;
      // 每次循环结束，给d1Ms 增加一天
      for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {
        // 如果ret为空，则无需添加","作为分隔符
        if (!ret) {
          // 将给的毫秒数转换为Date日期
          var day = new Date(d1Ms);
          // 获取其年月日形式的字符串
          var retDate = day.getFullYear() + "-";
          if (day.getMonth() < 10) {
            retDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            retDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            retDate += "0" + day.getDate();
          } else {
            retDate += day.getDate();
          }
          var propDate = day.getFullYear() + "-";
          if (day.getMonth() < 10) {
            propDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            propDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            propDate += "0" + day.getDate();
          } else {
            propDate += day.getDate();
          }
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          this.TimeList.push({ label: retDate, prop: propDate });
        } else {
          // 否则，给ret的每个字符日期间添加","作为分隔符
          var day = new Date(d1Ms);
          var retDate = day.getFullYear() + "-";
          retDate += day.getMonth() + "-";
          retDate += day.getDate();
          var propDate = day.getFullYear() + "-";
          propDate += day.getMonth() + "-";
          propDate += day.getDate();
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          this.TimeList.push({ label: retDate, prop: propDate });
        }
      }
    },
    getnextmonth() {
      this.TimeList = [];
      //本周第一天
      let starttime = getDate.getNextMonthDays().starttime;
      let endtime = getDate.getNextMonthDays().endtime;
      var retDate = starttime;
      var propDate = endtime;
      this.choseTimeHour.endTime = [retDate, propDate];
      this.TimeList.push({ label: "人员", prop: "姓名", phone: "phone" });
      //需要获取未格式化前是时间戳
      // 获取入参字符串形式日期的Date型日期
      var d1 = new Date(starttime);
      var d2 = new Date(endtime);
      // 定义一天的毫秒数
      var dayMilliSeconds = 1000 * 60 * 60 * 24;
      // 获取输入日期的毫秒数
      var d1Ms = d1.getTime();
      var d2Ms = d2.getTime();
      // 定义返回值
      var ret;
      // 对日期毫秒数进行循环比较，直到d1Ms 大于等于 d2Ms 时退出循环
      // 每次循环结束，给d1Ms 增加一天
      for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {
        // 如果ret为空，则无需添加","作为分隔符
        if (!ret) {
          // 将给的毫秒数转换为Date日期
          var day = new Date(d1Ms);
          // 获取其年月日形式的字符串
          var retDate = day.getFullYear() + "-";
          if (day.getMonth() < 10) {
            retDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            retDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            retDate += "0" + day.getDate();
          } else {
            retDate += day.getDate();
          }
          var propDate = day.getFullYear() + "-";
          if (day.getMonth() < 10) {
            propDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            propDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            propDate += "0" + day.getDate();
          } else {
            propDate += day.getDate();
          }
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          this.TimeList.push({ label: retDate, prop: propDate });
        } else {
          // 否则，给ret的每个字符日期间添加","作为分隔符
          var day = new Date(d1Ms);
          var retDate = day.getFullYear() + "-";
          retDate += day.getMonth() + "-";
          retDate += day.getDate();
          var propDate = day.getFullYear() + "-";
          propDate += day.getMonth() + "-";
          propDate += day.getDate();
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          this.TimeList.push({ label: retDate, prop: propDate });
        }
      }
    },
    getlist() {
      point.getschlist(this.searchObj).then((res) => {
        console.log(res);
        this.tableDates = res.data.records;
        this.total = res.data.total;
        this.list=this.tableDates.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
        console.log(this.list);
      });
    },
    getChannel() {
      common
        .getAllChannel()
        .then((response) => {
          //
          this.channelList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm() {},
    resolveData() {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
      //关闭弹窗
      this.dialogFormVisible = false;
    },
  },
  mounted() {
    this.gesDate();
    // this.gesDateMonth();
    this.getlist();
  },
};
</script>