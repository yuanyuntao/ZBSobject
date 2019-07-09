export default {
	userId: "",
	userName: "",
	isAdministrator: "",
	companyId: "",
	serverPublicKey: "",
	fileData:[],
	imges:[],
	attendanceCardimgs: [], //上传的图片列表
	attendanceCardfileData: [],
	select_time:"",
	leaveRequestImges:[],
	leaveRequestFileData:[],
	

	setUserId(newUserId) {
		this.userId = newUserId
    },
    setUserName(newUserName) {
		this.userName = newUserName
    },
    setIsAdministrator(newIsAdministrator) {
		this.isAdministrator = newIsAdministrator
    },
    setCompanyId(newCompanyId) {
		this.companyId = newCompanyId
    },
    setServerPublicKey(newServerPublicKey) {
		this.serverPublicKey = newServerPublicKey
	},
	setFileData(newFileData) {
		this.fileData = newFileData
	},
	setImges(newImges) {
		this.imges = newImges
	},
	setAttendanceCardImges(newImges){
		this.attendanceCardimgs = newImges

	},
	setattendanceCardFileData(newFileData){
		this.attendanceCardfileData = newFileData

	},
	setSelect_time(newTime){
        this.select_time = newTime
	},
	setLeaveRequestImges(newImges){
		this.leaveRequestImges = newImges
	},
	
	setLeaveRequestFileData(newFileData){
		this.leaveRequestFileData = newFileData
	},
    
}