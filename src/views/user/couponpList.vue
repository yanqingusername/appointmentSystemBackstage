<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="searchObj"
      class="demo-form-inline"
      ref="searchObj"
    >
      <el-form-item label="优惠券名称" prop="commodity">
        <el-input
          v-model="searchObj.commodity"
          placeholder="请输入优惠券名称"
          clearable
        />
      </el-form-item>
      <el-form-item label="使用规则" prop="status">
        <el-select
          v-model="searchObj.status"
          filterable
          clearable
          placeholder="请选择使用规则"
        >
          <el-option label="全部" value="0"></el-option>
          <el-option label="无门槛" value="1"></el-option>
          <el-option label="满减使用" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="有效期规则" prop="shipmentStatus">
        <el-select
          v-model="searchObj.shipmentStatus"
          filterable
          clearable
          placeholder="有效期规则">
          <el-option label="全部" value="0"></el-option>
          <el-option label="固定有效期" value="1"></el-option>
          <el-option label="领取后xx天有效" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="shipmentStatus">
        <el-select
          v-model="searchObj.shipmentStatus"
          filterable
          clearable
          placeholder="状态">
          <el-option label="全部" value="0"></el-option>
          <el-option label="可用" value="1"></el-option>
          <el-option label="已停用" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="展示权限" prop="shipmentStatus">
        <el-select
          v-model="searchObj.shipmentStatus"
          filterable
          clearable
          placeholder="展示权限">
          <el-option label="全部" value="0"></el-option>
          <el-option label="公开优惠券" value="1"></el-option>
          <el-option label="内部优惠券" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-button type="primary" size="medium" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="primary" size="medium" @click="addShopClick()">+ 新建商品</el-button>
    </el-form>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="userId" width="100" label="ID" align="center" />
      <el-table-column
        prop="commodity"
        width="150"
        label="优惠券名称"
        align="center"
      />

      <el-table-column
        prop="name"
        width="110"
        label="有效期"
        align="center"
      />

      <el-table-column
        prop="orderPayment"
        width="100"
        label="金额"
        align="center"
      />

      <el-table-column
        prop="preferentialAmount"
        width="100"
        label="跳转路径"
        align="center"
      />

      <el-table-column prop="name" width="100" label="修改人" align="center" />

      <el-table-column
        prop="paymentMethod"
        width="100"
        label="状态"
        align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.paymentMethod == 'wx'">可用</p>
          <p v-if="scope.row.paymentMethod == 'h5'">已停用</p>
        </template>
      </el-table-column>

      <el-table-column
        prop="payTime"
        :formatter="dateFormat"
        label="最新编辑时间"
        width="200"
        align="center"
      />

      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="updateClick(scope.row.id)">修改</el-button>

          <el-button
            type="primary"
            size="mini"
            @click="openClick(scope.row.id)">发放</el-button>


          <el-button
            type="danger"
            size="mini"
            @click="lowerShelfClick(scope.row.id)">停用</el-button>

          <el-button
            type="success"
            size="mini"
            @click="recoveryClick(scope.row.id)">启用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 优惠券停用弹框 -->
    <el-dialog :visible.sync="lowerShelfDialog" width="30%" center>
      <span>确定要停用该优惠券，停用后不影响已领取的用户吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="lowerShelfDialog = false">取 消</el-button>
        <el-button @click="lowerShelfSubmitClick()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 优惠券启用弹框 -->
    <el-dialog :visible.sync="recoveryDialog" width="30%" center>
      <span>确定要启用该优惠券？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="recoveryDialog = false">取 消</el-button>
        <el-button @click="recoverySubmitClick()">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 新添/修改优惠券弹框 -->
    <el-dialog
      title="新添/修改"
      :visible.sync="shoppingDialog"
      width="50%"
      center>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="优惠券名称*：">
          <el-input v-model="form.name" style="width: 300px" placeholder="请输入优惠券名称，不超过10个字"></el-input>
        </el-form-item>

        <el-form-item label="优惠金额*：">
          <el-input v-model="form.name" style="width: 200px"></el-input>  单位：元
        </el-form-item>

        <el-form-item label="使用限制*：">
            <el-radio-group v-model="form.resource">
              <el-radio label="无门槛"></el-radio>
              <el-radio label="满xx元才可使用"></el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="满减规则*：">
          <el-input v-model="form.name" style="width: 200px"></el-input>  满xx元才可使用，可精确到小数点后两位
        </el-form-item>

        <el-form-item label="指定商品*：">
            <el-radio-group v-model="form.resource">
              <el-radio label="不指定"></el-radio>
              <el-radio label="指定商品ID"></el-radio>
            </el-radio-group>
            <el-input v-model="form.name" style="width: 100px"></el-input>  属于商品ID,多个时以英文逗号“,”间隔
        </el-form-item>

        <el-form-item label="展示权限*：">
            <el-radio-group v-model="form.resource">
              <el-radio label="公开优惠券"></el-radio>
              <el-radio label="内部优惠券"></el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="有效期规则*：">
            <el-radio-group v-model="form.resource">
              <el-radio label="固定日期"></el-radio>
              <el-radio label="领取后xx天有效"></el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="有效期截至*：" prop="time">
            <el-date-picker
              v-model="form.time"
              type="datetime"
              placeholder="选择日期时间"
            ></el-date-picker> 固定有效期截止时间，有效期截至该天晚23:59:59
            <el-input v-model="form.name" style="width: 120px;margin-top:10px;"></el-input> 领取后x天有效，有效期截至=领取日期+x，该天晚23:59:59
        </el-form-item>

        <el-form-item label="使用按钮跳转*：">
          <div>
            <el-input
                v-model="form.urlstring"
                placeholder="请输入小程序内页路径跳转内容"
                style="width:400px;"
              />
            <el-input
                v-model="form.urlstring"
                placeholder="请输入H5页地址链接跳转内容"
                style="width:400px;margin-top:10px;"
              />
          </div>    
        </el-form-item>

        <el-form-item style="display:flex;width: 100%;">
          <el-button @click="shoppingDialog = false">取消</el-button>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 发放优惠券弹框 -->
    <el-dialog
      title="发放优惠券"
      :visible.sync="openDialog"
      width="50%"
      center>
      <el-form ref="form" :model="form" label-width="120px">
        <div style="margin-left:30px;">请输入要发放对象的用户ID:</div>
        <div style="margin-left:30px;">(每人只能领取一次,发多张请重新创建优惠券)</div>
        <el-form-item label="用户ID*：" style="margin-top:10px;">
          <el-input v-model="form.name" style="width: 300px" placeholder="请输入用户ID"></el-input>
        </el-form-item>

        <el-form-item label="用户手机号：">
          <span>121231312312</span>
        </el-form-item>

        <el-form-item label="用户昵称：">
          <span>121231312312</span>
        </el-form-item>

        <el-form-item style="display:flex;width: 100%;">
          <el-button @click="openDialog = false">取消</el-button>
          <el-button type="primary" @click="openDialog = false">保存</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-left:30px;">发放历史:</div>
      <div style="display: flex;flex-direction: column;align-items: center;justify-content: center;width:100%;">
        <el-table :data="list" border height="530" style="width:450px;">
          <el-table-column prop="userId" width="100" label="用户ID" align="center" />
          <el-table-column
            prop="name"
            width="150"
            label="手机号"
            align="center"
          />

          <el-table-column
            prop="name"
            width="200"
            label="昵称"
            align="center"
          />
        </el-table>
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
      total: 0, //总记录数
      userid: "", //中间商id
      rules: {},

      lowerShelfDialog: false,
      recoveryDialog: false,
      shoppingDialog: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        time: '',
        urlstring: ''
      },
      openDialog: false
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
    /**
     * 停用
     */
    lowerShelfClick(id) {
      this.lowerShelfDialog = true;
    },
    lowerShelfSubmitClick() {
      this.lowerShelfDialog = false;
      // policy
      //   .deletepolicyinfoById(this.userid)
      //   .then((response) => {
      //     if (response.code == 200) {
      //       this.$message({
      //         message: "下架成功",
      //         type: "success",
      //       });
      //       this.getList();
      //       this.deleteDialog = false;
      //     }
      //   })
      //   .catch((error) => {
      //     //请求失败
      //     console.log(error);
      //   });
    },
    /**
     * 启用
     */
    recoveryClick(id) {
      this.recoveryDialog = true;
    },
    recoverySubmitClick() {
      this.recoveryDialog = false;
      // policy
      //   .deletepolicyinfoById(this.userid)
      //   .then((response) => {
      //     if (response.code == 200) {
      //       this.$message({
      //         message: "下架成功",
      //         type: "success",
      //       });
      //       this.getList();
      //       this.deleteDialog = false;
      //     }
      //   })
      //   .catch((error) => {
      //     //请求失败
      //     console.log(error);
      //   });
    },
    addShopClick() {
      this.shoppingDialog = true;
    },
    updateClick(id) {
      this.shoppingDialog = true;
    },
    onSubmit() {
      console.log("submit!");
      this.shoppingDialog = false;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    openClick(id) {
      this.openDialog = true;
    },
  },
};
</script>