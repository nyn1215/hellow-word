import fetch from './fetch';

// 登录
export const login = (data) => fetch({ url: '/proper/login', method: 'POST', data });
// queryMenu
export const queryMenu = (data) => fetch({ url: '/role/queryFunction', method: 'POST', data });

export const register = (data) => fetch({ url: '/PropertyCompanyCertification/save', method: 'POST', data });

// 健康活动  活动报名   111111111111111111111111111111111
export const healactivityListSign = (data) => fetch({ url: '/activity/signUp', method: 'POST', data });
// 报名详情
export const healactivityDetail = (data) => fetch({ url: '/activity/userDetail', method: 'POST', data });


// 业主列表
export const proprietorList = (data) => fetch({ url: '/owner/query', method: 'POST', data });

// 业主列表->添加
export const proprietorAdd = (data) => fetch({ url: '/owner/save', method: 'POST', data });

// 业主列表->编辑
export const proprietorEdit = (data) => fetch({ url: '/owner/ownerDetails', method: 'POST', data });

// 业主列表->删除
export const proprietorDel = (data) => fetch({ url: '/owner/delete', method: 'POST', data });

// 业主列表->下载
export const proprietorExcel = (data) => fetch({ url: '/owner/queryExcel', method: 'POST', data });



// 人员管理列表
export const personnelList = (data) => fetch({ url: '/personnel/query', method: 'POST', data });

// 人员管理列表->添加
export const personnelAdd = (data) => fetch({ url: '/personnel/save', method: 'POST', data });

// 人员管理列表->详情
export const personnelEdit = (data) => fetch({ url: '/personnel/details', method: 'POST', data });

// 人员管理列表->保存
export const personnelUpdate = (data) => fetch({ url: '/personnel/update', method: 'POST', data });

// 业主列表->删除
export const personnelDel = (data) => fetch({ url: '/personnel/delete', method: 'POST', data });


// 人员管理角色
export const personnelRole = (data) => fetch({ url: '/role/query', method: 'POST', data });

// 业主审核列表
export const ownerList = (data) => fetch({ url: '/audit/query', method: 'POST', data });

// 业主审核批量
export const ownerBatch = (data) => fetch({ url: '/audit/save', method: 'POST', data });

// 服务管理->报修管理列表
export const repairList = (data) => fetch({ url: '/serviceManagement/queryRepair', method: 'POST', data });

// 服务管理->跑腿管理列表
export const errandsList = (data) => fetch({ url: '/serviceManagement/queryErrand', method: 'POST', data });

// 服务管理->寄存管理列表
export const queryCheckList = (data) => fetch({ url: '/serviceManagement/queryCheck', method: 'POST', data });


// 服务管理->报修管理列表->查询报修、跑腿可分配员工列表
export const queryStaffs = (data) => fetch({ url: '/serviceManagement/queryStaffs', method: 'POST', data });

// 服务管理->报修管理列表->报修、跑腿抢单接口
export const robOrder = (data) => fetch({ url: '/serviceManagement/robOrder', method: 'POST', data });

export const repairConfirm = (data) => fetch({ url: '/serviceManagement/allocation', method: 'POST', data });

export const substituteConfirm = (data) => fetch({ url: '/serviceManagement/substituteAllocation', method: 'POST', data });
// 服务管理->取回操作
export const substituteUpdateState = (data) => fetch({ url: '/serviceManagement/updateState', method: 'POST', data });



// 活动管理列表
export const activityList = (data) => fetch({ url: '/activity/termQuery', method: 'POST', data });

export const activitytypeList = (data) => fetch({ url: '/activity/type', method: 'POST', data });

// 活动管理列表->新增
export const activityAdd = (data) => fetch({ url: '/activity/save', method: 'POST', data });

// 活动管理列表->详情
export const activityDetail = (data) => fetch({ url: '/activity/detail', method: 'POST', data });

