<template>
    <div class="dialog">
        <div class="model" @click="hideDialogDataCondition()"></div>
        <div class="dialog-content">
            <div class="header">
                <div id="title" style="margin-right: 20px;">Thông tin nhà cung cấp</div>
                <input type="radio" 
                    class="btn-radio" 
                    name="mohinh" 
                    :value="1"
                    checked
                />
                <div class="gender" style="margin-right: 10px;">Tổ chức</div>
                <input type="radio" 
                    class="btn-radio"
                    name="mohinh" 
                    :value="0"
                />
                <div class="gender"> Cá nhân</div>
                <input type="checkbox" class="btn-check" style="margin-left: 150px;"/>
                <div class="div">Là khách hàng</div>
                <button class="btn-help">
                    <span class="tooltiptext">Để biết thêm thông tin, tham khảo google.com hì</span>
                </button>
                <button class="btn-X" @click="hideDialogDataCondition()"></button>
            </div>

            <div class="middle">
                <div class="middle-1">
                    <div class="column clm1">
                        <div style="display: flex; align-items: center;">                          
                            <div style="width: 35%; margin-right: 2px">
                                <div style="position: relative"><b>Mã số thuế</b>
                                    <div class="error-message" v-show="isValid.fullNameMessage == false">Tên nhân viên không được để trống</div>
                                </div>
                                <input type="text" class="fullname-blank-box" 
                                    :class="{'blank-box-invalid': isValid.fullName == false }" 
                                    ref="employeeCode"
                                    v-model="employee.fullName"
                                    @mouseenter="mouseEnterError('fullName')"
                                    @mouseleave="mouseLeaveError()"
                                />                    
                            </div>
                            <div style="width: 65%; margin-left: 2px">
                                <div style="position: relative"><b>Mã nhà cung cấp</b> <span style="color: red;">*</span>
                                    <div class="error-message" v-show="isValid.employeeCodeMessage == false">Mã nhân viên chưa hợp lệ</div>
                                </div>
                                <input type="text" class="code-blank-box"
                                    :class="{'blank-box-invalid': isValid.employeeCode == false}"
                                    v-model="employee.employeeCode"
                                    @mouseenter="mouseEnterError('employeeCode')"
                                    @mouseleave="mouseLeaveError()"
                                />
                            </div>
                        </div>
                        <div style="position: relative"><b>Tên nhà cung cấp</b><span style="color: red;">*</span>
                            <div class="error-message" v-show="isValid.departmentNameMessage == false">Tên đơn vị chưa hợp lệ</div>
                        </div>
                        <input type="text" class="medium-blank-box" v-model="employee.jobTitle"/>
                        <div><b>Địa chỉ</b></div>
                        <textarea rows="2" type="text" class="medium-blank-box" style="height: 64px; font-size: 14px;" 
                            placeholder="VD: Số 82 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội"
                        v-model="employee.jobTitle"/>
                    </div>
                    <div class="column clm2">
                        <div style="display: flex; align-items: center">
                            <div style="width: 35%; margin-right: 2px;">
                                <div><b>Điện thoại</b></div>
                                <input type="text" class="fullname-blank-box" v-model="employee.phone" />                     
                            </div>
                            <div style="width: 65%; margin-left: 2px; padding-left: 6px;">
                                <div><b>Website</b></div>
                                <input type="text" class="fullname-blank-box"  /> 
                            </div>
                        </div>
                        <div style="align-items: center;">
                            <div style="position: relative; width: 100%;"><b>Nhóm nhà cung cấp</b> <span style="color: red;">*</span>
                            </div>
                            <!-- combobox -->
                            <div class="dropdown-text-and-icon" :class="{'blank-box-invalid': isValid.departmentName == false}">
                                <input type="text" class="department-blank-box" 
                                @focus="showDropDownContent()" 
                                @blur="hideDropDownContent()" 
                                id="departmentName"
                                
                                v-model="employee.departmentName"
                                @mouseenter="mouseEnterError('departmentName')"
                                @mouseleave="mouseLeaveError()"
                                @keyup="searchOption()"
                                />
                                <div class="icon-plus"></div>
                                <button id="dropdown-icon" @click="showDropDownContent(options)" @blur="hideDropDownContent()"></button>
                            </div>
                            <div id="dropdown">     
                                <div class="dropdown-content" :class="{'dialog_hide': !isShowOption}" >
                                    
                                    <div class="dropdown-content-a" 
                                    :class="{'drop-down-content-selected' : option.id == employee.departmentId}"
                                    v-for="option in options" 
                                    :key="option.id" 
                                    @click="chooseOption(option)" 
                                    @mouseenter="enterClick()" 
                                    @mouseleave="leaveClick()"
                                    >{{option.name}}</div>
                                </div>
                            </div>
                        </div>
                        <div style="align-items: center;">
                            <div style="width: 100%; margin-top: -3px;"><b>Nhân viên mua hàng</b> <span style="color: red;">*</span>
                            </div>
                            <!-- combobox -->
                            <div class="dropdown-text-and-icon" :class="{'blank-box-invalid': isValid.departmentName == false}"
                                style="margin-top: 3px;">
                                <input type="text" class="department-blank-box" 
                                />
                                <div class="icon-plus"></div>
                                <button id="dropdown-icon"></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="middle-2">
                    <div class="tab">
                        <button
                            class="choice-tab"
                            @click="showTab = 1"
                            :class="{ choosen: showTab == 1 }"
                        >
                            Liên hệ
                        </button>
                        <button
                            class="choice-tab"
                            @click="showTab = 2"
                            :class="{ choosen: showTab == 2 }"
                        >
                            Điều khoản thanh toán
                        </button>
                        <button
                            class="choice-tab"
                            @click="showTab = 3"
                            :class="{ choosen: showTab == 3 }"
                        >
                            Tài khoản ngân hàng
                        </button>
                        <button
                            class="choice-tab"
                            @click="showTab = 4"
                            :class="{ choosen: showTab == 4 }"
                        >
                            Địa chỉ khác
                        </button>
                        <button
                            class="choice-tab"
                            @click="showTab = 5"
                            :class="{ choosen: showTab == 5 }"
                        >
                            Ghi chú
                        </button>
                        <div class="content-tab">
                            <div v-show="showTab == 1" class="infor-connetion">
                                <div style="display: flex; align-items: center; width: 100%; margin-left: 12px; margin-top: 10px;">                          
                                    <div style="width: 15%; margin-right: 2px">
                                        <div style="position: relative;"><b>Người liên hệ</b>
                                        </div>
                                        <div class="dropdown-text-and-icon"
                                            style=" width: 100%;
                                                    padding: 6px 10px;
                                                    padding-right: 0px;
                                                    font-size: 13px;
                                                    height: 32px;
                                                    margin-top: 11px;
                                                    margin-bottom: 0px;"
                                                    >
                                            <input type="text" class="department-blank-box" placeholder="Xưng hô" style="font-style: italic;"
                                                @focus="showDropDownContentName()" 
                                                @blur="hideDropDownContentName()"
                                                @keyup="searchOptionName()" 
                                                v-model="danhXung.name"
                                            />
                                            <button id="dropdown-icon-1"
                                                @click="showDropDownContentName(optionsName)" @blur="hideDropDownContentName()"
                                            ></button>
                                        </div>

                                        <div id="dropdown">     
                                            <div class="dropdown-content" :class="{'dialog_hide': !isShowOptionName}" 
                                                style="width: 130px; height: 110px; overflow-y: scroll;"
                                            >
                                                
                                                <div class="dropdown-content-a" 
                                                :class="{'drop-down-content-selected' : optionName.id == danhXung.id}"
                                                v-for="optionName in optionsName" 
                                                :key="optionName.id" 
                                                @click="chooseOptionName(optionName)" 
                                                @mouseenter="enterClick()" 
                                                @mouseleave="leaveClick()"
                                                >{{optionName.name}}</div>
                                            </div>
                                        </div>

                                    </div>
                                    <div style="width: calc(32% - 4px); margin-left: 2px">
                                        <input style="margin-top: 21px; font-style: italic;" type="text" class="code-blank-box" placeholder="Họ và tên"/>
                                    </div>
                                    <div style="width: 47%; margin-left: 3%;">
                                        <div style="position: relative"><b>Đại diện theo PL</b>
                                        </div>
                                        <input type="text" class="fullname-blank-box" placeholder="Đại diện theo pháp luật" style="font-style: italic;"/>                    
                                    </div>
                                </div>
                                <input type="text" class="medium-blank-box" placeholder="Email"
                                    style="width: 47%; margin-left: 12px; font-style: italic; margin-top: -4px;"
                                />
                                <input type="text" class="medium-blank-box" placeholder="Số điện thoại"
                                    style="width: 47%; margin-left: 12px; font-style: italic; margin-top: -4px;"
                                />
                            </div>
                            <div v-show="showTab == 2" class="infor-connetion">
                                <div style="display: flex; align-items: center; width: 100%; margin-left: 12px; margin-top: 10px;">                          
                                    <div style="width: 22%; margin-right: 5px">
                                        <div style="position: relative;"><b>Điều khoản thanh toán</b>
                                        </div>
                                        <div class="dropdown-text-and-icon"
                                            style=" width: 100%;
                                                    padding: 6px 10px;
                                                    font-size: 13px;
                                                    height: 32px;
                                                    margin-top: 5px;
                                                    margin-bottom: 10px;"
                                                    >
                                            <input type="text" class="department-blank-box" style="font-style: italic;"/>
                                            <div class="icon-plus" style="margin-right: 8px;"></div>
                                            <button id="dropdown-icon-1" style="background-position: -552px -353px; border-left: 1px solid #ccc;"></button>
                                        </div>                  
                                    </div>

                                    

                                    <div style="width: 22%; margin-left: 5px">
                                        <div style="position: relative;"><b>Số ngày được nợ</b>
                                        </div>
                                        <input style="font-style: italic;" type="text" class="code-blank-box"/>
                                    </div>
                                    <div style="width: 22%; margin-left: 10px;">
                                        <div style="position: relative"><b>Số nợ tối đa</b>
                                        </div>
                                        <input type="text" class="fullname-blank-box" style="font-style: italic;"/>                    
                                    </div>
                                </div>
                                <div style="position: relative; margin: 0 0 8px 12px;"><b>Tài khoản cồng nợ phải trả</b></div>
                                <!-- <input type="text" class="medium-blank-box"
                                    style="width: 22%; margin-left: 12px; font-style: italic; margin-top: -4px;"
                                /> -->
                                <div class="dropdown-text-and-icon"
                                    style=" width: 22%;
                                            padding: 6px 10px;
                                            padding-right: 0px;
                                            font-size: 13px;
                                            height: 32px;
                                            margin-top: 5px;
                                            margin-left: 12px;
                                            margin-bottom: 10px;"
                                            >
                                    <input type="text" class="department-blank-box" style="font-style: italic;"/>
                                    <button id="dropdown-icon-1" style="background-position: -552px -353px;"></button>
                                </div>  
                            </div>
                            <div v-show="showTab == 3" class="infor-bank">
                                <table>
                                    <thead>
                                    <tr>
                                        <th style="width: 130px;">SỐ TÀI KHOẢN</th>
                                        <th style="width: 180px;">NGÂN HÀNG</th>
                                        <th style="width: 220px;">CHI NHÁNH</th>
                                        <th style="width: 210px;">TỈNH/TP CỦA NGÂN HÀNG</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody v-for="(bank, index) in banksOfEmployee" :key="index" >
                                    <tr>
                                        <td>
                                        <input
                                            type="text"
                                            style="width: 120px"
                                            class="input-tab-table"
                                            v-model="bank.bankCode"
                                        />
                                        </td>
                                        <td>
                                        <input
                                            type="text"
                                            style="width: 170px"
                                            class="input-tab-table"
                                            v-model="bank.nameBank"
                                        />
                                        </td>
                                        <td><input type="text"  class="input-tab-table" style="width: 210px" 
                                            v-model="bank.branchBank" /></td>
                                        <td><input type="text"  class="input-tab-table" style="width: 200px;"
                                            v-model="bank.addressBank"/></td>
                                        <td
                                        class="delete-img delete-fea"
                                        @click="deleteBank(index)"
                                        ></td>
                                    </tr>
                                    </tbody>
                                </table>
                                <button
                                    class="btn-w"
                                    style="margin-left: 10px; margin-top: 5px"
                                    @click="addBank()"
                                >
                                    Thêm dòng
                                </button>
                                <button
                                    class="btn-w"
                                    style="margin-left: 6px"
                                    @click="deleteAllBanks()"
                                >
                                    Xóa hết dòng
                                </button>
                            </div>
                            <div v-show="showTab == 4" class="infor-connetion">
                                <div style="display: flex; align-items: center; width: 50%; margin-left: 12px; margin-top: 10px;">                          
                                    <div style="width: 46%; margin-right: 5px">
                                        <div style="position: relative;"><b>Vị trí địa lý</b>
                                        </div>
                                        <div class="dropdown-text-and-icon"
                                            style=" width: 100%;
                                                    padding: 6px 10px;
                                                    padding-right: 0px;
                                                    font-size: 13px;
                                                    height: 32px;
                                                    margin-top: 5px;
                                                    margin-bottom: 10px;"
                                                    >
                                            <input type="text" class="department-blank-box" placeholder="Quốc gia" style="font-style: italic;"/>
                                            <button id="dropdown-icon-1"></button>
                                        </div>                  
                                    </div>
                                    <div style="width: 46%; margin-left: 5px">
                                        <div class="dropdown-text-and-icon"
                                            style=" width: 100%;
                                                    padding: 6px 10px;
                                                    padding-right: 0px;
                                                    font-size: 13px;
                                                    height: 32px;
                                                    margin-top: 21px;
                                                    margin-bottom: 10px;"
                                                    >
                                            <input type="text" class="department-blank-box" placeholder="Tỉnh / TP" style="font-style: italic;"/>
                                            <button id="dropdown-icon-1"></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="rightTab4">
                                    <div class="rt4-header">
                                        <b style="margin-right: 20px; margin-top: 4px;">Địa chỉ giao hàng</b>
                                        <input type="checkbox" class="btn-check" style="margin-left: 15px;"/>
                                        <div class="div" style="margin-top: 3px;">Giống địa chỉ nhà cung cấp</div>
                                    </div>

                                    <table style="width: 100%; margin: 0px; padding: 0px;">
                                        <tbody v-for="(dcgh, index) in dcghs" :key="index" >
                                            <tr style="height: 32px;">
                                                <td><input type="text"  class="input-tab-table" style="width: 94%; margin-left: 10px;"
                                                    v-model="dcgh.diachigh"/></td>
                                                <td
                                                class="delete-img delete-fea"
                                                style="width: 15%;"
                                                @click="deleteDcgh(index)"
                                                ></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <button
                                        class="btn-w"
                                        style="margin-top: 15px"
                                        @click="addDcgh()"
                                    >
                                        Thêm dòng
                                    </button>
                                    <button
                                        class="btn-w"
                                        style="margin-left: 6px"
                                        @click="deleteAllDcghs()"
                                    >
                                        Xóa hết dòng
                                    </button>
                                </div>
                                <div style="display: flex; align-items: center; width: 50%; margin-left: 12px;">                          
                                    <div style="width: 46%; margin-right: 5px">
                                        <div class="dropdown-text-and-icon"
                                            style=" width: 100%;
                                                    padding: 6px 10px;
                                                    padding-right: 0px;
                                                    font-size: 13px;
                                                    height: 32px;
                                                    margin-top: 5px;
                                                    margin-bottom: 10px;"
                                                    >
                                            <input type="text" class="department-blank-box" placeholder="Quận / Huyện" style="font-style: italic;"/>
                                            <button id="dropdown-icon-1"></button>
                                        </div>                    
                                    </div>
                                    <div style="width: 46%; margin-left: 5px">
                                        <div class="dropdown-text-and-icon"
                                            style=" width: 100%;
                                                    padding: 6px 10px;
                                                    padding-right: 0px;
                                                    font-size: 13px;
                                                    height: 32px;
                                                    margin-top: 5px;
                                                    margin-bottom: 10px;"
                                                    >
                                            <input type="text" class="department-blank-box" placeholder="Xã / Phường" style="font-style: italic;"/>
                                            <button id="dropdown-icon-1"></button>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <div v-show="showTab == 5" class="noteTab">
                                <textarea name="" id="textFrame" cols="50" rows="5"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    

            <div class="footer">
                <button class="btn-small cancel" @click="hideDialogDataCondition()">Hủy</button>
                <button class="btn-small post" @click="btnSave()">Cất</button>
                <button class="btn-post-and-put" @click="btnSaveAndAdd()">Cất và thêm</button>
            </div>
        </div>  

        <ErrorDialog 
            :isShow="isErrorDialogShow"
            :errorMsg="errorMsg"
            @hidePopUp = "hidePopUp"
        />

        <ErrorPopUp
            :isShow="isErrorPopUpShow"
            :errorMsg="errorMsg"
            @hidePopUp="hidePopUp"
        />

        <DataChange 
            :isShow="isDataChange"
            :errorMsg="errorMsg"
            @hidePopUp="hidePopUp"
            @hideDialog="hideDialog"
            @btnSave="btnSave"
        />

    </div>    
