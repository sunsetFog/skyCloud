<template>
    <section id="previewPictures">
        <viewer :images="photoList">
            <img
                :style="{ width: imgwh, height: imgwh }"
                v-for="(item,index) in photoList"
                :src="item"
                :key="index"
            />
        </viewer>
    </section>
</template>

<script>
/*
vue-photo-preview
https://www.jianshu.com/p/775fb3784692

main.js全局引入了
v-viewer 目前还不支持 Vue 3

兼容 Vue 3 的图片预览组件,比如:
- vue-image-viewer:https://github.com/kevindesousa/vue-image-viewer
- vue3-viewer:https://github.com/Miofly/vue3-viewer

*/
// import Viewer from 'v-viewer';
// import 'viewerjs/dist/viewer.css';
export default {
    name: "previewPictures",
    // components: { Viewer },
    props: {
        photoList: {
            type: Array,
            default: function() {
                return [
                    require('@sky/static/image1/AheadVenus.png'),
                    require('@sky/static/image1/sale.png'),
                    require('@sky/static/image1/invoice.png')
                ]
            }
        },
        imgwh: {
            type: String,
            default: function() {
                return '40px';
            }
        }
    },
    data () {
        return {

        }
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
#previewPictures {
    img {
        margin-right: 10px;
    }
    img:last-child{
       margin-right: 0px;
    }
}
</style>


