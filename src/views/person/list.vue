<template>
  <div class="app-container">
    <el-form
      :inline="true"
      class="demo-form-inline"
      ref="searchObj"
      :model="searchObj"
      :rules="rules1"
      label-position="left"
      
    >
      <el-form-item label="姓名" prop="personName" style="margin-left:27px">
        <el-input v-model="searchObj.personName" placeholder="请输入姓名" style="width: 222px"/>
      </el-form-item>
      <el-form-item label="手机号" prop="personPhone" style="margin-left:12px">
        <el-input
          v-model="searchObj.personPhone"
          placeholder="请输入电话号码"
          style="width: 222px"
        />
      </el-form-item>
      <el-form-item label="部门" prop="personType" style="margin-left:12px">
        <el-select v-model="searchObj.personType" clearable filterable placeholder="全部">
          <el-option label="采样点" value="0"></el-option>
          <el-option label="检测中心" value="1"></el-option>
          <el-option label="运输" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="检测中心" prop="lab">
        <el-select v-model="searchObj.lab" filterable clearable placeholder="全部">
          <el-option
            v-for="item in labList"
            :key="item.id"
            :label="item.realName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    <!-- </el-form>
    <el-form > -->
      <el-form-item  prop="dutyType" label="责任角色">
        <el-select v-model="searchObj.dutyType" filterable clearable placeholder="全部">
          <el-option label="采样点:组长" value="0"></el-option>
          <el-option label="采样点:站长" value="1"></el-option>
          <el-option label="采样点:运营经理" value="2"></el-option>
          <el-option label="运输:负责人" value="3"></el-option>
          <el-option label="检测中心:班长" value="4"></el-option>
          <el-option label="检测中心:负责人" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职责" prop="functionType" style="margin-left:25px">
        <el-select v-model="searchObj.functionType" filterable clearable placeholder="全部">
          <el-option label="采样点:护士" value="0"></el-option>
          <el-option label="采样点:登记" value="1"></el-option>
          <el-option label="采样点:样本转运" value="2"></el-option>
          <el-option label="采样点:外围" value="3"></el-option>
          <el-option label="运输样本司机" value="4"></el-option>
          <el-option label="检测中心:试剂配置" value="5"></el-option>
          <el-option label="检测中心:样本制备" value="6"></el-option>
          <el-option label="检测中心:扩增" value="7"></el-option>
          <el-option label="检测中心:样本接收" value="8"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采样点" prop="channel">
        <el-select v-model="searchObj.channel" filterable clearable placeholder="全部">
          <el-option
            v-for="item in channelList"
            :key="item.id"
            :label="item.channelName"
            :value="item.channelId"
          />
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()" style="margin-left:40px"
        >查询</el-button>
      <el-button
        type="default"
        @click="reset('searchObj')"
        >清空条件</el-button
      >
      <!-- <el-button type="primary" icon="el-icon-search" @click="getpage()"
        >查询</el-button> -->
    </el-form>
    <div>
      <el-form :inline="true">
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            @click="dialogFormVisible = true"
            >添加人员</el-button
          >
          <a href="http://xmr.coyotebio-lab.com:8201/admin/person/exportPerson" target="_blank">
           <!-- <a href="http://localhost:8201/admin/person/exportPerson" target="_blank"> -->
                    <!-- <el-button type="primary" size="small"><i class="fa fa-plus"/> 导出</el-button> -->
                </a>
                <el-button type="primary" size="small" @click="importData"><i class="fa fa-plus"/> 导入</el-button>
                <!-- <el-link  target="_blank" @click="downTemplate()">下载导入模板</el-link> -->
                 <a href='static/renyuan.xlsx'><font style='color:blue;'>人员导入模板 </font></a>
        </el-form-item>
          <!-- <div class="el-toolbar">
            <div class="el-toolbar-body" style="justify-content: flex-start;">
                <a href="http://localhost:8202/admin/cmn/dict/exportData" target="_blank">
                    <el-button type="text"><i class="fa fa-plus"/> 导出</el-button>
                </a>
            </div>
        </div> -->
        <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
            <el-form label-position="right" label-width="170px">
            <el-form-item label="文件">
            <el-upload
            class="upload-demo"
            ref="upload"
            :data="uploadData"
            name="excelFile"
            :file-list="fileList"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
             :on-error="uploadFalse"
            :on-success="uploadSuccess"
            :auto-upload="false"
            :before-upload="beforeAvatarUpload"
            :action="uploadUrl()"
            >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">导入</el-button>
          <div slot="tip" class="el-upload__tip">只能上传后缀名为.xlsx和.xls的文件</div>
            </el-upload>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="cancelupload">
                取消
            </el-button>
            </div>
        </el-dialog>
        <el-dialog
          title="添加人员"
          :visible.sync="dialogFormVisible"
          style="width: 120%"
        >
          <el-form
            :model="Person"
            ref="Person"
            label-width="120px"
            :rules="rules"
            label-position="right"
            
          >
            <el-form-item label="姓名" prop="personName">
              <el-input v-model="Person.personName" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="personPhone" >
              <el-input v-model="Person.personPhone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="居住地区" prop="areaName">
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
              <el-form-item  v-if="Person.personType === '0'" label="责任角色" prop="dutyType">
                <el-select
                @input="$forceUpdate()"
                  v-model="Person.dutyType"
                  placeholder="请选择角色"
                >
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item  v-if="Person.personType === '1'" label="责任角色" prop="dutyType">
                <el-select
                @input="$forceUpdate()"
                  v-model="Person.dutyType"
                  placeholder="请选择角色"
                >
                  <el-option
                    v-for="item in options5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item  v-if="Person.personType === '2'" label="责任角色" prop="dutyType">
                <el-select
                @input="$forceUpdate()"
                  v-model="Person.dutyType"
                  placeholder="请选择角色"
                >
                  <el-option
                    v-for="item in options6"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
             <el-form-item v-if="Person.personType === '0'" label="职责" prop="functionType">
                <el-select v-model="Person.functionType" placeholder="请选择职责" @input="$forceUpdate()">
                     <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="Person.personType === '1'" label="职责" prop="functionType">
                <el-select v-model="Person.functionType" placeholder="请选择职责" @input="$forceUpdate()">
                     <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="Person.personType === '2'" label="职责" prop="functionType">
                <el-select v-model="Person.functionType" placeholder="请选择职责" @input="$forceUpdate()">
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
             v-if="Person.personType == '0' && Person.functionType != '9'"
              label="所属采样点"
              prop="channel"
            >
              <el-select
                filterable 
                clearable
                v-model="Person.channel"         
                @input="$forceUpdate()"
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
              @input="$forceUpdate()"
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
            <el-form-item label="创建人" v-if="show==true" >
              <el-input v-model="this.createName" :disabled="true"></el-input>
            </el-form-item >
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('Person')">取 消</el-button>
            <el-button type="primary" @click="submitForm('Person')"
              >确 定</el-button
            >
          </div>
          <span class="span">注：带*为必填项</span>
        </el-dialog>
      </el-form>
    </div>
    <el-table :data="list" stripe style="width: 100%">
      <!-- <el-table-column type="index" width="50" label="序号"/> -->
      <el-table-column prop="personName" label="姓名" />
      <el-table-column prop="personPhone" label="手机号" />
      <el-table-column prop="personType" label="所属部门">
        <template slot-scope="scope">
          <p v-if="scope.row.personType == '0'">采样点</p>
          <p v-if="scope.row.personType == '1'">检测中心</p>
          <p v-if="scope.row.personType == '2'">运输</p>
        </template>
      </el-table-column>
      <el-table-column prop="functionType" label="职责">
        <template slot-scope="scope">
          <p v-if="scope.row.functionType == '0'">采样点:护士</p>
          <p v-if="scope.row.functionType == '1'">采样点:登记</p>
          <p v-if="scope.row.functionType == '2'">采样点:样本转运</p>
          <p v-if="scope.row.functionType == '3'">采样点:外围</p>
          <p v-if="scope.row.functionType == '4'">运输样本司机</p>
          <p v-if="scope.row.functionType == '5'">检测中心:试剂配置</p>
          <p v-if="scope.row.functionType == '6'">检测中心:样本制备</p>
          <p v-if="scope.row.functionType == '7'">检测中心:扩增</p>
          <p v-if="scope.row.functionType == '8'">检测中心:样本接收</p>
           <p v-if="scope.row.functionType == '9'">采样点:站长</p>
        </template>
      </el-table-column>
      <el-table-column prop="dutyType" label="责任角色">
        <template slot-scope="scope">
          <p v-if="scope.row.dutyType == '0'">采样点:组长</p>
          <p v-if="scope.row.dutyType == '1'">采样点:站长</p>
          <p v-if="scope.row.dutyType == '2'">采样点:运营经理</p>
          <p v-if="scope.row.dutyType == '3'">运输:负责人</p>
          <p v-if="scope.row.dutyType == '4'">检测中心:班长</p>
          <p v-if="scope.row.dutyType == '5'">检测中心:负责人</p>
        </template>
      </el-table-column>
      <el-table-column prop="areaName" label="居住地区" />
      <el-table-column prop="createPerson" label="创建人" />
      <el-table-column prop="createTime" :formatter="dateFormat" label="创建时间" />
      <el-table-column label="操作" width="200px" align="center">
        <template slot-scope="scope">
          <router-link :to="'/person/update/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deletePerson(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>