</template>

<script>

    import axios from 'axios'
    // import datepicker from 'vuejs-datepicker'
    import DataChange from '../../common/pop-up/dataChange.vue';
    import ErrorDialog from '../../common/pop-up/errorDialog.vue';
    import ErrorPopUp from '../../common/pop-up/errorPopUp.vue';

    const getAll = "https://localhost:44370/api/v1/Employees"
    const form = {
        add: "add",
        edit: "edit"
    }
    const errorMessage = {
        invalidDepartment: "Tên đơn vị không tồn tại trong hệ thống, vui lòng kiểm tra lại.",
        nullFullName: "Tên không được để trống.",
        nullEmployeeCode: "Mã nhân viên không được để trống.",
        nullDepartment: "Tên đơn vị không được để trống.",
        dataChange: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",

    }
    const property = {
        fullName: "fullName",
        employeeCode: "employeeCode",
        departmentName: "departmentName",

    }
    const genderName = {
        male: "Nam",
        female: "Nữ",
        rest: "Khác"
    }

export default {
    components: {
        DataChange,
        ErrorDialog,
        ErrorPopUp,
        // datepicker,
    },

    created() {
        this.banksOfEmployee.push(this.bank);
    },

    data() {
        return {

            danhXung: {
                id: null,
                name: "",
            },

            //Biến kiểm tra xem dữ liệu combobox có show ra hay không
            isShowOption: false,
            isShowOptionName: false,
            //Option được chọn trong dropbox
            // selectedOption: {
            //     id: null,
            //     name: null
            // },
            //Danh sách các lựa chọn
            options: [
                {
                    id: "142cb08f-7c31-21fa-8e90-67245e8b283e",
                    name: "Phòng Đào tạo"
                },
                {
                    id: "17120d02-6ab5-3e43-18cb-66948daf6128",
                    name: "Phòng Kế toán"
                },
                {
                    id: "469b3ece-744a-45d5-957d-e8c757976496",
                    name: "Phòng Marketing"
                },
                {
                    id: "4e272fc4-7875-78d6-7d32-6a1673ffca7c",
                    name: "Phòng Nhân sự"
                },
            ],
            optionsName: [
                {
                    id: "1",
                    name: "Mr",
                },
                {
                    id: "2",
                    name: "Mrs",
                },
                {
                    id: "3",
                    name: "Miss",
                },
                {
                    id: "4",
                    name: "Anh",
                },
                {
                    id: "5",
                    name: "Chị",
                },
                {
                    id: "6",
                    name: "Ông",
                },
                {
                    id: "7",
                    name: "Bà",
                },
                {
                    id: "8",
                    name: "Bạn",
                },
            ],
            //Danh sách các lựa chọn ban đầu (không thay đổi)
            initialOptions: [
                {
                    id: "142cb08f-7c31-21fa-8e90-67245e8b283e",
                    name: "Phòng Đào tạo"
                },
                {
                    id: "17120d02-6ab5-3e43-18cb-66948daf6128",
                    name: "Phòng Kế toán"
                },
                {
                    id: "469b3ece-744a-45d5-957d-e8c757976496",
                    name: "Phòng Marketing"
                },
                {
                    id: "4e272fc4-7875-78d6-7d32-6a1673ffca7c",
                    name: "Phòng Nhân sự"
                },
            ],
            initialOptionsName: [
                {
                    id: "1",
                    name: "Mr",
                },
                {
                    id: "2",
                    name: "Mrs",
                },
                {
                    id: "3",
                    name: "Miss",
                },
                {
                    id: "4",
                    name: "Anh",
                },
                {
                    id: "5",
                    name: "Chị",
                },
                {
                    id: "6",
                    name: "Ông",
                },
                {
                    id: "7",
                    name: "Bà",
                },
                {
                    id: "8",
                    name: "Bạn",
                },
            ],
            //Biến kiểm tra xem chuột có di chuyển vào các option hay không, để phân biệt click với blur
            overClick: false,

            isValid: {
                employeeCode: true,
                fullName: true,
                departmentName: true,
                employeeCodeMessage: true,
                fullNameMessage: true,
                departmentNameMessage: true,

                phone: true,
                telephone: true,
                email: true,

            },

            //Biển để hiện dialog thông báo trùng mã nhân viên
            isErrorDialogShow: false,
            //Biến để hiện pop-up thông báo trống mã hoặc tên
            isErrorPopUpShow: false,
            //Biến để nhận giá trị của employee truyền vào ban đầu, để so sánh sau khi thay đổi
            initialEmployee: {},
            //Biến để hiện thông báo đã có thay đổi dữ liệu
            isDataChange: false,
            //Biến để nhận thông báo lỗi trả về từ API
            errorMsg: "",

            //Biến để xác nhận thông tin nhân viên đã hợp lệ để put/post lên database
            isAppropriate: null,

            //Chon tab 1 dau tien
            showTab: 1,

            //data tab bank (tab 3)
            banksOfEmployee: [],
            bank: {
                bankCode: "",
                nameBank: "",
                branchBank: "",
                addressBank: "",
            },

            //data dia chi giao hang (tab 4)
            dcghs: [],
            dcgh: {
                diachigh: "",
            }

        }
    },

    props: {
        employee: {
            type: Object,
            default: null,
        },
        formmode: {
            type: String,
            default: null,
        }
    },

    updated(){
        //Format giới tính sau khi dialog được hiện ra, để binding dữ liệu
        this.genderFormat(this.employee.gender);
    },

    mounted() {
        //auto focus vào ô input employeeCode
        this.focusInput();

        this.genderFormat(this.employee.gender);
        //copy employee sang 1 object khac de so xem co su thay doi khong?
        this.initialEmployee = {...this.employee};
    },

    methods: {
        /**
         * Cụm hàm format
         * CreatedBy: VDDong (17/06/2021)
         */
        //format giới tính để đưa dữ liệu lên database
        genderFormat(gender){
            if(gender == 0) {
                this.employee.genderName = genderName.female;
            }
            else if(gender == 1) {
                this.employee.genderName = genderName.male;
            }
            else if(gender == 2){
                this.employee.genderName = genderName.rest;
            }
        },
        //Format tên phòng ban để binding vào form
        departmentFormat(departmentId){
            this.options.forEach(option => {
                    if(departmentId == option.id) {
                        this.employee.departmentName = option.name;
                    }
                });
        },
        danhXungFormat(danhXungId){
            this.optionsName.forEach(optionName => {
                if(danhXungId == optionName.id){
                    this.danhXung.name = optionName.name;
                }
            });
        },

        /**
         * So sánh 2 Object để kiểm tra xem dữ liệu đã thay đổi chưa
         * Return true: có thay đổi, false: chưa thay đổi
         * CreatedBy: VDDong (17/06/2021)
         */
        compareDataObject(obj1, obj2){
            for(let i in obj1){
                if(obj1[i] !== obj2[i]) return true;
            }
            return false
        },

        /**
         * Ẩn dialog EmployeeDetail
         * CreatedBy: VDDong (17/06/2021)
         */
        hideDialog(){
            //Reset lại các biến validate form
            this.isValid.fullName = true;
            this.isValid.employeeCode = true;
            this.isValid.departmentName = true;
            //Gọi phương thức ẩn của thằng cha là employeeList
            this.$emit('hideDialog');
        },

        /**
        * Ẩn dialog
        * Nếu dữ liệu đã bị thay  đổi thì hiện pop up DataChange, nếu không thì ẩn dialog EmployeeDetail
        * CreatedBy: VDDong (17/06/2021)
        */
        hideDialogDataCondition(){
           if(this.compareDataObject(this.initialEmployee, this.employee)){
               this.isDataChange = true;
               this.errorMsg = errorMessage.dataChange;
           }
           else this.hideDialog();
        },

        /**
        * Hiện combobox
        * CreatedBy: VDDong (17/06/2021)
        */
        showDropDownContent(){
            this.options = this.initialOptions;
            this.isShowOption = !this.isShowOption;      
            
        },
        showDropDownContentName(){
            this.optionsName = this.initialOptionsName;
            this.isShowOptionName = !this.isShowOptionName;      
            
        },

       /**
        * Ẩn combobox
        * CreatedBy: VDDong (17/06/2021)
        */
        hideDropDownContent(){
            if(this.overClick == false) this.isShowOption = false;
        },
        hideDropDownContentName(){
            if(this.overClick == false) this.isShowOptionName = false;
        },

        /**
        * Gán dữ liệu đã chọn từ combobox cho chủ thể employee và format cho đúng định dạng
        * CreatedBy: VDDong (17/06/2021)
        */
        chooseOption(option){
            //Gán giá trị được chọn cho id và tên phòng ban của employee
            this.employee.departmentId = option.id;
            // this.employee.departmentName = option.name;
            this.departmentFormat(this.employee.departmentId);
            this.overClick = false;
            this.hideDropDownContent();
        },
        chooseOptionName(optionName){
            //Gán giá trị được chọn cho id và tên phòng ban của employee
            this.danhXung.id = optionName.id;
            // this.employee.departmentName = option.name;
            this.danhXungFormat(this.danhXung.id);
            this.overClick = false;
            this.hideDropDownContentName();
        },

        /**
         * Tìm kiếm ô input đơn vị so với các option data có sẵn từ combobox
         * CreatedBy: VDDong (17/06/2021)
         */
        searchOption(){
            this.options = this.initialOptions.filter(option => {
                return (
                    option.name.toLowerCase().includes(this.employee.departmentName.toLowerCase())
                )
            })
        },
        searchOptionName(){
            this.options = this.initialOptionsName.filter(optionName => {
                return (
                    optionName.name.toLowerCase().includes(this.danhXung.name.toLowerCase())
                )
            })
        },

        /**
         * Di chuyển chuột vào ra các option của combobox
         * CreatedBy: VDDong (17/06/2021)
         */
        //Khi di chuyển chuột vào trong các option
        enterClick(){
            //Gán overClick = true để tránh lỗi click và focusout overlapping (khi click thì focusout sẽ chạy trước mà không chạy click)
            this.overClick = true;
        },
        //Khi di chuyển chuột ra khỏi các option
        leaveClick(){
            this.overClick = false;
        },

        /**
         * Auto focus vào ô employeeCode khi hiện dialog EmployeeDetail
         * CreatedBy: VDDong (17/06/2021)
         */
        focusInput(){
            this.$refs.employeeCode.focus();
        },

        /**
         * Validate trường hợp ô employee code và fullname bỏ trống hoặc nhập toàn dấu cách (khoảng trắng) 
         * CreatedBy: VDDong (17/06/2021)
         */
        nullValidation(propertyValue, propertyName){
            propertyValue = propertyValue || '';
            if (propertyValue.trim() == "") {
                if(propertyName == property.employeeCode) {
                    this.isValid.employeeCode = false;
                    this.isErrorPopUpShow = true;
                    this.errorMsg = errorMessage.nullEmployeeCode;
                }
                else if(propertyName == property.fullName) {
                    this.isValid.fullName = false;
                    this.isErrorPopUpShow = true;
                    this.errorMsg = errorMessage.nullFullName;
                }
            } 
            else{
                if(propertyName == property.employeeCode) {
                    this.isValid.employeeCode = true;
                }
                else if(propertyName == property.fullName) {
                    this.isValid.fullName = true;
                }
            }    
        },

        /**
         * Validate tên đơn vị (phòng ban)
         * CreatedBy: VDDong (17/06/2021)
         */
        departmentNameValidation(value){
            //Validate tên đơn vị không được trống
            value = value || '';
            if (value.trim() == "") {
                this.isValid.departmentName = false;
                this.isErrorPopUpShow = true;
                this.errorMsg = errorMessage.nullDepartment;
            }
            else {
                this.isValid.departmentName = false;
                //Validate tên đơn vị giống với tên đơn vị trong option
                //Kiểm tra xem thông tin nhập vào có đúng với các option tên đơn vị không
                this.options.forEach(option => {
                    if(option.name == value) {
                        this.isValid.departmentName = true;
                        this.employee.departmentId = option.id;
                    }
                });
                if(this.isValid.departmentName == false) 
                {
                    this.isErrorPopUpShow = false;
                    this.isErrorDialogShow = true;
                    this.errorMsg = errorMessage.invalidDepartment;
                }
            }
        },

        /**
         * Validate trước khi request lên database
         * CreatedBy: VDDong (17/06/2021)
         */
        formValidation(){
            //Validate tên nhân viên không được trống hoặc là khoảng trắng
            this.nullValidation(this.employee.fullName, property.fullName);
            //Validate mã nhân viên không được trống hoặc là khoảng trắng
            this.nullValidation(this.employee.employeeCode, property.employeeCode);
            //Validate tên đơn vị
            this.departmentNameValidation(this.employee.departmentName);
            if(this.isValid.fullName == true
                && this.isValid.employeeCode == true
                && this.isValid.departmentName == true
            ) this.isAppropriate = true;
            else this.isAppropriate = false;         
        },

        /**
         * Ẩn các error popup và error dialog, error datachange, reset lại error msg
         * CreatedBy: VDDong (17/06/2021)
         */
        hidePopUp(){
            //đóng thông báo trùng mã, tên đơn vị không trong hệ thống
            this.isErrorDialogShow = false;
            //Đóng thông báo mã null, tên đơn vị null, mã nhân viên null
            this.isErrorPopUpShow = false;
            //Đóng thông báo đã có dữ liệu bị thay đổi
            this.isDataChange = false;
            //reset nội dung thông báo lỗi
            this.errorMsg = "";
        },

        /**
         * Cụm hàm ẩn/hiện lỗi khi trỏ chuột vào ô input bị lỗi
         * Trỏ chuột vào - hiện lỗi, trỏ chuột ra - ẩn lỗi
         * CreatedBy: VDDong (17/06/2021)
         */
        //Di chuyển chuột vào trong hiện lỗi
        mouseEnterError(propertyName){
            if( this.isValid.employeeCode == false && propertyName == property.employeeCode){
                this.isValid.employeeCodeMessage = false;
            }
            else if( this.isValid.fullName == false && propertyName == property.fullName){
                this.isValid.fullNameMessage = false;
            }
            if( this.isValid.departmentName == false && propertyName == property.departmentName) 
                this.isValid.departmentNameMessage = false;
            
        },
        //Di chuyển chuột ra ngoài ẩn lỗi
        mouseLeaveError(){
            this.isValid.employeeCodeMessage = true;
            this.isValid.fullNameMessage = true;
            this.isValid.departmentNameMessage = true;

            this.isValid.questionMessage = true;
        },

        /**
         * Reset lại các thông tin nhân viên khi bấm 'cất và thêm'
         * CreatedBy: VDDong (17/06/2021)
         */
        resetEmployee(){
            this.$emit('showEmployeeDialog');
            this.focusInput();
        },

        /**
         * Phân biệt post vs put, rồi post / put lên database
         * CreatedBy: VDDong (17/06/2021)
         */
        formmodeValidation(){
            if(this.formmode == form.add) {
                return axios
                    .post(getAll, this.employee)
                    .then((res) => {
                        console.log(res);
                        return Promise.resolve();
                    })
                    .catch((res) => {

                        var errorContent = res.response.data.devMsg;

                        if(errorContent.includes("Mã nhân viên")) this.isValid.employeeCode = false;
                        if(errorContent.includes("ĐT di động")) this.isValid.phone = false;
                        if(errorContent.includes("ĐT cố định")) this.isValid.telephone = false;
                        if(errorContent.includes("Email")) this.isValid.email = false;

                        this.errorMsg = errorContent;
                        this.isErrorDialogShow = true;
                        return Promise.reject();
                    })
            }
            else if(this.formmode == form.edit){
                return axios
                    .put(getAll + "/" + this.employee.employeeId, this.employee)
                    .then((res) => {
                        console.log(res);
                        return Promise.resolve();
                    })
                    .catch((res) => {
                        var errorContent = res.response.data.devMsg;

                        if(errorContent.includes("Mã nhân viên")) this.isValid.employeeCode = false;
                        if(errorContent.includes("ĐT di động")) this.isValid.phone = false;
                        if(errorContent.includes("ĐT cố định")) this.isValid.telephone = false;
                        if(errorContent.includes("Email")) this.isValid.email = false;

                        this.errorMsg = errorContent;
                        this.isErrorDialogShow = true;
                        return Promise.reject();
                    })
            }
        },

        /**
         * Cụm hàm cập nhật dữ liệu lên database
         */
        //Cất
        btnSave(){
            this.formValidation();
            if(this.isAppropriate){
                this.formmodeValidation().then(() => this.hideDialog());
            }
        },
        //Cất và thêm
        btnSaveAndAdd(){
            this.formValidation();
            if(this.isAppropriate){
                this.formmodeValidation().then(() => this.resetEmployee());
            }
        },

        /**
         * cum ham xu ly tab bank
         */
        addBank(){
            var bank = {
                bankId: null,
                userId: null,
                bankCode: "",
                nameBank: "",
                branchBank: "",
                addressBank: "",
            };
            this.banksOfEmployee.push(bank);
        },
        deleteBank(index){
            this.banksOfEmployee.splice(index, 1);
        },
        deleteAllBanks(){
            this.banksOfEmployee = [];
        },

        /**
         * Cum ham xu ly dia chi giao hang (tab 4)
         */
        addDcgh(){
            var dcgh = {
                dcghId: null,
                userId: null,
                diachigh: "",
            };
            this.dcghs.push(dcgh);
        },
        deleteDcgh(index){
            this.dcghs.splice(index, 1);
        },
        deleteAllDcghs(){
            this.dcghs = [];
        }

    },


}
</script>

