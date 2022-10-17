<template>
  <el-form
    :inline="true"
    :model="channelSchedule"
    ref="channelSchedule"
    :rules="rules"
    label-width="180px"
  >
    <el-form-item label="班次名称" prop="classesName" style="width: 58%">
      <el-input v-model="channelSchedule.classesName"></el-input>
    </el-form-item>
    <el-form-item label="创建人" prop="createPerson"style="width: 58%">
      <el-input v-model="channelSchedule.createPerson" :disabled="true"></el-input>
    </el-form-item>
   
    <el-form-item label="班次时间" required style="width: 58%">
      <el-col :span="11">
        <el-form-item prop="classes_time_start">
          <el-time-select
            placeholder="起始时间"
            v-model="channelSchedule.classes_time_start"
            @input="$forceUpdate()"
            :picker-options="{
              start: '00:00',
              step: '00:30',
              end: '24:00',
            }"
          >
          </el-time-select>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="classes_time_end">
          <el-time-select
            placeholder="结束时间"
            v-model="channelSchedule.classes_time_end"
            @input="$forceUpdate()"
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
    <el-form-item
      label="适用采样点"
      prop="classesChannelNames"
      style="width: 58%"
      ><el-select
        v-model="channelSchedule.classesChannelNames"
        filterable
        placeholder="请选择采样点"
        multiple
        
        style="width: 200%"
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
        <el-button @click="resetForm('channelSchedule')">取消</el-button>
      </el-form-item>
    </el-footer>
  </el-form>
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
import { getName } from '@/utils/auth' 

export default {
  //定义变量和初始值
  data() {
    return {
      dialogFormVisible: false,
      channelSchedule: {
        classesName: "",
        createPerson: "",
        create_time_start: "",
        create_time_end: "",
        classesChannelNames: [],
        classesChannelIds: [],
      },
      channelList: [],
      classesnames: [],
      name: "",
      time: "",

      rules: {
        classesName: [
          { required: true, message: "请输入班次名称", trigger: "blur" },
        ],
        classes_time: [
          { required: true, message: "请输入班次时间", trigger: "blur" },
        ],
        classes_time_start: [
          { required: true, message: "请输入起始时间", trigger: "blur" },
        ],
        classes_time_end: [
          { required: true, message: "请输入结束时间", trigger: "blur" },
        ],
        classesChannelNames: [
          {
            required: true,
            message: "请输入最少一个采样点",
            trigger: "change",
          },
        ],
        createPerson: [
          { required: true, message: "请输入创建人", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    var query = this.$route.query;
    console.log(query);
    if (query) {
      this.channelSchedule = query.schedule;
    }
    this.resolveData1();
    this.getChannel();
  },
  methods: {
    //定义方法，进行请求接口调用
    //人员设置列表
    updatePerson() {
      cschedule.updateSchedule(this.formData).then((response) => {
        if (response.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
         this.$router.push({
            path: "/point/scheduling",
          });
          // this.resolveData1();
        } else if(response.code==201){
          this.$message({
            message: response.data,
            type: "error",
          });
        }
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
          console.log(this.channelSchedule);
          this.resolveData2();
          this.updatePerson();
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    },
    resolveData1() {
      //字符串按逗号间隔拆开
      this.channelSchedule.classesChannelNames = this.channelSchedule.classesChannelNames.split(
        ","
      );
      this.channelSchedule.classesChannelIds = this.channelSchedule.classesChannelIds.split(
        ","
      );
      //拆分时间按照-拆分
      this.channelSchedule.classes_time_start = this.channelSchedule.classesTime.split(
        "-"
      )[0];
      this.channelSchedule.classes_time_end = this.channelSchedule.classesTime.split(
        "-"
      )[1];
    },
    resolveData2() {
      //用-合并时间
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.push({
            path: "/point/scheduling",
          });

    },
  },
};
</script>