export default (params) => {
	
	uni.showLoading({
		title: "加载中……"
	})
	
	return new Promise((resolve, reject) => {
		uni.request({
			...params,
			success (res) {
				resolve(res.data)
			},
			error (err) {
				rejecct(err)
			},
			complete () {
				uni.hideLoading()
			}
		})	
	})
}