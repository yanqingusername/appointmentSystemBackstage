<template>
  <div class="app-container">
    <div>
      <el-button
        type="primary"
        size="medium"
        @click="addBanner"
        >新增bnner</el-button
      ></div>
    <el-table border  :data="list" stripe style="width: 100%;margin-top:20px;">
      <el-table-column
        prop="userId"
        width="100"
        label="ID"
        align="center"
      />
      <el-table-column
        prop="name"
        width="190"
        label="标题"
        align="center"
      />
      <el-table-column
        prop="phone"
        width="120"
        label="展示位置"
        align="center"
      />
      <el-table-column prop="phone" width="110" label="排序" align="center" />
      <el-table-column
        prop="phone"
        width="200"
        label="图片地址"
        align="center"
      />
      <el-table-column
        prop="receivingAddress"
        width="100"
        label="修改人"
        align="center"
      />
      <el-table-column
        prop="orderType"
        width="180"
        label="最新编辑时间"
        align="center"
      />
      <el-table-column label="操作" width="210" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="updateClick(scope.row.id)">修改</el-button>
          <el-button type="danger" size="mini" @click="deleteClick(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新添/修改" :visible.sync="bannerDialog" width="50%" center>
      <div>
        <el-form
          :model="bannerObj"
          class="demo-form-inline"
          ref="bannerObj"
          :label-position="(labelPosition = 'top')"
          :rules="rules"
        >
          <el-form-item label="banner标题*："  style="display:flex;width: 100%">
            <el-input
              v-model="bannerObj.title"
              placeholder="请输入内容"
              style="width:500px;"
            />
          </el-form-item>

          <el-form-item label="上 传 图 片 *：" style="display:flex;width: 100%">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="展 示 位 置 *：" prop="status" style="display:flex;width: 100%">
            <el-select
              v-model="bannerObj.position"
              placeholder="请选择展示位置"
            >
              <el-option label="核酸MP首页" value="1"></el-option>
              <el-option label="核酸MP电商首页" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="帧 数 排 序 *：" prop="status" style="display:flex;width: 100%">
            <el-select
              v-model="bannerObj.number"
              placeholder="请选择帧数排序"
            >
              <el-option label="1" value="1" ></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item label="跳 转 类 型 *：" prop="status" style="display:flex;width: 100%">
            <el-select
              v-model="searchObj.status"
              placeholder="请选择跳转类型"
            >
              <el-option label="小程序内页路径" value="1" ></el-option>
              <el-option label="H5页地址链接" value="2"></el-option>
            </el-select>
          </el-form-item> -->

          <el-form-item label="跳 转 类 型 *：" style="display:flex;width: 100%">
            <el-radio-group v-model="bannerObj.resource">
              <el-radio label="小程序内页跳转"></el-radio>
              <el-radio label="H5链接跳转"></el-radio>
              <el-radio label="无跳转"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="点 击 跳 转 *：" style="display:flex;width: 100%">
            <el-input
                v-model="bannerObj.urlstring"
                placeholder="请输入跳转内容"
                style="width:500px;"
              />
          </el-form-item>

          
        </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="bannerDialog=false">取 消</el-button>
          <el-button type="primary" @click="bannerDialog=false">确 定</el-button>
        </div>
      
    </el-dialog>
    
    <el-dialog :visible.sync="deleteDialog" width="30%" center>
      <span>确定要删除该条吗？删除后无法恢复了</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteDialog = false"
          >取 消</el-button
        >
        <el-button @click="deletepolicy()">确 定</el-button>
      </span>
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
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
      list: [], //每页数据集合
      total: 0, //总记录数
      userid: "", //中间商id
      rules: {},
      deleteDialog: false,
      bannerDialog: false,
      bannerObj:{

      },
      imageUrl: ''
      
    };
  },
  created() {
    this.name = getName();
    this.getList();
  },
  methods: {
    isEmpty(obj) {
      if (obj == null || obj == undefined || obj == "") {
        return true;
      } else {
        return false;
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
    addBanner() {
      this.bannerDialog = true;
    },
    updateClick(id) {
      this.bannerDialog = true;
    },
    deleteClick(id) {
      this.deleteDialog = true;
    },
    deletepolicy() {
      // policy
      //   .deletepolicyinfoById(this.userid)
      //   .then((response) => {
      //     if (response.code == 200) {
      //       this.$message({
      //         message: "删除成功",
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
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  },
};
</script>