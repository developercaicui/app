export default{
		"ENTER_KEY" : "13",
		"token": "",
		"loginLink" : "http://www.zbgedu.com/index.php?m=user&c=index&a=index",
		"loginLinkTest" : "#studycenterLogin",
		"host": {
			"name": process.env.NODE_ENV.includes('developZbgedu') ? "http://api.zbgedu.com" : "http://api.caicui.com",
			"nameAction": process.env.NODE_ENV.includes('developZbgedu') ? "http://action.zbgedu.com" : "http://action.caicui.com",
			"demoName" : process.env.NODE_ENV.includes('developZbgedu') ? "http://demo.caicui.com" : "http://demo.caicui.com",
			"static" : process.env.NODE_ENV.includes('developZbgedu') ? "http://exstatic.zbgedu.com/" : "http://cdnstatic.caicui.com/",
			"img" : process.env.NODE_ENV.includes('developZbgedu') ? "http://eximg.zbgedu.com" : "http://cdnimg.caicui.com",
			"imgAddress" : process.env.NODE_ENV.includes('developZbgedu') ? "http://exstatic.zbgedu.com/" : "http://cdnstatic.caicui.com/",
			"infoAddress" : process.env.NODE_ENV.includes('developZbgedu') ? "http://elearning.zbgedu.com/" : "http://www.caicui.com/",
			"IPLocation" : process.env.NODE_ENV.includes('developZbgedu') ? "http://elearning.zbgedu.com/api/v2/" : "http://www.caicui.com/api/v2/"
		},
		"product": {
			"pcWeb": {
				"appType": "pc",
				"appId": "pcWeb",
				"appKey": "e877000be408a6cb0428e0f584456e03"
			},
			"winExe": {
				"appType": "pcEXE",
				"appId": "pcEXECourse",
				"appKey": "4a9a86b12b9339f66852d9cb58973f6e"
			},
			"iPad": {
				"appType": "iPad",
				"appId": "iPadCourse",
				"appKey": "bd2de9a5d1606fe68083026e911def3a"
			},
			"iPhone": {
				"appType": "iPhone",
				"appId": "iPhoneCourse",
				"appKey": "8f81bf2e06c0f32df06ba7a04cf4bbb7"
			},
			"aPhone": {
				"appType": "aPhone",
				"appId": "aPhoneCourse",
				"appKey": "4b6454d8cf903498116e26b26dd5791a"
			},
			"aPad": {
				"appType": "aPad",
				"appId": "aPadCourse",
				"appKey": "f7e4ebaa872f38db7b548b870c13e79e"
			}
		}
	}