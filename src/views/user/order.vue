<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="searchObj"
      class="demo-form-inline"
      ref="searchObj"
    >
      <el-form-item label="订单编号" prop="orderNumber">
        <el-input
          v-model="searchObj.orderNumber"
          placeholder="请输入订单编号"
          clearable
        />
      </el-form-item>
      <el-form-item label="用户id" prop="userId">
        <el-input
          v-model="searchObj.userId"
          placeholder="请输入用户id"
          clearable
        />
      </el-form-item>
      <el-form-item label="用户昵称" prop="name">
        <el-input
          v-model="searchObj.name"
          placeholder="请输入用户昵称"
          clearable
        />
      </el-form-item>
      <el-form-item label="用户手机号" prop="phone">
        <el-input
          v-model="searchObj.phone"
          placeholder="请输入用户手机号"
          clearable
        />
      </el-form-item>
      <el-form-item label="商品名称" prop="commodity">
        <el-input
          v-model="searchObj.commodity"
          placeholder="请输入商品名称"
          clearable
        />
      </el-form-item>
      <!-- <el-form-item label="订单状态" prop="orderStatus">
        <el-select
          v-model="searchObj.orderStatus"
          filterable
          clearable
          placeholder="请选择订单状态"
        >
          <el-option label="未支付" value="0"></el-option>
          <el-option label="支付成功" value="1"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="退款状态" prop="status">
        <el-select
          v-model="searchObj.status"
          filterable
          clearable
          placeholder="请选择退款状态"
        > 
          <el-option label="未退款" value="2"></el-option>
          <el-option label="退款中" value="3"></el-option>
          <el-option label="退款成功" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间范围" >
        <el-date-picker
          v-model="searchObj.timelist"
          type="datetimerange"
          @change="consoledata()"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
       <el-button type="primary" size="medium" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
      <el-button type="primary" size="medium"  @click="exportData()"
        >导出</el-button
      >
    </el-form>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="orderNumber" fixed width="200" label="订单编号" align="center" />
      <el-table-column
        prop="userId"
        width="100"
        label="用户id"
        align="center"
      />
      <el-table-column
        prop="name"
        width="100"
        label="用户昵称"
        align="center"
      />
      <el-table-column prop="phone" width="110" label="手机号" align="center" />
      <el-table-column
        prop="receivingAddress"
        width="100"
        label="收货地址"
        align="center"
      />
      <el-table-column
        prop="orderType"
        width="100"
        label="订单类型"
        align="center"
      />
      <el-table-column
        prop="commodity"
        width="150"
        label="商品名称"
        align="center"
      />
      <el-table-column
        prop="source"
        width="100"
        label="支付渠道"
        align="center"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.source == 'wx'">微信</p>
          <p v-if="scope.row.source == 'h5'">H5支付</p>
          <p v-if="scope.row.source == 'zfb'">支付宝</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="orderPayment"
        width="100"
        label="订单金额"
        align="center"
      />
      <el-table-column
        prop="preferentialAmount"
        width="100"
        label="优惠金额"
        align="center"
      />
      <el-table-column
        prop="paymentAmount"
        width="100"
        label="实付金额"
        align="center"
      />
      <el-table-column
        prop="paymentMethod"
        width="100"
        label="支付方式"
        align="center"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.paymentMethod == 'wx'">微信</p>
          <p v-if="scope.row.paymentMethod == 'h5'">微信</p>
          <p v-if="scope.row.paymentMethod == 'zfb'">支付宝</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="payTime"
        :formatter="dateFormat"
        label="下单时间"
        width="200"
        align="center"
      />
      <!-- <el-table-column
        prop="orderStatus"
        width="100"
        label="订单状态"
        align="center"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.orderStatus == '0'">未支付</p>
          <p v-if="scope.row.orderStatus == '1'">支付成功</p>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="status"
        width="100"
        label="退款状态"
        align="center"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.status == '3'">退款中</p>
          <p v-if="scope.row.status == '4'">退款成功</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="refundTime"
        :formatter="dateFormat"
        label="退款时间"
        width="200"
        align="center"
      />
    </el-table>
    <el-dialog :visible.sync="centerDialogVisible" width="30%" center>
    <div class="aa-container">
    <el-form
      :inline="true"
      :model="Obj"
      class="demo-form-inline"
      ref="Obj"
    >
      <el-form-item label="开始时间" >
        <el-date-picker
          v-model="searchObj.startTime"
          value-format="timestamp"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" >
        <el-date-picker
          v-model="searchObj.endTime"
          type="datetime"
          value-format="timestamp"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="订单状态" prop="orderStatus">
        <el-select
          v-model="searchObj.orderStatus"
          filterable
          clearable
          placeholder="请选择订单状态"
        >
          <el-option label="未支付" value="0"></el-option>
          <el-option label="支付成功" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="退款状态" prop="status">
        <el-select
          v-model="searchObj.status"
          filterable
          clearable
          placeholder="请选择退款状态"
        >
          <el-option label="退款中" value="3"></el-option>
          <el-option label="退款成功" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" size="medium"  @click="exportinfo()"
        >导出</el-button
      >
    </el-form>
    </div>
    </el-dialog>
    <!-- 分页 -->
    <div class="block" style="margin-top: 15px">
      <el-pagination
        :current-page="current"
        :page-size="limit"
        :total="total"
        style="padding: 30px 0; text-align: center"
        layout="total, prev, pager, next, jumper"
        @current-change="getList"
      />
    </div>
  </div>