// 活动管理列表分类
export const activityDel = (data) => fetch({ url: 'activity/deleteById', method: 'POST', data });

// 活动管理列表 状态
export const activityUpdate = (data) => fetch({ url: 'activity/update', method: 'POST', data });

// 缴费管理->列表
export const societyList = (data) => fetch({ url: 'paymentManagement/query', method: 'POST', data });

// 留言管理列表
export const leavingList = (data) => fetch({ url: '/property/leaveList', method: 'POST', data });

// 留言管理列表->批量删除
export const leavingBatchDel = (data) => fetch({ url: '/property/deleteList', method: 'POST', data });

// 留言管理列表->回复
export const leavingReply = (data) => fetch({ url: '/property/saveLeave', method: 'POST', data });

// 投诉管理列表->回复
export const complaintleavingReply = (data) => fetch({ url: '/property/saveComplaint', method: 'POST', data });

// 投诉管理列表->批量删除
export const complaintBatchDel = (data) => fetch({ url: '/property/deleteAll', method: 'POST', data });

// 留言管理列表->单个删除
export const leavingDel = (data) => fetch({ url: '/property/deleteLeave', method: 'POST', data });

// 投诉管理列表->单个删除
export const complaintleavingDel = (data) => fetch({ url: '/property/deleteComplaint', method: 'POST', data });

// 投诉列表
export const complaintList = (data) => fetch({ url: '/property/complaintList', method: 'POST', data });

// 财务->支付列表
export const paymentList = (data) => fetch({ url: '/paymentList/list', method: 'POST', data });


// 统计->业主分析
export const ownerStatistics = (data) => fetch({ url: '/propertyStatistics/userStatistics', method: 'POST', data });

// 统计->业主分析
export const ownerStatisticsExport = (data) => fetch({ url: '/propertyStatistics/userToExcel', method: 'POST', data });

// 统计->缴费分析
export const societyStatistics = (data) => fetch({ url: '/propertyStatistics/payDetailStatistics', method: 'POST', data });

// 统计->缴费分析->总数
export const societyStatisticsTotal = (data) => fetch({ url: '/propertyStatistics/payTotalStatistics', method: 'POST', data });

// 统计->缴费分析->饼图
export const societyStatisticsPie = (data) => fetch({ url: '/propertyStatistics/payCakeStatistics', method: 'POST', data });

// 统计->服务分析->报修->列表
export const repairDetailStatistics = (data) => fetch({ url: '/propertyStatistics/repairDetailStatistics', method: 'POST', data });

// 统计->服务分析->报修->饼图
export const repairTotalNumberStatistics = (data) => fetch({ url: '/propertyStatistics/repairTotalNumberStatistics', method: 'POST', data });

// 统计->服务分析->跑腿->列表
export const substituteDetailStatistics = (data) => fetch({ url: '/propertyStatistics/substituteDetailStatistics', method: 'POST', data });

// 统计->服务分析->跑腿->饼图
export const substituteTotalNumberStatistics = (data) => fetch({ url: '/propertyStatistics/substituteTotalNumberStatistics', method: 'POST', data });

// 统计->服务分析->托管->列表
export const trusteeshipDetailStatistics = (data) => fetch({ url: '/propertyStatistics/trusteeshipDetailStatistics', method: 'POST', data });

// 统计->服务分析->托管->饼图
export const trusteeshipTotalNumberStatistics = (data) => fetch({ url: '/propertyStatistics/trusteeshipTotalNumberStatistics', method: 'POST', data });
// 柱状图
export const monthNumberStatistics = (data) => fetch({ url: '/propertyStatistics/monthNumber', method: 'POST', data });




