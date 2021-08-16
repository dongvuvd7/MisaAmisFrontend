<template>
    <div id="router">
        <div id="router-content">
            <div id="header">
                <router-link class="header-title-1" tag="span" to="/quytrinh">Quy trình</router-link>
                <router-link class="header-title-2" tag="span" to="/thuchitien">Thu, chi tiền</router-link>
            </div>

            <div id="content">
                
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
  background-color: aqua;
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
  background-color: aquamarine;
}
    .header-title-1{
        height: 40px;
        width: 100px;
        display: inline-block;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
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
        border-bottom: 4px solid rgb(29, 148, 29);
        font-weight: bold;
    }
    .header-title-2:hover{
        cursor: pointer;
    }

#content{
    width: 100%;
    height: calc(100% - 17px);
    background: #fff;
    box-sizing: border-box;
    border-collapse: collapse;
    border-top: 2px solid #ccc;
}

/* li.navbar-item:nth-child(2) {
    background: linear-gradient(to right, rgb(78, 78, 78), rgb(121, 121, 121));
} */

</style>