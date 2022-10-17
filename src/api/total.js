import request from '@/utils/request'

export default {
   //获取所有采样点
   getTotalList(channelDay,searchObj) {
    return request({
      url: `/admin/overview/findAllView/${channelDay}`,
      method: 'post',
      data: searchObj  //使用json
    })
  },
}