<template>
  <div>
    <el-card>
      <el-form
        :inline="true"
        :model="searchObj"
        class="demo-form-inline"
        ref="searchObj"
        :rules="rules"
      >
        <el-form-item label="日期" >
          <el-date-picker
            v-model="searchObj.channelDay"
            type="date"
            @change="timerange(searchObj.channelDay)"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="采样点" >
          <el-select
            filterable
            clearable
            v-model="searchObj.channelId"
            placeholder="请选择采样点"
          >
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.channelName"
              :value="item.channelId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="检测中心" prop="labId">
          <el-select
            filterable
            clearable
            v-model="searchObj.labId"
            placeholder="请选择实验室"
          >
            <el-option
              v-for="item in labList"
              :key="item.id"
              :label="item.realName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-button style="margin-left: 200px" type="primary" icon="el-icon-search" @click="getpage()"
          >查询</el-button
        >
         <el-button  type="primary" @click="exportToExcel">导出总表</el-button>
      </el-form>
    </el-card>
    <el-card>
      <el-table
        id="out-table"
        :data="list"
        stripe
        style="width: 100%"
        :span-method="spanMethod"
        border
        :cell-style="columnStyle">
        <el-table-column label="采样点" align="center" >
        <el-table-column prop="cname" label="采样点名称" align="center" />
        <el-table-column prop="cfname" label="人员" align="center" >
          <template  slot-scope="scope">
            <p>{{scope.row.cfname}}</p>
                 <p class="ex1" v-if="scope.row.ctype==0">采样点：护士</p>
                 <p class="ex1" v-if="scope.row.ctype==1">采样点：登记</p>
                 <p class="ex1" v-if="scope.row.ctype==2">采样点：样本转运</p>
                 <p class="ex1" v-if="scope.row.ctype==3">采样点：外围</p>
                 <p class="ex1" v-if="scope.row.ctype==4">运输样本司机</p>
                 <p class="ex1" v-if="scope.row.ctype==5">检测中心：试剂配制</p>
                 <p class="ex1" v-if="scope.row.ctype==6">检测中心：样本制备</p>
                 <p class="ex1" v-if="scope.row.ctype==7">检测中心：扩增</p>
                 <p class="ex1" v-if="scope.row.ctype==7">检测中心：样本接收</p>

                 <p class="ex1" v-if="scope.row.cftype==0">组长</p>
                 <p class="ex1" v-if="scope.row.cftype==1">站长</p>
                 <p class="ex1" v-if="scope.row.cftype==2">运营经理</p>
                 <p class="ex1" v-if="scope.row.cftype==3">运输负责人</p>
                 <p class="ex1" v-if="scope.row.cftype==4">班长</p>
                 <p class="ex1" v-if="scope.row.cftype==5">负责人</p>

                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.cphone"
                  placement="left">
                  <i v-if="scope.row.cfname!==null" class="el-icon-phone"></i>
                </el-tooltip>
              </template>
        </el-table-column>
        <!-- <el-table-column prop="cphone" label="电话" align="center" />
        <el-table-column prop="cnums" label="值班人数" align="center" /> -->
        <el-table-column prop="ctime" label="班次" align="center" />
        </el-table-column>
         <el-table-column label="转运车辆" align="center" >
        <el-table-column prop="creceive" label="收样" align="center" />
        <el-table-column prop="cpost" label="送样" align="center" />
        <el-table-column prop="licenseplate" label="车牌" align="center" />
        <el-table-column prop="cdriver" label="司机" align="center" >
           <template  slot-scope="scope">
            <p>{{scope.row.cdriver}}</p>
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.cdriverphone"
                  placement="left">
                  <i v-if="scope.row.cdriver!==null" class="el-icon-phone"></i>
                </el-tooltip>
              </template>
        </el-table-column>
         </el-table-column>
        <el-table-column label="检测中心" align="center" >
        <el-table-column prop="lname" label="实验室" align="center" />
        <el-table-column prop="lfname" label="实验室人员" align="center" >
          <template  slot-scope="scope">
            <p>{{scope.row.lfname}}</p>
             <p class="ex1" v-if="scope.row.ltype==0">采样点：护士</p>
                 <p class="ex1" v-if="scope.row.ltype==1">采样点：登记</p>
                 <p class="ex1" v-if="scope.row.ltype==2">采样点：样本转运</p>
                 <p class="ex1" v-if="scope.row.ltype==3">采样点：外围</p>
                 <p class="ex1" v-if="scope.row.ltype==4">运输样本司机</p>
                 <p class="ex1" v-if="scope.row.ltype==5">检测中心：试剂配制</p>
                 <p class="ex1" v-if="scope.row.ltype==6">检测中心：样本制备</p>
                 <p class="ex1" v-if="scope.row.ltype==7">检测中心：扩增</p>
                 <p class="ex1" v-if="scope.row.ltype==8">检测中心：样本接收</p>

                  <p class="ex1" v-if="scope.row.lftype==0">组长</p>
                 <p class="ex1" v-if="scope.row.lftype==1">站长</p>
                 <p class="ex1" v-if="scope.row.lftype==2">运营经理</p>
                 <p class="ex1" v-if="scope.row.lftype==3">运输负责人</p>
                 <p class="ex1" v-if="scope.row.lftype==4">班长</p>
                 <p class="ex1" v-if="scope.row.lftype==5">负责人</p>
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.lphone"
                  placement="left">
                  <i v-if="scope.row.lfname!==null" class="el-icon-phone"></i>
                </el-tooltip>
              </template>
        </el-table-column>
        <!-- <el-table-column prop="lnums" label="值班人数" align="center" /> -->
        <el-table-column prop="ltime" label="实验室班次" align="center" />
         </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import common from "@/api/common";
