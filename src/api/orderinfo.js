import request from '@/utils/request'

const api_name = '/admin/order'

export default {
  //订单列表
  getorderinfo(current, limit,searchObj) {
    return request({
      url: `${api_name}/getorderinfo/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  exportinfo(Obj) {
    return request({
      url: `${api_name}/exportinfo`,
      method: 'post',
      data: Obj
    })
  },
}

