<template>
    <div id="router">
        <div id="router-content">
            <div id="title-bar">
                <div class="title">Danh sách nhà cung cấp</div>
                <router-link class="back-title" tag="span" to="/quytrinh" style="cursor: pointer;"> <i class="fas fa-chevron-left">
                  </i> Tất cả danh mục</router-link>
                <div class="btn-wrapper">
                    <button id="btn-add" @click="showNccDialog()">
                        <span style="margin-right: 10px; font-weight: bold;">Thêm</span> | <i class="fas fa-caret-down" style="margin-left: 15px;"></i>
                    </button>
                </div>
            </div>
            <div id="tablewrapper">
                <div id="table">

                    <div id="statistical">
                        <div class="stat-main" :class="{'show-statistical' : isShowStat}"> <!-- Đóng / mở stat, đóng thì thêm class kia vào (class có nhiệm vụ set vị trí của nút cao lên) -->
                            <div class="stat-bar" style="background-color: rgba(255,127,44,255);">
                                <div class="stat-bar-top" style="position: relative;">
                                    <div class="sbt-money">
                                        0,0
                                    </div>
                                    <div class="sbt-icon" style="font-size: 13px; position: absolute; right: 20px;"><i class="fas fa-filter"></i></div>
                                </div>
                                <div class="stat-bar-bottom">
                                    Nợ quá hạn
                                </div>
                            </div>
                            <div class="stat-bar" style="background-color: rgba(184,188,195,255);">
                                <div class="stat-bar-top" style="position: relative;">
                                    <div class="sbt-money">
                                        10.073.000,0
                                    </div>
                                    <div class="sbt-icon" style="font-size: 13px; position: absolute; right: 20px;"><i class="fas fa-filter"></i></div>
                                </div>
                                <div class="stat-bar-bottom">
                                    Tổng nợ phải trả
                                </div>
                            </div>
                            <div class="stat-bar" style="background-color: rgba(116,203,47,255)">
                                <div class="stat-bar-top" style="position: relative;">
                                    <div class="sbt-money">
                                        0,0
                                    </div>
                                </div>
                                <div class="stat-bar-bottom">
                                    Đã thanh toán (30 ngày gần đây)
                                </div>
                            </div>
                        </div>
                        <div class="stat-footer" >
                            <div class="btn-sf" style="cursor: pointer;"  
                                :class="{'btn-sf-2' : isShowStat}"                             
                                @click="showStat()"
                            ></div>
                        </div>
                    </div>

                    <div id="search" :style="{'margin-top': !isShowStat ? '0px' : '-110px'}"> <!-- đóng stat thì đẩy thanh search lên (kéo theo đẩy cả table), sử dụng v-bind -->
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
                

                    <div class="data" :class="{'data-showStat' : isShowStat}" > <!-- đóng stat thì mở tăng chiều dài table ra -->
                        <div class="scroll">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" v-model="checkAll" />
                                        </th>
                                        <th style="min-width: 100px">TÊN NHÀ CUNG CẤP</th>
                                        <th style="min-width: 200px">MÃ NHÀ CUNG CẤP</th>
                                        <th style="min-width: 50px">ĐỊA CHỈ</th>
                                        <th style="min-width: 100px">MÃ SỐ THUẾ</th>
                                        <th style="min-width: 110px;">ĐIỆN THOẠI</th>
                                        <th style="min-width: 100px">SỐ CMND</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="ncc in nccs" :key="ncc.nccId">
                                        <td>
                                            <input
                                                type="checkbox"
                                                v-model="checked"
                                                :value="ncc.nccId"
                                            />
                                        </td>
                                        <td>{{ ncc.nccName }}</td>
                                        <td>{{ ncc.nccCode }}</td>                 
                                        <td>{{ ncc.nccAddress}}</td>
                                        <td>{{ ncc.nccMst }}</td>
                                        <td>{{ ncc.nccPhone }}</td>
                                        <td>{{ ncc.nccWebsite }}</td>
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
                                    <tr v-for="ncc in nccs" :key="ncc.nccId" style="background: white border: 1px solid #ccc;">
                                        <td>
                                            <OptionNcc 
                                                @showDeleteDialog="showDeleteDialog(ncc.nccId)"
                                                @showNccDetail="showNccDetail(ncc.nccId)"
                                                @showNccDuplicate="showNccDuplicate(ncc.nccId)"
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
                            Tổng số <b>{{this.nccNumber}}</b> bản ghi
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
        <NCCDetail 
            v-if="isShowDialogNcc"
            @hideDialog="hideDialog"
            :ncc="selectedNcc"
            :formmode="formmode"
            @showNccDialog="showNccDialog"
        />
        <NccDelete
        :isShow="isShowDialogDelete"
        @hideDialog="hideDialog"
        :ncc="selectedNcc"
        />
        <NccStopUsing 
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
import OptionNcc from "../../common/optionNcc.vue";
import ComboBox from "../../common/comboBox.vue";
import Paging from "../../common/paging.vue";
import NccDelete from "../NhaCungCap/nccDelete.vue";
import NccStopUsing from '../NhaCungCap/nccStopUsing.vue';
import NCCDetail from '../NhaCungCap/nccDetail.vue';

