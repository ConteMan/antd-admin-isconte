import { BASE_URL } from '@/services/api';
import { request, METHOD } from '@/utils/request';

const prefix = '/softwares';
const url = BASE_URL + prefix;

const Software = {
  /**
   * 列表
   */
  index(params) {
    const { offset, limit, status, tag } = params;
    return request(url, METHOD.GET, {
      offset,
      limit,
      status,
      tag,
    });
  },

  /**
   * 新建
   */
  create(data) {
    return request(url, METHOD.POST, data);
  },

  /**
   * 获取编辑信息
   */
  edit(id) {
    return request(url + `/${id}/edit`, METHOD.GET);
  },

  /**
   * 更新
   */
  update(data) {
    return request(url + `/${data.id}`, METHOD.PUT, data);
  },

  /**
   * 删除
   */
  delete(id) {
    return request(url + `/${id}`, METHOD.DELETE);
  },

  /**
   * 状态列表
   */
  statuses() {
    return request(url + '/statuses', METHOD.GET);
  },
};

export default Software;