</template>
<style>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #d2d9e9;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
<script>
//引入接口定义的js文件
import order from "@/api/orderinfo";
import { getName } from "@/utils/auth"; // 验权
import moment from "moment";
import { stringify } from 'qs';
export default {
  //定义变量和初始值
  data() {
    return {
      current: 0, //当前页
      limit: 20, //每页显示记录数
      searchObj: {
        orderNumber:null,
        userId:null,
        name:null,
        phone:null,
        commodity:'',
        timelist: [new Date().getTime() - 3*24 * 60 * 60 * 1000, new Date().getTime()],
        status:null
      }, //条件封装对象
      Obj: {

      }, //查询条件对象
      list: [], //每页数据集合
      testlist: [], //受检人数据集合
      total: 0, //总记录数
      userid: "", //中间商id
      rules: {},
      centerDialogVisible:false,
      cleandata:false,
      baseUrl: "http://localhost:8995/admin/order",
    };
  },
  created() {
    this.name = getName();
    this.getList();
  },
  methods: {
    //日期格式化
    dateFormat: function (row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    isEmpty(obj)
    {
      if(obj == null || obj == undefined || obj == "")
      {
        return true;
      }
      else
      {
        return false;
      }
    },
    consoledata(){
      if(!this.isEmpty(this.searchObj.timelist)){
          if(this.searchObj.timelist[1].getTime()-this.searchObj.timelist[0].getTime()>3*24*60*60*1000){
        console.log("时间间隔大于三天")
        this.$message.warning("时间范围不能超过3天");
        this.searchObj.timelist=[];
        return;
       }
      }
       
    },
    getList(page = 1) {
      this.current = page;
      if(!this.isEmpty(this.searchObj.commodity)&&this.isEmpty(this.searchObj.timelist)){
        console.log("1")
        this.$message.warning("请选择三天内的时间范围")
        return;
      }
      else if(!this.isEmpty(this.searchObj.status)&&this.isEmpty(this.searchObj.timelist)){
        console.log("2")
          this.$message.warning("请选择三天内的时间范围")
          return;
      }
      else if(this.isEmpty(this.searchObj.commodity)&&this.isEmpty(this.searchObj.status)&&this.isEmpty(this.searchObj.timelist)&&this.isEmpty(this.searchObj.orderNumber)
      &&this.isEmpty(this.searchObj.userId)&&this.isEmpty(this.searchObj.name)&&this.isEmpty(this.searchObj.phone)){
        console.log("3")
          this.$message.warning("请选择三天内的时间范围")
          return;
      }
      order
        .getorderinfo(this.current, this.limit, this.searchObj)
        .then((response) => {
          this.list = response.data.records;
          //总记录数
          this.total = response.data.total;
          this.searchObj.startTime=""
          this.searchObj.endTime=""
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    exportinfo(){
      this.centerDialogVisible = true
      this.exportData()
    },
    // 导出
exportData() {
  if(this.searchObj.timelist==null){
    alert("导出时必须选择开始时间与结束时间，开始至结束之间不能超过3天。")
  }
  else{
      this.searchObj.startTime=moment(this.searchObj.timelist[0]).format("YYYY-MM-DD HH:mm:ss")
      this.searchObj.endTime=moment(this.searchObj.timelist[1]).format("YYYY-MM-DD HH:mm:ss")
      this.cleandata = true
      window.open(`http://prod.coyotebio-lab.com:8995/admin/order/exportinfo?${stringify(this.searchObj)}`)
      // window.open(`http://localhost:8995/admin/order/exportinfo?${stringify(this.searchObj)}`)
      this.searchObj.userid=''
      this.searchObj.orderStatus=''
      this.searchObj.status=''
      this.searchObj.orderNumber=''
      this.searchObj.userId=''
      this.searchObj.commodity=''
      this.searchObj.name=''
      this.searchObj.phone=''
  }
},
  },
};
</script>