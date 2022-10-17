<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="searchObj"
      class="demo-form-inline"
      ref="searchObj"
    >
      <el-form-item label="商品名称" prop="commodity">
        <el-input
          v-model="searchObj.commodity"
          placeholder="请输入商品名称"
          clearable
        />
      </el-form-item>
      <el-form-item label="分类标签" prop="status">
        <el-select
          v-model="searchObj.status"
          filterable
          clearable
          placeholder="请选择分类标签"
        >
          <el-option label="全部" value="0"></el-option>
          <el-option label="益生菌" value="1"></el-option>
          <el-option label="菌群微生物" value="2"></el-option>
          <el-option label="基因风险" value="3"></el-option>
          <el-option label="安全用药" value="4"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="shipmentStatus">
        <el-select
          v-model="searchObj.shipmentStatus"
          filterable
          clearable
          placeholder="请选择状态">
          <el-option label="全部" value="0"></el-option>
          <el-option label="可用" value="1"></el-option>
          <el-option label="已下架" value="2"></el-option>
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
        label="商品名称"
        align="center"
      />

      <el-table-column
        prop="name"
        width="110"
        label="分类标签"
        align="center"
      />

      <el-table-column
        prop="orderPayment"
        width="100"
        label="单价"
        align="center"
      />

      <el-table-column
        prop="preferentialAmount"
        width="100"
        label="预览链接"
        align="center"
      />

      <el-table-column prop="name" width="100" label="修改人" align="center" />

      <el-table-column
        prop="paymentMethod"
        width="100"
        label="状态"
        align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.paymentMethod == 'wx'">微信</p>
          <p v-if="scope.row.paymentMethod == 'h5'">微信</p>
          <p v-if="scope.row.paymentMethod == 'zfb'">支付宝</p>
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
            type="danger"
            size="mini"
            @click="lowerShelfClick(scope.row.id)">下架</el-button>

          <el-button
            type="danger"
            size="mini"
            @click="recoveryClick(scope.row.id)">恢复</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 商品下架弹框 -->
    <el-dialog :visible.sync="lowerShelfDialog" width="30%" center>
      <span>确定要下架该商品吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="lowerShelfDialog = false">取 消</el-button>
        <el-button @click="lowerShelfSubmitClick()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新添/修改商品弹框 -->
    <el-dialog
      title="新添/修改"
      :visible.sync="shoppingDialog"
      width="50%"
      center>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="商品名称*：">
          <el-input v-model="form.name" style="width: 200px" placeholder="特殊高亮文字，选填"></el-input> + <el-input v-model="form.name" style="width: 300px" placeholder="正式标题，必填，不超过50个字"></el-input>
        </el-form-item>

        <el-form-item label="上传头图*：">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品单价*：">
          <el-input v-model="form.name" style="width: 200px"></el-input>  单位：元，可精确到小数点后两位
        </el-form-item>

        <el-form-item label="划线价：">
          <el-input v-model="form.name" style="width: 200px"></el-input>  单位：元，可精确到小数点后两位，选填
        </el-form-item>

        <el-form-item label="分类标签：">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="益生菌" name="type"></el-checkbox>
            <el-checkbox label="菌群微生物" name="type"></el-checkbox>
            <el-checkbox label="基因风险" name="type"></el-checkbox>
            <el-checkbox label="安全用药" name="type"></el-checkbox>
            <el-checkbox label="儿童孩子" name="type"></el-checkbox>
            <el-checkbox label="女性孕产" name="type"></el-checkbox>
            <el-checkbox label="肠道" name="type"></el-checkbox>
            <el-checkbox label="老人父母" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="商品详情图*：">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button @click="shoppingDialog = false">取消</el-button>
          <el-button type="primary" @click="onSubmit">保存为下架商品</el-button>
          <el-button type="primary" @click="onSubmit">保存并上架</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
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
      },

      dialogImageUrl: "",
      dialogVisible: false,
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
     * 下架
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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>