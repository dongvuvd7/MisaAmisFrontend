<template>
    <div class="dialog" :class="{'dialog_hide': !isShow}">
        <div id="model" @click="hidePopUp()"></div>
        <div class="dialog-content">
            <div class="header">
                <button class="btn-warning"></button>
                <div style="padding-top: 10px;">{{errorMsg}}</div>
            </div>
            <div class="footer">
                <button class="btn-cancel" @click="hidePopUp()">Hủy</button>
                <div class="footer-2">
                    <button class="btn-cancel" @click="hideDialog()">Không</button>
                    <button class="btn-confirm" @click="hideDialogAndSaveData()">Có</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {

    },

    data() {
        return {

        }
    },

    props: {
        //Thuộc tính ẩn/hiện dialog
        isShow: {
            type: Boolean,
            default: false,
        },

        //Nội dung thông báo lỗi
        errorMsg: {
            type: String, 
            default: null,
        }
        
    },

    methods: {
        /**
         * Ẩn popup thông báo trong khi vẫn giữ form employeeDetail
         * CreatedBy: VDDong (18/06/2021)
         */
        hidePopUp(){
            this.$emit('hidePopUp');
        },

        /**
         * Ẩn popup thông báo và đóng form employeeDetail, không lưu dữ liệu
         * CreatedBy: VDDong (18/06/2021)
         */
        hideDialog(){
            this.$emit('hideDialog');
        },

        /**
         * Ẩn popup thông báo và đóng form employeeDetail, có lưu dữ liệu
         * CreatedBy: VDDong (18/06/2021)
         */
        hideDialogAndSaveData(){
            this.$emit('hidePopUp');
            this.$emit('btnSave');
        }
    },

}
</script>

<style scoped>

    .dialog_hide{
        display: none;
    }
    #model{
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background-color: #000000;
        opacity: .4;
        z-index: 4;
    }
    .dialog-content{
        position: fixed;
        width: 444px;
        height: 180px;
        top: calc(50% - 100px);
        left: calc(50% - 222px);
        background-color: white;
        border-radius: 3px;
        box-sizing: border-box;
        padding-left: 32px;
        padding-right: 32px;
        z-index: 5;
    }
    .header{
        width: 100%;
        height: 50%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #babec5;
    }
        .btn-warning{
            width: 48px;
            height: 48px;
            min-width: 48px;
            min-height: 48px;
            background: url(../../../assets/img/Sprites.64af8f61.svg) no-repeat;
            cursor: pointer;
            background-position: -826px -450px;
            border: none;
            outline: none;
            margin-right: 12px;
        }

    .footer{
        width: 100%;
        height: 50%;
        display: flex;
        position: relative;
        justify-content: space-between;
        align-items: center;
    }
        .footer-2{
            width: 150px;
            display: flex;
            justify-content: space-between;
        }
        .btn-cancel{
            border: 1px solid #8d9096;
            color: #111;
            background-color: transparent;
            border-radius: 3px;
            height: 36px;
            padding: 8px 20px;
        }
        .btn-confirm{
            /* position: absolute; */
            /* top: 24px; */
            height: 36px;
            padding: 8px 20px;
            border: 1px solid transparent;
            color: #fff;
            background-color: #2ca01c;
            border-radius: 3px;
            cursor: pointer;
        }
        .btn-confirm:hover{
            background-color: #2a7920;
        }

</style>