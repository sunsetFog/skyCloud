<template>
    <section id="upload1">
        <div>
            <el-upload
                name="file"
                class="avatar-uploader"
                :action="yuming"
                :show-file-list="false"
                :data="{'id': 1,'biz': 'ok'}"
                :headers="{'token': $cookies.get('tokenPcClient')}"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                accept="image/jpeg,image/jpg,image/png"
            >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

            <!-- 
                action="https://jsonplaceholder.typicode.com/posts/"
				action 后台请求url 
				name="upload" 后台需要绑定的节点，就必须有
				:data="{'attach':'upload'}" 传参给后台
			-->
		</div>       
    </section>
</template>

<script>
export default {
    name: "upload1",
    props: {
        yuming: {
            type: String,
            default: ''
        }
    },
    data(){
        return{
            imageUrl: '',
            // yuming: '/sky/shop/upload',
            // yuming: 'http://localhost:8069/sky/sys/oss/file/upload',
            download_url: ''
        }
    },
    methods:{
        //上传成功
        handleAvatarSuccess(res, file) {
            // file转blob图片
            this.imageUrl = URL.createObjectURL(file.raw);

            this.fileToBase64(file.raw).then(data => {
                // console.log('---fileToBase64--', data);
            })

            console.log('-handleAvatarSuccess-', res, file, '---', this.imageUrl);
            this.download_url = res.data;
            // res是后台返回的数据
            if (res.result == 1) {
                this.imageUrl = res.data.img;
            } else {
                //this.$message.error('上传失败!');
            }
        },
        //上传前设置
        beforeAvatarUpload(file) {
            // const isPNG = (file.type === 'image/png' || file.type === 'image/jpeg');
            // const isLt2M = file.size / 1024 / 1024 < 2;
            // if (!isPNG) {
            //     this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
            // }
            // if (!isLt2M) {
            //     this.$message.error('上传头像图片大小不能超过 2MB!');
            // }
            // return isPNG && isLt2M;
        },
        // file转base64图片
        fileToBase64(data) {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    resolve(e.target.result);
                };
                fileReader.readAsDataURL(data);
                fileReader.onerror = () => {
                    reject(new Error('文件流异常'));
                };
            });
        }
    }  
}
</script>

<style lang="less" rel="stylesheet/less">
#upload1{
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
}
</style>
