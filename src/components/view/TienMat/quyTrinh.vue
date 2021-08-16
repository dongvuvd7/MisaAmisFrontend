<template>
    <div id="router">
        <div id="router-content">
            <div id="header">
                <router-link class="header-title-1" tag="span" to="/quytrinh">Quy trình</router-link>
                <router-link class="header-title-2" tag="span" to="/thuchitien">Thu, chi tiền</router-link>
            </div>

            <div id="content">
                <div id="nghiepvu">
                    <div class="nv-top">
                        <div class="nv-top-title">
                            NGHIỆP VỤ TIỀN MẶT
                        </div>
                        <div class="nv-top-main">
                            <div class="tm-frame1">
                                <div class="tm-frame-icon1"></div>
                                <div class="tm-frame-title">Thu tiền</div>
                            </div>
                            <div class="tm-frame2">
                                <div class="tm-frame-icon2"></div>
                                <div class="tm-frame-title">Chi tiền</div>
                            </div>
                            <div class="tm-frame3">
                                <div class="tm-frame-icon3"></div>
                                <div class="tm-frame-title">Kiểm kê quỹ</div>
                            </div>
                        </div>
                    </div>
                    <div class="nv-bottom">
                        <router-link class="nv-bottom-frame1" tag="li" to="/employee" style="list-style-type: none;">
                            <div class="nvb-frame1-icon1"></div>
                            <div class="nvb-frame1-title">Nhân viên</div>
                        </router-link>
                        <router-link class="nv-bottom-frame1" tag="li" to="/nhacungcap" style="list-style-type: none;">
                            <div class="nvb-frame1-icon1"></div>
                            <div class="nvb-frame1-title">Nhà cung cấp</div>
                        </router-link>
                        <div class="nv-bottom-frame1">
                            <div class="nvb-frame1-icon2"></div>
                            <div class="nvb-frame1-title">Hệ thống tài khoản</div>
                        </div>
                    </div>
                </div>
                <div id="baocao">
                    <div class="bc-title">BÁO CÁO</div>
                    <div class="bc-main">
                        <div class="bc-main-li">
                            <i class="fas fa-circle"></i>
                            <div class="li-title">Dòng tiền</div>
                        </div>
                        <div class="bc-main-li">
                            <i class="fas fa-circle"></i>
                            <div class="li-title">Bảng kê số dư tiền theo ngày</div>
                        </div>
                        <div class="bc-main-li">
                            <i class="fas fa-circle"></i>
                            <div class="li-title">Số kế toán chi tiết quỹ tiền mặt</div>
                        </div>
                        <div class="bc-main-li">
                            <i class="fas fa-circle"></i>
                            <div class="li-title">S03a2-DN: Sổ nhật ký chi tiền</div>
                        </div>
                        <div class="bc-main-li" style="border-bottom: none;">
                            <i class="fas fa-circle"></i>
                            <div class="li-title">S03a1-DN: Sổ nhật ký thu tiền</div>
                        </div>
                    </div>
                    <div class="bc-bottom">Tất cả báo cáo</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
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
  background-color: #f4f5f8;
  padding-top: 20px;
  padding-left: 24px;
  padding-bottom: 24px;
  padding-right: 0px;
}

#header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  /* background-color: aquamarine; */
}
    .header-title-1{
        height: 40px;
        width: 100px;
        display: inline-block;
        border-bottom: 4px solid rgb(29, 148, 29);
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
    }
    .header-title-1:hover{
        cursor: pointer;
    }
    .header-title-2{
        height: 40px;
        width: 130px;
        display: inline-block;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
    }
    .header-title-2:hover{
        cursor: pointer;
    }

