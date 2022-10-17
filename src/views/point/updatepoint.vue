<template>
  <el-form
    :inline="true"
    :model="LisChannel"
    ref="LisChannel"
    :rules="rules"
    label-width="180px"
  >
    <el-form-item label="采样点名称" prop="channelName">
      <el-input
        v-model="LisChannel.channelName"
        placeholder="请填写采样点名称"
      ></el-input>
    </el-form-item>
    <div>
      <el-form-item label="采样点性质" prop="pointnature">
        <el-select
          v-model="LisChannel.pointnature"
          placeholder="请选择采样点性质"
          @change="changeIsShowa"
        >
          <el-option label="自营" value="0"></el-option>
          <el-option label="合作" value="1"></el-option>
          <el-option label="第三方" value="2"></el-option>
        </el-select>
      </el-form-item>
    </div>
    <div>
      <el-form-item label="采样点所在地区" prop="cityId">
        <el-select
          filterable
          v-model="LisChannel.cityId"
          placeholder="请选择所在市"
        >
          <el-option
            v-for="item in cityList"
            :key="item.cityId"
            :label="item.cityName"
            :value="item.cityId"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="areaId">
        <el-select
          filterable
          v-model="LisChannel.areaId"
          placeholder="请选择所在区"
        >
          <el-option
            v-for="item in areaList"
            :key="item.areaId"
            :label="item.areaName"
            :value="item.areaId"
          />
        </el-select>
      </el-form-item>
    </div>
    <div>
      <el-form-item label="采样点所在街区">
        <el-select
          filterable
          v-model="LisChannel.streetName"
          placeholder="请选择所在街道"
        >
          <el-option
            v-for="item in CommunityList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="LisChannel.community"
          placeholder="请填写所在社区"
        ></el-input>
      </el-form-item>
    </div>
    <div v-show="showaa">
      <el-form-item
        label="详细地址"
        prop="siteDescription"
        placeholder="请输入详细地址"
      >
        <el-input
          v-model="LisChannel.siteDescription"
          placeholder="请输入详细地址"
        ></el-input>
      </el-form-item>
      <div>
        <el-form-item label="纬度" prop="latitude">
          <el-input
            v-model="LisChannel.latitude"
            style="margin-left: 10px; width: 100px"
            placeholder="纬度"
          ></el-input>
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input
            v-model="LisChannel.longitude"
            style="width: 100px"
            placeholder="经度"
          ></el-input>
          <el-link
            type="primary"
            href="https://lbs.qq.com/getPoint/"
            target="_blank"
          >
            如何查看经纬度</el-link
          >
        </el-form-item>
      </div>
    </div>
    <div v-show="showbb">
      <el-form-item label="详细地址" placeholder="请输入详细地址">
        <el-input
          v-model="LisChannel.siteDescription"
          placeholder="请输入详细地址"
        ></el-input>
      </el-form-item>
      <div>
        <el-form-item label="纬度">
          <el-input
            v-model="LisChannel.latitude"
            style="margin-left: 10px; width: 100px"
            placeholder="纬度"
          ></el-input>
        </el-form-item>
        <el-form-item label="经度">
          <el-input
            v-model="LisChannel.longitude"
            style="width: 100px"
            placeholder="经度"
          ></el-input>
          <el-link
            type="primary"
            href="https://lbs.qq.com/getPoint/"
            target="_blank"
          >
            如何查看经纬度</el-link
          >
        </el-form-item>
      </div>
    </div>
    <el-form-item label="营业时间" label-width="180px" required>
      <div
        v-for="(item, index) in arrayData"
        :key="index"
        style="display: flex; align-items: center"
      >
        <el-form-item>
          <el-time-select
            placeholder="起始时间"
            v-model="item.time_start"
            value-format="HH:mm"
            :picker-options="{
              start: '00:00',
              step: '00:30',
              end: '24:00',
            }"
          >
          </el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="item.time_end"
            value-format="HH:mm"
            :picker-options="{
              start: '00:00',
              step: '00:30',
              end: '24:00',
            }"
          >
          </el-time-select>
        </el-form-item>
        <i
          class="el-icon-remove-outline"
          style="color: red; font-size: 20px; margin: 0 5px"
          @click="deletes(item, index)"
        ></i>
      </div>
      <span
        style="color: #3d7fff; cursor: pointer"
        @click="add"
        @change="$forceUpdate()"
        >+ 添加营业时间</span
      >
    </el-form-item>
