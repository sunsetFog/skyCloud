<template>
    <section id="previewPictures">
        <viewer :images="photoList">
            <img
                :style="{ width: imgwh, height: imgwh }"
                v-for="(item,index) in photoList"
                :src="item"
                v-if="item"
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
*/
export default {
    name: "previewPictures",
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


