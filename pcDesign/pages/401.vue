<template>
    <section id="noPermission">
        <p>
            <i class="el-icon-error"></i>
            401&nbsp;抱歉,您没有权限访问该页面！
        </p>
    </section>
</template>

<script lang="ts">
import {
    defineComponent
} from "vue";

export default defineComponent({
    name: 'noPermission'
});
</script>

<style lang="scss" scoped>
#noPermission {
    width: 100%;
    p {
        width: 600px;
        height: 35px;
        line-height: 35px;
        font-size: 18px;
        margin: 200px auto 0px auto;
        i {
            font-size: 26px;
            vertical-align: middle;
        }
    }
}
</style>