<div>
    <el-form-item label="选择付款类型" prop="sourceInfo">
      <el-select
        v-model="LisChannel.sourceInfo"
        placeholder="请选择付款类型"
        multiple
      >
        <el-option
          v-for="item in sourceList"
          :key="item.id"
          :label="item.sourceName + '(' + item.defaultAmount + '元/次)'"
          :value="item.id + ''"
        >
        </el-option>
      </el-select>
    </el-form-item>
</div>
    <!-- <div v-show="showbb">
              <el-form-item label="选择付款类型" >
                <el-select
                  v-model="LisChannel.sourceInfo"
                  placeholder="请选择付款类型"
                  multiple
                >
                  <el-option
                    v-for="item in sourceList"
                    :key="item.id"
                    :label="item.sourceName+'('+item.defaultAmount+ '元/次)'"
                    :value="item.id+''"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              </div> -->
    <el-form-item label="免费检测" prop="isBigScreen">
      <el-select v-model="LisChannel.isBigScreen" placeholder="请选择">
        <el-option label="是" value="1"></el-option>
        <el-option label="否" value="0"></el-option>
      </el-select>
      <el-link type="info" target="_blank"> 承接大筛或常态化检测选“是”</el-link>
    </el-form-item>
    <el-form :inline="true" style="margin-left: 110px">
      <el-form-item label="是否在小程序上线">
        <el-switch
          v-model="LisChannel.fixedSamplingPoint"
          active-value="1"
          inactive-value="0"
          >></el-switch
        >
      </el-form-item>
      <el-form-item label="是否开通H5支付">
        <el-switch
          v-model="LisChannel.supportCoyoteWxPay"
          active-value="1"
          inactive-value="0"
          >></el-switch
        >
      </el-form-item>
      <div>
        <el-form-item
          v-if="LisChannel.supportCoyoteWxPay == '1'"
          label="微信支付链接"
        >
          <p>{{ LisChannel.h5paylink }}</p>
          <el-link type="info" target="_blank">
            自制二维码请百度“草科二维码”
          </el-link>
        </el-form-item>
      </div>
       <el-form-item label="是否上线支付宝小程序">
                <el-switch
                  v-model="LisChannel.zfbSamplingPoint"
                  active-value="1"
                  inactive-value="0"
                  >></el-switch
                >
              </el-form-item>
    </el-form>

    <el-form-item label="小程序付费检测类型" prop="paytype">
      <el-select
        v-model="LisChannel.paytype"
        filterable
        placeholder="请选择检测类型"
        multiple
      >
        <el-option
          v-for="item in payList"
          :key="item.id"
          :label="item.text + '(' + item.money + '元/次)'"
          :value="item.text"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <!-- <div v-show="showbb">
              <el-form-item label="小程序付费检测类型" prop="paytype">
                <el-select
                  v-model="LisChannel.paytype"
                  filterable
                  placeholder="请选择检测类型"
                  multiple
                >
                  <el-option
                    v-for="item in payList"
                    :key="item.id"
                    :label="item.text + '(' + item.money + '元/次)'"
                    :value="item.text"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div> -->
    <div>
      <el-form-item label="运营标签">
        <el-checkbox-group v-model="LisChannel.tag">
          <el-checkbox label="24小时营业" name="tag"></el-checkbox>
          <el-checkbox label="机场火车站" name="tag"></el-checkbox>
          <el-checkbox label="排队人少" name="tag"></el-checkbox>
          <el-checkbox label="停车方便" name="tag"></el-checkbox>
          <el-checkbox label="靠近商圈" name="tag"></el-checkbox>
          <el-checkbox label="无午休" name="tag"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </div>
    <el-form-item label="开启限流预约">
      <el-switch
        v-model="LisChannel.appointmentOpen"
        active-value="1"
        inactive-value="0"
        @change="changeIsShow"
        >></el-switch
      >
    </el-form-item>
    <div v-if="showall">
      <el-form-item label="预约周期" prop="appointmentDay">
        <el-select
          v-model="LisChannel.appointmentDay"
          placeholder="请选择预约周期"
        >
          <el-option label="1天" value="1"></el-option>
          <el-option label="2天" value="2"></el-option>
          <el-option label="3天" value="3"></el-option>
          <el-option label="4天" value="4"></el-option>
          <el-option label="5天" value="5"></el-option>
          <el-option label="6天" value="6"></el-option>
          <el-option label="7天" value="7"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间范围" required>
        <el-col :span="11">
          <el-form-item prop="classes_time_start">
            <el-time-select
              placeholder="起始时间"
              v-model="LisChannel.classes_time_start"
              value-format="HH:mm"
              :picker-options="{
                start: '00:00',
                step: '00:30:',
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
              v-model="LisChannel.classes_time_end"
              value-format="HH:mm"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '24:00',
              }"
            >
            </el-time-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="每小时上限人数" prop="appointmentSum">
        <el-input
          v-model="LisChannel.appointmentSum"
          placeholder="请输入上限人数"
        ></el-input>
      </el-form-item>
    </div>
    <div>
      <el-form-item label="负责站长" prop="samplingLeader">
        <el-select
          v-model="LisChannel.samplingLeader"
          filterable
          placeholder="请选择负责站长"
          @change="getsamplingPhone()"
        >
          <el-option
            v-for="item in LeaderList"
            clearable
            :key="item.id"
            :label="item.personName"
            :value="item.personName"
          />
        </el-select>
        <el-link type="info" target="_blank">
          如果找不到自己的名字，左上角【人员管理】里去添加
        </el-link>
      </el-form-item>
      <el-form-item label="负责站长联系电话" prop="samplingPhone">
        <el-input
          :disabled="true"
          placeholder="请输入负责站长电话"
          v-model="LisChannel.samplingPhone"
        ></el-input>
      </el-form-item>
    </div>
    <el-form-item label="业务负责人">
      <el-input
        v-model="LisChannel.businessLeader"
        placeholder="请输入业务负责人"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="业务负责人电话">
      <el-input
        v-model="LisChannel.businessPhone"
        placeholder="请输入负责人电话"
      ></el-input>
    </el-form-item>
    <div>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="LisChannel.remarks"
          :autosize="{ minRows: 6, maxRows: 8 }"
          maxlength="50"
          show-word-limit
        >
        </el-input>
      </el-form-item>
    </div>
    <div>
      <el-button
        style="margin-left: 50px"
        type="primary"
        @click="submitForm('LisChannel')"
        >提交</el-button
      >
      <el-button @click="returnForm('LisChannel')">取消</el-button>
    </div>
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
import point from "@/api/point";
import common from "@/api/common";
import { getName } from "@/utils/auth"; // 验权