// khai báo biến cố định, code cho nhanh
const getAll = "https://localhost:44342/api/v1/Nccs";
const getMaxCode = "https://localhost:44342/api/v1/Nccs/MaxCode";
const getExport = "https://localhost:44342/api/v1/Nccs/Export";
const getFilter = "https://localhost:44342/api/v1/Nccs/Filter?";

const form = {
    add: "add",
    edit: "edit",
}
export default {
  components: {
      OptionNcc,
      ComboBox,
      Paging,
      NccDelete,
      NccStopUsing,
      NCCDetail,
  },

  data() {
      return {
            initialNccs: [], //Data đầu vào cho api get all
            nccs: [], //data lấy vào khi get để gán dữ liệu lên table
            nccNumber: 0,  //tổng số bản ghi
            isShowDialogNcc: false, //biến đóng/mở dialog thêm sửa
            isShowDialogDelete: false, // biến đóng/mở dialog xóa
            isShowDialogStopUsing: false, //biến đóng/mở dialog ngưng sử dụng
            message: null, //tiêu chí tìm kiếm
            selectedNcc: {}, //nhân viên được chọn
            checked: [], //danh sách được tích vào checkbox
            currentPage: 0, //trang hiện tại
            perPage: 0, //số bản ghi trên 1 trang
            totalPage: 0, //tổng số trang
            isBusy: true, //loading animation, kiểm tra đã load dữ liệu xong chưa
            formmode: "", //phân biệt giữa sửa và thêm
            isShowStat : false, //đóng/mở bảng stat bên trên table
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
            this.nccs = res.data.data;
            this.nccNumber = res.data.totalRecord;
            if(this.nccNumber % this.perPage == 0){
                this.totalPage = this.nccNumber/this.perPage;
            }
            else {
                this.totalPage = Math.floor(this.nccNumber / this.perPage) + 1;
            }
            //loading data succesful
            this.isBusy = false;
        })
        .catch((res) => {
            console.log(res);
        })
        
      axios.get(getAll)
        .then((res) => {
            this.initialNccs = res.data;
        })
        .catch((res) => {
            console.log(res);
        })
    
  },

  mounted: function() {},

  methods: {

      showStat(){
          this.isShowStat = !this.isShowStat;
          
      },

      /**
       * Lấy tất cả dữ liệu từ API
       */
      getAllData(){
          axios
          .get(getAll)
          .then((res) => {
              this.initialNccs = res.data;
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
                this.nccs = res.data.data;
                this.nccNumber = res.data.totalRecord;
                if(this.nccNumber % this.perPage == 0){
                    this.totalPage = this.nccNumber/this.perPage;
                }
                else {
                    this.totalPage = Math.floor(this.nccNumber / this.perPage) + 1;
                }
                //loading data succesful
                this.isBusy = false;
            })
            .catch((res) => {
                console.log(res);
            })
        
        axios
          .get(getAll)
          .then((res) => {
              this.initialNccs = res.data;
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
    showNccDialog(){
        axios
            .get(getMaxCode)
            .then((res) => {
                this.isShowDialogNcc = true;
                this.formmode = form.add;
                this.selectedNcc = {};
                this.selectedNcc.nccCode = res.data;
            })
            .catch((res) => {
                console.log(res);
            })
    },
    //hiện dialog sửa
    showNccDetail(nccId){
        //get data ncc to edit
        return axios
                .get(getAll + "/" + nccId)
                .then((res) => {
                    this.isShowDialogNcc = true;
                    this.formmode = form.edit;
                    this.selectedNcc = res.data;           

                    return Promise.resolve(); //resolve là hàm sẽ được gọi khi promise hoàn thành
                })
                .catch((res) => {
                    console.log(res);
                    return Promise.reject(); //reject là hàm sẽ được gọi khi có lỗi xảy ra
                })

    },
    //hiện dialog nhân bản
      showNccDuplicate(nccId){
        this.showNccDetail(nccId).then(() => 
        axios
          .get(getMaxCode)
          .then((res) => {
            this.selectedNcc.nccCode = res.data;
            this.formmode = form.add;
          })
          .catch((res) => {
            console.log(res);
          })
        )
      },
      //hiện dialog xác nhận xóa
      showDeleteDialog(nccId){
        this.isShowDialogDelete = true;
        //Lấy data của nhà cung cấp muốn xóa
        axios
          .get(getAll +"/" + nccId)
          .then((res) => {
            this.selectedNcc = res.data;
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
        this.isShowDialogNcc = false;
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
            this.nccs = res.data.data;

            //Số lượng bản ghi hợp lệ
            this.nccNumber = res.data.totalRecord;
            if (this.nccNumber % this.perPage == 0) {
              this.totalPage = this.nccNumber / this.perPage;
            } else {
              this.totalPage = Math.floor(this.nccNumber / this.perPage) + 1;
            }
          })
          .catch((res) => {
            console.log(res);
          })
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
        if (this.nccNumber % this.perPage == 0) {
        this.totalPage = this.nccNumber / this.perPage;
        } else {
        this.totalPage = Math.floor(this.nccNumber / this.perPage) + 1;
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
                  this.nccs = res.data.data;

                  //Số lượng bản ghi hợp lệ 
                  this.nccNumber = res.data.totalRecord;
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
          return this.initialNccs ? this.checked.length == this.nccNumber : false;
        },
        set: function(value) {
          var checked = [];
          if(value) {
            this.initialNccs.forEach(function (ncc) {
              checked.push(ncc.nccId);
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
.back-title{
    position: absolute;
    left: 25px;
    top: 50px;
    color: rgb(29, 131, 214);
}
.title {
  /* font-weight: bold; */
  font-size: 24px;
  font-weight: 700;
  color: #111;
  margin-bottom: 25px;
}
.btn-wrapper {
  position: absolute;
  right: 24px;
  height: 40px;
  top: 15px;
}
#btn-add {
  height: 90%;
  width: 120px;
  border-radius: 25px;
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
  overflow: hidden;
  
}

#statistical{
    height: 100px;
    width: 100%;
    background-color:  #f8f8f8;
    margin-top: 40px;
}
    .stat-main{
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .stat-bar{
        height: 70px;
        width: 33%;
        background-color: cornflowerblue;
        box-sizing: border-box;
        /* margin-right: 5px; */
    }
        .stat-bar-top{
            height: 42px;
            width: 100%;
            display: flex;
            color: white;
            align-items: center;
            font-size: 24px;
            padding-left: 10px;
        }
        .stat-bar-bottom{
            height: 28px;
            width: 100%;
            color: white;
            font-size: 14px;
            padding-left: 10px;
        }
    .stat-footer{
        width: 100%;
        height: 60px;
        /* background-color: yellowgreen; */
        position: relative;
    }
        .btn-sf{
            width: 25px;
            height: 25px;
            border: 1px solid #ccc;
            background: url('../../../assets/img/Sprites.64af8f61.svg') no-repeat -123px -355px;
            background-color: #f2f5f8;
            position: absolute;
            right: 0px;
            top: 15px;
        }
        .btn-sf-2{
            width: 25px;
            height: 25px;
            border: 1px solid #ccc;
            background: url('../../../assets/img/Sprites.64af8f61.svg') no-repeat -123px -355px;
            background-color: #f2f5f8;
            position: absolute;
            right: 0px;
            top: -30px;
            transform: rotate(180deg);
            /* transition: transform .15s linear; */
        }
    .show-statistical{
        display: none;
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


/* table */
.data {
    flex: 1;
    /* background-color: red; */
    padding-bottom: 16px;
    overflow: hidden;
    /* height: 900px; */
    height: calc(100% - 96px - 140px);
    
  }
.data-showStat {
    flex: 1;
    /* background-color: red; */
    padding-bottom: 16px;
    overflow: hidden;
    /* height: 900px; */
    height: calc(100% - 96px - 30px);
    
  }
  
    .scroll {
      margin: 0 16px;
      height: 100%;
      overflow: auto;
      white-space: nowrap;
      display: flex;
      /* background-color: aqua; */
    }
  
    
    .table {
      width: 100%;
      /* border-collapse: collapse; */
      border-collapse: separate;
      border-spacing: 0;
      
    }
    .table th,
    .table td {
        /* border: 1px solid #ccc; */
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        text-align: left;
        padding: 0 16px;
      }
      .table thead tr {
          height: 32px;
      }
      .table thead tr th {
            background-color: #e6e6e6;
            position: sticky;
            top: 0px;
            border-top: none;
            border-bottom: 1px solid #ccc;
            /* box-shadow:0 1px #ccc; */
      }
      .table thead tr th:first-child {
            z-index: 1;
            left: 0px;
            border-right: 1px solid #ccc;
      }
      .table thead tr th:last-child{
        /* background-color: aqua; */
        border-right: none;
      }
        
      
      .table tbody tr {
          height: 48px; 
      }
      .table tbody tr td:first-child {
            position: sticky;
            left: 0px;
            background-color: white;
            /* border-left:1px solid #ccc; */
            border-right: 1px solid #ccc;
          }
          
          .table tbody tr td:last-child {
            
            border-right: none;
          }
         
  
   .table1{
     width: 20%;
    border-collapse: separate;
    border-spacing: 0;
   
  
   }
    .table1 th,
    .table1 td {
      /* border: 1px solid #ccc; */
      border-bottom: 1px solid #ccc;
      border-left: 1px solid #ccc;
      text-align: left;
      padding: 0 16px;
    }
  
    .table1 thead tr {
        height: 32px;
      }
      .table1 thead tr th {
          background-color: #f4f5f6;
          position: sticky;
          top: 0px;
          border-top: none;
          border-bottom: 1px solid #ccc;
          /* box-shadow:0 1px #ccc; */
        }
        .table1 thead tr th:first-child {
          z-index: 1;
          left: 0px;
          
        }
        
     
  
        .table1 tbody tr {
        height: 48px;
        
      }
   

</style>