import request from '@/utils/request'

export default {
  //班次设置列表
  getScheduleList(current,limit,searchObj) {
    return request ({
      url: `admin/channelsch/findPageSchedule/${current}/${limit}`,
      method: 'post',
      data: searchObj  //使用json
    })
  },
  //删除班次设置
  deleteSchedule(id) {
    return request ({
      url: `/admin/channelsch/${id}`,
      method: 'delete'
    })
  },
  //批量删除
  batchRemoveSchedule(idList) {
    return request ({
      url: `/admin/channelsch/batchRemove`,
      method: 'delete',
      data: idList
    })
  },
  //锁定和取消锁定
  lockSchedule(id,status) {
    return request ({
      url: `/admin/channelsch/lockSchedulet/${id}/${status}`,
      method: 'put'
    })
  },
  //添加班次设置
  saveSchedule(channelSchedule) {
    return request ({
      url: `/admin/channelsch/saveSchedule`,
      method: 'post',
      data: channelSchedule
    })
  },
  //班次设置id查询
  getSchedule(id) {
    return request ({
      url: `/admin/channelsch/findSchedulebyId/${id}`,
      method: 'get'
    })
  },
  //班次修改设置
  updateSchedule(channelSchedule) {
    return request ({
      url: `/admin/channelsch/updateSchedule`,
      method: 'post',
      data: channelSchedule
    })
  },
 // 获取班次名称
 getClassName(sampling_leader){
  return request({
    url: `/admin/channelsch/getClassName/${sampling_leader}`,
    method: 'get',
  })
},

}
