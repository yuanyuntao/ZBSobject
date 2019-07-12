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
	overtimeRequestFileData:[],
	overtimeRequestImges:[],
	outRequestFileData:[],
	outRequestImges:[],
	travelRequestFileData:[],
	travelRequestImges:[],

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
	setOvertimeRequestImges(newImges){
		this.overtimeRequestImges = newImges
	},
	
	setOvertimeRequestFileData(newFileData){
		this.overtimeRequestFileData = newFileData
	},
	setOutRequestImges(newImges){
		this.outRequestImges = newImges
	},
	
	setOutRequestFileData(newFileData){
		this.outRequestFileData = newFileData
	},
	setTravelRequestImges(newImges){
		this.travelRequestImges = newImges
	},
	
	setTravelRequestFileData(newFileData){
		this.travelRequestFileData = newFileData
	},
    
}