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
                                </div>
                                <input type="text" class="fullname-blank-box" 
                                    ref="nccMst"
                                    v-model="ncc.nccMst"
                                />                    
                            </div>
                            <div style="width: 65%; margin-left: 2px">
                                <div style="position: relative"><b>Mã nhà cung cấp</b> <span style="color: red;">*</span>
                                    <div class="error-message" v-show="isValid.nccCodeMessage == false">Mã nhà cung cấp chưa hợp lệ</div>
                                </div>
                                <input type="text" class="code-blank-box"
                                    :class="{'blank-box-invalid': isValid.nccCode == false}"
                                    v-model="ncc.nccCode"
                                    @mouseenter="mouseEnterError('nccCode')"
                                    @mouseleave="mouseLeaveError()"
                                />
                            </div>
                        </div>
                        <div style="position: relative"><b>Tên nhà cung cấp</b><span style="color: red;">*</span>
                            <div class="error-message" v-show="isValid.nccNameMessage == false">Tên nhà cung cấp chưa hợp lệ</div>
                        </div>
                        <input type="text" class="medium-blank-box" 
                            :class="{'blank-box-invalid': isValid.nccName == false}"
                            v-model="ncc.nccName"
                            @mouseenter="mouseEnterError('nccName')"
                            @mouseleave="mouseLeaveError()"
                        />
                        <div><b>Địa chỉ</b></div>
                        <textarea rows="2" type="text" class="medium-blank-box" style="height: 64px; font-size: 14px;" 
                            placeholder="VD: Số 82 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội"
                        v-model="ncc.nccAddress"/>
                    </div>
                    <div class="column clm2">
                        <div style="display: flex; align-items: center">
                            <div style="width: 35%; margin-right: 2px;">
                                <div><b>Điện thoại</b></div>
                                <input type="text" class="fullname-blank-box" v-model="ncc.nccPhone" />                     
                            </div>
                            <div style="width: 65%; margin-left: 2px; padding-left: 6px;">
                                <div><b>Website</b></div>
                                <input type="text" class="fullname-blank-box" v-model="ncc.nccWebsite"/> 
                            </div>
                        </div>
                        <div style="align-items: center;">
                            <div style="position: relative; width: 100%;"><b>Nhóm nhà cung cấp</b> <span style="color: red;">*</span>
                            </div>

                            <!-- combobox -->
                            <!-- <div class="dropdown-text-and-icon" :class="{'blank-box-invalid': isValid.departmentName == false}">
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
                            </div> -->
                            <!-- <div id="dropdown">     
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
                            </div> -->

                            <div class="dropdown-text-and-icon">
                                <input type="text" class="department-blank-box"  
                                id="departmentName"
                                v-model="ncc.nhomNcc"
                                />
                                <div class="icon-plus"></div>
                                <button id="dropdown-icon"></button>
                            </div>
                        </div>
                        <div style="align-items: center;">
                            <div style="width: 100%; margin-top: 15px;"><b>Nhân viên mua hàng</b></div>
                            <!-- combobox -->
                            <div class="dropdown-text-and-icon" style="margin-top: 3px;">
                                <input type="text" class="department-blank-box" v-model="ncc.nvMuahang"
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
                                                    margin-top: 5px;
                                                    margin-bottom: -7px;"
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
                                                
                                                <div class="dropdown-content-a" style="height: 30px; cursor: pointer;"
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
                                        <input style="margin-top: 21px; font-style: italic;" type="text" class="code-blank-box" placeholder="Họ và tên"
                                        v-model="ncc.nlhName"/>
                                    </div>
                                    <div style="width: 47%; margin-left: 3%;">
                                        <div style="position: relative"><b>Đại diện theo PL</b>
                                        </div>
                                        <input type="text" class="fullname-blank-box" placeholder="Đại diện theo pháp luật" style="font-style: italic;"
                                        v-model="ncc.nlhPhapluat"/>                    
                                    </div>
                                </div>
                                <input type="text" class="medium-blank-box" placeholder="Email"
                                    style="width: 47%; margin-left: 12px; font-style: italic; margin-top: -4px;"
                                    v-model="ncc.nlhEmail"
                                />
                                <input type="text" class="medium-blank-box" placeholder="Số điện thoại"
                                    style="width: 47%; margin-left: 12px; font-style: italic; margin-top: -4px;"
                                    v-model="ncc.nlhPhone"
                                />
                            </div>
                            <div v-show="showTab == 2" class="infor-connetion">
                                <div style="display: flex; align-items: center; width: 100%; margin-left: 12px; margin-top: 10px;">                          
                                    <div style="width: 22%; margin-right: 5px">
                                        <div style="position: relative;"><b>Điều khoản thanh toán</b></div>
                                        <div class="dropdown-text-and-icon"
                                            style=" width: 100%;
                                                    padding: 6px 10px;
                                                    font-size: 13px;
                                                    height: 32px;
                                                    margin-top: 5px;
                                                    margin-bottom: -10px;"
                                                    >
                                            <input type="text" class="department-blank-box" style="font-style: italic;"
                                                @focus="showDropDownContentDktt()" 
                                                @blur="hideDropDownContentDktt()"
                                                @keyup="searchOptionDktt()"
                                                v-model="dktt.id"
                                            />
                                            <div class="icon-plus" style="margin-right: 8px;"
                                                @focus="showDropDownContentDktt()" 
                                                @blur="hideDropDownContentDktt()"
                                            ></div>
                                            <button id="dropdown-icon-1" style="background-position: -552px -353px; border-left: 1px solid #ccc;"
                                                @focus="showDropDownContentDktt()" 
                                                @blur="hideDropDownContentDktt()"
                                            ></button>
                                        </div> 
                                        <div id="dropdown">     
                                            <div class="dropdown-content" :class="{'dialog_hide': !isShowOptionDktt}" 
                                                style="width: ; max-height: 110px; overflow-y: scroll; z-index: 1;"
                                            >
                                                <div class="pre-line-options" style="display: flex; margin-left: 10px; height: 30px; font-weight: bold; align-items: center;">
                                                    <span style="margin-right: 50px;">Mã điều khoản thanh toán </span>
                                                    <span>Tên điều khoản thanh toán </span>
                                                </div>
                                                <div class="dropdown-content-a" style="height: 30px;"
                                                :class="{'drop-down-content-selected' : optionDktt.id == dktt.id}"
                                                v-for="optionDktt in optionsDktt" 
                                                :key="optionDktt.id" 
                                                @click="chooseOptionDktt(optionDktt)" 
                                                @mouseenter="enterClick()" 
                                                @mouseleave="leaveClick()"
                                                >
                                                    <div class="line-options" style="cursor: pointer;">
                                                        <span style="margin-right: 185px;">{{optionDktt.id}}  </span>
                                                        <span>{{optionDktt.name}} </span>
                                                    </div>
                                                  
                                                </div>
                                            </div>
                                        </div>                 
                                    </div>
                                    <div style="width: 22%; margin-left: 5px">
                                        <div style="position: relative;"><b>Số ngày được nợ</b>
                                        </div>
                                        <input style="font-style: italic;" type="text" class="code-blank-box" v-model="ncc.dkttSongay"/>
                                    </div>
                                    <div style="width: 22%; margin-left: 10px;">
                                        <div style="position: relative"><b>Số nợ tối đa</b>
                                        </div>
                                        <input type="text" class="fullname-blank-box" style="font-style: italic;" v-model="ncc.dkttSono"/>                    
                                    </div>
                                </div>
                                <div style="position: relative; margin: 0 0 8px 12px;"><b>Tài khoản cồng nợ phải trả</b></div>
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
                                    <input type="text" class="department-blank-box" style="font-style: italic;"
                                        @focus="showDropDownContentTkcn()" 
                                        @blur="hideDropDownContentTkcn()"
                                        v-model="tkcn.id"
                                    />
                                    <button id="dropdown-icon-1" style="background-position: -552px -353px;"
                                        @focus="showDropDownContentTkcn()" 
                                        @blur="hideDropDownContentTkcn()"
                                    ></button>
                                </div>
                                <div id="dropdown">     
                                    <div class="dropdown-content" :class="{'dialog_hide': !isShowOptionTkcn}" 
                                        style="width: 400px; ; max-height: 110px; overflow-y: scroll; z-index: 1; margin-left: 10px; margin-top: -15px;"
                                    >
                                        <div class="pre-line-options" style="display: flex; margin-left: 10px; height: 30px; font-weight: bold; align-items: center;">
                                            <span style="margin-right: 50px;">Số tài khoản </span>
                                            <span>Tên tài khoản </span>
                                        </div>
                                        <div class="dropdown-content-a" style="height: 30px;"
                                        :class="{'drop-down-content-selected' : optionTkcn.id == tkcn.id}"
                                        v-for="optionTkcn in optionsTkcn" 
                                        :key="optionTkcn.id" 
                                        @click="chooseOptionTkcn(optionTkcn)" 
                                        @mouseenter="enterClick()" 
                                        @mouseleave="leaveClick()"
                                        >
                                            <div class="line-options" style="cursor: pointer; display: flex;">
                                                <span style="width: 50px; margin-right: 72px;">{{optionTkcn.id}} </span>
                                                <span>{{optionTkcn.name}} </span>
                                            </div>                                            
                                        </div>
                                    </div>
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
                                    <tbody v-for="(bank, index) in banksOfNcc" :key="index" >
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
                                            v-model="bank.bankName"
                                        />
                                        </td>
                                        <td><input type="text"  class="input-tab-table" style="width: 210px" 
                                            v-model="bank.bankBranch" /></td>
                                        <td><input type="text"  class="input-tab-table" style="width: 200px;"
                                            v-model="bank.bankPlace"/></td>
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
                                                    margin-top: 11px;
                                                    margin-bottom: 0px;"
                                                    >
                                            <input type="text" class="department-blank-box" placeholder="Quốc gia" style="font-style: italic;"
                                                @focus="showDropDownContentQg()" 
                                                @blur="hideDropDownContentQg()"
                                                @keyup="searchOptionQg()"
                                                v-model="qgSelected"
                                            />
                                            <button id="dropdown-icon-1"
                                                @focus="showDropDownContentQg()" 
                                                @blur="hideDropDownContentQg()"
                                            ></button>
                                        </div>
                                        <div id="dropdown">     
                                            <div class="dropdown-content" :class="{'dialog_hide': !isShowOptionQg}" 
                                                style="width: 194px; ; max-height: 130px; overflow-y: scroll; z-index: 1; margin-top: -5px;"
                                            >
                                                <div class="dropdown-content-a" style="height: 34px;"
                                                :class="{'drop-down-content-selected' : optionQg.code == qg.code}"
                                                v-for="optionQg in optionsQg" 
                                                :key="optionQg.code" 
                                                @click="chooseOptionQg(optionQg)" 
                                                @mouseenter="enterClick()" 
                                                @mouseleave="leaveClick()"
                                                >
                                                    <div class="line-options" style="cursor: pointer;">
                                                        <span>{{optionQg.name}} </span>
                                                    </div>                                            
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="width: 46%; margin-left: 5px">
                                        <div class="dropdown-text-and-icon"
                                            style=" width: 100%;
                                                    padding: 6px 10px;
                                                    padding-right: 0px;
                                                    font-size: 13px;
                                                    height: 32px;
                                                    margin-top: 27px;
                                                    margin-bottom: 0px;"
                                                    >
                                            <input type="text" class="department-blank-box" placeholder="Tỉnh / Thành phố" style="font-style: italic;"
                                                @focus="showDropDownContentTt()" 
                                                @blur="hideDropDownContentTt()"
                                                @keyup="searchOptionTt()"
                                                v-model="ttSelected"
                                            />
                                            <button id="dropdown-icon-1" 
                                                @focus="showDropDownContentTt()" 
                                                @blur="hideDropDownContentTt()"
                                            ></button>
                                        </div>
                                        <div id="dropdown">     
                                            <div class="dropdown-content" :class="{'dialog_hide': !isShowOptionTt}" 
                                                style="width: 194px; ; max-height: 130px; overflow-y: scroll; z-index: 1; margin-top: -5px;"
                                            >
                                                <div class="dropdown-content-a" style="height: 34px;"
                                                :class="{'drop-down-content-selected' : optionTt.code == tt.code}"
                                                v-for="optionTt in optionsTt" 
                                                :key="optionTt.code" 
                                                @click="chooseOptionTt(optionTt)" 
                                                @mouseenter="enterClick()" 
                                                @mouseleave="leaveClick()"
                                                >
                                                    <div class="line-options" style="cursor: pointer;">
                                                        <span>{{optionTt.name}} </span>
                                                    </div>                                            
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="rightTab4" style="height:  200px; overflow: scroll">
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
                                                    margin-top: -10px;
                                                    margin-bottom: 15px;"
                                                    >
                                            <input type="text" class="department-blank-box" placeholder="Quận / Huyện" style="font-style: italic;"
                                                @focus="showDropDownContentQh()" 
                                                @blur="hideDropDownContentQh()"
                                                @keyup="searchOptionQh()"
                                                v-model="qhSelected"
                                            />
                                            <button id="dropdown-icon-1"
                                                @focus="showDropDownContentQh()" 
                                                @blur="hideDropDownContentQh()"
                                            ></button>
                                        </div> 
                                        <div id="dropdown">     
                                            <div class="dropdown-content" :class="{'dialog_hide': !isShowOptionQh}" 
                                                style="width: 194px; ; max-height: 125px; overflow-y: scroll; z-index: 1; margin-top: -15px;"
                                            >
                                                <div class="dropdown-content-a" style="height: 34px;"
                                                :class="{'drop-down-content-selected' : optionQh.code == qh.code}"
                                                v-for="optionQh in optionsQh" 
                                                :key="optionQh.code" 
                                                @click="chooseOptionQh(optionQh)" 
                                                @mouseenter="enterClick()" 
                                                @mouseleave="leaveClick()"
                                                >
                                                    <div class="line-options" style="cursor: pointer;">
                                                        <span>{{optionQh.name}} </span>
                                                    </div>                                            
                                                </div>
                                            </div>
                                        </div>                   
                                    </div>
                                    <div style="width: 46%; margin-left: 5px">
                                        <div class="dropdown-text-and-icon"
                                            style=" width: 100%;
                                                    padding: 6px 10px;
                                                    padding-right: 0px;
                                                    font-size: 13px;
                                                    height: 32px;
                                                    margin-top: -10px;
                                                    margin-bottom: 15px;"
                                                    >
                                            <input type="text" class="department-blank-box" placeholder="Xã / Phường" style="font-style: italic;"
                                                @focus="showDropDownContentXp()" 
                                                @blur="hideDropDownContentXp()"
                                                @keyup="searchOptionXp()"
                                                v-model="xpSelected"
                                            />
                                            <button id="dropdown-icon-1"
                                                @focus="showDropDownContentXp()" 
                                                @blur="hideDropDownContentXp()"
                                            ></button>
                                        </div> 
                                        <div id="dropdown">     
                                            <div class="dropdown-content" :class="{'dialog_hide': !isShowOptionXp}" 
                                                style="width: 194px; ; max-height: 125px; overflow-y: scroll; z-index: 1; margin-top: -15px;"
                                            >
                                                <div class="dropdown-content-a" style="height: 34px;"
                                                :class="{'drop-down-content-selected' : optionXp.code == xp.code}"
                                                v-for="optionXp in optionsXp" 
                                                :key="optionXp.code" 
                                                @click="chooseOptionXp(optionXp)" 
                                                @mouseenter="enterClick()" 
                                                @mouseleave="leaveClick()"
                                                >
                                                    <div class="line-options" style="cursor: pointer;">
                                                        <span>{{optionXp.name}} </span>
                                                    </div>                                            
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <div v-show="showTab == 5" class="noteTab">
                                <textarea name="" id="textFrame" cols="50" rows="5" v-model="ncc.ghichu"></textarea>
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

    const getAll = "https://localhost:44342/api/v1/Nccs/"
    const getAllBankNcc = "https://localhost:44342/api/v1/BankNccs/"
    const getBankNccByUserId = "https://localhost:44342/api/v1/Nccs/GetAllBankNccByUserId/"

    const form = {
        add: "add",
        edit: "edit"
    }
    const errorMessage = {
        nullNccName: "Tên không được để trống.",
        nullNccCode: "Mã nhà cung cấp không được để trống.",
        dataChange: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",
    }
    const property = {
        nccName: "nccName",
        nccCode: "nccCode",
    }


