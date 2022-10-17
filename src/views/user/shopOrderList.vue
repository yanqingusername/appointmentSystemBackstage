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
      <el-form-item label="收货手机号" prop="phone">
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
      <el-form-item label="时间范围">
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

      <el-form-item label="订单备注" prop="remarkText">
        <el-input
          v-model="searchObj.remarkText"
          placeholder="请输入订单备注"
          clearable
        />
      </el-form-item>

      <el-form-item label="发货状态" prop="shipmentStatus">
        <el-select
          v-model="searchObj.shipmentStatus"
          filterable
          clearable
          placeholder="请选择发货状态"
        >
          <el-option label="全部" value="0"></el-option>
          <el-option label="未发货" value="1"></el-option>
          <el-option label="已发货" value="2"></el-option>
          <el-option label="已收货" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-button
        type="primary"
        size="medium"
        icon="el-icon-search"
        @click="getList()"
        >查询</el-button
      >
      <el-button type="primary" size="medium" @click="exportData()"
        >导出</el-button
      >
    </el-form>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column
        prop="orderNumber"
        fixed
        width="200"
        label="订单编号"
        align="center"
      />
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
      <el-table-column
        prop="phone"
        width="110"
        label="用户手机号"
        align="center"
      />
      <el-table-column prop="phone" width="110" label="收货人" align="center" />
      <el-table-column
        prop="phone"
        width="110"
        label="收货人手机号"
        align="center"
      />
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
        prop="commodity"
        width="150"
        label="订单备注"
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
      <el-table-column
        prop="orderStatus"
        width="100"
        label="订单状态"
        align="center"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.orderStatus == '0'">未支付</p>
          <p v-if="scope.row.orderStatus == '1'">支付成功</p>
        </template>
      </el-table-column>
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
      <el-table-column
        prop="status"
        width="100"
        label="发货状态"
        align="center"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.status == '3'">已发货</p>
          <p v-if="scope.row.status == '4'">待发货</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="logisticsClick(scope.row.id)">查看物流</el-button>
          <el-button type="primary" size="mini" @click="shipmentClick(scope.row.id)">发货</el-button>
          <el-button type="danger" size="mini" @click="refundClick(scope.row.id)">退款 </el-button>
          <el-button type="danger" size="mini" @click="refundTextClick(scope.row.id)">退款理由 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="centerDialogVisible" width="30%" center>
      <div class="aa-container">
        <el-form :inline="true" :model="Obj" class="demo-form-inline" ref="Obj">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="searchObj.startTime"
              value-format="timestamp"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
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
          <el-button type="primary" size="medium" @click="exportinfo()"
            >导出</el-button
          >
        </el-form>
      </div>
    </el-dialog>

    <!-- 物流弹框 -->
    <el-dialog title="请填写/修改发货信息" :visible.sync="logisticsDialog" width="40%" center>
        <el-form :inline="true" :model="Obj" class="demo-form-inline" ref="Obj">
          <el-form-item label="快递公司*：">
            <el-input
              v-model="logisticsName"
              placeholder="请输入快递公司"
              clearable
            />
          </el-form-item>
          <el-form-item label="快递单号*：">
            <el-input
              v-model="logisticsNunber"
              placeholder="请输入快递单号"
              clearable
            />
          </el-form-item>

          <el-form-item label="发货时间*：" style="display:flex;">
            <el-date-picker
              v-model="logisticsDate"
              value-format="timestamp"
              type="datetime"
              placeholder="选择日期时间"
              style="width: 200px;"
            >
            </el-date-picker>
            <el-time-picker
              v-model="logisticsTime"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              placeholder="选择时间点"
              style="width: 200px;"
              >
            </el-time-picker>
          </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="logisticsDialog = false">取 消</el-button>
          <el-button type="primary" @click="logisticsDialog = false">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 退款弹框 -->
    <el-dialog title="请确定要对该订单进行退款吗？" :visible.sync="refundDialog" width="40%" center>
      <el-form >
          <el-form-item label="退款理由*：" label-width="90px">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="refundText"
              autocomplete="off">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="refundDialog = false">取 消</el-button>
          <el-button type="primary" @click="refundDialog = false">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 查看退款理由弹框 -->
    <el-dialog title="查看退款理由" :visible.sync="refundTextDialog" width="40%" center>
        <div>
          <div>退款理由：</div>
          <div>之前写的退款理由，全文展示在这里，不能修改</div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="refundTextDialog = false">取 消</el-button>
          <el-button type="primary" @click="refundTextDialog = false">确 定</el-button>
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
import { stringify } from "qs";
export default {
  //定义变量和初始值
  data() {
    return {
      current: 0, //当前页
      limit: 20, //每页显示记录数
      searchObj: {
        orderNumber: null,
        userId: null,
        name: null,
        phone: null,
        commodity: "",
        timelist: [
          new Date().getTime() - 3 * 24 * 60 * 60 * 1000,
          new Date().getTime(),
        ],
        status: null,
        remarkText: null,
        shipmentStatus: null,
      }, //条件封装对象
      Obj: {}, //查询条件对象
      list: [], //每页数据集合
      testlist: [], //受检人数据集合
      total: 0, //总记录数
      userid: "", //中间商id
      rules: {},
      centerDialogVisible: false,
      cleandata: false,
      baseUrl: "http://localhost:8995/admin/order",

      refundDialog: false,
      refundText: "",
      refundTextDialog: false,
      logisticsDialog: false
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
    isEmpty(obj) {
      if (obj == null || obj == undefined || obj == "") {
        return true;
      } else {
        return false;
      }
    },
    consoledata() {
      if (!this.isEmpty(this.searchObj.timelist)) {
        if (
          this.searchObj.timelist[1].getTime() -
            this.searchObj.timelist[0].getTime() >
          3 * 24 * 60 * 60 * 1000
        ) {
          console.log("时间间隔大于三天");
          this.$message.warning("时间范围不能超过3天");
          this.searchObj.timelist = [];
          return;
        }
      }
    },
    getList(page = 1) {
      this.current = page;
      if (
        !this.isEmpty(this.searchObj.commodity) &&
        this.isEmpty(this.searchObj.timelist)
      ) {
        console.log("1");
        this.$message.warning("请选择三天内的时间范围");
        return;
      } else if (
        !this.isEmpty(this.searchObj.status) &&
        this.isEmpty(this.searchObj.timelist)
      ) {
        console.log("2");
        this.$message.warning("请选择三天内的时间范围");
        return;
      } else if (
        this.isEmpty(this.searchObj.commodity) &&
        this.isEmpty(this.searchObj.status) &&
        this.isEmpty(this.searchObj.timelist) &&
        this.isEmpty(this.searchObj.orderNumber) &&
        this.isEmpty(this.searchObj.userId) &&
        this.isEmpty(this.searchObj.name) &&
        this.isEmpty(this.searchObj.phone)
      ) {
        console.log("3");
        this.$message.warning("请选择三天内的时间范围");
        return;
      }
      order
        .getorderinfo(this.current, this.limit, this.searchObj)
        .then((response) => {
          this.list = response.data.records;
          //总记录数
          this.total = response.data.total;
          this.searchObj.startTime = "";
          this.searchObj.endTime = "";
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    exportinfo() {
      this.centerDialogVisible = true;
      this.exportData();
    },
    // 导出
    exportData() {
      if (this.searchObj.timelist == null) {
        alert("导出时必须选择开始时间与结束时间，开始至结束之间不能超过3天。");
      } else {
        this.searchObj.startTime = moment(this.searchObj.timelist[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.searchObj.endTime = moment(this.searchObj.timelist[1]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.cleandata = true;
        window.open(
          `http://prod.coyotebio-lab.com:8995/admin/order/exportinfo?${stringify(
            this.searchObj
          )}`
        );
        // window.open(`http://localhost:8995/admin/order/exportinfo?${stringify(this.searchObj)}`)
        this.searchObj.userid = "";
        this.searchObj.orderStatus = "";
        this.searchObj.status = "";
        this.searchObj.orderNumber = "";
        this.searchObj.userId = "";
        this.searchObj.commodity = "";
        this.searchObj.name = "";
        this.searchObj.phone = "";
      }
    },
    /**
     * 退款
     */
    refundClick(id) {
      this.refundDialog = true;
    },
    /**
     * 查看退款理由
     */
    refundTextClick(id) {
      this.refundTextDialog = true;
    },
    logisticsClick(id) {
      this.logisticsDialog = true;
    },
    shipmentClick(id) {
    },
  },
};
</script>