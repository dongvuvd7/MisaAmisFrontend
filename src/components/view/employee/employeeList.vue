<template>
    <div id="router">
        <div id="router-content">
            <div id="title-bar">
                <router-link class="title" tag="span" to="/generaltest" style="cursor: pointer;">Nhân viên</router-link>
                <router-link class="back-title" tag="span" to="/quytrinh" style="cursor: pointer;"> <i class="fas fa-chevron-left">
                  </i> Tất cả danh mục</router-link>
                <div class="btn-wrapper">
                    <button id="btn-add" @click="showEmployeeDialog()">
                        Thêm mới nhân viên
                    </button>
                </div>
            </div>
            <div id="tablewrapper">
                <div id="table">
                    <div id="search">
                        <div id="search-bar-wrapper">
                            <div class="search-bar-and-icon">
                                <input
                                id="search-bar"
                                type="text"
                                placeholder="Tìm theo mã, tên nhân viên"
                                v-model="message"
                                @keyup="searchData()"
                                />
                                <button id="search-icon"></button>
                            </div>

                            <div id="btn-refresh-wrapper">
                                <button id="btn-refresh" @click="refreshData()"></button>
                                <button id="btn-export" @click="exportData()"></button>
                            </div>
                        </div>
                    </div>
                

                    <div class="data">
                        <div class="scroll">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" v-model="checkAll" />
                                        </th>
                                        <th style="min-width: 100px">MÃ NHÂN VIÊN</th>
                                        <th style="min-width: 200px">TÊN NHÂN VIÊN</th>
                                        <th style="min-width: 50px">GIỚI TÍNH</th>
                                        <th style="min-width: 110px; text-align: center;">NGÀY SINH</th>
                                        <th style="min-width: 100px">SỐ CMND</th>
                                        <th style="min-width: 100px">CHỨC DANH</th>
                                        <th style="min-width: 150px">TÊN ĐƠN VỊ</th>
                                        <th style="min-width: 100pxpx">SỐ TÀI KHOẢN</th>
                                        <th style="min-width: 100pxpx">TÊN NGÂN HÀNG</th>
                                        <th style="min-width: 100px">CHI NHÁNH TK NGÂN HÀNG</th>
                                        <!-- <th style="min-width: 83.33%">CHỨC NĂNG</th> -->
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="employee in employees" :key="employee.employeeId">
                                        <td>
                                            <input
                                                type="checkbox"
                                                v-model="checked"
                                                :value="employee.employeeId"
                                            />
                                        </td>
                                        <td>{{ employee.employeeCode }}</td>
                                        <td>{{ employee.fullName }}</td>
                                        <td>{{ employee.genderName }}</td>
                                        <td style="text-align: center;">{{ dateFormat(employee.dateOfBirth) }}</td>
                                        <td>{{ employee.identityNumber }}</td>
                                        <td>{{ employee.jobTitle }}</td>
                                        <td>{{ employee.departmentName }}</td>
                                        <td>{{ employee.bankAccount }}</td>
                                        <td>{{ employee.bankName }}</td>
                                        <td>{{ employee.bankBranch }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="table1" style="position: sticky; z-index: 3; right: 0; border: 0">
                                <thead>
                                    <tr style="border-top: 0px solid #ccc">
                                        <th style="min-width: 100px; position: sticky; top: 0px; background-color: #e6e6e6; text-align: center;">CHỨC NĂNG</th>
                                    </tr>
                                </thead>
                                <tbody style="background-color: #fff">
                                    <tr v-for="employee in employees" :key="employee.employeeId" style="background: white border: 1px solid #ccc;">
                                        <td>
                                            <Option 
                                                @showDeleteDialog="showDeleteDialog(employee.employeeId)"
                                                @showEmployeeDetail="showEmployeeDetail(employee.employeeId)"
                                                @showEmployeeDuplicate="showEmployeeDuplicate(employee.employeeId)"
                                                @showStopUsingDialog="showStopUsingDialog"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div id="footer">
                        <div id="total-data">
                            Tổng số <b>{{this.employeeNumber}}</b> bản ghi
                        </div>
                        <div id="footer-right">
                            <div id="footer-2">
                                <ComboBox @setPerPage="handlePerPage" ref="comboBox" />
                            </div>
                            <div id="footer-3">
                                <Paging
                                    :totalPages="totalPage"
                                    :perPage="perPage"
                                    :page="currentPage"
                                    @onChangePage="onPageChange"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <EmployeeDetail 
            v-if="isShowDialogEmployee"
            @hideDialog="hideDialog"
            :employee="selectedEmployee"
            :formmode="formmode"
            @showEmployeeDialog="showEmployeeDialog"
        />
        <EmployeeDelete
        :isShow="isShowDialogDelete"
        @hideDialog="hideDialog"
        :employee="selectedEmployee"
        />
        <EmployeeStopUsing 
        :isShow="isShowDialogStopUsing"
        @hideDialog="hideDialog"
        />

        <!--loading -->
        <div class="fa-3x" v-if="isBusy">
            <!--font awesome -->
            <i class="fas fa-spinner fa-spin" style="color: green"></i>
        </div>

    </div>
</template>


<script>
//import
import axios from  "axios";
import Option from "../../common/option.vue";
import ComboBox from "../../common/comboBox.vue";
import Paging from "../../common/paging.vue";
import EmployeeDetail from "../employee/employeeDetail.vue";
import EmployeeDelete from "../employee/employeeDelete.vue";
import EmployeeStopUsing from '../employee/employeeStopUsing.vue';

// khai báo biến cố định, code cho nhanh
const getAll = "https://localhost:44342/api/v1/Employees";
const getMaxCode = "https://localhost:44342/api/v1/Employees/MaxCode";
const getExport = "https://localhost:44342/api/v1/Employees/Export";
const getDepartments = "https://localhost:44342/api/v1/Employees/Department";
const getFilter = "https://localhost:44342/api/v1/Employees/Filter?";
const gender = {
    male: "Nam",
    female: "Nữ",
    rest: "Khác",
}
const form = {
    add: "add",
    edit: "edit",
}
export default {
  components: {
      Option,
      ComboBox,
      Paging,
      EmployeeDetail,
      EmployeeDelete,
      EmployeeStopUsing,
  },

  data() {
      return {
            initialEmployees: [], //Data đầu vào cho api get all
            employees: [], //data lấy vào khi get để gán dữ liệu lên table
            employeeNumber: 0,  //tổng số bản ghi
            departments: [], //data đơn vị (phòng ban)
            isShowDialogEmployee: false, //biến đóng/mở dialog thêm sửa
            isShowDialogDelete: false, // biến đóng/mở dialog xóa
            isShowDialogStopUsing: false, //biến đóng/mở dialog ngưng sử dụng
            message: null, //tiêu chí tìm kiếm
            selectedEmployee: {}, //nhân viên được chọn
            checked: [], //danh sách được tích vào checkbox
            currentPage: 0, //trang hiện tại
            perPage: 0, //số bản ghi trên 1 trang
            totalPage: 0, //tổng số trang
            isBusy: true, //loading animation, kiểm tra đã load dữ liệu xong chưa
            formmode: "", //phân biệt giữa sửa và thêm
      }
  },

  created() {
      this.currentPage = 1;
      this.perPage = 20;
      this.message = "";
      axios
        .get(
            getFilter + "pageSize=" + this.perPage + "&" + "pageIndex=" + this.currentPage + "&" + "filter=" + this.message
        )
        .then((res) => {
            console.log(res);
            this.employees = res.data.data;
            this.genderFormat(this.employees);
            this.departmentsFormat(this.employees);
            this.employeeNumber = res.data.totalRecord;
            if(this.employeeNumber % this.perPage == 0){
                this.totalPage = this.employeeNumber/this.perPage;
            }
            else {
                this.totalPage = Math.floor(this.employeeNumber / this.perPage) + 1;
            }
            //loading data succesful
            this.isBusy = false;
        })
        .catch((res) => {
            console.log(res);
        })
        
        axios.get(getAll)
        .then((res) => {
            this.initialEmployees = res.data;
        })
        .catch((res) => {
            console.log(res);
        })
    
  },

  mounted: function() {},

  methods: {
      /**
       * Lấy tất cả dữ liệu từ API
       */
      getAllData(){
          axios
          .get(getAll)
          .then((res) => {
              this.initialEmployees = res.data;
          })
          .catch((res) => {
              console.log(res);
          })
      },

      /**
       * Load lại data
       */
      loadData(){
          this.isBusy = true;
          this.message  = "";
          axios
        .get(
            getFilter + "pageSize=" + this.perPage + "&" + "pageIndex=" + this.currentPage + "&" + "filter=" + this.message
        )
        .then((res) => {
            console.log(res);
            this.employees = res.data.data;
            this.genderFormat(this.employees);
            this.departmentsFormat(this.employees);
            this.employeeNumber = res.data.totalRecord;
            if(this.employeeNumber % this.perPage == 0){
                this.totalPage = this.employeeNumber/this.perPage;
            }
            else {
                this.totalPage = Math.floor(this.employeeNumber / this.perPage) + 1;
            }
            //loading data succesful
            this.isBusy = false;
        })
        .catch((res) => {
            console.log(res);
        })
        
        axios.get(getAll)
        .then((res) => {
            this.initialEmployees = res.data;
        })
        .catch((res) => {
            console.log(res);
        })

        this.getAllData();
      },

    /**
     * Refresh data
     */
    refreshData(){
        this.currentPage = 1;
        this.perPage = 20;
        this.loadData();
        //set up mặc định cho combobox là lựa 20 bản ghi trên trang
        this.$refs.comboBox.resetPerPage(); //hàm resetPerPage là hàm viết bên file comboBox.vue
    },
    
    /**
     * cụm hàm đóng / mở dialog
     */
    //hiện dialog thêm
    showEmployeeDialog(){
        axios
            .get(getMaxCode)
            .then((res) => {
                this.isShowDialogEmployee = true;
                this.formmode = form.add;
                this.selectedEmployee = {};
                this.selectedEmployee.employeeCode = res.data;
            })
            .catch((res) => {
                console.log(res);
            })
    },
    //hiện dialog sửa
    showEmployeeDetail(employeeId){
        //get data employee to edit
        return axios
                .get(getAll + "/" + employeeId)
                .then((res) => {
                    this.isShowDialogEmployee = true;
                    this.formmode = form.edit;
                    this.selectedEmployee = res.data;
                    
                    this.departments.forEach((department) => {
                        if(this.selectedEmployee.departmentId == department.departmentId)
                            this.selectedEmployee.departmentName = department.departmentName;
                    });

                    return Promise.resolve(); //resolve là hàm sẽ được gọi khi promise hoàn thành
                })
                .catch((res) => {
                    console.log(res);
                    return Promise.reject(); //reject là hàm sẽ được gọi khi có lỗi xảy ra
                })

    },
    //hiện dialog nhân bản
      showEmployeeDuplicate(employeeId){
        this.showEmployeeDetail(employeeId).then(() => 
          axios
            .get(getMaxCode)
            .then((res) => {
              this.selectedEmployee.employeeCode = res.data;
              this.formmode = form.add;
            })
            .catch((res) => {
              console.log(res);
            })
        )
      },
      //hiện dialog xác nhận xóa
      showDeleteDialog(employeeId){
        this.isShowDialogDelete = true;
        //Lấy data của nhân viên muốn xóa
        axios
          .get(getAll +"/" + employeeId)
          .then((res) => {
            this.selectedEmployee = res.data;
          })
          .catch((res) => {
            console.log(res);
          });
      },
      //hiện thông báo đang hoàn thiện tính năng ngưng sử dụng
      showStopUsingDialog(){
        this.isShowDialogStopUsing = true;
      },
      //ẩn dialog thêm và xóa
      hideDialog(){
        this.isShowDialogEmployee = false;
        this.isShowDialogDelete = false;
        this.isShowDialogStopUsing = false;
        this.loadData();
      },

      /**
       * Tìm kiếm theo mã hoặc tên nhân viên
       */
      searchData(){
        this.currentPage = 1;
        axios
          .get(
            getFilter + "pageSize=" + this.perPage + "&" + "pageIndex=" + this.currentPage + "&" + "filter=" + this.message
          )
          .then((res) => {
            console.log(res);
            this.employees = res.data.data;

            //format gender and department
            this.genderFormat(this.employees);
            this.departmentsFormat(this.employees);
            //Số lượng bản ghi hợp lệ
            this.employeeNumber = res.data.totalRecord;
            if (this.employeeNumber % this.perPage == 0) {
              this.totalPage = this.employeeNumber / this.perPage;
            } else {
              this.totalPage = Math.floor(this.employeeNumber / this.perPage) + 1;
            }
          })
          .catch((res) => {
            console.log(res);
          })
      },

      /**
       * Cụm hàm format
       * CreatedBy: VDDong(14/06/2021)
       */
      //format date of birth
      dateFormat(dateOfBirth) {
        var newDate = new Date(dateOfBirth);
        var stringDate = newDate.getDate();
        if (stringDate < 10) stringDate = "0" + stringDate;
        var stringMonth = newDate.getMonth() + 1;
        if (stringMonth < 10) stringMonth = "0" + stringMonth;
        var stringYear = newDate.getFullYear();
        return stringDate + "/" + stringMonth + "/" + stringYear;
      },
      //format giới tính
      genderFormat(array) {
        array.forEach((element) => {
          if (element.gender == 0) element.genderName = gender.female;
          else if (element.gender == 1) element.genderName = gender.male;
          else element.genderName = gender.rest;
        });
      },
      //format tên phòng ban
      departmentsFormat(array) {
        //Lấy tất cả dữ liệu phòng ban từ database
        axios
          .get(getDepartments)
          .then((res) => {
            this.departments = res.data;
            //Gán giá trị departmentName của từng nhân viên với id tương ứng trong dữ liệu phòng ban trả về từ api
            array.forEach((element) => {
              this.departments.forEach((department) => {
                if (element.departmentId == department.departmentId)
                  element.departmentName = department.departmentName;
              });
            });
          })
          .catch((res) => {
            console.log(res);
          });
      },

      /**
       * Xuất dữ liệu ra file excel
       * CreatedBy: VDDong(14/06/2021)
       */
      exportData(){
        window.open(getExport);
      },

      /**
       * Thay đổi số trang, thay đổi currentPage
       */
      onPageChange(page){
        if (this.employeeNumber % this.perPage == 0) {
        this.totalPage = this.employeeNumber / this.perPage;
        } else {
        this.totalPage = Math.floor(this.employeeNumber / this.perPage) + 1;
        }
        if(page > 0 && page <= this.totalPage){
            this.currentPage = page;
            axios
                .get(
                    getFilter + "pageSize=" +
                                this.perPage +
                                "&" +
                                "pageIndex=" +
                                this.currentPage +
                                "&" +
                                "filter=" +
                                this.message
                )
                .then((res) => {
                console.log(res);
                this.employees = res.data.data;

                //format gender and department
                this.genderFormat(this.employees);
                this.departmentsFormat(this.employees);
                //Số lượng bản ghi hợp lệ 
                this.employeeNumber = res.data.totalRecord;
                })
                .catch((res) => {
                    console.log(res);
                });
                }
            },

            /**
             * Xử lí việc chọn số bản ghi trên 1 trang
             * info là số lượng bản trên 1 trang truyền từ comboBox lên
             * CreatedBy: VDDong(14/06/2021)
             */
            handlePerPage(info) {
                this.currentPage = 1;
                this.perPage = info;
                this.loadData();
            },
  },

  computed: {
      /**
       * Tích tất cả các checkbox
       * CreatedBy: VDDong(14/06/2021)
       */
      checkAll: {
        get: function() {
          return this.initialEmployees ? this.checked.length == this.employeeNumber : false;
        },
        set: function(value) {
          var checked = [];
          if(value) {
            this.initialEmployees.forEach(function (employee) {
              checked.push(employee.employeeId);
            });
          }
          this.checked = checked;
        },
      },
  },
  
}
</script>

<style scoped>
#router-content {
  position: absolute;
  top: 48px;
  left: 178px;
  box-sizing: border-box;
  display: inline-block;
  background: rgb(244, 245, 246);
  width: calc(100% - 178px);
  height: calc(100% - 48px);
  /* background-color: aqua; */
  padding-top: 24px;
  padding-left: 24px;
  padding-bottom: 24px;
  padding-right: 24px;
}
#title-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  /* background-color: aqua; */
}
.title {
  /* font-weight: bold; */
  font-size: 24px;
  font-weight: 700;
  color: #111;
  margin-bottom: 25px;
}
.back-title{
    position: absolute;
    left: 25px;
    top: 50px;
    color: rgb(29, 131, 214);
}
.btn-wrapper {
  position: absolute;
  right: 24px;
  height: 40px;
  top: 15px;
}
#btn-add {
  height: 85%;
  width: 150px;
  border-radius: 4px;
  border: 1px solid transparent;
  color: #fff;
  background-color: #2ca01c;
}
#btn-add:hover{
  background-color: #2a7920;
}
#tablewrapper {
  background: #fff;
  color: #111;
  height: calc(100% - 36px);
  width: 100%;
  overflow: hidden;
  /* margin-right: 24px; */
  /* padding: 0px 24px 24px 24px; */
  padding-bottom: 24px;
  box-sizing: border-box;
  border-collapse: collapse;
  /* background-color: #2ca01c; */
  /* background-color: gray; */
}
#table{
  height: 100%;
  overflow: auto;
  
}

