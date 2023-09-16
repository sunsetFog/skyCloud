<template>
    <section id="error">
        <p>
            <el-icon><Error /></el-icon>
            404&nbsp;找不到该页，请检查您输入的网址是否正确！
        </p>
    </section>
</template>

<script lang="ts">
import {
    defineComponent
} from "vue";

export default defineComponent({
    name: 'error'
});
</script>

<style lang="scss" scoped>
#error {
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