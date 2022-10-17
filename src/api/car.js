import request from '@/utils/request'

export default {
  //获取车辆信息
  getList(current, limit, searchObj) {
    return request({
      url: `/admin/classes-car-info/showClassesCarInfo/${current}/${limit}`,
      method: 'post',
      data: searchObj  //使用json
    })
  },
  getCarById(id){
    return request({
      url:`/admin/classes-car-info/getCarById/${id}`,
      method: 'post'
    })
  },
  saveCar(CarSet){
    return request({
      url: `/admin/classes-car-info/saveCar`,
      method: 'post',
      data: CarSet
    })
  },
  updateCar(CarSet){
    return request({
      url: `/admin/classes-car-info/updateCar`,
      method: 'post',
      data: CarSet
    })
  },
  deleteCar(id){
    return request({
      url:`/admin/classes-car-info/deleteCar/${id}`,
      method: 'post'
    })
  },
  getAllCar(){
    return request({
      url:`/admin/classes-car-info/getAllCar`,
      method:'get'
    })
  },
  getCarByCarNum(value){
    return request({
      url:`/admin/classes-car-info/getCarByCarNum/${value}`,
      method:'post',
      
    })
  },

  getAllPerson(){
    return request({
      url:`/admin/classes-car-info/getAllPerson`,
      method:'get',
    })
  },
  getPhoneByName(CarSet){
    return request({
      url:`/admin/classes-car-info/getPhoneByName`,
      method:'post',
      data:CarSet,
    })
  },

  // getPersonName(){
  //   return request({
  //     url: `admin/classes-car-info/getPersonName`,
  //     method: 'get',
  //   })
  // },





}
