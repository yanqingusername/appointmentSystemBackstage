import request from '@/utils/request'

export default {
  //采集点设置列表
  getPointList(current,limit,searchObj) {
    return request({
      url: `/admin/channel/findPageChannel/${current}/${limit}`,
      method: 'post',
      data: searchObj  //使用json
    })
  },
  getschlist(channelId,shabi) {
    return request({
      url: `/admin/schchannel/findPageChannel/${channelId}/${shabi}`,
      method: 'post',
      data: channelId,shabi
    })
  },
  getChannelTime(channelId) {
    return request ({
      url: `/admin/schchannel/getChannelSch/${channelId}`,
      method: 'post',
      data: channelId
    })
  },
  export(TimeList){
    return request ({
      url: `/admin/schchannel/exportSch`,
      method: 'post',
      data: TimeList
    })
  },
  //添加采集点设置
  savechannelsch(cellData, channelId) {
    return request({
      url: `/admin/schchannel/saveChannelSch/${channelId}`,
      method: 'post',
      data: cellData
    })
  },
  //删除采集点设置
  deletePoint(id, isOpen) {
    return request({
      url: `/admin/channel/deletePoint/${id}/${isOpen}`,
      method: 'delete'
    })
  },
  //修改设置采集点
  updatePoint(LisChannel) {
    return request({
      url: `/admin/channel/updatePoint`,
      method: 'post',
      data: LisChannel
    })
  },
  //添加采集点设置
  savePoint(LisChannel) {
    return request({
      url: `/admin/channel/savePoint`,
      method: 'post',
      data: LisChannel
    })
  },
  getChannelName(channelId) {
    return request({
      url: `/admin/schchannel/getName/${channelId}`,
      method: 'post',
      data: channelId
    })
  },
  getPoint(id) {
    return request({
      url: `/admin/channel/findPointById/${id}`,
      method: 'get'
    })
  },
  //添加班次
  saveSchedule(channelSchedule) {
    return request({
      url: `/admin/channelsch/saveSchedule`,
      method: 'post',
      data: channelSchedule
    })
  },

  //修改班次
  updateSch(channelSchedule) {
    return request({
      url: `/admin/channelsch/updateSchedule`,
      method: 'post',
      data: channelSchedule
    })
  },

  //
  updatebyvalue(id,endTime)
  {
    return request({
      url: `/admin/channel/updatebyvalue/${id}/${endTime}`,
      method:'post',
      data:id,endTime
    })
  }
}
