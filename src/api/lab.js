import request from '@/utils/request'


export default {
    //根据实验室id从 lislab_user_info中获取实验室中相关排班信息
    getlislab(lab,shabi)
    {
      return request({
        url:`/admin/lab/getlislab/${lab}/${shabi}`,
        method: 'post',
        data:lab
      })
  
    },
    //根据实验室id获取实验室的相应排班信息
    getLabTime(labid)
    {
      return request({
        url:`admin/lab/getlablistSch/${labid}`,
        method:'post',
        data:labid
      })
    },
  //添加实验室排班
  savelabpaiban(cellData) {
    return request({
      url: `/admin/lab/savelabpaiban`,
      method: 'post',
      data: cellData
    })
  },
  getLabNamebyId(id){
    return request({
      url: `/admin/lab/getLabNamebyId/${id}`,
      method: 'post',
      data: id
    })

  }
}