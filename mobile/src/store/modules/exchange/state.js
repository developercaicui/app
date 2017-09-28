
import webApi from '../../../api/api';

export default {
	courseexchangeList: [],
	courseeExchangeListMe: [],
	exchangeList: {},
	exchangeListParams: {
			verTT: new Date().getTime(),
			token: '',
		  self: '1',
		  pageNo: 1,
		  pageSize: 15,
		  type:	3,
		  ordertype: 1,  // 1:是发帖时间    2:是最新回复    3是回复数量     4:是精华讨论
	}
}
