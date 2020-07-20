
export const request = (realUrl, data = {}, failCallback) => {
	//异步请求数据
	console.log(11)

}

//提示信息
export const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	this.$message({
		title,
		duration,
		mask,
		icon
	});
}




// Vue.prototype.$api = {
// 	msg,
// 	request,
// 	setUserInfo,
// 	setMenuList
// };

