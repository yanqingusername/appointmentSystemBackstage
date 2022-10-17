import request from '@/utils/request'

export default {
  //获取班次信息
  getList(current, limit, searchObj) {
    return request({
      url: `/admin/route/showRoute/${current}/${limit}`,
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
  selectAllChannel(name){
    return request({
      url:`/admin/common/getAllChannel/${name}`,
      method:'get'
    })
  },
  selectAllLab(){
    return request({
      url:`/admin/common/getAllLab`,
      method:'get'
    })
  },
  saveRoute(SaveRoute){
    return request({
      url:`/admin/route/saveRoute`,
      method:'post',
      data:SaveRoute,
    })
  },
  saveSchedule(Schedule){
    return request({
      url:`/admin/route/saveSchedule`,
      method:'post',
      data:Schedule,
    })
  },
  getRouteById(id){
    return request({
      url:`/admin/route/getRouteById/${id}`,
      method: 'post'
    })
  },
  getScheduleById(id){
    return request({
      url:`/admin/route/getScheduleById/${id}`,
      method: 'post'
    })
  },
  deleteRouteById(id){
    return request({
      url:`/admin/route/deleteRouteById/${id}`,
      method:'post'
    })
  },
  getAllRoute(){
    return request({
      url:`/admin/route/getAllRoute`,
      method:'get'
    })
  },
  getScheduleTimeById(id){
    return request({
      url:`/admin/route/getScheduleTimeById/${id}`,
      method:'post'
    })
  },



 
}