<script>
//引入接口定义的js文件
import person from "@/api/person";
import common from "@/api/common";
import moment from 'moment'
import { getName } from '@/utils/auth' 
export default {
  //定义变量和初始值
  data() {
    return {
      show:"true",
      current: 0, //当前页
      limit: 8, //每页显示记录数
      searchObj: {
        createName:"",  //获取当前登录人的名字
        personName: "",
        personPhone: "",
        personType: "",
        functionType: "",
        dutyType: "",
        channel: "",
        lab: ""
      }, //条件封装对象
       options1: [
        {value: "0",label: "护士"},
        {value: "1",label: "登记"},
        {value: "2",label: "样本转运"},
        {value: "3",label: "外围"},
        {value: "9",label: "站长"}],
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
      list: [], //每页数据集合
      total: 0, //总记录数
      dialogImportVisible: false, //导入弹窗
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
      }, //人员实体类
      dialogFormVisible: false, //弹出窗口
      areaList: [], //区域列表
      labList: [],
      formData:null,
      channelList: [],
      areanameList: [],
      cityList: [],
      citynameList: [],
      rules1:{
        personName:[
          { required: false, message: "请输入姓名", trigger: "blur" },
        ],
        personPhone:[
          { required: false, message: "请输入手机号", trigger: "blur" },
          { validator: this.checkPhone, trigger: "blur" }
        ],
        personType:[
          { required: false, message: "请选择人员类型", trigger: "blur" },
        ],
        functionType:[
          { required: false, message: "请选择责任角色", trigger: "blur" },
        ],
        dutyType:[
          { required: false, message: "请选择职责", trigger: "blur" },
        ],
        channel:[
          { required: false, message: "请选择通道", trigger: "blur" },
        ],
        lab:[
          { required: false, message: "请选择实验室", trigger: "blur" },
        ],
      },
      rules: {
        personName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50个字符", trigger: "blur" },
        ],
        personPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
            {validator: function(rule, value, callback) {
              if (/^(13[0-9]|14[0-9]|15[0-9]|16[6]|18[0-9]|19[6,9]|17[0-9])\d{8}$/i.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                //校验通过
                callback();
              }
            }
            },
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
        functionType: [
          { required: true, message: "请选择职责", trigger: "blur" },
        ],
        channel: [
          { required: true, message: "请选择采样点", trigger: "blur" }
        ],
        lab: [
          { required: true, message: "请选择实验室", trigger: "blur" }
          ],
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
    //在页面渲染之前执行
    //一般调用methods定义的方法，得到数据
    this.Person.createPerson=getName();
    this.getList();
    this.getArea();
    this.getLab();
    this.getChannel();
    
  },
  methods: {
    cancelupload(){
      this.dialogImportVisible = false;
       this.$refs.upload.clearFiles();
       this.getList();
    },
     uploadUrl: function() {
      return (
        "http://xmr.coyotebio-lab.com:8201/admin/person/importtest2"+"?createPerson="+this.Person.createPerson
        // "/fanxing/import/batchInsertShops" +
        // "?businessName=" +
        // this.businessName +
        // "&businessStatus=" +
        // this.businessStatus +
        // "&businessType=" +
        // this.businessType
      );
    },
    //上传成功调用
    uploadSuccess(response, file, fileList) {
      if (response.code==200) {
        this.$message({
          message: "操作成功",
          type: "success"
        });
      } else if(response.code==204) {
        this.$message({
          message: "文件导入失败，请按要求正确填写excel！",
          type: "error"
        });
      }else if(response.code==201)
      {
        this.$message({
          message: "文件导入失败，人员信息在数据库中已存在! 请检查表中信息。",
          type: "error"
        });
      }
    },
    uploadFalse(response, file, fileList) {
      alert("文件上传失败！");
    },
     // 上传前对文件的大小的判断
    beforeAvatarUpload(file) {
      const extension = file.name.split(".")[1] === "xls";
      const extension2 = file.name.split(".")[1] === "xlsx";
      const isLt2M = file.size / 1024 / 1024 < 10;
         if (!extension && !extension2) {
           alert("上传模板只能是 xls、xlsx 格式!");
          }
          if (!isLt2M) {
           console.log("上传模板大小不能超过 10MB!");
         }
        return extension|| ( extension2&& isLt2M);
    },
    submitUpload() {
        //触发组件的action
        this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
     

      console.log(file, fileList);
    },
    handlePreview(file) {
      if (file.response.status) {
        alert("此文件导入成功");
      } else {
        alert("此文件导入失败");
      }
    },
      changeFunctionType(){
      this.Person.functionType = "";
      this.Person.dutyType = "";
    },

    //定义方法，进行请求接口调用
    //人员设置列表
     dateFormat:function(row,column){ 
        var date = row[column.property]; 
        if(date == undefined){return ''}; 
        return moment(date).format("YYYY-MM-DD HH:mm:ss") 
    } ,
    importData() {
      this.dialogImportVisible = true;
    },
    
    getList(page=1) {

      //获取当前页
      this.current=page;
      person
        .getPersonList(this.current, this.limit, this.searchObj)
        .then((response) => {
          //请求成功response是接口返回数据
          //返回集合赋值list
          this.list = response.data.records;
          console.log(this.list);
          //总记录数
          this.total = response.data.total;
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
      console.log(getName());
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证通过
          //提交数据
          this.resolvedata();
          this.save();
           
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      if (this.$refs.LisChannel) {
        this.$refs.LisChannel.resetFields();
        }

      //关闭弹窗
      this.dialogFormVisible = false;
    },
    reset(formName) {
      this.$refs[formName].resetFields();
      this.getList();
    },
    resolvedata(){
        this.Person.areaId = this.areaList.find(
        (item) => item.areaName == this.Person.areaName
      ).areaId;
    },
    //添加
    save() {
      person.savePerson(this.Person).then((response) => {
        console.log(response)
        if(response.code==200)
        {
           this.$message({
          type: "success",
          message: "添加成功!",
        }); 
        this.dialogFormVisible = false;
        //this.Person={};
        if (this.$refs.Person) {
        this.$refs.Person.resetFields();
        }
        this.getList();
        }else if(response.code==201)
        {
           this.$message({
          type: "error",
          message:response.data,
        }); 
        }
          
        
        //跳转列表页面，使用路由跳转方式实现
        // this.$router.push({ path: "/person/list" });
      })
    
    },
    //修改
    update() {
      person.updatePerson(this.Person).then((response) => {
        //提示
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        //跳转列表页面，使用路由跳转方式实现
        this.$router.push({ path: "/person/list" });
      });
    },
    //删除
    deletePerson(id) {
      this.$confirm('确认删除该员工信息', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        })
          .then(() => {
            person.deletePerson(id).then((response) => {
        //刷新
        this.getList(this.current); 
      });        
            this.$message({
              type: 'success',
              message: '删除成功'
            });
          })

      
    },
  },
};
</script>
<style scoped>
.span{
    color:rgb(255, 0, 0);
    font-weight:bold;
    font-size: 12px;
}
</style>