export default {
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
    var validatePass1 = (rule, value, callback) => {
      if (this.LisChannel.pointnature === "0" && value === "") {
        callback(new Error("请输入纬度"));
      } else {
        // if (this.LisChannel.siteDescription !== '') {
        //   this.$refs.LisChannel.validateField('siteDescription');
        // }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (this.LisChannel.pointnature === "0" && value === "") {
        callback(new Error("请输入经度"));
      } else {
        // if (this.LisChannel.siteDescription !== '') {
        //   this.$refs.LisChannel.validateField('siteDescription');
        // }
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (this.LisChannel.pointnature === "0" && value === "") {
        callback(new Error("请输入所在市"));
      } else {
        // if (this.LisChannel.siteDescription !== '') {
        //   this.$refs.LisChannel.validateField('siteDescription');
        // }
        callback();
      }
    };
    var validatePass4 = (rule, value, callback) => {
      if (this.LisChannel.pointnature === "0" && value === "") {
        callback(new Error("请输入所在区"));
      } else {
        // if (this.LisChannel.siteDescription !== '') {
        //   this.$refs.LisChannel.validateField('siteDescription');
        // }
        callback();
      }
    };
    var validatePass5 = (rule, value, callback) => {
      if (this.LisChannel.pointnature === "0" && value === "") {
        callback(new Error("请输入营业时间"));
      } else {
        // if (this.LisChannel.siteDescription !== '') {
        //   this.$refs.LisChannel.validateField('siteDescription');
        // }
        callback();
      }
    };
    var validatePass6 = (rule, value, callback) => {
      if (this.LisChannel.fixedSamplingPoint === "1" && value === "") {
        callback(new Error("请输入小程序付款类型"));
      } else if (this.LisChannel.supportCoyoteWxPay === "1" && value === "") {
        callback(new Error("请输入小程序付款类型"));
      } else {
        callback();
      }
    };
    return {
      arrayData: [
        {
          time_start: "",
          time_end: "",
        },
      ],

      useTime: [],
      showall: false,
      showaa: false,
      showbb: true,
      labList: [],
      CommunityList: [],
      LisChannel: {
        roleId: "",
        shelterId: "",
        channelName: "",
        cityId: "",
        remarks: "",
        cityName: "",
        areaId: "",
        samplingPlace: "",
        siteDescription: "",
        samplingLeader: "",
        samplingPhone: "",
        longitude: "",
        latitude: "",
        appointmentOpen: "",
        appointmentTime: "",
        appointmentSum: "",
        appointmentDay: "",
        h5paylink: "",
        tag: [],
        paytype: [],
        sourceInfo: [],
        fixedSamplingPoint: "",
        supportCoyoteWxPay: "",
        zfbSamplingPoint: "",
        businessLeader: "",
        businessPhone: "",
        createPerson: "",
        startTime: "",
        endTime: "",
        sbusinessTime: "",
        xbusinessTime: "",
        pointnature: "",
        streetName: "",
        community: "",
        isBigScreen: "",
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
        cityId: [{ validator: validatePass3, trigger: "blur" }],
        areaId: [{ validator: validatePass4, trigger: "blur" }],
        streetName: [
          { required: true, message: "请选择所在街道", trigger: "change" },
        ],
        pointnature: [
          { required: true, message: "请选择采样点性质", trigger: "change" },
        ],

        samplingPlace: [
          { required: true, message: "请输入所在地址", trigger: "blur" },
        ],
        siteDescription: [{ validator: validatePass, trigger: "blur" }],
        samplingLeader: [
          { required: true, message: "请输入负责人", trigger: "change" },
        ],
        samplingPhone: [
          { required: true, message: "请输入负责人电话", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11位", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        shelterId: [
          { required: true, message: "请选择送检实验室", trigger: "blur" },
        ],
        longitude: [{ validator: validatePass1, trigger: "blur" }],
        latitude: [{ validator: validatePass2, trigger: "blur" }],
        appointmentOpen: [
          { required: false, message: "请选择是否预约", trigger: "change" },
        ],
        appointmentTime: [
          { required: true, message: "请选择预约时间", trigger: "blur" },
        ],
        classes_time_start: [
          { required: true, message: "请输入起始时间", trigger: "blur" },
        ],
        classes_time_end: [
          { required: true, message: "请输入结束时间", trigger: "blur" },
        ],
        time_start: [
          { required: true, message: "请输入起始时间", trigger: "change" },
        ],
        time_end: [
          { required: true, message: "请输入结束时间", trigger: "change" },
        ],
        appointmentSum: [
          { required: true, message: "请输入预约量", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              if (/^[1-9]\d*$/i.test(value) == false) {
                callback(new Error("请输入大于0的正整数"));
              } else {
                //校验通过
                callback();
              }
            },
          },
        ],
        appointmentDay: [
          { required: true, message: "请输入预约天数", trigger: "blur" },
        ],
        businessTime: [
          { required: true, message: "请输入营业时间", trigger: "blur" },
        ],
        paytype: [
          { required: true, message: "请选择支付方式", trigger: "blur" },
        ],
        sourceInfo: [
          { required: true, message: "请选择来源", trigger: "change" },
        ],
        businessLeader: [
          { required: true, message: "请输入负责人", trigger: "change" },
        ],
        businessPhone: [
          { required: true, message: "请输入负责人电话", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11位", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
      },
      channelList: [],
      areaList: [],
      cityList: [],
      LeaderList: [],
      payList: [],
      sourceList: [],
      payAll: [],
      sourceAll: [],
    };
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      this.getPoint(id);
    } else {
      //表单数据清空
      this.LisChannel = {};
    }
    this.getChannel();
    this.getArea();
    this.getCity();
    this.getpaytype();
    this.getsource();
    this.getLeader();
    this.getLab();
    this.getCommunity();
  },
  methods: {
    add() {
      if (this.arrayData.length <= 1) {
        this.arrayData.push({
          time_start: "",
          time_end: "",
        });
      } else {
        this.$message({
          message: "最多只能添加两个营业时间",
          type: "warning",
        });
      }
    },
    deletes(item, index) {
      if (this.arrayData.length <= 1) {
        ///如果只有一个框则不可以删除
        return false;
      }
      this.arrayData.splice(index, 1); //删除数组中对应的数据也就是将这个位置的框删除
    },
    getsamplingPhone() {
      common.getPhone(this.LisChannel.samplingLeader).then((res) => {
        this.LisChannel.samplingPhone = res.data.personPhone;
      });
    },
    getLab() {
      common
        .getAllLab()
        .then((response) => {
          this.labList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeIsShowa: function () {
      if (this.LisChannel.pointnature == "0") {
        this.showaa = true;
        this.showbb = false;
      } else {
        this.showaa = false;
        this.showbb = true;
      }
    },
    returnForm() {
      this.$router.push("/point/point");
    },
    //根据添加时是否预约时默认显示
    xianshi() {
      if (this.LisChannel.appointmentOpen == 1) {
        console.log("总数据" + this.LisChannel);
        // console.log("总数据"+this.LisChannel)
        // console.log("预约时间"+this.LisChannel.appointmentOpen)
        this.showall = true;
      } else {
        // console.log("预约时间"+this.LisChannel.appointmentOpen)
        this.showall = false;
      }
    },
    //修改
    update() {
      this.formData.endTime = this.useTime[1];
      this.formData.startTime = this.useTime[0];
      if (this.LisChannel.tag) {
        this.formData.tag = this.LisChannel.tag.toString();
      }
      point.updatePoint(this.formData).then((response) => {
        if (response.code == 200) {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          //跳转列表页面，使用路由跳转方式实现
          this.$router.push({ path: "/point/point" });
        } else if (response.code == 201) {
          this.$message({
            type: "error",
            message: response.data,
          });
        }
      });
    },
    getPoint(id) {
      point.getPoint(id).then((res) => {
        if (res.code == 200) {
          this.LisChannel = res.data;
          console.log("---->:", this.LisChannel);
          // this.useTime.push(this.LisChannel.startTime);
          // this.useTime.push(this.LisChannel.endTime);
          if (this.LisChannel.pointnature != null) {
            this.LisChannel.pointnature = this.LisChannel.pointnature + "";
          }
          if (this.LisChannel.isBigScreen != null) {
            this.LisChannel.isBigScreen = this.LisChannel.isBigScreen + "";
            console.log("---->:", this.LisChannel.isBigScreen);
          }
          if (this.LisChannel.tag != null) {
            this.LisChannel.tag = this.LisChannel.tag.split(",");
          } else {
            this.LisChannel.tag = [];
          }
          //console.log("数据为"+this.LisChannel);
          this.$set(this.LisChannel, "time_start", this.LisChannel.time_start);
          this.$set(this.LisChannel, "time_end", this.LisChannel.time_end);
          this.$set(
            this.LisChannel,
            "classes_time_end",
            this.LisChannel.classes_time_end
          );
          this.$set(
            this.LisChannel,
            "classes_time_start",
            this.LisChannel.classes_time_start
          );
          // this.$set(this.useTime , 0 ,this.LisChannel.startTime);
          // this.$set(this.useTime , 1 , this.LisChannel.endTime);
          this.xianshi();
          this.resolveData1();
        } else {
          this.$message({
            message: res.msg,
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
    getCommunity() {
      common
        .getAllCommunity()
        .then((response) => {
          this.CommunityList = response.data;
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
    getLeader() {
      common
        .getAllLeader()
        .then((response) => {
          this.LeaderList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getpaytype() {
      common
        .getAllpaytype()
        .then((response) => {
          console.log(response);
          this.payList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getsource() {
      common
        .getAllsource()
        .then((response) => {
          this.sourceList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeIsShow: function () {
      this.showall = !this.showall;
      console.log(this.showall);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.LisChannel.pointnature == "0" && this.arrayData.length > 0) {
            console.log("执行1");
            this.resolveData2();
            this.update();
          } else if (
            this.LisChannel.pointnature == "0" &&
            this.arrayData.length == 0
          ) {
            console.log("执行2");
            const h = this.$createElement;
            this.$message({
              message: h("p", null, [
                h("span", null, "请填写营业时间 "),
                h("i", { style: "color: teal" }),
              ]),
            });
          } else if (this.LisChannel.pointnature != "0") {
            console.log("执行3");
            this.resolveData2();
            this.update();
          }
          //表单验证通过
          //提交数据
        } else {
          const h = this.$createElement;
          this.$message({
            message: h("p", null, [
              h("span", null, "请填写必填字段 "),
              h("i", { style: "color: teal" }),
            ]),
          });
        }
      });
    },
    resolveData1() {
      //如果数据存在，则拆分
      console.log("执行科++++++++++++");
      if (this.LisChannel.paytype) {
        this.LisChannel.paytype = this.LisChannel.paytype.split(",");
        console.log("转换之前的" + this.LisChannel.paytype);
        //      this.LisChannel.paytype = this.LisChannel.paytype.map((item) => {
        //   return Number(item);
        // });
      }
      if (this.LisChannel.sourceInfo) {
        this.LisChannel.sourceInfo = this.LisChannel.sourceInfo.split(",");
        //  this.LisChannel.sourceInfo = this.LisChannel.sourceInfo.map((item) => {
        // return Number(item)});
        console.log("转换之后的" + this.LisChannel.sourceInfo);
      }
      if (this.LisChannel.sbusinessTime) {
        //json格式化
        this.arrayData = JSON.parse(
          this.LisChannel.sbusinessTime.replace("/", "")
        );
      }

      //拼接时间sourceInfo
      // this.LisChannel.time_start = this.LisChannel.businessTime.split("-")[0];
      // this.LisChannel.time_end = this.LisChannel.businessTime.split("-")[1];
      if (this.LisChannel.appointmentOpen == 1) {
        this.LisChannel.classes_time_start = this.LisChannel.appointmentTime
          .split("-")[0]
          .slice(0, 5);
        this.LisChannel.classes_time_end = this.LisChannel.appointmentTime
          .split("-")[1]
          .slice(0, 5);
      }
    },
    resolveData2() {
      //转换字符串
      this.LisChannel.xbusinessTime = JSON.stringify(this.arrayData);
      //this.LisChannel.businessTime = JSON.stringify(this.arrayData);
      this.formData = JSON.parse(JSON.stringify(this.LisChannel));
      if (this.formData.paytype != null && this.formData.paytype.length > 0) {
        this.formData.paytype = this.LisChannel.paytype.join(",");
      } else {
        this.formData.paytype = "";
      }
      if (
        this.formData.sourceInfo != null &&
        this.formData.sourceInfo.length > 0
      ) {
        this.formData.sourceInfo = this.LisChannel.sourceInfo.join(",");
      } else {
        this.formData.sourceInfo = "";
      }
      //拼接时间
      if (this.LisChannel.appointmentOpen == 1) {
        this.formData.appointmentTime =
          this.LisChannel.classes_time_start +
          ":00" +
          "-" +
          this.LisChannel.classes_time_end +
          ":00";
        this.formData.appointmentTime.toString();
      }
      if (this.formData.cityId != null && this.formData.cityId.length > 0) {
        this.formData.cityName = this.cityList.find(
          (item) => item.cityId == this.LisChannel.cityId
        ).cityName;
      }

      //根据区域id获取对应名字
      if (this.formData.areaId != null && this.formData.areaId.length > 0) {
        this.formData.samplingPlace = this.areaList.find(
          (item) => item.areaId == this.LisChannel.areaId
        ).areaName;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formData = null;
    },
  },
};
</script>