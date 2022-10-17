<template>
  <div class="app-container">
    <el-form
      :inline="true"
      class="demo-form-inline"
      ref="searchObj"
      :model="searchObj"
    >
      <el-form-item label="班次名称" prop="classesName">
        <el-select
          clearable
          filterable
          v-model="searchObj.classesName"
          placeholder="请选择班次"
        >
          <el-option
            v-for="item in className"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetdata('searchObj')">清空</el-button>
    </el-form>

    <!-- 工具条 -->
    <div>
      <el-form :inline="true">
        <el-button type="primary" @click="dialogFormVisible = true"
          >添加班次</el-button
        >
        <!-- 弹窗层 -->
        <el-dialog
          title="添加班次"
          :visible.sync="dialogFormVisible"
          style="margin-left: 100px"
        >
          <el-form
            :inline="true"
            :model="channelSchedule"
            ref="channelSchedule"
            :rules="rules"
            label-width="180px"
          >
            <el-form-item label="班次名称" prop="classesName" >
              <el-input placeholder="请输入班次名称" v-model="channelSchedule.classesName"></el-input>
            </el-form-item>
            <!-- <el-form-item label="创建人" prop="createPerson" >
              <el-input v-model="this.createPerson" :disabled="true"></el-input>
            </el-form-item> -->
            <el-form-item label="班次时间" required>
              <el-col :span="11">
                <el-form-item prop="classes_time_start" >
                <el-time-select
                placeholder="起始时间"
                v-model="channelSchedule.classes_time_start"
                style="width: 120px"
                
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '24:00',
                }"
              >
              </el-time-select>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2"> -</el-col>
              <el-col :span="11">
                <el-form-item prop="classes_time_end">
               <el-time-select
                placeholder="结束时间"
                
                v-model="channelSchedule.classes_time_end"
                style="width: 120px"
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '24:00',
                  //minTime: channelSchedule.classes_time_start
                }"
              >
              </el-time-select>
                </el-form-item>
              </el-col>  
            </el-form-item>
            <el-form-item label="适用采样点" prop="classesChannelNames" >
               <el-select
               filterable
                v-model="channelSchedule.classesChannelNames"
                placeholder="请选择采样点"
                multiple
                style="width:100%"
              >
                <el-option
                 v-for="item in channelList"
                  :key="item.channelId"
                  :label="item.channelName"
                  :value="item.channelName"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-footer>
              <el-form-item style="margin-left: 250px">
                <el-button type="primary" @click="submitForm('channelSchedule')"
                  >保存</el-button
                >
                <el-button @click="resetForm('channelSchedule')"
                  >取消</el-button
                >
              </el-form-item>
            </el-footer>
          </el-form>
        </el-dialog>
      </el-form>
    </div>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="classesName" align="center" label="班次名称" />
      <el-table-column prop="classesTime" align="center" label="班次时间" />
      <el-table-column
        prop="classesChannelNames"
        label="适用采样点"
        width="200"
      />
      <el-table-column prop="createPerson" align="center" label="创建人" />
      <el-table-column prop="createTime"  :formatter="dateFormat" align="center" label="创建时间" />
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <router-link
            :to="{ path: '/point/updatesch', query: { schedule: scope.row} }"
          >
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑</el-button
            >
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
   <div class="block" style="margin-top: 15px">
          <el-pagination
            align="center"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 5, 10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
  </div>
</template>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
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
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
<script>
//引入接口定义的js文件
import cschedule from '@/api/cschedule'
import common from '@/api/common'
import moment from 'moment'
import { getName } from '@/utils/auth' 
export default {
  //定义变量和初始值
  data() {
    return {
      current: 0, //当前页
      limit: 7, //每页显示记录数
      searchObj: {}, //条件封装对象
      list: [], //每页数据集合
      total: 0, //总记录数
      dialogFormVisible: false,
      channelSchedule: {
        classesName: "",
        createPerson: "",
        classes_time_start: "",
        classes_time_end: "",
        classesChannelNames: "",
        classesChannelIds: "",
        classesTime: "",
      },
       currentPage:1,
      pageSize: 5, // 每页的数据条数
      channelList: [],
      classesnames: "",
      rules: {
        classesName: [
          { required: true, message: "请选择班次名称", trigger: "blur" },
        ],
        classesTime: [
          { required: true, message: "请输入班次时间", trigger: "blur" },
        ],
        classes_time_start: [
          { required: true, message: "请输入起始时间", trigger: "blur" },
        ],
        classes_time_end: [
          { required: true, message: "请输入结束时间", trigger: "blur" },
        ],
        classesChannelNames: [
          { required: true, message: "请输入最少一个采样点", trigger: "blur" },
        ],
        createPerson: [
          { required: true, message: "请输入创建人", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    //在页面渲染之前执行
    //一般调用methods定义的方法，得到数据
    this.getList();
    this.getChannel();
    this.getClassName();
    this.createPerson=getName();
    
  },
  methods: {
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.list = this.tableDates.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
         dateFormat:function(row,column){ 
        var date = row[column.property]; 
        if(date == undefined){return ''}; 
        return moment(date).format("YYYY-MM-DD HH:mm:ss") 
    } ,
    resetdata(formName){
      this.searchObj={};
      this.getList();
    },
    //医院设置列表
    getList(page=1) {
      this.current=page
      this.searchObj.sampling_leader=getName();
     cschedule
        .getScheduleList(this.current, this.limit, this.searchObj)
        .then((response) => {
          console.log(response);
        this.tableDates = response.data.records;
        this.total = response.data.total;
        this.list = this.tableDates.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
        getClassName() {
      cschedule.getClassName(getName()).then((response) => {
        //刷新
        this.className = response.data;
      });
    },
      getChannel() {
      common
        .getAllChannel(getName())
        .then((response) => {
          //
          this.channelList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证通过
          //提交数据
          this.resolveData();
          this.save();

        } else {
          console.log("error submit!!!");
        }
      });

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      //关闭弹窗
      this.dialogFormVisible = false;
    },
    resolveData() {
      this.formData = JSON.parse(JSON.stringify(this.channelSchedule));

      let channelIds = [];
      this.channelList.forEach((item) => {
        if (this.formData.classesChannelNames.indexOf(item.channelName) > -1) {
          channelIds.push(item.channelId);
        }
      });
      
      this.formData.classesChannelIds = channelIds.join(",");
      this.formData.classesChannelNames = this.formData.classesChannelNames.toString();
      this.formData.classesTime = this.formData.classes_time_start + "-" + this.formData.classes_time_end;
    },
    //添加班次
    save() {
      this.formData.createPerson=this.createPerson;
       cschedule.saveSchedule(this.formData)
        .then((response) => {
          console.log("添加班次测试")
          console.log(response)
          if(response.code==200)
          {
             this.$message({
            message: "添加成功",
             type: "success"
          });
           this.dialogFormVisible = false;
          //  this.channelSchedule={};
           this.$refs.channelSchedule.resetFields();
          this.getList();
          }else if(response.code==201)
          {
            this.$message({
            message:response.data,
             type: "error"
          });
          
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