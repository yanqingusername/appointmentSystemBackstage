<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="searchObj"
      class="demo-form-inline"
      ref="searchObj"
    >
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="PolicyDialogVisible = true"
        >新建</el-button
      >
    </el-form>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" width="100" label="id" align="center" />
      <el-table-column
        prop="city"
        width="100"
        label="政策地区"
        align="center"
      />
      <el-table-column
        prop="title"
        width="100"
        label="政策标题"
        align="center"
      />
      <el-table-column
        prop="typeName"
        width="150"
        label="风险等级"
        align="center"
      />
      <el-table-column
        prop="time"
        width="180"
        :formatter="dateFormat"
        label="政策更新时间"
        align="center"
      />
      <el-table-column
        prop="content"
        width="300"
        label="政策全文"
        align="center"
      />
      <el-table-column
        prop="editTime"
        width="180"
        :formatter="dateFormat"
        label="最后编辑时间"
        align="center"
      />
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleupdate(scope.row.id)"
            icon="el-icon-edit"
            >修改</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="handledelete(scope.row.id)"
            icon="el-icon-delete"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="centerDialogVisible" width="30%" center>
      <span>确定要删除吗，删除后无法恢复了</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false"
          >取 消</el-button
        >
        <el-button @click="deletepolicy()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="PolicyDialogVisible" width="30%" center>
      <div>
        <el-form
          :model="EpidemicPreventionPolicy"
          class="demo-form-inline"
          ref="EpidemicPreventionPolicy"
          :label-position="(labelPosition = 'top')"
          :rules="rules"
        >
          <el-form-item label="政策对应地区" prop="city" style="width: 100%">
            <el-input
              v-model="EpidemicPreventionPolicy.city"
              placeholder="请输入内容"
              :disabled="true"
            />
          </el-form-item>
          <el-form-item label="政策标题" prop="title" style="width: 100%">
            <el-input
              v-model="EpidemicPreventionPolicy.title"
              placeholder="请输入内容"
            />
          </el-form-item>
          <el-form-item label="风险等级" >
            <el-input
              v-model="EpidemicPreventionPolicy.typeName"
              placeholder="请输入内容"
            />
          </el-form-item>
          <!-- <el-form-item label="防疫办电话" >
            <el-input
              v-model="EpidemicPreventionPolicy.policyphone"
              placeholder="请输入内容"
              :disabled="true"
            />
          </el-form-item>
          <el-form-item label="数据来源" >
            <el-input
              v-model="EpidemicPreventionPolicy.sourceType"
              placeholder="请输入内容"
            />
          </el-form-item> -->
          <el-form-item label="政策更新时间" prop="time">
            <el-date-picker
              v-model="EpidemicPreventionPolicy.time"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="政策正文" prop="content">
            <el-input
              type="textarea"
              :rows="12"
              v-model="EpidemicPreventionPolicy.content"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeform()">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdate()">确 定</el-button>
        </span>
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
/* .el-form-item :first-child {
  width: 100%;
} */
</style>
<script>
//引入接口定义的js文件
import policy from "@/api/policy";
import { getName } from "@/utils/auth"; // 验权
import moment from "moment";
export default {
  //定义变量和初始值
  data() {
    var validatePass = (rule, value, callback) => {
      if (this.EpidemicPreventionPolicy.time == "" ) {
        callback(new Error("请输入政策更新时间"));
      } else {
        callback();
      }
    };
    return {
      current: 0, //当前页
      limit: 20, //每页显示记录数
      searchObj: {}, //条件封装对象
      list: [], //每页数据集合
      testlist: [], //受检人数据集合
      total: 0, //总记录数
      userid: "", //中间商id
      rules: {},
      EpidemicPreventionPolicy: {
        id: "",
        city: "北京市",
        title: "",
        typeName: "",
        policyphone: "010-12345",
        time: "",
        content: "",
        sourceType: "",
      },
      rules: {
          time:  [{ validator: validatePass, trigger: "blur" }],
        },
      centerDialogVisible: false,
      PolicyDialogVisible: false,
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
    getList(page = 1) {
      this.current = page;
      policy
        .getpolicyinfo(this.current, this.limit, this.searchObj)
        .then((response) => {
          this.list = response.data.records;
          //总记录数
          this.total = response.data.total;
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    getpolicy() {
      policy
        .getpolicyinfobyid(this.userid)
        .then((response) => {
          if (response.code == 200) {
            this.EpidemicPreventionPolicy = response.data;
          }
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    handledelete(id) {
      this.userid = id;
      this.centerDialogVisible = true;
    },
    handleupdate(id) {
      this.userid = id;
      this.PolicyDialogVisible = true;
      this.getpolicy();
    },
    closeform(){
        this.PolicyDialogVisible = false;
        this.EpidemicPreventionPolicy.id = "";
        this.EpidemicPreventionPolicy.title = "";
        this.EpidemicPreventionPolicy.typeName = "";
        this.EpidemicPreventionPolicy.time = "";
        this.EpidemicPreventionPolicy.content = "";
        this.EpidemicPreventionPolicy.sourceType = "";
    },
    saveOrUpdate() {
      //判断添加还是修改
      if (!this.EpidemicPreventionPolicy.id) {
        //没有id，做添加
        this.save();
      } else {
        //修改
        this.update();
      }
    },
    save() {
      if(this.EpidemicPreventionPolicy.time==""||this.EpidemicPreventionPolicy.time==null){
        this.$message.warning("请输入政策更新时间");
        return;
      }else{
          policy
            .addpolicyinfo(this.EpidemicPreventionPolicy)
            .then((response) => {
              if (response.code == 200) {
                this.$message({
                  message: "添加成功",
                  type: "success",
                });
                this.PolicyDialogVisible = false;
                this.getList();
                 this.EpidemicPreventionPolicy.id = "";
          this.EpidemicPreventionPolicy.title = "";
          this.EpidemicPreventionPolicy.typeName = "";
          this.EpidemicPreventionPolicy.time = "";
          this.EpidemicPreventionPolicy.content = "";
          this.EpidemicPreventionPolicy.sourceType = "";
              } else {
                this.$message({
                  message: "添加失败",
                  type: "error",
                });
              }
            })
            .catch((error) => {
              //请求失败
              console.log(error);
            });
      }
    },
    update() {
      if(this.EpidemicPreventionPolicy.time==""||this.EpidemicPreventionPolicy.time==null){
        this.$message.warning("请输入政策更新时间");
        return;
      }else{
      policy
        .updatepolicyinfo(this.EpidemicPreventionPolicy)
        .then((response) => {
          if (response.code == 200) {
            this.$message.success("修改成功");
            this.PolicyDialogVisible = false;
            this.getList();
            this.EpidemicPreventionPolicy.id = "";
           this.EpidemicPreventionPolicy.title = "";
           this.EpidemicPreventionPolicy.typeName = "";
           this.EpidemicPreventionPolicy.time = "";
           this.EpidemicPreventionPolicy.content = "";
           this.EpidemicPreventionPolicy.sourceType = "";
          } else {
            this.$message.error(response.msg);
          }
        });
      }
    },
    deletepolicy() {
      policy
        .deletepolicyinfoById(this.userid)
        .then((response) => {
          if (response.code == 200) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.getList();
            this.centerDialogVisible = false;
          }
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
  },
};
</script>