export default {
    components: {
        DataChange,
        ErrorDialog,
        ErrorPopUp,
        // datepicker,
    },

    created() {
        // this.banksOfNcc.push(this.bank); //auto có 1 hàng bank ban đầu

        //format combobox before edit
        //Khi bind dữ liệu từ table lên dialog, phần combobox nếu muốn bôi xanh vào dữ liệu từ trước thì phải gán cho nó theo id
        //ở dktt và tkcn phần create đã gán theo id luôn rồi nên chạy ok, còn phần danhXung thì chưa biết cách gánn id cho nó kiểu gì
        this.danhXung.name = this.ncc.nlhXungho;
        this.dktt.id = this.ncc.dkttMa;
        this.tkcn.id = this.ncc.tkcnMa;

        //tab ngân hàng, gọi các nhân hàng ra rồi bind lên table
        if(this.formmode == form.edit)
        {
            axios
                .get(getBankNccByUserId + this.ncc.nccId)
                .then((res) => {
                    this.banksOfNcc = res.data;
                    // console.log(res);
                    console.log(res.status);
                    if(res.status == 204){
                        this.checkIfListBankEmptyEdit = true;
                    }
                    
                })
                .catch((res) => {
                    console.log(res);
                })
        }

        //tab4, địa chỉ khác
        //phần này đáng ra ở database phải tạo table mới như BankNcc rồi làm giống vậy, nhưng lười nên làm 
        //thành 1 thuộc tính của bảng Ncc luôn -> khi post mới lên mà có nhiều địa chỉ khác 
        //thì phải lấy cái dòng cuối cùng (dcghs[dcghs.length - 1])
        var tempDcgh = {
            diachigh: this.ncc.dcgh
        }
        this.dcghs.push(tempDcgh);

        this.qgSelected = this.ncc.dckQg;
        this.ttSelected = this.ncc.dckTt;
        this.qhSelected = this.ncc.dckQh;
        this.xpSelected = this.ncc.dckXp;

    },

    data() {
        return {

            checkIfListBankEmptyEdit: false, //biến để fix lỗi khi mà edit ncc không lk bank nào thì bấm thêm dòng bị lỗi

            //xưng hô (tab1)
            danhXung: {
                id: null,
                name: "",
            },
            initialDanhxung: "", //dùng trong việc so sánh xem data có thay đổi không để báo dialog dataChange

            //điều khoản thanh toán (tab2)
            dktt: {
                id: null,
                name: "",
            },
            initialDktt: "",
            //tài khoản cồng nợ (tab2)
            tkcn: {
                id: null,
                name: "",
            },
            initialTkcn: "",
            //Quốc gia (tab4)
            qg: {
                code: null,
                name: "",
            },
            qgSelected: [],
            //Tỉnh / Thành
            optionsTt: [],
            initialOptionsTt: [],
            tt: {
                code: null,
                name: "",
            },
            ttSelected: [],
            //Quận / Huyện
            optionsQh: [],
            initialOptionsQh: [],
            qh: {
                code: null,
                name: "",
            },
            qhSelected: [],
            //Xã / Phường
            optionsXp: [],
            initialOptionsXp: [],
            tempXp: [], //hàm tạm để so sánh để lấy dữ liệu xã phường (do api nên phải nghĩ ra cách này)
            xp: {
                code: null,
                name: "",
            },
            xpSelected: [],
            initialVitri: "", //biến so sánh về các lựa chọn vị trí có thay đổi không để báo dataChange, làm biến gộp chung cả QG, TT, QH, XP lại cho nhanh

            //Biến kiểm tra xem dữ liệu combobox có show ra hay không
            isShowOption: false,
            isShowOptionName: false,
            isShowOptionDktt: false,
            isShowOptionTkcn: false,
            isShowOptionQg: false,
            isShowOptionTt: false,
            isShowOptionQh: false,
            isShowOptionXp: false,
            //Option được chọn trong dropbox
            // selectedOption: {
            //     id: null,
            //     name: null
            // },
            //Danh sách các lựa chọn
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
            optionsDktt: [
                {
                    id: "ĐK1",
                    name: "Điều khoản 1",
                },
                {
                    id: "ĐK2",
                    name: "Điều khoản 2",
                },
            ],
            optionsTkcn: [
                {
                    id: "331",
                    name: "Phải trả cho người bán",
                },
                {
                    id: "3348",
                    name: "Phải trả cho người lao động khác",
                },
            ],
            optionsQg: [ 
                {name: 'Afghanistan', code: 'AF'}, 
                {name: 'Åland Islands', code: 'AX'}, 
                {name: 'Albania', code: 'AL'}, 
                {name: 'Algeria', code: 'DZ'}, 
                {name: 'American Samoa', code: 'AS'}, 
                {name: 'AndorrA', code: 'AD'}, 
                {name: 'Angola', code: 'AO'}, 
                {name: 'Anguilla', code: 'AI'}, 
                {name: 'Antarctica', code: 'AQ'}, 
                {name: 'Antigua and Barbuda', code: 'AG'}, 
                {name: 'Argentina', code: 'AR'}, 
                {name: 'Armenia', code: 'AM'}, 
                {name: 'Aruba', code: 'AW'}, 
                {name: 'Australia', code: 'AU'}, 
                {name: 'Austria', code: 'AT'}, 
                {name: 'Azerbaijan', code: 'AZ'}, 
                {name: 'Bahamas', code: 'BS'}, 
                {name: 'Bahrain', code: 'BH'}, 
                {name: 'Bangladesh', code: 'BD'}, 
                {name: 'Barbados', code: 'BB'}, 
                {name: 'Belarus', code: 'BY'}, 
                {name: 'Belgium', code: 'BE'}, 
                {name: 'Belize', code: 'BZ'}, 
                {name: 'Benin', code: 'BJ'}, 
                {name: 'Bermuda', code: 'BM'}, 
                {name: 'Bhutan', code: 'BT'}, 
                {name: 'Bolivia', code: 'BO'}, 
                {name: 'Bosnia and Herzegovina', code: 'BA'}, 
                {name: 'Botswana', code: 'BW'}, 
                {name: 'Bouvet Island', code: 'BV'}, 
                {name: 'Brazil', code: 'BR'}, 
                {name: 'British Indian Ocean Territory', code: 'IO'}, 
                {name: 'Brunei Darussalam', code: 'BN'}, 
                {name: 'Bulgaria', code: 'BG'}, 
                {name: 'Burkina Faso', code: 'BF'}, 
                {name: 'Burundi', code: 'BI'}, 
                {name: 'Cambodia', code: 'KH'}, 
                {name: 'Cameroon', code: 'CM'}, 
                {name: 'Canada', code: 'CA'}, 
                {name: 'Cape Verde', code: 'CV'}, 
                {name: 'Cayman Islands', code: 'KY'}, 
                {name: 'Central African Republic', code: 'CF'}, 
                {name: 'Chad', code: 'TD'}, 
                {name: 'Chile', code: 'CL'}, 
                {name: 'China', code: 'CN'}, 
                {name: 'Christmas Island', code: 'CX'}, 
                {name: 'Cocos (Keeling) Islands', code: 'CC'}, 
                {name: 'Colombia', code: 'CO'}, 
                {name: 'Comoros', code: 'KM'}, 
                {name: 'Congo', code: 'CG'}, 
                {name: 'Congo, The Democratic Republic of the', code: 'CD'}, 
                {name: 'Cook Islands', code: 'CK'}, 
                {name: 'Costa Rica', code: 'CR'}, 
                {name: 'Cote D\'Ivoire', code: 'CI'}, 
                {name: 'Croatia', code: 'HR'}, 
                {name: 'Cuba', code: 'CU'}, 
                {name: 'Cyprus', code: 'CY'}, 
                {name: 'Czech Republic', code: 'CZ'}, 
                {name: 'Denmark', code: 'DK'}, 
                {name: 'Djibouti', code: 'DJ'}, 
                {name: 'Dominica', code: 'DM'}, 
                {name: 'Dominican Republic', code: 'DO'}, 
                {name: 'Ecuador', code: 'EC'}, 
                {name: 'Egypt', code: 'EG'}, 
                {name: 'El Salvador', code: 'SV'}, 
                {name: 'Equatorial Guinea', code: 'GQ'}, 
                {name: 'Eritrea', code: 'ER'}, 
                {name: 'Estonia', code: 'EE'}, 
                {name: 'Ethiopia', code: 'ET'}, 
                {name: 'Falkland Islands (Malvinas)', code: 'FK'}, 
                {name: 'Faroe Islands', code: 'FO'}, 
                {name: 'Fiji', code: 'FJ'}, 
                {name: 'Finland', code: 'FI'}, 
                {name: 'France', code: 'FR'}, 
                {name: 'French Guiana', code: 'GF'}, 
                {name: 'French Polynesia', code: 'PF'}, 
                {name: 'French Southern Territories', code: 'TF'}, 
                {name: 'Gabon', code: 'GA'}, 
                {name: 'Gambia', code: 'GM'}, 
                {name: 'Georgia', code: 'GE'}, 
                {name: 'Germany', code: 'DE'}, 
                {name: 'Ghana', code: 'GH'}, 
                {name: 'Gibraltar', code: 'GI'}, 
                {name: 'Greece', code: 'GR'}, 
                {name: 'Greenland', code: 'GL'}, 
                {name: 'Grenada', code: 'GD'}, 
                {name: 'Guadeloupe', code: 'GP'}, 
                {name: 'Guam', code: 'GU'}, 
                {name: 'Guatemala', code: 'GT'}, 
                {name: 'Guernsey', code: 'GG'}, 
                {name: 'Guinea', code: 'GN'}, 
                {name: 'Guinea-Bissau', code: 'GW'}, 
                {name: 'Guyana', code: 'GY'}, 
                {name: 'Haiti', code: 'HT'}, 
                {name: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
                {name: 'Holy See (Vatican City State)', code: 'VA'}, 
                {name: 'Honduras', code: 'HN'}, 
                {name: 'Hong Kong', code: 'HK'}, 
                {name: 'Hungary', code: 'HU'}, 
                {name: 'Iceland', code: 'IS'}, 
                {name: 'India', code: 'IN'}, 
                {name: 'Indonesia', code: 'ID'}, 
                {name: 'Iran, Islamic Republic Of', code: 'IR'}, 
                {name: 'Iraq', code: 'IQ'}, 
                {name: 'Ireland', code: 'IE'}, 
                {name: 'Isle of Man', code: 'IM'}, 
                {name: 'Israel', code: 'IL'}, 
                {name: 'Italy', code: 'IT'}, 
                {name: 'Jamaica', code: 'JM'}, 
                {name: 'Japan', code: 'JP'}, 
                {name: 'Jersey', code: 'JE'}, 
                {name: 'Jordan', code: 'JO'}, 
                {name: 'Kazakhstan', code: 'KZ'}, 
                {name: 'Kenya', code: 'KE'}, 
                {name: 'Kiribati', code: 'KI'}, 
                {name: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 
                {name: 'Korea, Republic of', code: 'KR'}, 
                {name: 'Kuwait', code: 'KW'}, 
                {name: 'Kyrgyzstan', code: 'KG'}, 
                {name: 'Lao People\'S Democratic Republic', code: 'LA'}, 
                {name: 'Latvia', code: 'LV'}, 
                {name: 'Lebanon', code: 'LB'}, 
                {name: 'Lesotho', code: 'LS'}, 
                {name: 'Liberia', code: 'LR'}, 
                {name: 'Libyan Arab Jamahiriya', code: 'LY'}, 
                {name: 'Liechtenstein', code: 'LI'}, 
                {name: 'Lithuania', code: 'LT'}, 
                {name: 'Luxembourg', code: 'LU'}, 
                {name: 'Macao', code: 'MO'}, 
                {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
                {name: 'Madagascar', code: 'MG'}, 
                {name: 'Malawi', code: 'MW'}, 
                {name: 'Malaysia', code: 'MY'}, 
                {name: 'Maldives', code: 'MV'}, 
                {name: 'Mali', code: 'ML'}, 
                {name: 'Malta', code: 'MT'}, 
                {name: 'Marshall Islands', code: 'MH'}, 
                {name: 'Martinique', code: 'MQ'}, 
                {name: 'Mauritania', code: 'MR'}, 
                {name: 'Mauritius', code: 'MU'}, 
                {name: 'Mayotte', code: 'YT'}, 
                {name: 'Mexico', code: 'MX'}, 
                {name: 'Micronesia, Federated States of', code: 'FM'}, 
                {name: 'Moldova, Republic of', code: 'MD'}, 
                {name: 'Monaco', code: 'MC'}, 
                {name: 'Mongolia', code: 'MN'}, 
                {name: 'Montserrat', code: 'MS'}, 
                {name: 'Morocco', code: 'MA'}, 
                {name: 'Mozambique', code: 'MZ'}, 
                {name: 'Myanmar', code: 'MM'}, 
                {name: 'Namibia', code: 'NA'}, 
                {name: 'Nauru', code: 'NR'}, 
                {name: 'Nepal', code: 'NP'}, 
                {name: 'Netherlands', code: 'NL'}, 
                {name: 'Netherlands Antilles', code: 'AN'}, 
                {name: 'New Caledonia', code: 'NC'}, 
                {name: 'New Zealand', code: 'NZ'}, 
                {name: 'Nicaragua', code: 'NI'}, 
                {name: 'Niger', code: 'NE'}, 
                {name: 'Nigeria', code: 'NG'}, 
                {name: 'Niue', code: 'NU'}, 
                {name: 'Norfolk Island', code: 'NF'}, 
                {name: 'Northern Mariana Islands', code: 'MP'}, 
                {name: 'Norway', code: 'NO'}, 
                {name: 'Oman', code: 'OM'}, 
                {name: 'Pakistan', code: 'PK'}, 
                {name: 'Palau', code: 'PW'}, 
                {name: 'Palestinian Territory, Occupied', code: 'PS'}, 
                {name: 'Panama', code: 'PA'}, 
                {name: 'Papua New Guinea', code: 'PG'}, 
                {name: 'Paraguay', code: 'PY'}, 
                {name: 'Peru', code: 'PE'}, 
                {name: 'Philippines', code: 'PH'}, 
                {name: 'Pitcairn', code: 'PN'}, 
                {name: 'Poland', code: 'PL'}, 
                {name: 'Portugal', code: 'PT'}, 
                {name: 'Puerto Rico', code: 'PR'}, 
                {name: 'Qatar', code: 'QA'}, 
                {name: 'Reunion', code: 'RE'}, 
                {name: 'Romania', code: 'RO'}, 
                {name: 'Russian Federation', code: 'RU'}, 
                {name: 'RWANDA', code: 'RW'}, 
                {name: 'Saint Helena', code: 'SH'}, 
                {name: 'Saint Kitts and Nevis', code: 'KN'}, 
                {name: 'Saint Lucia', code: 'LC'}, 
                {name: 'Saint Pierre and Miquelon', code: 'PM'}, 
                {name: 'Saint Vincent and the Grenadines', code: 'VC'}, 
                {name: 'Samoa', code: 'WS'}, 
                {name: 'San Marino', code: 'SM'}, 
                {name: 'Sao Tome and Principe', code: 'ST'}, 
                {name: 'Saudi Arabia', code: 'SA'}, 
                {name: 'Senegal', code: 'SN'}, 
                {name: 'Serbia and Montenegro', code: 'CS'}, 
                {name: 'Seychelles', code: 'SC'}, 
                {name: 'Sierra Leone', code: 'SL'}, 
                {name: 'Singapore', code: 'SG'}, 
                {name: 'Slovakia', code: 'SK'}, 
                {name: 'Slovenia', code: 'SI'}, 
                {name: 'Solomon Islands', code: 'SB'}, 
                {name: 'Somalia', code: 'SO'}, 
                {name: 'South Africa', code: 'ZA'}, 
                {name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
                {name: 'Spain', code: 'ES'}, 
                {name: 'Sri Lanka', code: 'LK'}, 
                {name: 'Sudan', code: 'SD'}, 
                {name: 'Suriname', code: 'SR'}, 
                {name: 'Svalbard and Jan Mayen', code: 'SJ'}, 
                {name: 'Swaziland', code: 'SZ'}, 
                {name: 'Sweden', code: 'SE'}, 
                {name: 'Switzerland', code: 'CH'}, 
                {name: 'Syrian Arab Republic', code: 'SY'}, 
                {name: 'Taiwan, Province of China', code: 'TW'}, 
                {name: 'Tajikistan', code: 'TJ'}, 
                {name: 'Tanzania, United Republic of', code: 'TZ'}, 
                {name: 'Thailand', code: 'TH'}, 
                {name: 'Timor-Leste', code: 'TL'}, 
                {name: 'Togo', code: 'TG'}, 
                {name: 'Tokelau', code: 'TK'}, 
                {name: 'Tonga', code: 'TO'}, 
                {name: 'Trinidad and Tobago', code: 'TT'}, 
                {name: 'Tunisia', code: 'TN'}, 
                {name: 'Turkey', code: 'TR'}, 
                {name: 'Turkmenistan', code: 'TM'}, 
                {name: 'Turks and Caicos Islands', code: 'TC'}, 
                {name: 'Tuvalu', code: 'TV'}, 
                {name: 'Uganda', code: 'UG'}, 
                {name: 'Ukraine', code: 'UA'}, 
                {name: 'United Arab Emirates', code: 'AE'}, 
                {name: 'United Kingdom', code: 'GB'}, 
                {name: 'United States', code: 'US'}, 
                {name: 'United States Minor Outlying Islands', code: 'UM'}, 
                {name: 'Uruguay', code: 'UY'}, 
                {name: 'Uzbekistan', code: 'UZ'}, 
                {name: 'Vanuatu', code: 'VU'}, 
                {name: 'Venezuela', code: 'VE'}, 
                {name: 'Việt Nam', code: 'VN'}, 
                {name: 'Virgin Islands, British', code: 'VG'}, 
                {name: 'Virgin Islands, U.S.', code: 'VI'}, 
                {name: 'Wallis and Futuna', code: 'WF'}, 
                {name: 'Western Sahara', code: 'EH'}, 
                {name: 'Yemen', code: 'YE'}, 
                {name: 'Zambia', code: 'ZM'}, 
                {name: 'Zimbabwe', code: 'ZW'} 
                ],

            //Danh sách các lựa chọn ban đầu (không thay đổi)
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
            initialOptionsDktt: [
                {
                    id: "ĐK1",
                    name: "Điều khoản 1",
                },
                {
                    id: "ĐK2",
                    name: "Điều khoản 2",
                },
            ],
            initialOptionsTkcn: [
                {
                    id: "331",
                    name: "Phải trả cho người bán",
                },
                {
                    id: "3348",
                    name: "Phải trả cho người lao động khác",
                },
            ],
            initialOptionsQg: [ 
                {name: 'Afghanistan', code: 'AF'}, 
                {name: 'Åland Islands', code: 'AX'}, 
                {name: 'Albania', code: 'AL'}, 
                {name: 'Algeria', code: 'DZ'}, 
                {name: 'American Samoa', code: 'AS'}, 
                {name: 'AndorrA', code: 'AD'}, 
                {name: 'Angola', code: 'AO'}, 
                {name: 'Anguilla', code: 'AI'}, 
                {name: 'Antarctica', code: 'AQ'}, 
                {name: 'Antigua and Barbuda', code: 'AG'}, 
                {name: 'Argentina', code: 'AR'}, 
                {name: 'Armenia', code: 'AM'}, 
                {name: 'Aruba', code: 'AW'}, 
                {name: 'Australia', code: 'AU'}, 
                {name: 'Austria', code: 'AT'}, 
                {name: 'Azerbaijan', code: 'AZ'}, 
                {name: 'Bahamas', code: 'BS'}, 
                {name: 'Bahrain', code: 'BH'}, 
                {name: 'Bangladesh', code: 'BD'}, 
                {name: 'Barbados', code: 'BB'}, 
                {name: 'Belarus', code: 'BY'}, 
                {name: 'Belgium', code: 'BE'}, 
                {name: 'Belize', code: 'BZ'}, 
                {name: 'Benin', code: 'BJ'}, 
                {name: 'Bermuda', code: 'BM'}, 
                {name: 'Bhutan', code: 'BT'}, 
                {name: 'Bolivia', code: 'BO'}, 
                {name: 'Bosnia and Herzegovina', code: 'BA'}, 
                {name: 'Botswana', code: 'BW'}, 
                {name: 'Bouvet Island', code: 'BV'}, 
                {name: 'Brazil', code: 'BR'}, 
                {name: 'British Indian Ocean Territory', code: 'IO'}, 
                {name: 'Brunei Darussalam', code: 'BN'}, 
                {name: 'Bulgaria', code: 'BG'}, 
                {name: 'Burkina Faso', code: 'BF'}, 
                {name: 'Burundi', code: 'BI'}, 
                {name: 'Cambodia', code: 'KH'}, 
                {name: 'Cameroon', code: 'CM'}, 
                {name: 'Canada', code: 'CA'}, 
                {name: 'Cape Verde', code: 'CV'}, 
                {name: 'Cayman Islands', code: 'KY'}, 
                {name: 'Central African Republic', code: 'CF'}, 
                {name: 'Chad', code: 'TD'}, 
                {name: 'Chile', code: 'CL'}, 
                {name: 'China', code: 'CN'}, 
                {name: 'Christmas Island', code: 'CX'}, 
                {name: 'Cocos (Keeling) Islands', code: 'CC'}, 
                {name: 'Colombia', code: 'CO'}, 
                {name: 'Comoros', code: 'KM'}, 
                {name: 'Congo', code: 'CG'}, 
                {name: 'Congo, The Democratic Republic of the', code: 'CD'}, 
                {name: 'Cook Islands', code: 'CK'}, 
                {name: 'Costa Rica', code: 'CR'}, 
                {name: 'Cote D\'Ivoire', code: 'CI'}, 
                {name: 'Croatia', code: 'HR'}, 
                {name: 'Cuba', code: 'CU'}, 
                {name: 'Cyprus', code: 'CY'}, 
                {name: 'Czech Republic', code: 'CZ'}, 
                {name: 'Denmark', code: 'DK'}, 
                {name: 'Djibouti', code: 'DJ'}, 
                {name: 'Dominica', code: 'DM'}, 
                {name: 'Dominican Republic', code: 'DO'}, 
                {name: 'Ecuador', code: 'EC'}, 
                {name: 'Egypt', code: 'EG'}, 
                {name: 'El Salvador', code: 'SV'}, 
                {name: 'Equatorial Guinea', code: 'GQ'}, 
                {name: 'Eritrea', code: 'ER'}, 
                {name: 'Estonia', code: 'EE'}, 
                {name: 'Ethiopia', code: 'ET'}, 
                {name: 'Falkland Islands (Malvinas)', code: 'FK'}, 
                {name: 'Faroe Islands', code: 'FO'}, 
                {name: 'Fiji', code: 'FJ'}, 
                {name: 'Finland', code: 'FI'}, 
                {name: 'France', code: 'FR'}, 
                {name: 'French Guiana', code: 'GF'}, 
                {name: 'French Polynesia', code: 'PF'}, 
                {name: 'French Southern Territories', code: 'TF'}, 
                {name: 'Gabon', code: 'GA'}, 
                {name: 'Gambia', code: 'GM'}, 
                {name: 'Georgia', code: 'GE'}, 
                {name: 'Germany', code: 'DE'}, 
                {name: 'Ghana', code: 'GH'}, 
                {name: 'Gibraltar', code: 'GI'}, 
                {name: 'Greece', code: 'GR'}, 
                {name: 'Greenland', code: 'GL'}, 
                {name: 'Grenada', code: 'GD'}, 
                {name: 'Guadeloupe', code: 'GP'}, 
                {name: 'Guam', code: 'GU'}, 
                {name: 'Guatemala', code: 'GT'}, 
                {name: 'Guernsey', code: 'GG'}, 
                {name: 'Guinea', code: 'GN'}, 
                {name: 'Guinea-Bissau', code: 'GW'}, 
                {name: 'Guyana', code: 'GY'}, 
                {name: 'Haiti', code: 'HT'}, 
                {name: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
                {name: 'Holy See (Vatican City State)', code: 'VA'}, 
                {name: 'Honduras', code: 'HN'}, 
                {name: 'Hong Kong', code: 'HK'}, 
                {name: 'Hungary', code: 'HU'}, 
                {name: 'Iceland', code: 'IS'}, 
                {name: 'India', code: 'IN'}, 
                {name: 'Indonesia', code: 'ID'}, 
                {name: 'Iran, Islamic Republic Of', code: 'IR'}, 
                {name: 'Iraq', code: 'IQ'}, 
                {name: 'Ireland', code: 'IE'}, 
                {name: 'Isle of Man', code: 'IM'}, 
                {name: 'Israel', code: 'IL'}, 
                {name: 'Italy', code: 'IT'}, 
                {name: 'Jamaica', code: 'JM'}, 
                {name: 'Japan', code: 'JP'}, 
                {name: 'Jersey', code: 'JE'}, 
                {name: 'Jordan', code: 'JO'}, 
                {name: 'Kazakhstan', code: 'KZ'}, 
                {name: 'Kenya', code: 'KE'}, 
                {name: 'Kiribati', code: 'KI'}, 
                {name: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 
                {name: 'Korea, Republic of', code: 'KR'}, 
                {name: 'Kuwait', code: 'KW'}, 
                {name: 'Kyrgyzstan', code: 'KG'}, 
                {name: 'Lao People\'S Democratic Republic', code: 'LA'}, 
                {name: 'Latvia', code: 'LV'}, 
                {name: 'Lebanon', code: 'LB'}, 
                {name: 'Lesotho', code: 'LS'}, 
                {name: 'Liberia', code: 'LR'}, 
                {name: 'Libyan Arab Jamahiriya', code: 'LY'}, 
                {name: 'Liechtenstein', code: 'LI'}, 
                {name: 'Lithuania', code: 'LT'}, 
                {name: 'Luxembourg', code: 'LU'}, 
                {name: 'Macao', code: 'MO'}, 
                {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
                {name: 'Madagascar', code: 'MG'}, 
                {name: 'Malawi', code: 'MW'}, 
                {name: 'Malaysia', code: 'MY'}, 
                {name: 'Maldives', code: 'MV'}, 
                {name: 'Mali', code: 'ML'}, 
                {name: 'Malta', code: 'MT'}, 
                {name: 'Marshall Islands', code: 'MH'}, 
                {name: 'Martinique', code: 'MQ'}, 
                {name: 'Mauritania', code: 'MR'}, 
                {name: 'Mauritius', code: 'MU'}, 
                {name: 'Mayotte', code: 'YT'}, 
                {name: 'Mexico', code: 'MX'}, 
                {name: 'Micronesia, Federated States of', code: 'FM'}, 
                {name: 'Moldova, Republic of', code: 'MD'}, 
                {name: 'Monaco', code: 'MC'}, 
                {name: 'Mongolia', code: 'MN'}, 
                {name: 'Montserrat', code: 'MS'}, 
                {name: 'Morocco', code: 'MA'}, 
                {name: 'Mozambique', code: 'MZ'}, 
                {name: 'Myanmar', code: 'MM'}, 
                {name: 'Namibia', code: 'NA'}, 
                {name: 'Nauru', code: 'NR'}, 
                {name: 'Nepal', code: 'NP'}, 
                {name: 'Netherlands', code: 'NL'}, 
                {name: 'Netherlands Antilles', code: 'AN'}, 
                {name: 'New Caledonia', code: 'NC'}, 
                {name: 'New Zealand', code: 'NZ'}, 
                {name: 'Nicaragua', code: 'NI'}, 
                {name: 'Niger', code: 'NE'}, 
                {name: 'Nigeria', code: 'NG'}, 
                {name: 'Niue', code: 'NU'}, 
                {name: 'Norfolk Island', code: 'NF'}, 
                {name: 'Northern Mariana Islands', code: 'MP'}, 
                {name: 'Norway', code: 'NO'}, 
                {name: 'Oman', code: 'OM'}, 
                {name: 'Pakistan', code: 'PK'}, 
                {name: 'Palau', code: 'PW'}, 
                {name: 'Palestinian Territory, Occupied', code: 'PS'}, 
                {name: 'Panama', code: 'PA'}, 
                {name: 'Papua New Guinea', code: 'PG'}, 
                {name: 'Paraguay', code: 'PY'}, 
                {name: 'Peru', code: 'PE'}, 
                {name: 'Philippines', code: 'PH'}, 
                {name: 'Pitcairn', code: 'PN'}, 
                {name: 'Poland', code: 'PL'}, 
                {name: 'Portugal', code: 'PT'}, 
                {name: 'Puerto Rico', code: 'PR'}, 
                {name: 'Qatar', code: 'QA'}, 
                {name: 'Reunion', code: 'RE'}, 
                {name: 'Romania', code: 'RO'}, 
                {name: 'Russian Federation', code: 'RU'}, 
                {name: 'RWANDA', code: 'RW'}, 
                {name: 'Saint Helena', code: 'SH'}, 
                {name: 'Saint Kitts and Nevis', code: 'KN'}, 
                {name: 'Saint Lucia', code: 'LC'}, 
                {name: 'Saint Pierre and Miquelon', code: 'PM'}, 
                {name: 'Saint Vincent and the Grenadines', code: 'VC'}, 
                {name: 'Samoa', code: 'WS'}, 
                {name: 'San Marino', code: 'SM'}, 
                {name: 'Sao Tome and Principe', code: 'ST'}, 
                {name: 'Saudi Arabia', code: 'SA'}, 
                {name: 'Senegal', code: 'SN'}, 
                {name: 'Serbia and Montenegro', code: 'CS'}, 
                {name: 'Seychelles', code: 'SC'}, 
                {name: 'Sierra Leone', code: 'SL'}, 
                {name: 'Singapore', code: 'SG'}, 
                {name: 'Slovakia', code: 'SK'}, 
                {name: 'Slovenia', code: 'SI'}, 
                {name: 'Solomon Islands', code: 'SB'}, 
                {name: 'Somalia', code: 'SO'}, 
                {name: 'South Africa', code: 'ZA'}, 
                {name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
                {name: 'Spain', code: 'ES'}, 
                {name: 'Sri Lanka', code: 'LK'}, 
                {name: 'Sudan', code: 'SD'}, 
                {name: 'Suriname', code: 'SR'}, 
                {name: 'Svalbard and Jan Mayen', code: 'SJ'}, 
                {name: 'Swaziland', code: 'SZ'}, 
                {name: 'Sweden', code: 'SE'}, 
                {name: 'Switzerland', code: 'CH'}, 
                {name: 'Syrian Arab Republic', code: 'SY'}, 
                {name: 'Taiwan, Province of China', code: 'TW'}, 
                {name: 'Tajikistan', code: 'TJ'}, 
                {name: 'Tanzania, United Republic of', code: 'TZ'}, 
                {name: 'Thailand', code: 'TH'}, 
                {name: 'Timor-Leste', code: 'TL'}, 
                {name: 'Togo', code: 'TG'}, 
                {name: 'Tokelau', code: 'TK'}, 
                {name: 'Tonga', code: 'TO'}, 
                {name: 'Trinidad and Tobago', code: 'TT'}, 
                {name: 'Tunisia', code: 'TN'}, 
                {name: 'Turkey', code: 'TR'}, 
                {name: 'Turkmenistan', code: 'TM'}, 
                {name: 'Turks and Caicos Islands', code: 'TC'}, 
                {name: 'Tuvalu', code: 'TV'}, 
                {name: 'Uganda', code: 'UG'}, 
                {name: 'Ukraine', code: 'UA'}, 
                {name: 'United Arab Emirates', code: 'AE'}, 
                {name: 'United Kingdom', code: 'GB'}, 
                {name: 'United States', code: 'US'}, 
                {name: 'United States Minor Outlying Islands', code: 'UM'}, 
                {name: 'Uruguay', code: 'UY'}, 
                {name: 'Uzbekistan', code: 'UZ'}, 
                {name: 'Vanuatu', code: 'VU'}, 
                {name: 'Venezuela', code: 'VE'}, 
                {name: 'Việt Nam', code: 'VN'}, 
                {name: 'Virgin Islands, British', code: 'VG'}, 
                {name: 'Virgin Islands, U.S.', code: 'VI'}, 
                {name: 'Wallis and Futuna', code: 'WF'}, 
                {name: 'Western Sahara', code: 'EH'}, 
                {name: 'Yemen', code: 'YE'}, 
                {name: 'Zambia', code: 'ZM'}, 
                {name: 'Zimbabwe', code: 'ZW'} 
            ],

            //Biến kiểm tra xem chuột có di chuyển vào các option hay không, để phân biệt click với blur
            overClick: false,

            isValid: {
                nccCode: true,
                nccName: true,
                nccCodeMessage: true,
                nccNameMessage: true,

                website: true,
                email: true,
            },

            //Biển để hiện dialog thông báo trùng mã nhân viên
            isErrorDialogShow: false,
            //Biến để hiện pop-up thông báo trống mã hoặc tên
            isErrorPopUpShow: false,
            //Biến để nhận giá trị của employee truyền vào ban đầu, để so sánh sau khi thay đổi
            initialNcc: {},
            //Biến để hiện thông báo đã có thay đổi dữ liệu
            isDataChange: false,
            //Biến để nhận thông báo lỗi trả về từ API
            errorMsg: "",

            //Biến để xác nhận thông tin nhân viên đã hợp lệ để put/post lên database
            isAppropriate: null,

            //Chon tab 1 dau tien
            showTab: 1,

            //data tab bank (tab 3)
            banksOfNcc: [],
            bank: { //các thuộc tính phải trùng tên các thuộc tính database
                bankCode: "",
                bankName: "",
                bankBranch: "",
                bankPlace: "",
            },

            //data dia chi giao hang (tab 4)
            dcghs: [],
            dcgh: {
                diachigh: "",
            },
            initialDcgh: "", //biến để lưu trữ đcgh khi gọi từ api lên, dùng để so sánh xem data dcgh có thay đổi không còn báo dialog dataChange

        }
    },

    props: {
        ncc: {
            type: Object,
            default: null,
        },
        formmode: {
            type: String,
            default: null,
        }
    },

    updated(){
    },

    mounted() { //gần giống created, created là thực thi trước khi nhìn thấy nội dung, còn mounted là thực thi sau khi đã nhìn thấy các nội dung
        //auto focus vào ô input employeeCode
        this.focusInput();
        //copy ncc sang 1 object khac de so xem co su thay doi khong?
        this.initialNcc = {...this.ncc};
        this.initialDanhxung = this.ncc.nlhXungho;
        this.initialDktt = this.ncc.dkttMa;
        this.initialTkcn = this.ncc.tkcnMa;
        this.initialVitri = this.ncc.dckQg + this.ncc.dckTt + this.ncc.dckQh + this.ncc.dckXp;
        // console.log(this.initialVitri);
        this.initialDcgh = this.ncc.dcgh;
        // console.log(this.initialDcgh);
    },

    watch: {
        /**
         * Theo dõi combobox Quốc gia, nếu có sự thay đổi thì chạy
         * Chọn Việt Nam mới hiện danh sách các tình thành, các Quốc gia khác thì không
         */
        qgSelected: function(valu){
            if(valu == "Việt Nam"){
                console.log("Tỉnh / Thành");
                axios
                    .get(
                        "https://provinces.open-api.vn/api/p/"
                    )
                    .then((res) => {
                        this.optionsTt = res.data;
                        console.log(this.optionsTt);
                    })
                    .catch((res) => {
                        console.log(res);
                    })
                axios
                    .get(
                        "https://provinces.open-api.vn/api/p/"
                    )
                    .then((res) => {
                        this.initialOptionsTt = res.data;
                    })
                    .catch((res) => {
                        console.log(res);
                    })
            }
            else{
                //Khi chon Quoc gia khac Viet Nam thi phai set default tinh thanh, quan huyen, xa phuong
                this.tt.code = null;
                this.tt.name = null;
                this.ttSelected = [];
                this.optionsTt = [];
                this.initialOptionsTt = [];

                this.qh.code = null;
                this.qh.name = null;
                this.qhSelected = [];
                this.optionsQh = [];
                this.initialOptionsQh = [];

                this.xp.code = null;
                this.xp.name = null;
                this.xpSelected = [];
                this.optionsXp = [];
                this.initialOptionsXp = [];
            }
        },
        /**
         * Theo dõi sự thay đổi của combobox các tỉnh thành
         */
        ttSelected: function(valu){
            if(valu != null)
                console.log( valu + " Quận / Huyện");
            console.log("Mã tỉnh thành: " + this.tt.code);
            // console.log("https://provinces.open-api.vn/api/p/" + this.tt.code + "?depth=2");

            if(this.tt.code != null){ //chỉ khi tỉnh thành hợp lệ thì mới gọi api được, nếu không thì sẽ báo lỗi 400 do url api bị sai
                axios
                    .get(
                        "https://provinces.open-api.vn/api/p/" + this.tt.code + "?depth=2"
                    )
                    .then((res) => {

                        //Chọn một tỉnh thành khác cái thì combobox quận huyện với xã phưởng phải reset default
                        this.qh.code = null;
                        this.qh.name = null;
                        this.qhSelected = [];
                        this.optionsQh = [];
                        this.initialOptionsQh = [];

                        this.xp.code = null;
                        this.xp.name = null;
                        this.xpSelected = [];
                        this.optionsXp = [];
                        this.initialOptionsXp = [];

                        this.optionsQh = res.data.districts;
                        console.log(this.optionsQh);
                    })
                    .catch((res) => {
                        console.log(res);
                    })
                axios
                    .get(
                        "https://provinces.open-api.vn/api/p/" + this.tt.code + "?depth=2"
                    )
                    .then((res) => {
                        this.initialOptionsQh = res.data.districts;
                    })
                    .catch((res) => {
                        console.log(res);
                    })
            }
        },
        /**
         * Theo dõi thay đổi từ combobox Quận / Huyện để chạy sang Xã / Phường
         */
        qhSelected: function(valu){
            if(valu != null)
                console.log(valu + " Xã / Phường");
            console.log("Mã Quận/Huyện: " + this.qh.code);
            // console.log("https://provinces.open-api.vn/api/p/" + this.tt.code + "?depth=3");

            if(this.tt.code != null){//chỉ khi tỉnh thành hợp lệ thì mới gọi api được, nếu không thì sẽ báo lỗi 400 do url api bị sai
                axios
                    .get(
                        "https://provinces.open-api.vn/api/p/" + this.tt.code + "?depth=3"
                    )
                    .then((res) => {

                        //Chọn quận huyện khác thì phải reset lại xã phường
                        this.xp.code = null;
                        this.xp.name = null;
                        this.xpSelected = [];
                        this.optionsXp = [];
                        this.initialOptionsXp = [];

                        //Xử lí để lấy dữ liệu xã phường theo đúng quận huyện (api lấy trên mạng nên phải xử lí)
                        this.tempXp = res.data.districts;
                        console.log("tempXp:" + this.tempXp);
                        for(var i=0; i<this.tempXp.length; i++){
                            if(this.tempXp[i].code == this.qh.code){
                                console.log("Mã quận/huyện: " + this.tempXp[i].code);
                                // console.log(this.tempXp[i].wards);
                                this.optionsXp = this.tempXp[i].wards;
                                break;
                            }
                        }
                        this.tempXp = [];
                        console.log(this.optionsXp);
                    })
                    .catch((res) => {
                        console.log(res);
                    })

                axios
                    .get(
                        "https://provinces.open-api.vn/api/p/" + this.tt.code + "?depth=3"
                    )
                    .then((res) => {
                        this.tempXp = res.data.districts;
                        for(var i=0; i<this.tempXp.length; i++){
                            if(this.tempXp[i].code == this.qh.code){
                                this.initialOptionsXp = this.tempXp[i].wards;
                                break;
                            }
                        }
                        this.tempXp = [];
                    })
                    .catch((res) => {
                        console.log(res);
                    })
            }
        },
        
    },

    methods: {
        /**
         * Cụm hàm format
         * CreatedBy: VDDong (17/06/2021)
         */

        //các hàm xử lý phần combobox
        danhXungFormat(danhXungId){
            this.optionsName.forEach(optionName => {
                if(danhXungId == optionName.id){
                    this.danhXung.name = optionName.name;
                }
            });
        },
        dkttFormat(dkttId){
            this.optionsDktt.forEach(optionDktt => {
                if(dkttId == optionDktt.id){
                    this.dktt.name = optionDktt.name;
                }
            });
        },
        tkcnFormat(tkcnId){
            this.optionsTkcn.forEach(optionTkcn => {
                if(tkcnId == optionTkcn.id){
                    this.tkcn.name = optionTkcn.name;
                }
            });
        },
        qgFormat(qgCode){
            this.optionsQg.forEach(optionQg => {
                if(qgCode == optionQg.code){
                    this.qg.name = optionQg.name;
                    this.qgSelected = optionQg.name;
                }
            });
        },
        ttFormat(ttCode){
            this.optionsTt.forEach(optionTt => {
                if(ttCode == optionTt.code){
                    this.tt.name = optionTt.name;
                    this.ttSelected = optionTt.name;
                }
            });
        },
        qhFormat(qhCode){
            this.optionsQh.forEach(optionQh => {
                if(qhCode == optionQh.code){
                    this.qh.name = optionQh.name;
                    this.qhSelected = optionQh.name;
                }
            });
        },
        xpFormat(xpCode){
            this.optionsXp.forEach(optionXp => {
                if(xpCode == optionXp.code){
                    this.xp.name = optionXp.name;
                    this.xpSelected = optionXp.name;
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
         * Ẩn dialog nccDetail
         * CreatedBy: VDDong (17/06/2021)
         */
        hideDialog(){
            //Reset lại các biến validate form
            this.isValid.nccName = true;
            this.isValid.nccCode = true;
            //Gọi phương thức ẩn của thằng cha là nccList
            this.$emit('hideDialog');
        },

        /**
        * Ẩn dialog
        * Nếu dữ liệu đã bị thay  đổi thì hiện pop up DataChange, nếu không thì ẩn dialog EmployeeDetail
        * CreatedBy: VDDong (17/06/2021)
        */
        hideDialogDataCondition(){
            // console.log(JSON.parse(JSON.stringify(this.dcghs[0].diachigh)));
           if(this.compareDataObject(this.initialNcc, this.ncc) || this.initialDanhxung != this.danhXung.name
           || this.initialDktt != this.dktt.id || this.initialTkcn != this.tkcn.id || 
           this.initialVitri != (this.qgSelected + this.ttSelected + this.qhSelected + this.xpSelected) ||
           this.initialDcgh != JSON.parse(JSON.stringify(this.dcghs[0].diachigh))){
               this.isDataChange = true;
               this.errorMsg = errorMessage.dataChange;
           }
           else this.hideDialog();
        },

        /**
        * Hiện combobox
        * CreatedBy: VDDong (17/06/2021)
        */
        showDropDownContentName(){
            this.optionsName = this.initialOptionsName;
            this.isShowOptionName = !this.isShowOptionName;      
        },
        showDropDownContentDktt(){
            this.optionsDktt = this.initialOptionsDktt;
            this.isShowOptionDktt = !this.isShowOptionDktt;      
        },
        showDropDownContentTkcn(){
            this.optionsTkcn = this.initialOptionsTkcn;
            this.isShowOptionTkcn = !this.isShowOptionTkcn;      
        },
        showDropDownContentQg(){
            this.optionsQg = this.initialOptionsQg;
            this.isShowOptionQg = !this.isShowOptionQg;      
        },
        showDropDownContentTt(){
            this.optionsTt = this.initialOptionsTt;
            this.isShowOptionTt = !this.isShowOptionTt;      
        },
        showDropDownContentQh(){
            this.optionsQh = this.initialOptionsQh;
            this.isShowOptionQh = !this.isShowOptionQh;      
        },
        showDropDownContentXp(){
            this.optionsXp = this.initialOptionsXp;
            this.isShowOptionXp = !this.isShowOptionXp;      
        },

       /**
        * Ẩn combobox
        * CreatedBy: VDDong (17/06/2021)
        */
        hideDropDownContentName(){
            if(this.overClick == false) this.isShowOptionName = false;
        },
        hideDropDownContentDktt(){
            if(this.overClick == false) this.isShowOptionDktt = false;
        },
        hideDropDownContentTkcn(){
            if(this.overClick == false) this.isShowOptionTkcn = false;
        },
        hideDropDownContentQg(){
            if(this.overClick == false) this.isShowOptionQg = false;
        },
        hideDropDownContentTt(){
            if(this.overClick == false) this.isShowOptionTt = false;
        },
        hideDropDownContentQh(){
            if(this.overClick == false) this.isShowOptionQh = false;
        },
        hideDropDownContentXp(){
            if(this.overClick == false) this.isShowOptionXp = false;
        },

        /**
        * Gán dữ liệu đã chọn từ combobox cho chủ thể employee và format cho đúng định dạng
        * CreatedBy: VDDong (17/06/2021)
        */
        chooseOptionName(optionName){
            //Gán giá trị được chọn cho id và tên phòng ban của employee
            this.danhXung.id = optionName.id;
            // this.employee.departmentName = option.name;
            this.danhXungFormat(this.danhXung.id);
            this.overClick = false;
            this.hideDropDownContentName();
        },
        chooseOptionDktt(optionDktt){
            //Gán giá trị được chọn cho id và tên phòng ban của employee
            this.dktt.id = optionDktt.id;
            // this.employee.departmentName = option.name;
            this.dkttFormat(this.dktt.id);
            this.overClick = false;
            this.hideDropDownContentDktt();
        },
        chooseOptionTkcn(optionTkcn){
            //Gán giá trị được chọn cho id và tên phòng ban của employee
            this.tkcn.id = optionTkcn.id;
            // this.employee.departmentName = option.name;
            this.tkcnFormat(this.tkcn.id);
            this.overClick = false;
            this.hideDropDownContentTkcn();
        },
        chooseOptionQg(optionQg){
            //Gán giá trị được chọn cho id và tên phòng ban của employee
            this.qg.code = optionQg.code;
            // this.employee.departmentName = option.name;
            this.qgFormat(this.qg.code);
            this.overClick = false;
            this.hideDropDownContentQg();
        },
        chooseOptionTt(optionTt){
            //Gán giá trị được chọn cho id và tên phòng ban của employee
            this.tt.code = optionTt.code;
            // this.employee.departmentName = option.name;
            this.ttFormat(this.tt.code);
            this.overClick = false;
            this.hideDropDownContentTt();
        },
        chooseOptionQh(optionQh){
            //Gán giá trị được chọn cho id và tên phòng ban của employee
            this.qh.code = optionQh.code;
            // this.employee.departmentName = option.name;
            this.qhFormat(this.qh.code);
            this.overClick = false;
            this.hideDropDownContentQh();
        },
        chooseOptionXp(optionXp){
            //Gán giá trị được chọn cho id và tên phòng ban của employee
            this.xp.code = optionXp.code;
            // this.employee.departmentName = option.name;
            this.xpFormat(this.xp.code);
            this.overClick = false;
            this.hideDropDownContentXp();
        },

        /**
         * Tìm kiếm ô input đơn vị so với các option data có sẵn từ combobox
         * CreatedBy: VDDong (17/06/2021)
         */
        searchOptionName(){
            this.optionsName = this.initialOptionsName.filter(optionName => {
                return (
                    optionName.name.toLowerCase().includes(this.danhXung.name.toLowerCase())
                )
            });
        },
        searchOptionDktt(){
            this.optionsDktt = this.initialOptionsDktt.filter(optionDktt => {
                return (
                    optionDktt.name.toLowerCase().includes(this.dktt.name.toLowerCase())
                )
            });
        },
        searchOptionQg(){
            this.optionsQg = this.initialOptionsQg.filter(optionQg => {
                return (
                    // optionQg.name.toLowerCase().includes(this.qg.name.toLowerCase())
                    optionQg.name.toLowerCase().includes(this.qgSelected.toLowerCase())
                )
            });
        },
        searchOptionTt(){
            this.optionsTt = this.initialOptionsTt.filter(optionTt => {
                return (
                    // optionQg.name.toLowerCase().includes(this.qg.name.toLowerCase())
                    optionTt.name.toLowerCase().includes(this.ttSelected.toLowerCase())
                )
            });
        },
        searchOptionQh(){
            this.optionsQh = this.initialOptionsQh.filter(optionQh => {
                return (
                    // optionQg.name.toLowerCase().includes(this.qg.name.toLowerCase())
                    optionQh.name.toLowerCase().includes(this.qhSelected.toLowerCase())
                )
            });
        },
        searchOptionXp(){
            this.optionsXp = this.initialOptionsXp.filter(optionXp => {
                return (
                    // optionQg.name.toLowerCase().includes(this.qg.name.toLowerCase())
                    optionXp.name.toLowerCase().includes(this.xpSelected.toLowerCase())
                )
            });
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
            this.$refs.nccMst.focus();
        },

        /**
         * Validate trường hợp ô employee code và fullname bỏ trống hoặc nhập toàn dấu cách (khoảng trắng) 
         * CreatedBy: VDDong (17/06/2021)
         */
        nullValidation(propertyValue, propertyName){
            propertyValue = propertyValue || '';
            if (propertyValue.trim() == "") {
                if(propertyName == property.nccCode) {
                    this.isValid.nccCode = false;
                    this.isErrorPopUpShow = true;
                    this.errorMsg = errorMessage.nullNccCode;
                }
                else if(propertyName == property.nccName) {
                    this.isValid.nccName = false;
                    this.isErrorPopUpShow = true;
                    this.errorMsg = errorMessage.nullNccName;
                }
            } 
            else{
                if(propertyName == property.nccCode) {
                    this.isValid.nccCode = true;
                }
                else if(propertyName == property.nccName) {
                    this.isValid.nccName = true;
                }
            }    
        },

        /**
         * Validate trước khi request lên database
         * CreatedBy: VDDong (17/06/2021)
         */
        formValidation(){
            //Validate tên nhà cung cấp không được trống hoặc là khoảng trắng
            this.nullValidation(this.ncc.nccName, property.nccName);
            //Validate mã nhà cung cấp không được trống hoặc là khoảng trắng
            this.nullValidation(this.ncc.nccCode, property.nccCode);
            if(this.isValid.nccName == true
                && this.isValid.nccCode == true
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
            if( this.isValid.nccCode == false && propertyName == property.nccCode){
                this.isValid.nccCodeMessage = false;
            }
            if( this.isValid.nccName == false && propertyName == property.nccName){
                this.isValid.nccNameMessage = false;
            }         
        },
        //Di chuyển chuột ra ngoài ẩn lỗi
        mouseLeaveError(){
            this.isValid.nccCodeMessage = true;
            this.isValid.nccNameMessage = true;
            
            // this.isValid.questionMessage = true;
        },

        /**
         * Reset lại các thông tin nhân viên khi bấm 'cất và thêm'
         * CreatedBy: VDDong (17/06/2021)
         */
        resetNcc(){
            this.$emit('showNccDialog');
            this.focusInput();
        },

        /**
         * Phân biệt post vs put, rồi post / put lên database
         * CreatedBy: VDDong (17/06/2021)
         */
        formmodeValidation(){
            if(this.formmode == form.add) {
                
                this.ncc.nlhXungho = this.danhXung.name;
                this.ncc.dkttMa = this.dktt.id;
                this.ncc.tkcnMa = this.tkcn.id;
                this.ncc.dckQg = this.qgSelected;
                this.ncc.dckTt = this.ttSelected;
                this.ncc.dckQh = this.qhSelected;
                this.ncc.dckXp = this.xpSelected;

                // console.log("QG: " + this.qg.name);
                // console.log("TT: " + this.tt.name);
                // console.log("QH: " + this.qh.name);
                // console.log("XP: " + this.xp.name);

                // console.log(this.dcghs[this.dcghs.length-1]);
                console.log(this.dcghs.length);
                var dcghAdd = JSON.parse(JSON.stringify(this.dcghs[0].diachigh))
                console.log(dcghAdd)
                this.ncc.dcgh = dcghAdd;

                var nccIdToAddBanks = ""; //nccId hay chính là khóa ngoại userId của nccBanks

                return axios
                    .post(getAll, this.ncc) //post data ncc
                    .then(() => {
                        if(this.banksOfNcc.length == 0) { //nếu không có banks nào liên kết, báo thành công
                            console.log("Khong co banks, them thanh cong");
                            // return Promise.resolve();
                        }
                        else { //nếu có banks liên kết, đầu tiên phải lấy nccId của nhân viên mới đó (khóa ngoại của các banks liên kết), rồi mới post các banks lên
                            axios
                                .get("https://localhost:44342/api/v1/Nccs/GetNccByNccCode/" + this.ncc.nccCode) //lấy nhân viên vừa post lên (theo nccCode)
                                .then((res) => {
                                    nccIdToAddBanks = res.data.nccId;

                                    for(var i=0; i<this.banksOfNcc.length; i++){
                                        this.banksOfNcc[i].userId = nccIdToAddBanks;
                                        this.banksOfNcc[i].bankId = nccIdToAddBanks; //tạm thời vì nếu để null thì bị 400 bad request nên cứ để thế này vào database nó tự set lại
                                        var parsedobj = JSON.parse(JSON.stringify(this.banksOfNcc[i])); //nó là __ob__ nên phải convert sang array mới post được
                                        console.log(parsedobj);

                                        axios
                                            .post(getAllBankNcc, parsedobj) //post các nccBanks
                                            .then((res) => {
                                                console.log(res);
                                                return Promise.resolve();
                                            })
                                            .catch((res) => {
                                                console.log(res);
                                                return Promise.reject();
                                            })

                                    }
                                })
                                .catch((res) => {
                                    console.log(res);
                                })
                        }                        
                    })
                    .catch((res) => {
                        var errorContent = res.response.data.devMsg;

                        if(errorContent.includes("Mã nhà cung cấp")) this.isValid.nccCode = false;
                        // if(errorContent.includes("Tên nhà cung cấp")) this.isValid.nccCode = false; // không cần vì nullValidation xử lý rồi
                        if(errorContent.includes("Email")) this.isValid.email = false;
                        if(errorContent.includes("Website")) this.isValid.website = false;

                        this.errorMsg = errorContent;
                        this.isErrorDialogShow = true;
                        return Promise.reject();
                    })
            }
            else if(this.formmode == form.edit){

                this.ncc.nlhXungho = this.danhXung.name;
                this.ncc.dkttMa = this.dktt.id;
                this.ncc.tkcnMa = this.tkcn.id;
                this.ncc.dckQg = this.qgSelected;
                this.ncc.dckTt = this.ttSelected;
                this.ncc.dckQh = this.qhSelected;
                this.ncc.dckXp = this.xpSelected;

                // console.log("QG: " + this.qgSelected);
                // console.log("TT: " + this.ttSelected);
                // console.log("QH: " + this.qhSelected);
                // console.log("XP: " + this.xpSelected);

                // console.log(this.dcghs[this.dcghs.length-1]);
                var dcghEdit = JSON.parse(JSON.stringify(this.dcghs[0].diachigh))
                console.log(dcghEdit)
                this.ncc.dcgh = dcghEdit;

                console.log(this.ncc)

                return axios
                    .put(getAll + this.ncc.nccId, this.ncc) //put thông tin ncc
                    .then(() => {
                        axios
                            .delete(getAllBankNcc + this.ncc.nccId) //xóa toàn bộ banks hiện tại của ncc đó đi rồi post lại
                            .then(() => {
                                for(var i=0; i<this.banksOfNcc.length; i++){
                                    this.banksOfNcc[i].userId = this.ncc.nccId;
                                    this.banksOfNcc[i].bankId = this.ncc.nccId; //tạm thời vì nếu để null thì bị 400 bad request nên cứ để thế này vào database nó tự set lại
                                    var parsedobj = JSON.parse(JSON.stringify(this.banksOfNcc[i]));
                                    // console.log(parsedobj);
                                    
                                    axios
                                        .post(getAllBankNcc, parsedobj) //thêm lại các ngân hàng liên kết ncc đó
                                        .then((res) => {
                                            console.log(res);
                                            return Promise.resolve();
                                        })
                                        .catch((res) => {
                                            console.log(res);
                                            return Promise.reject();
                                        })
                                }
                            })
                    })
                    .catch((res) => {
                        var errorContent = res.response.data.devMsg;

                        if(errorContent.includes("Mã nhà cung cấp")) this.isValid.nccCode = false;
                        // if(errorContent.includes("Tên nhà cung cấp")) this.isValid.nccCode = false; // không cần vì nullValidation xử lý rồi
                        if(errorContent.includes("Email")) this.isValid.email = false;
                        if(errorContent.includes("Website")) this.isValid.website = false;

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
                this.formmodeValidation().then(() => this.resetNcc());
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
                bankName: "",
                bankBranch: "",
                bankPlace: "",
            };
            console.log(this.banksOfNcc);
            if(this.checkIfListBankEmptyEdit){ //không hiểu sao khi rời vào trường hợp edit ncc không liên kết với ngân hàng
                                                //nào thì bấm thêm dòng lại bị lỗi, nên phải dùng hàm này để fix
                this.banksOfNcc = [];
                this.checkIfListBankEmptyEdit = false;
            }
            this.banksOfNcc.push(bank);
        },
        deleteBank(index){
            this.banksOfNcc.splice(index, 1);
        },
        deleteAllBanks(){
            this.banksOfNcc = [];
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
            console.log(this.dcghs);
            console.log(this.dcghs.length);
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