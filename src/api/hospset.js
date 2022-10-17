import request from '@/utils/request'

export default {
  //采集点设置列表
  getPointList(current,limit,searchObj) {
    return request ({
      url: `admin/channel/findPageChannel/${current}/${limit}`,
      method: 'post',
      data: searchObj  //使用json
    })
  },
  //删除医院设置
  deletePoint(id) {
    return request ({
      url: `/admin/channel/${id}`,
      method: 'delete'
    })
  },
  //批量删除
  batchRemovePoint(idList) {
    return request ({
      url: `/admin/channel/batchRemove`,
      method: 'delete',
      data: idList
    })
  },
  //锁定和取消锁定
  lockPoint(id,channelStatus) {
    return request ({
      url: `/admin/channel/lockPoint/${id}/${channelStatus}`,
      method: 'put'
    })
  },
  //添加医院设置
  savePoint(classesChannelPlan) {
    return request ({
      url: `/admin/channel/savePoint`,
      method: 'post',
      data: classesChannelPlan
    })
  },
  //院设置id查询
  getPoint(id) {
    return request ({
      url: `/admin/channel/hospitalSet/getHospSet/${id}`,
      method: 'get'
    })
  },
  //修改医院设置
  updatePoint(classesChannelPlan) {
    return request ({
      url: `/admin/channel/updatePoint`,
      method: 'post',
      data: classesChannelPlan
    })
  }
}