<style scoped>

    /* midle 2 */
.line-information {
  width: 100%;
  height: 13%;
}

.tab {
  /* margin-left: 20px; */
  margin-top: 10px;
  width: 100%;
  height: 60%;
  border-bottom: 1px solid #d9d9d9;
}

.choice-tab {
  height: 25px;
  background-color: white;
  margin-right: 2px;
  border: 1px solid darkgray;
  border-top-right-radius: 2px !important;
  border-top-left-radius: 2px !important;
  border-bottom: none;
  text-align: center;
}
.choice-tab:hover{
    color: #2ca01c;
}

.choosen {
  padding-top: 8px;
  height: 33px;
  background-color: #d9d9d9;
  text-align: center;
  background-color: #d6e9ff;
  border: 1px solid darkgray;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  color: #2a7920;
}

.content-tab {
  /* margin-top: -5px; */
  width: 100%;
  height: 210px;
  border: 1px solid #d9d9d9;
}

.content-tab .infor-connection,
.infor-bank {
  height: 100%;
  width: 100%;
}

.infor-bank {
  overflow: scroll;
}

.delete-fea {
  cursor: pointer;
}

.infor-bank table {
  width: 99% !important;
  background-color: #d9d9d9 !important;
}

.infor-bank table tbody tr {
  height: 35px !important;
}

