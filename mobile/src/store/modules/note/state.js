
import webApi from '../../../api/api';

export default {

	noteList: [],
  noteListParams: {
    token: '', // key只
    self: 1, // 1代表自己 0代表全部
  },

  noteDetailsList: [],
  noteDetailsParams: {
    pageNo: 1,
    pageSize: 20,
    charpterid: '',
    ordertype: '',
    self:'',
    token: ''
  },

	noteSelectedList: {}, // 新建笔记列表
	noteSelectedListP: {
		token: '',
		pageSize: 66,
		pageNo: 1,
	}

}