#search {
  height: 80px;
  width: 100%;
}
#search-bar-wrapper {
  height: 80px;
  /* background-color: aqua; */
  display: flex;
  align-items: center;
  position: absolute;
  right: 36px;
}
.search-bar-and-icon {
  border-radius: 2px;
  box-sizing: border-box;
  width: 232px;
  display: flex;
  align-items: center;
  border: 1px solid #babec5;
  border-collapse: collapse;
}
.search-bar-and-icon:focus-within {
  border: 1px solid #2ca01c;
}
#search-bar {
  width: 199px;
  height: 31px;
  font-size: 13px;
  /* border-radius: 2px;
        border: 1px solid #babec5; */
  outline: none;
  border: none;
  /* border: 1px solid #babec5; */
  /* border-right: none; */
  box-sizing: border-box;
  padding: 6px 10px;
  font-style: italic;
  border-collapse: collapse;
}
#search-icon {
  width: 31px;
  height: 31px;
  background: url(../../../assets/img/Sprites.64af8f61.svg) no-repeat;
  background-position: -984px -353px;
  border: none;
  outline: none;
  border-collapse: collapse;
}

#btn-refresh-wrapper {
  height: 80px;
  width: 80px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #2ca01c; */
}

tbody tr:hover {
  background-color: #eeeded;
}
#btn-refresh {
  height: 32px;
  width: 32px;
  background: url(../../../assets/img/Sprites.64af8f61.svg) no-repeat;
  background-position: -423px -197px;
  border: none;
  outline: none;
  cursor: pointer;
}
#btn-export {
  width: 32px;
  height: 32px;
  background: url(../../../assets/img/Sprites.64af8f61.svg) no-repeat;
  background-position: -700px -197px;
  cursor: pointer;
  border: none;
  outline: none;
}

#footer {
  /* margin-top: 24px; */
  position: absolute;
  bottom: 24px;
  /* background-color: red; */
  width: calc(100% - 48px);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#footer-right {
  display: flex;
  align-items: center;
  position: absolute;
  right: 48px;
}
/* #footer-2{
        background-color: aqua;
    }
    #footer-3{
        background-color: red;
        position: absolute;
        right: 48px;
        float: right;
        
    } */
.fa-3x {
  position: absolute;
  left: 54%;
  top: 50%;
  transform: translate(-50%, -50%);
}

</style>