.infor-bank table td,
th {
  /* width: 20px !important; */
  padding-left: 8px;
}
/* 
input[type="text"],
input[type="date"] {
  height: 30px !important;
} */


input[type="checkbox"]:focus {
  outline: none !important;
}

.btn-w
{
    height: 25px;
    border-radius: 2px;
    background-color: white;
    border: 1px solid #bfbfbf;
    border-radius: 3px;
    font-weight: bold;
    color: black;
    padding: 5px 10px;
}

.btn-w:hover
{
    cursor: pointer;
}


/*table tab */
table{
    width: 100%;
    border-collapse: collapse;
    margin-top: 5px;
    margin-left: 8px;
}

table th{
    background-color: #e3e7e9;
}

table tbody tr{
    height: 56px;
    background-color: #f2f2f2;
}

table thead tr{
    height: 40px;
}

table td, th{
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    text-align: left;
    height: 30px;
}
table td{
    height: 35px;
}
/* table td input{
    height: 25px;
}
table td input:focus{
    border-color: #2ca01c;
} */
.input-tab-table{
    height: 28px;
    border: 1px solid #babec5;
    box-sizing: border-box;
    border-radius: 3px;
    outline: none;
}
.input-tab-table:focus{
    border-color: #2ca01c;
}

table tr:hover{
    background-color:#d9d9d9;
}

