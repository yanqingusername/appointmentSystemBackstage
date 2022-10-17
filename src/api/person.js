import request from '@/utils/request'

export default {
  //人员设置列表
  getPersonList(current,limit,searchObj) {
    return request ({
      url: `/admin/person/findPagePerson/${current}/${limit}`,
      method: 'post',
      data: searchObj  //使用json
    })
  },
  getPerson(id) {
    return request ({
      url: `/admin/person/findPersonById/${id}`,
      method: 'get'
    })
  },
  //删除人员设置
  deletePerson(id) {
    return request ({
      url: `/admin/person/deletePerson/${id}`,
      method: 'delete'
    })
  },
  //添加班次设置
  savePerson(Person) {
    return request ({
      url: `/admin/person/savePerson`,
      method: 'post',
      data: Person
    })
  },
  //人员修改设置
  updatePerson(Person) {
    return request ({
      url: `/admin/person/updatePerson`,
      method: 'post',
      data: Person
    })
  },
  //获取班次名称
  getSchedulename() {
    return request ({
      url: `/admin/channelsch/findAllSchedulelName`,
      method: 'get'
    })
  },
 //实现下载模板
  downexcelTemplate(){
    return request ({
      url: `/admin/person/downexceltemplate`,
      method: 'get',
      responseType:'blob'
    })

  }
}