#content{
    width: 100%;
    height: calc(100% - 17px);
    background: #f8f8f8;
    box-sizing: border-box;
    border-collapse: collapse;
    border-top: 2px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
}
    #nghiepvu{
        width: 620px;
        height: 450px;
        /* border: 1px solid #ccc; */
        background-color: #ffffff;
        margin-right: 15px;
        box-sizing: border-box;
    }
        .nv-top{
            width: 100%;
            height: 365px;
            margin-bottom: 10px;
            /* background-color: cadetblue; */
            border: 1px solid #ccc;
        }
            .nv-top-title{
                width: 100%;
                height: 35px;
                line-height: 35px;
                border-bottom: 1px solid #ccc;
                text-align: center;
                display: inline-block;
                font-size: 14px;
                font-weight: bold;
            }
            .nv-top-main{
                height: 330px;
                position: relative;
            }
                .tm-frame1{
                    width: 70px;
                    height: 80px;
                    /* border: 1px solid #ccc;
                    background-color: khaki; */
                    box-sizing: border-box;
                    position: absolute;
                    top: 40px;
                    left: 80px;
                    border-radius: 4px;
                    text-align: center;
                }
                .tm-frame2{
                    width: 70px;
                    height: 80px;
                    /* border: 1px solid #ccc;
                    background-color: khaki; */
                    box-sizing: border-box;
                    position: absolute;
                    top: 210px;
                    left: 80px;
                    border-radius: 4px;
                    text-align: center;
                }
                .tm-frame3{
                    width: 110px;
                    height: 80px;
                    /* border: 1px solid #ccc; */
                    /* background-color: khaki; */
                    box-sizing: border-box;
                    position: absolute;
                    top: calc(50% - 40px);
                    left: 300px;
                    border-radius: 4px;
                    text-align: center;
                }
                .tm-frame1:hover{
                    cursor: pointer;
                    box-shadow: 2px 2px 2px #ccc;
                    transition: .4s;
                    cursor: pointer;
                }
                .tm-frame2:hover{
                    cursor: pointer;
                    box-shadow: 2px 2px 2px #ccc;
                    transition: .4s;
                    cursor: pointer;
                }
                .tm-frame3:hover{
                    cursor: pointer;
                    box-shadow: 2px 2px 2px #ccc;
                    transition: .4s;
                    cursor: pointer;
                }
                    .tm-frame-icon1{
                        width: 100%;
                        height: 70%;
                        background: url("../../../assets/img/Sprites.64af8f61.svg") no-repeat -258px -1500px;
                    }
                    .tm-frame-icon2{
                        width: 100%;
                        height: 70%;
                        background: url("../../../assets/img/Sprites.64af8f61.svg") no-repeat -258px -1500px;
                    }
                    .tm-frame-icon3{
                        width: 100%;
                        height: 70%;
                        background: url("../../../assets/img/Sprites.64af8f61.svg") no-repeat -238px -1500px;
                    }
                    .tm-frame-title{
                        font-size: 12px;
                        color: rgb(51, 52, 53);
                    }
        
        .nv-bottom{
            width: 100%;
            height: 71px;
            /* background-color: cadetblue; */
            border: 1px solid #ccc;
            border-left: none;
            display: flex;
        }
            .nv-bottom-frame1{
                height: 100%;
                width: 155px;
                box-sizing: border-box;
                border-left: 1px solid #ccc;
                text-align: center;
                position: relative;
            }
            .nv-bottom-frame1:hover{
                cursor: pointer;
                box-shadow: 2px 2px 2px #ccc;
                transition: .3s;
            }
                .nvb-frame1-icon1{
                    position: absolute;
                    top: 20px;
                    left: 67px;
                    width: 20px;
                    height: 20px;
                    background: url("../../../assets/img/Sprites.64af8f61.svg") no-repeat -930px -202px;
                }
                .nvb-frame1-icon2{
                    position: absolute;
                    top: 20px;
                    left: 67px;
                    width: 20px;
                    height: 20px;
                    background: url("../../../assets/img/Sprites.64af8f61.svg") no-repeat -1098px -202px;
                }
                .nvb-frame1-title{
                    padding-top: 40px;
                }

    #baocao{
        width: 320px;
        height: 450px;
        border: 1px solid #ccc;
        background-color: #ffffff;
        box-sizing: border-box;
    }
        .bc-title{
            width: 100%;
            height: 35px;
            border-bottom: 1px solid #ccc;
            font-size: 14px;
            font-weight: bold;
            line-height: 35px;
            text-align: center;
            box-sizing: border-box;
        }
        .bc-main{
            width: 100%;
            height: 370px;
            box-sizing: border-box;
        }
            .bc-main-li{
                height: 70px;
                width: 290px;
                margin-left: 15px;
                border-bottom: 1px solid #ccc;
                display: flex;
                align-items: center;
            }
            .bc-main-li:hover{
                cursor: pointer;
            }
            .bc-main-li:hover .li-title{
                color: rgb(33, 133, 199);
            }
                .fa-circle{
                    font-size: 7px;
                    margin-right: 15px;
                    color: rgb(39, 39, 39);
                }
                .li-title{
                    font-size: 13px;
                    color: rgb(32, 32, 32);
                }
        
        .bc-bottom{
            width: 100%;
            font-size: 13px;
            line-height: 40px;
            text-align: center;
            color: rgb(33, 133, 199);
            box-sizing: border-box;
            border-top: 1px solid #ccc;
        }
        .bc-bottom:hover{
            cursor: pointer;
        }



</style>