import total from "@/api/total";
import { getName } from "@/utils/auth";
import moment from 'moment';
//导入js文件(文件脚本内容在下文)
import { getRowspanMethod } from "@/api/use-span-method";
export default {
  //定义变量和初始值
  data() {
    return {
      searchObj: {
        channelDay:new Date(),//每天日期
      }, //条件封装对象
      spanArr: [], //返回的是相对应的行合并行数
      list: [], //每页数据集合
      Day:"",
      daaaa:"",
      rules: {
        channelId: [
          { required: false, message: "请输入采样点名称", trigger: "blur" },
        ],
        labId: [
          { required: false, message: "请选择检测中心", trigger: "blur" },
        ],
        day: [{ required: false, message: "请输入日期", trigger: "blur" }],
      },
      channelList: [],
      labList: [],
    };
  },
  created() {
    //在页面渲染之前执行
    //一般调用methods定义的方法，得到数据
   // this.getpage();
    this.getChannel();
    this.getLab();
    this.timerange(this.searchObj.channelDay);
    if(this.list && this.list.length>0){
      this.spanMethod();
    }
    this.getpage();
  },
  computed: {
    spanMethod() {
      if(this.list && this.list.length>0){
            return (this.spanMethod = getRowspanMethod(this.list, [
          "cname",
          "ctime",
          "lname",
          "cfname",
          "ltime",
          "lnums",
          "cnums",
          "cphone",
          "lphone",
          "creceive",
          "cpost",
          "licenseplate",
          "cdriver",
          "cdriverphone"
        ]));
      }
    },
  },
  methods: {
      columnStyle({ row, column, rowIndex, columnIndex }) {
	          if (columnIndex == 0 || columnIndex == 1 || columnIndex == 2) {
		        //第二三第四列的背景色就改变了2和3都是列数的下标
		        // if (columnIndex == 0 || columnIndex == 1) {
		        //   //字体颜色
		        //   return "background:#e6cc6f;color:blue;cursor: pointer";
		        // }
		        return "background:#FFF6F6";
		      } else if(columnIndex == 3 || columnIndex == 4 || columnIndex == 5 || columnIndex == 6){

            return "background:#FFFFFF";
          } else{
            return "background:#FBFFF6";
          }
	   	 },
    exportToExcel: function () {
      if(this.list && this.list.length>0){
      let tables = document.getElementById("out-table");
      let table_book = this.$XLSX.utils.table_to_book(tables);
      var table_write = this.$XLSX.write(table_book, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        this.$FileSaver.saveAs(
          new Blob([table_write], { type: "application/octet-stream" }),
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, table_write);
      }
      return table_write;
      }
      else{
        this.$message({
          message: "没有数据可以导出,请先查询数据",
          type: "warning"
        });
      }
    },
    timerange(e){
      this.searchObj.channelDay = moment(e).format('YYYY-MM-DD');
    },
    getpage() {
      console.log(this.searchObj);
      total.getTotalList(this.searchObj.channelDay,this.searchObj)
        .then(res => {
          this.list = res.data;
        })
        .catch(err => {
          this.$message({
          message: "暂无数据",
          type: "success",
        });
        }); 
    },
    resalve() {
    var date = new Date(this.channelDay);
    var y = date.getFullYear();
	  var m = date.getMonth() + 1;
	  m = m < 10 ? ('0' + m) : m;
	  var d = date.getDate();
 	  d = d < 10 ? ('0' + d) : d;
	  var  timee = y + '-' + m + '-' + d;
    this.Day=timee;
	  //经过这样的处理就可以使用getMonth()，getMonth()等相关的关于时间的函数
    },
    getChannel() {
      common
        .getAllChannel(getName())
        .then((response) => {
          this.channelList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLab() {
      common
        .getAllLab(getName())
        .then((response) => {
          this.labList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        const _row = this.spanArr[rowIndex]; //合并几行
        const _col = _row > 0 ? 1 : 0; //该列显示还是不显示
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    spanMethod() {
      return getRowspanMethod(this.list, ["cname", "ctime", "lname"]);
    },
    getSpanArr() {
      for (var i = 0; i < this.list.length; i++) {
        if (i === 0) {
          this.spanArr.push(1); //if( i === 0)，第一行，直接先给数组push进一个1，表示自己先占一行
          this.list[i].group = i; //group是合并单元格后的序号
          this.pos = 0; //this.pos是数组元素的位置（此时是从数组元素的第一个开始，所以this.pos为0）
        } else {
          if (
            this.list[i].cname === this.list[i - 1].cname &&
            this.list[i].cfname === this.list[i - 1].cfname &&
            this.list[i].cphone === this.list[i - 1].cphone &&
            this.list[i].ctime === this.list[i - 1].ctime &&
            this.list[i].creceive === this.list[i - 1].creceive &&
            this.list[i].cpost === this.list[i - 1].cpost &&
            this.list[i].cdriver === this.list[i - 1].cdriver &&
            this.list[i].lname === this.list[i - 1].lname &&
            this.list[i].lfname === this.list[i - 1].lfname &&
            this.list[i].ltime === this.list[i - 1].ltime &&
            this.list[i].lphone === this.list[i - 1].lphone
          ) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
  },
};
</script>
<style scoped>
/* .tableDiv .el-input {
  display: none;
} */
.tableDiv .el-select {
  display: none;
}
.current-row .current-cell .el-select {
  display: block;
}
.current-row .current-cell .el-select + span {
  display: none;
}
  .el-table .red{
    background: #F5F5DC;
  }
  /*对字体样式进行一些调整*/
p.ex1 {
    color:rgb(11, 10, 10);
    font-family: "Lucida Calligraphy", cursive, serif, sans-serif;
}
</style>
