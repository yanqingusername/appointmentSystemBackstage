<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="searchObj"
      class="demo-form-inline"
      ref="searchObj"
    >
      <el-form-item label="预约编号" prop="id">
        <el-input
          v-model="searchObj.id"
          placeholder="请输入预约编号"
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
      <el-form-item label="受检人手机号" prop="phone">
        <el-input
          v-model="searchObj.phone"
          placeholder="请输入受检人手机号"
          clearable
        />
      </el-form-item>
      <el-form-item label="对应订单编号" prop="orderId">
        <el-input
          v-model="searchObj.orderId"
          placeholder="请输入订单编号"
          clearable
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="searchObj.remark"
          placeholder="请输入备注"
          clearable
        />
      </el-form-item>
      <el-form-item label="预约状态" prop="status">
        <el-select
          v-model="searchObj.status"
          filterable
          clearable
          placeholder="请选择预约状态"
        >
          <el-option label="待采样" value="1"></el-option>
          <el-option label="已采样" value="2"></el-option>
          <el-option label="已关闭" value="3"></el-option>
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
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
    </el-form>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        width="100"
        label="预约编号"
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
      <el-table-column prop="phone" width="110" label="手机号" align="center" />
      <el-table-column
        prop="orderType"
        width="100"
        label="预约类型"
        align="center"
      />
      <el-table-column
        prop="testName"
        width="200"
        label="检测类型"
        align="center"
      />
      <el-table-column prop="remark" width="200" label="备注" align="center" />
      <el-table-column
        prop="createTime"
        width="180"
        :formatter="dateFormat"
        label="创建时间"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        width="100"
        label="预约状态"
        align="center"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.status == '0'">未支付</p>
          <p v-if="scope.row.status == '1'">待采样</p>
          <p v-if="scope.row.status == '2'">已采样</p>
          <p v-if="scope.row.status == '3'">已关闭</p>
          <p v-if="scope.row.status == '4'">已关闭</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="orderNumber"
        width="200"
        label="对应订单编号"
        align="center"
      />
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleappoint(scope.row.id)"
            >预约信息</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="handlesample(scope.row.id)"
            >样本信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="个人预约信息"
      :visible.sync="dialogOpenAppointVisible"
      width="30%"
    >
      <div class="block">
        <el-form
          :inline="true"
          :model="appointlist"
          class="demo-form-inline"
          ref="appointlist"
        >
          <el-form-item>
            <el-descriptions>
              <el-descriptions-item label="采样点"
                >&nbsp;&nbsp;&nbsp;{{
                  appointlist.channelName
                }}</el-descriptions-item
              >
            </el-descriptions>
          </el-form-item>
          <el-form-item>
            <el-descriptions>
              <el-descriptions-item label="所在街道">{{
                appointlist.street
              }}</el-descriptions-item>
            </el-descriptions>
          </el-form-item>
          <el-form-item>
            <el-descriptions>
              <el-descriptions-item label="预约时间">{{
                appointlist.appointTime
              }}</el-descriptions-item>
            </el-descriptions>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item>
            <el-descriptions>
              <el-descriptions-item label="受检人"
                >&nbsp;&nbsp;&nbsp;{{ appointlist.name }}</el-descriptions-item
              >
            </el-descriptions>
          </el-form-item>
          <el-form-item>
            <el-descriptions>
              <el-descriptions-item label="手机号"
                >&nbsp;&nbsp;&nbsp;{{ appointlist.phone }}</el-descriptions-item
              >
            </el-descriptions>
          </el-form-item>
          <el-form-item>
            <el-descriptions>
              <el-descriptions-item label="证件类型">{{
                appointlist.cardType
              }}</el-descriptions-item>
            </el-descriptions>
          </el-form-item>
          <el-form-item>
            <el-descriptions>
              <el-descriptions-item label="证件号"
                >&nbsp;&nbsp;&nbsp;{{
                  appointlist.idCard
                }}</el-descriptions-item
              >
            </el-descriptions>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="appointlist.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateappointinfo()">确定</el-button>
        <el-button @click="dialogOpenAppointVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="样本信息"
      :visible.sync="dialogOpenSampleVisible"
      width="30%"
    >
      <div class="block">
        <el-form
          :inline="true"
          :model="samplelist"
          class="demo-form-inline"
          ref="samplelist"
        >
          <el-form-item>
            <el-descriptions>
              <el-descriptions-item label="样本编号">{{
                samplelist.sampleId
              }}</el-descriptions-item>
              </el-descriptions>
          </el-form-item>
          <el-form-item>
            <el-descriptions>
              <el-descriptions-item label="检测进度">{{
                samplelist.process
              }}</el-descriptions-item>
            </el-descriptions>
          </el-form-item>
          
          <el-form-item>
            <el-descriptions>
              <el-descriptions-item label="受检人姓名"
                >&nbsp;&nbsp;&nbsp;{{ samplelist.name }}</el-descriptions-item
              >
            </el-descriptions>
          </el-form-item>
          <el-form-item>
            <el-descriptions>
              <el-descriptions-item label="证件类型"
                >&nbsp;&nbsp;&nbsp;{{ samplelist.cardType }}</el-descriptions-item
              >
            </el-descriptions>
          </el-form-item>
          <el-form-item>
            <el-descriptions>
              <el-descriptions-item label="手机号">{{
                samplelist.phone
              }}</el-descriptions-item>
            </el-descriptions>
          </el-form-item>
          <el-form-item>
            <el-descriptions>
              <el-descriptions-item label="证件号"
                >&nbsp;&nbsp;&nbsp;{{
                  samplelist.idcard
                }}</el-descriptions-item
              >
            </el-descriptions>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogOpenSampleVisible = false">确定</el-button>
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
import appoint from "@/api/appointment";
import { getName } from "@/utils/auth"; // 验权
import moment from "moment";
export default {
  //定义变量和初始值
  data() {
    return {
      current: 0, //当前页
      limit: 10, //每页显示记录数
      searchObj: {
        id:null,
        userId:null,
        name: null, //姓名
        phone: null, //手机号
        status:null,
        orderId:null,
        remark:null,
        startTime: '', //开始时间
        endTime: '', //结束时间
        timelist: [new Date().getTime() - 3 * 24 * 60 * 60 * 1000, new Date().getTime()],
      }, //条件封装对象
      list: [], //每页数据集合
      appointlist: {
        channelName: "",
        street: "",
        appointmentTime: "",
        name: "",
        phone: "",
        cardType: "",
        remark: "",
        idCard: "",
      }, //预约信息
      samplelist: {
        name: "",
        idcard: "",
        phone: "",
        cardType: "",
        process: "",
        sampleId: "",
      }, //样本信息
      dialogOpenAppointVisible: false,
      dialogOpenSampleVisible: false,
      total: 0, //总记录数
      userid: "", //中间商id
      rules: {},
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
     consoledata(){
      if(!this.isEmpty(this.searchObj.timelist)){
        if(this.searchObj.timelist[1].getTime()-this.searchObj.timelist[0].getTime()>3*24*60*60*1000){
        this.$message.warning("时间范围不能超过3天");
        this.searchObj.timelist=[];
        return;
       }
      }
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
    getList(page = 1) {
      this.current = page;
       if(!this.isEmpty(this.searchObj.status)&&this.isEmpty(this.searchObj.timelist)){
        this.$message.warning("请选择三天内的时间范围")
        return;
      }
      else if(!this.isEmpty(this.searchObj.timelist)){
        this.searchObj.startTime=moment(this.searchObj.timelist[0]).format("YYYY-MM-DD HH:mm:ss")
        this.searchObj.endTime=moment(this.searchObj.timelist[1]).format("YYYY-MM-DD HH:mm:ss")
      } 
      else if(this.isEmpty(this.searchObj.status)&&this.isEmpty(this.searchObj.timelist)&&this.isEmpty(this.searchObj.id)&&this.isEmpty(this.searchObj.userId)
      &&this.isEmpty(this.searchObj.phone)&&this.isEmpty(this.searchObj.remark)&&this.isEmpty(this.searchObj.orderId)&&this.isEmpty(this.searchObj.name)){
        this.$message.warning("请选择三天内的时间范围")
        return;
      }
      appoint
        .getappointmentinfo(this.current, this.limit, this.searchObj)
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
    handleappoint(id) {
      this.userid = id;
      this.getappointinfo(id);
      this.dialogOpenAppointVisible = true;
    },
    handlesample(id) {
      this.userid = id;
      
      this.getsampleinfo(id);
    },
    getappointinfo(id) {
      appoint
        .getappointinfobyid(id)
        .then((response) => {
          if (response.code == 200) {
            this.appointlist = response.data;
            
          }
        })
        .catch((error) => {
          //请求失败
          console.log("获取失败" + error);
        });
    },
    updateappointinfo() {
      appoint
        .updateappointbyid(this.userid, this.appointlist)
        .then((response) => {
          if (response.code == 200) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.dialogOpenAppointVisible = false;
          }
          this.getList();
        });
    },
    getsampleinfo(id) {
      appoint
        .getsampleinfobyid(id)
        .then((response) => {
          if (response.code == 200) {
            this.samplelist = response.data;
            this.dialogOpenSampleVisible = true;
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