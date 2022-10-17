<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="searchObj"
      class="demo-form-inline"
      ref="searchObj"
      :label-position="labelPosition "
    >
      <el-form-item label="用户id" prop="id">
        <el-input v-model="searchObj.id" placeholder="请输入用户id" clearable/>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="searchObj.nickname" placeholder="请输入用户昵称" clearable/>
      </el-form-item>
      <el-form-item label="用户手机号" prop="phone">
        <el-input
          v-model="searchObj.phone"
          placeholder="请输入用户手机号"
          clearable
        />
      </el-form-item>
      <el-form-item label="微信unionid" prop="unionid">
        <el-input v-model="searchObj.unionid" placeholder="请输入微信unionid" clearable/>
      </el-form-item>
      <el-form-item label="注册渠道" prop="registrationChannel">
        <el-input v-model="searchObj.registrationChannel" placeholder="请输入注册渠道" clearable/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
    </el-form>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" width="100" label="用户id" align="center" />
      <el-table-column
        prop="nickname"
        width="180"
        label="用户昵称"
        align="center"
      />
      <el-table-column
        prop="telephone"
        width="180"
        label="手机号"
        align="center"
      />
      <el-table-column
        prop="registrationChannel"
        width="100"
        label="注册渠道"
        align="center"
      />
      <el-table-column
        prop="unionid"
        width="300"
        label="微信unionid"
        align="center"
      />
      <el-table-column
        prop="createTime"
        :formatter="dateFormat"
        label="注册时间"
        width="200"
        align="center"
      />
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleuser(scope.row.id)"
            >修改</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="handletest(scope.row.id)"
            >查看受检人
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="修改用户信息"
      :visible.sync="dialogOpenUserVisible"
      width="30%"
    >
      <div class="block">
        <el-form
          :inline="true"
          :model="searchObj"
          class="demo-form-inline"
          ref="searchObj"
        >
          <el-form-item label="用户昵称" prop="nickname">
            <el-input
              v-model="ClassesUserInfo.nickname"
              placeholder="请输入内容"
            />
          </el-form-item>
          <el-form-item label="用户昵称" prop="telephone">
            <el-input
              v-model="ClassesUserInfo.telephone"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogOpenUserVisible = false">取消</el-button>
        <el-button type="primary" @click="updateUserinfo()">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="受检人信息"
      :visible.sync="dialogOpenTestVisible"
      width="50%"
    >
      <div class="block">
      <el-table :data="testlist" stripe style="width: 100%">
      <el-table-column
        prop="name"
        width="180"
        label="受检人姓名"
        align="center"
      />
      <el-table-column
        prop="phone"
        width="180"
        label="手机号"
        align="center"
      />
      <el-table-column
        prop="cardType"
        width="100"
        label="证件类型"
        align="center"
      />
      <el-table-column
        prop="idCard"
        width="300"
        label="证件号码"
        align="center"
      />
    </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button  type="primary" @click="dialogOpenTestVisible = false">确定</el-button>
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
</style>
<script>
//引入接口定义的js文件
import userinfo from "@/api/User";
import { getName } from "@/utils/auth"; // 验权
import moment from "moment";
export default {
  //定义变量和初始值
  data() {
    var validatePass = (rule, value, callback) => {
      if (this.LisChannel.pointnature === "0" && value === "") {
        callback(new Error("请输入详细地址"));
      } else {
        // if (this.LisChannel.siteDescription !== '') {
        //   this.$refs.LisChannel.validateField('siteDescription');
        // }
        callback();
      }
    };
    return {
      dialogOpenUserVisible: false,
      dialogOpenTestVisible: false,
      current: 0, //当前页
      limit: 20, //每页显示记录数
      searchObj: {
        id: "",
        nickname: "",
        telephone: "",
        unionid: "",
        registrationChannel: "",
      }, //条件封装对象
      list: [], //每页数据集合
      testlist: [], //受检人数据集合
      total: 0, //总记录数
      roleId: "", //获取登录者角色
      userid: "", //中间商id
      labelPosition: 'left',
      ClassesUserInfo: {
        id: "",
        nickname: "",
        telephone: "",
        registrationChannel: "",
      },
      rules: {
        channelName: [
          { required: true, message: "请输入采样点名称", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.name = getName();
    this.getList();
  },
  methods: {
    updateUserinfo() {
      userinfo
        .updateUserinfo(this.userid, this.ClassesUserInfo)
        .then((response) => {
          if (response.code == 200) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.dialogOpenUserVisible = false;
          }
          this.getList();
        });
    },
    handleuser(id) {
      this.userid = id;
      this.dialogOpenUserVisible = true;
      this.getsampleinfo(id);
    },
    handletest(id){
      this.userid = id;
      this.dialogOpenTestVisible = true;
      this.gettestinfo(id);
    },
    //日期格式化
    dateFormat: function (row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    getList(page = 1) {
      this.current = page;
      userinfo
        .getUserList(this.current, this.limit, this.searchObj)
        .then((response) => {
          this.list = response.data.records;52
          //总记录数
          this.total = response.data.total;
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    open(username, password) {
      //显示账号和密码
      this.$confirm(`账号：${username} 密码：${password}`, "提示", {
        confirmButtonText: "确定",
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getList();
      //关闭弹窗
      this.dialogFormVisible = false;
    },
    gettestinfo(id) {
      userinfo
        .getTestuserinfo(id)
        .then((response) => {
          if (response.code == 200) {
            this.testlist = response.data;
          }
        })
        .catch((error) => {
          //请求失败
          console.log("获取失败" + error);
        });
    },
    getsampleinfo(id) {
      userinfo
        .getsampleinfo(id)
        .then((response) => {
          if (response.code == 200) {
            this.ClassesUserInfo = response.data;
            this.dialogFormVisible = false;
          }
        })
        .catch((error) => {
          //请求失败
          console.log("获取失败" + error);
        });
    },
  },
};
</script>