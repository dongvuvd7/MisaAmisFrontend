<template>
    <div style="display: flex; justify-content: center; align-items: center; cursor: pointer;">
        <div class="btnEdit" style="color: blue; margin-right: 10px;"
            @click="showEmployeeDetail()" >Sửa</div>
        <button id="dropdown-icon"
            @click="showDropContent()"
            @blur="hideDropContent()"></button>
        <div id="dropdown">
            <div class="dropdown-content" :class="{'hide' : !isShowOption}">
                <div class="dropdown-content-a" @click="showEmployeeDuplicate()" @mouseenter="enterClick()" @mouseleave="leaveClick()">Nhân bản</div>
                <div class="dropdown-content-a" @click="showDeleteDialog()" @mouseenter="enterClick()" @mouseleave="leaveClick()">Xóa</div>
                <div class="dropdown-content-a" @click="showErrorUndeveloped()" @mouseenter="enterClick()" @mouseleave="leaveClick()">Ngưng sử dụng</div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return {
            // Biến hiện / ẩn các option tính năng
            isShowOption: false,
            // Biến để phân biệt click vs blur (trong trường hợp click vào lựa chọn dropdown content thì blur sẽ chạy trước click)
            overClick: false,
        }
    },
    methods: {
        /**
         * Hiện dialog sửa có bind thông tin nhân viên lên
         */
        showEmployeeDetail(){
            console.log("edit");
            this.$emit('showEmployeeDetail');
            this.isShowOption = false;
        },
        /**
         * Hiện drop content
         */
        showDropContent(){
            this.isShowOption = true;
        },

        /**
         * Ẩn drop content
         */
        hideDropContent(){
            if(this.overClick == false)
                this.isShowOption = false;
        },
        /**
         * Hiện dialog nhân bản
         */
        showEmployeeDuplicate(){
            console.log("duplicate");
            this.$emit('showEmployeeDuplicate');
            this.isShowOption = false;
        },
        /**
         *Hiện dialog xác nhận xóa 
         */
        showDeleteDialog(){
            console.log("delete");
            this.$emit('showDeleteDialog');
            this.isShowOption = false;
        },

        /**
         * Hiện dialog ngưng sử dụng
         */
        showErrorUndeveloped(){
            console.log("stop using");
            this.$emit('showStopUsingDialog');
            this.isShowOption = false;
        },

        /**
         * Phân biệt chuột di chuyển vào/ra dropdown content
         */
        enterClick(){
            this.overClick = true;
        },
        leaveClick(){
            this.overClick = false;
        },

    }
}
</script>

<style scoped>

    .btnEdit:hover{
        font-weight: bold;
    }

    #dropdown-icon{
        width: 20px;
        height: 16px;
        min-width: 16px;
        min-height: 16px;
        background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -890px -359px;
        border: none;
        cursor: pointer;
    }
    #dropdown{
        position: relative;
        display: inline-block;
    }
    #dropdown-icon:hover{
        border-color: aqua;
    }
    .dropdown-content{
        position: absolute;
        right: 0px;
        top: 10px;
        background-color: #fff;
        overflow: auto;
        width: 100px;
        height: 75px;
        border: 1px solid #babec5;
        box-sizing: border-box;
        border-radius: 4px;
    }
    .dropdown-content-a{
        font-size: 12px;
        height: 24px;
        width: 100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding-left: 4px;
        border: none;
        outline: none;
    }
    .dropdown-content-a:hover{
        background-color: #f1f1f1;
        color: #2ca01c;
        cursor: pointer;
    }
    .hide{
        display: none;
    }
</style>