// 设置->坐标设置获取
export const coordinateGet = (data) => fetch({ url: '/platformSettings/queryCoordinate', method: 'POST', data });
// 设置->坐标设置更新
export const coordinateSet = (data) => fetch({ url: '/platformSettings/saveAttendance', method: 'POST', data });
// 设置->巡逻设置更新
export const patrolSet = (data) => fetch({ url: '/platformSettings/savePatrolList', method: 'POST', data });
// 设置->社区切换
export const communityList = (data) => fetch({ url: '/switch/query', method: 'POST', data });
// 设置->社区列表
export const byareaList = (data) => fetch({ url: '/switch/queryCommunityByArea', method: 'POST', data });


export const roleList = (data) => fetch({ url: '/role/query', method: 'POST', data });

export const roleAdd = (data) => fetch({ url: '/role/save', method: 'POST', data });

export const roleUpdate = (data) => fetch({ url: '/role/update', method: 'POST', data });

export const inquireroleList = (data) => fetch({ url: '/role/getRoleFunction', method: 'POST', data });

export const roleallList = (data) => fetch({ url: '/role/queryFunction', method: 'POST', data });



// 支付设置->详情
export const financeGetDetails = (data) => fetch({ url: '/paymentSettings/details', method: 'POST', data });

// 支付设置->保存
export const financeSetDetails = (data) => fetch({ url: '/paymentSettings/update', method: 'POST', data });


//设置->物业介绍->保存
export const introduceSet = (data) => fetch({ url: '/propertyNoticev/save', method: 'POST', data });
//设置->业主委员会->保存
export const committeeSet = (data) => fetch({ url: '/industryCouncil/save', method: 'POST', data });

//设置->物业介绍->获取
export const introduceGet = (data) => fetch({ url: '/propertyNoticev/echoDisplay', method: 'POST', data });

//设置->业主委员会->保存
export const committeeGet = (data) => fetch({ url: '/industryCouncil/echoDisplay', method: 'POST', data });

// /api/v1/industryCouncil/echoDisplay     这个是业主委员会的回显

// /api/v1/propertyNoticev/echoDisplay     这个是物业介绍的回显


//省市区
export const queryAllAreas = (data) => fetch({ url: '/region/queryAllAreas', method: 'POST', data });
//设置->申请管理->保存
export const applySet = (data) => fetch({ url: '/PropertyCompanyCertification/saveAu', method: 'POST', data });
//设置->申请管理->列表
export const applyList = (data) => fetch({ url: '/PropertyCompanyCertification/query', method: 'POST', data });

//设置->申请管理->表格
export const queryExcel = (data) => fetch({ url: '/PropertyCompanyCertification/queryExcel', method: 'POST', data });

//设置->申请管理->切换社区
export const applySwitch = (data) => fetch({ url: '/PropertyCompanyCertification/switchCommunity', method: 'POST', data });

//管理->租房->列表
export const rentingList = (data) => fetch({ url: '/rentOut/query', method: 'POST', data });
export const rentingDel = (data) => fetch({ url: '/rentOut/delete', method: 'POST', data });
export const queryType = (data) => fetch({ url: '/rentOut/queryType', method: 'POST', data });
export const rentingAdd = (data) => fetch({ url: '/rentOut/save', method: 'POST', data });
export const rentingDetail = (data) => fetch({ url: '/rentOut/detail', method: 'POST', data });


//管理->动态管理->列表
export const dynamicList = (data) => fetch({ url: '/notice/termQuery', method: 'POST', data });
export const dynamicAdd = (data) => fetch({ url: '/notice/save', method: 'POST', data });
export const dynamicDetail = (data) => fetch({ url: '/notice/detail', method: 'POST', data });
export const dynamicDel = (data) => fetch({ url: '/notice/delete', method: 'POST', data });

export const infoQueryDetail = (data) => fetch({ url: '/PropertyCompanyCertification/queryDetails', method: 'POST', data });
export const queryCommunityByArea = (data) => fetch({ url: '/PropertyCompanyCertification/queryCommunityByArea', method: 'POST', data });

export const sendPayPush = (data) => fetch({ url: '/paymentManagement/sendPayPush', method: 'POST', data });

export const exportExcel = (url, data) => fetch({ url, method: 'POST', data });