.delete-img
{
    background: url('../../../assets/img/Sprites.64af8f61.svg') no-repeat -445px -303px;
}

/* ghi chu */
textarea{
    resize: none;
}

#textFrame{
    margin: 10px;
    width: 830px;
    height: 190px;
    border: 1px solid #babec5;
    box-sizing: border-box;
    border-radius: 3px;
    outline: none;
    font-size: 15px;
    color: #464646;
    padding: 5px;
}
#textFrame:focus{
    border-color: #2ca01c;
}

/* tab 4 */
.rightTab4{
    width: 45%;
    height: 190px;
    position: absolute;
    right: 30px;
    top: 351px;
}
.rt4-header{
    display: flex;
    height: 30px;
    border-bottom: 2px solid #ccc;
}



/* end style midle-2 */



    b{
    font-size: 13px;
    }

    .dialog_hide {
        display:none;
    }
    .model {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background-color: #000000;
        opacity: .4;
        z-index: 3;
    }
    .dialog-content{
        position: fixed;
        width: 900px;
        height: 625px;
        top: calc(50% - 312px);
        left: calc(50% - 450px);
        background-color: white;
        border-radius: 4px;
        box-sizing: border-box;
        z-index: 3;
    }
    .header{
        display: flex;
        align-items: center;
        width: 100%;
        height: 60px;
        width: 100%;
        padding: 20px 32px;
        padding-right: 12px;
        position: relative;
        overflow: hidden;
        border-radius: 5px 5px 0 0;
        box-sizing: border-box;
    }
    #title{
        font-size: 24px;
        color: #111;
        font-weight: 700;
    }
    .btn-check{
        width: 18px;
        height: 18px;
        cursor: pointer;
        margin-left: 24px;
        margin-right: 8px;
    }
    .div{
        margin-right: 24px;
    }
    .btn-help{
        height: 48px;
        width: 48px;
        position: absolute;
        right: 45px;
        top: 0px;
        min-width: 24px;
        min-height: 24px;
        background: url(../../../assets/img/Sprites.64af8f61.svg) no-repeat;
        cursor: pointer;
        background-position: -70px -132px;
        border: none;
        outline: none;
        border-radius: 0px 4px 0px 4px;
    }
    .btn-X{
        height: 48px;
        width: 48px;
        position: absolute;
        right: 0px;
        top: 0px;
        min-width: 24px;
        min-height: 24px;
        background: url(../../../assets/img/Sprites.64af8f61.svg) no-repeat;
        cursor: pointer;
        background-position: -134px -132px;
        border: none;
        outline: none;
        border-radius: 0px 4px 0px 4px;
    }
    .middle{
        padding: 24px;
    }
    .middle-1{
        display: flex;
    }
    .column{
        width: 420px;
        height: 220px;
    }
    .clm1{
        margin-right: 12px;
    }
    .clm2{
        margin-left: 12px;
    }
    .code-blank-box{
        width: 100%;
        padding: 6px 10px;
        font-size: 13px;
        height: 32px;
        border: 1px solid #babec5;
        box-sizing: border-box;
        margin-top: 5px;
        margin-bottom: 10px;
        border-radius: 3px;
        outline: none;
    }
    .code-blank-box:focus{
        border-color: #2ca01c;
    }
    /* #date-input{
        width: 100%;
        padding: 6px 10px;
        font-size: 13px;
        height: 32px;
        border: 1px solid #babec5;
        box-sizing: border-box;
        margin-top: 8px;
        margin-bottom: 16px;
        border-radius: 3px;
        outline: none;
    }
    .date-blank-box:focus{
        border-color: #2ca01c;
    } */

    .radio-box{
        width: 100%;
        font-size: 13px;
        height: 32px;
        box-sizing: border-box;
        margin-top: 8px;
        margin-bottom: 16px;
        border-radius: 3px;
        display: flex;
        align-items: center;
    }
    .radio-box .gender{
        margin-right: 16px;
    }
    .btn-radio{
        
        /* margin-left: 16px; */
        margin-right: 10px;
        cursor: pointer;
    }

    .fullname-blank-box{
        width: 100%;
        padding: 6px 10px;
        font-size: 13px;
        height: 32px;
        border: 1px solid #babec5;
        box-sizing: border-box;
        margin-top: 5px;
        margin-bottom: 10px;
        border-radius: 3px;
        outline: none;
    }
    .fullname-blank-box:focus{
        border-color: #2ca01c;
    }
    .medium-blank-box{
        width: 100%;
        padding: 6px 10px;
        font-size: 13px;
        height: 32px;
        border: 1px solid #babec5;
        box-sizing: border-box;
        margin-top: 5px;
        margin-bottom: 10px;
        border-radius: 3px;
        display: flex;
        align-items: center;
        outline: none;
    }
    .medium-blank-box:focus{
        border-color: #2ca01c;
    }
    .dropdown-text-and-icon{
        width: 100%;
        padding: 6px 10px;
        font-size: 13px;
        height: 32px;
        border: 1px solid #babec5;
        box-sizing: border-box;
        margin-top: 4px;
        margin-bottom: -2px;
        border-radius: 3px;
        /* box-sizing: border-box; */
        display: flex;
        align-items: center;
    }
    .dropdown-text-and-icon:focus-within{
        border-color: #2ca01c;
    }
    .department-blank-box{
        height: 30px;
        width: calc(100% - 32px);
        /* padding: 6px 0 6px 12px; */
        box-sizing: border-box;
        border: none;
        outline: none;
        border-collapse: collapse;
        border-radius: 4px;
    }
    .icon-plus{
        width: 30px;
        height: 30px;
        border: none;
        outline: none;
        border-collapse: collapse;
        border-radius: 4px;
        background: url("../../../assets/img/Sprites.64af8f61.svg") no-repeat;
        background-position: -278px -465px;
        margin-right: 5px;
    }
    .icon-plus:hover{
        cursor: pointer;
    }
    #dropdown-icon{
        width: 25px;
        height: 30px;
        border: none;
        outline: none;
        border-collapse: collapse;
        border-left: 1px solid #ccc;
        background: url(../../../assets/img/Sprites.64af8f61.svg) no-repeat;
        background-position: -552px -352px;
        transform: rotate(0deg);
        transition: transform .15s linear;
        /* background-color: aqua; */
    }
    #dropdown-icon:hover{
        cursor: pointer;
    }
    #dropdown-icon-1{
        width: 25px;
        height: 30px;
        border: none;
        outline: none;
        border-collapse: collapse;
        background: url(../../../assets/img/Sprites.64af8f61.svg) no-repeat;
        background-position: -548px -353px;
        transform: rotate(0deg);
        transition: transform .15s linear;
        /* background-color: aqua; */
    }

    .large-blank-box{
        width: 100%;
        padding: 6px 10px;
        font-size: 13px;
        height: 32px;
        border: 1px solid #babec5;
        box-sizing: border-box;
        margin-top: 8px;
        margin-bottom: 16px;
        border-radius: 3px;
        outline: none;
    }
    .large-blank-box:focus{
        border-color: #2ca01c;
    }
    .column-1{
        width: 220px;
        height: 100px;
    }
    .small-blank-box{
        width: 214px;
        padding: 6px 10px;
        font-size: 13px;
        height: 32px;
        border: 1px solid #babec5;
        box-sizing: border-box;
        margin-top: 8px;
        margin-bottom: 16px;
        outline: none;
        border-radius: 3px;
    }
    .small-blank-box:focus{
        border-color: #2ca01c;

    }
    .footer{
        position: absolute;
        bottom: 0px;
        width: calc(100% - 48px);
        height: 68px;
        display: flex;
        align-items: center;
        /* background-color: aqua; */
        margin-left: 24px;
        margin-right: 24px;
        box-sizing: border-box;
        border-top: 1px solid #ccc;
    }
    .btn-small{
        height: 36px;
        padding: 8px 20px;
        border: 1px solid #8d9096;
        color: #111;
        background-color: transparent;
        border-radius: 3px;
        cursor: pointer;
    }
    .btn-post-and-put{
        position: absolute;
        right: 0px;
        height: 36px;
        padding: 8px 20px;
        border: 1px solid transparent;
        color: #fff;
        background-color: #2ca01c;
        border-radius: 3px;
        cursor: pointer;
    }
    .btn-post-and-put:hover{
        background-color: #2a7920;
    }
    .post{
        position: absolute;
        right: 124px;
    }

    #dropdown{
            position: relative;
            display: inline-block;
            width: 100%;
            /* background-color: #2ca01c; */
        }
        .dropdown-content{
            /* height: 120px; */
            width: 410px;
            
            top: -6px;
            position: absolute;
            /* right: 0px; */
            border: 1px solid;
            background-color: #fff;
            border-radius: 3px;
            border: 1px solid #babec5;
        }
        .dropdown-content-a{
            /* position: absolute; */
            height: 24px;
            width: 100%;
            display: flex;
            align-items: center;
            padding-left: 12px;
            box-sizing: border-box;
            border: none;
            outline: none;
            font-size: 13px;
            margin-bottom: 2px;
        }
        .dropdown-content-a:hover{
            color: #2ca01c;
            background-color: rgb(219, 219, 219);
        }
        .drop-down-content-selected{
            background-color: #2ca01c;
            color: #fff;
        }
        .drop-down-content-selected:hover{
            background-color: #2ca01c;
            color: #fff;
        }

    .blank-box-invalid {
        border-color: #F65454;
        outline: none;
    }
    .error-message{
        position: absolute;
        top: 50px;
        left: calc(50% - 80px);
        background-color: black;
        color: #babec5;
        font-size: 11px;
        padding-left: 8px;
        padding-top: 2px;
        padding-bottom: 2px;
        padding-right: 8px;
        width: 160px;
        border-radius: 4px;
    }

    .tooltiptext {
        visibility: hidden;
        background-color: black;
        color: #babec5;
        font-size: 11px;
        text-align: center;
        border-radius: 2px;
        padding: 4px;

        /* Position the tooltip */
        position: fixed;
        top: 13%;
        left: 62%;
        z-index: 1;
        }

    .btn-help:hover .tooltiptext {
    visibility: visible;
    }


</style>