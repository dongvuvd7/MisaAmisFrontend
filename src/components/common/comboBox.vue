<template>
    <div style="display: flex; justify-content: center; align-items: center;">
        <div class="dropdown-text-and-icon">
            <input id="dropdown-text" type="text"
                   v-model="selectedOption.name"
                   readonly
                   @focus="showDropDownContent(options)"
                   @blur="hideDropDownContent()"
            />
            <button id="dropdown-icon"
                    :class="{'dropdown-icon-click' : isClicked}"
                    @focus="showDropDownContent(options)"
                    @blur="hideDropDownContent()"
            ></button>
        </div>
        <div id="dropdown">
            <div class="dropdown-content" :class="{'hide' : !isShowOption}">
                <div class="dropdown-content-a" :class="{'selected' : selectedOption.name == option.name}"
                    v-for="option in options" :key="option.value"
                    @click="chooseOption(option)"
                    @mouseenter="enterClick()"
                    @mouseleave="leaveClick()"
                >{{option.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.selectedOption.name = "20 bản ghi trên trang";
    },

    props: {

    },

    data() {
        return {
            isShowOption: false, //biến ẩn/hiện các option của comboBox
            options: [
                {
                    value: 10,
                    name: "10 bản ghi trên trang"
                },
                {
                    value: 20,
                    name: "20 bản ghi trên trang"
                },
                {
                    value: 30,
                    name: "30 bản ghi trên trang"
                },
                {
                    value: 50,
                    name: "50 bản ghi trên trang"
                },
                {
                    value: 100,
                    name: "100 bản ghi trên trang"
                },
            ],
            selectedOption: { //option được chọn
                value: null,
                name: null,
            },
            //biến kiểm tra xem chuột có di chuyển vào các option hay không ? -> phân biệt blur với click
            overClick: false,
            //biến kiểm tra xxem button đã click hay chưa
            isClicked:  false,
        }
    },

    methods: {
        //Hiện ra dữ liệu cho combobox
        showDropDownContent(){
            this.isClicked = !this.isClicked;
            this.isShowOption = !this.isShowOption;
        },
        //Ẩn dữ liệu combobox
        hideDropDownContent(){
            if(this.overClick == false) this.isShowOption = false;
        },
        //Khi di chuyển chuột vào trong các option
        enterClick(){
            //Gán overClick = true để tránh lỗi click và focusout overlapping (khi click thì focusout sẽ chạy trước mà không chạy click)
            this.overClick = true;
        },
        //Khi di chuyển chuột ra khỏi các option
        leaveClick(){
            this.overClick = false;
        },
        //Chọn option gán vào input
        chooseOption(option){
            this.selectedOption.name = option.name;
            this.selectedOption.value = option.value;
            this.$emit('setPerPage', this.selectedOption.value); //truyền vào biến info của handlePerPage bên employeeList.vue
            this.overClick = false;
            this.hideDropDownContent();
        },
        //Set lại số lượng bản ghi 1 trang trong combobox 
        //Khi chạy hàm refreshData() thì mặc định selectedOption của comboBox phải quay lại 20 bản ghi 1 trang
        resetPerPage(){
            this.selectedOption.name = this.options[1].name; //chỉ là hiên thị của comboBox, còn thực tế hiển thị lên table là việc của hàm refreshData
        }
    },


}
</script>

<style scoped>

    
    #dropdown{
        position: relative;
        display: inline-block;
    }
    .dropdown-content{
        height: 120px;
        width: 210px;
        position: absolute;
        bottom: 20px;
        right: 0px;
        border: 1px solid;
        background-color: #f1f1f1;
        cursor: pointer;
        border: 1px solid #babec5;
    }
    .dropdown-content-a{
        height: 24px;
        width: 100%;
        display: flex;
        align-items: center;
        padding-left: 8px;
        box-sizing: border-box;
        border: none;
        outline: none;
        font-size: 13px;
    }
    .dropdown-content-a:hover{
        color: #2ca01c;
        background-color: rgb(219, 219, 219);
    }
    .hide{
        display: none;
    }
    .selected{
        background-color: #2ca01c;
        color: #fff;
    }
    .selected:hover{
        background-color: #2ca01c;
        color: #fff;
    }
    .dropdown-text-and-icon{
        display: flex;
        align-items: center;
        border: 1px solid #babec5;
        border-collapse: collapse;
        border-radius: 2px;
        /* background-color: #2ca01c; */

    }
    .dropdown-text-and-icon:hover{
        border-color: #2ca01c;
        /* background-color: aqua; */

    }
    .dropdown-text-and-icon:focus-within{
        border-color: #2ca01c;
        /* background-color: aqua; */

    }
    #dropdown-text{
        height: 31px;
        width: calc(100% - 32px);
        padding: 6px 0 6px 12px;
        box-sizing: border-box;
        border: none;
        outline: none;
        border-collapse: collapse;
        border-radius: 4px;
    }
    #dropdown-icon{
        width: 31px;
        height: 31px;
        border: none;
        outline: none;
        border-collapse: collapse;
        border-radius: 4px;
        background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat;
        background-position: -553px -353px;
        
        
    }

    .dropdown-icon-click{
        transform: rotate(180deg);
        transition: transform .15s linear;
    }



</style>