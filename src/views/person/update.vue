<template>
  <div class="person-update">
    <el-form :model="Person" ref="Person" label-width="180px" :rules="rules">
      <el-form-item label="姓名" prop="personName" style="width: 50%">
        <el-input v-model="Person.personName"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="personPhone" style="width: 50%">
        <el-input v-model="Person.personPhone"></el-input>
      </el-form-item>
      <el-form-item label="居住地区" prop="areaName" style="width: 50%">
         <el-select v-model="Person.areaName" filterable placeholder="请选择居住地区">
                <el-option
                  v-for="item in areaList"
                  :key="item.areaId"
                  :label="item.areaName"
                  :value="item.areaName"
                />
              </el-select>
      </el-form-item>
      <el-form-item label="所属部门" prop="personType">
                <el-select v-model="Person.personType"  @change="changeFunctionType()" placeholder="请选择部门">
                  <el-option label="采样点" value="0"></el-option>
                  <el-option label="检测中心" value="1"></el-option>
                  <el-option label="运输" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="Person.personType === '0'" label="责任角色" prop="dutyType">
                <el-select v-model="Person.dutyType" placeholder="请选择职责">
                     <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="Person.personType === '1'" label="责任角色" prop="dutyType">
                <el-select v-model="Person.dutyType" placeholder="请选择职责">
                     <el-option
                    v-for="item in options5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="Person.personType === '2'" label="责任角色" prop="dutyType">
                <el-select v-model="Person.dutyType" placeholder="请选择职责">
                     <el-option
                    v-for="item in options6"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item  v-if="Person.personType === '0'" label="职责" prop="functionType">
                <el-select
                  v-model="Person.functionType"
                  placeholder="请选择角色"
                >
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item  v-if="Person.personType === '1'" label="职责" prop="functionType">
                <el-select
                  v-model="Person.functionType"
                  placeholder="请选择角色"

                >
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"

                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item  v-if="Person.personType === '2'" label="职责" prop="functionType">
                <el-select
                  v-model="Person.functionType"
                  placeholder="请选择角色"
                >
                  <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
             
            <el-form-item  
             v-if="Person.personType == '0'&& Person.functionType != '9'"
              label="所属采样点"
              prop="channel"
            >
              <el-select
                filterable 
                clearable
                v-model="Person.channel"
          
                placeholder="请选择采样点"
              >
                <el-option
                  v-for="item in channelList"
                  :key="item.id"
                  :label="item.channelName"
                  :value="item.channelId"
                />
              </el-select>
            </el-form-item>
            <el-form-item 
             v-if="Person.personType === '1'"
              label="所属实验室"
              prop="lab"
            >
              <el-select
              filterable
                clearable
                v-model="Person.lab"
                placeholder="请选择实验室"
              >
                <el-option
                  v-for="item in labList"
                  :key="item.id"
                  :label="item.realName"
                  :value="item.userInfoId"
                />
              </el-select>
            </el-form-item>
      <!-- <el-form-item label="创建人" prop="createPerson" style="width: 50%">
        <el-input v-model="Person.createPerson"></el-input>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin-left: 350px">
      <el-button @click="returnForm('Person')">取 消</el-button>
      <el-button type="primary" @click="submitForm('Person')">确 定</el-button>
    </div>
  </div>
</template>
<script>
//引入接口定义的js文件
import person from "@/api/person";
import common from "@/api/common";
import { getName } from '@/utils/auth' 
export default {
  //定义变量和初始值
  data() {
    return {
      Person: {
        personName: "",
        personPhone: "",
        personType: "",
        functionType: "",
        dutyType: "",
        channel: "",
        lab: "",
        areaId: "",
        areaName: "",
        createPerson: "",
      },
      labList: [],
      channelList: [],
      cityList: [],
      areaList: [], //区域列表
       options1: [
        {value: "0",label: "护士"},
        {value: "1",label: "登记"},
        {value: "2",label: "样本转运"},
        {value: "3",label: "外围"},
        {value: "9",label: "站长"},],
      options2: [
         {value: "5",label: "试剂配置"},
        {value: "6",label: "样本制备"},
        {value: "7",label: "扩增"},
        {value: "8",label: "样本接收"}
        ],
      options3: [{value: "4",label: "运输样本司机"}
       ],
      options4: [
        {value: "0",label: "组长"},
        {value: "1",label: "站长"},
        {value: "2",label: "运营经理"},],
      options5: [
       {value: "4",label: "班长"},
        {value: "5",label: "负责人"}
       ],
      options6: [ {value: "3",label: "负责人"}
       ],
      rules: {
        personName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max:50, message: "长度在 1 到 50个字符", trigger: "blur" },
        ],
        personPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11位", trigger: "blur" },
        ],
        areaId: [
          { required: true, message: "请选择居住地区", trigger: "blur" },
        ],
        areaName: [
          { required: true, message: "请选择所在市", trigger: "blur" },
        ],
        personType: [
          { required: true, message: "请选择部门", trigger: "blur" },
        ],
       functionType : [
          { required: true, message: "请选择职责", trigger: "blur" },
        ],
        channel: [{ required: true, message: "请选择采样点", trigger: "blur" }],

        lab: [{ required: true, message: "请选择实验室", trigger: "blur" }],
        createPerson: [
          { required: true, message: "请输入创建人", trigger: "blur" },
        ],
        dutyType: [
          { required: false, message: "请选择责任角色", trigger: "blur" },
        ],
      },
    };
  },
   created() {
        if(this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
         this.getPerson(id)
         }
         else {
         //表单数据清空
         this.Person = {}
      }
         this.getArea();
         this.getLab();
         this.getChannel();
  },
  methods: {
        changeFunctionType(){
      this.Person.functionType = "";
      this.Person.dutyType = "";
    
    },
    //定义方法，进行请求接口调用
    //人员设置列表
    updatePerson() {
         if(this.Person.personType === "2"){
        this.Person.channel = "";
        this.Person.channelName = "";
        this.Person.lab = "";
        this.Person.labName = "";
      }
      person.updatePerson(this.Person).then((res) => {
        console.log("人员更新")
        console.log(res)
        if (res.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.$router.push({
            path: "/person/list",
          });
        } else if(res.code==201) {
          this.$message({
            message: res.data,
            type: "error",
          });
        }
      });
    
    },
      getArea() {
      //获取区域列表
      common
        .getAllArea()
        .then((response) => {
          this.areaList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCity() {
      common
        .getAllCity()
        .then((response) => {
          this.cityList = response.data;
        })
        .catch((error) => {
          console.log(error);
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
    getLab() {
      common
        .getAllLab(getName())
        .then((response) => {
          this.labList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPerson(id) {
      person.getPerson(id).then((res) => {
        if (res.code == 200) {
          this.Person = res.data;
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    resolvedata(){
      //从区域列表中根据区域id获取到区域名字
      this.Person.areaName = this.areaList.find(
        (item) => item.areaId == this.Person.areaId
      ).areaName;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证通过
          //提交数据
          console.log(this.Person);
          this.updatePerson();
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    },
    returnForm(){
      this.$router.push("/person/list");

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>