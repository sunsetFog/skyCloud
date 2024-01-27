<template>
<section id="nicePager">
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="pagingObj.pageNum"
      :page-sizes="pageStep"
      :page-size="pagingObj.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagingObj.total">
    </el-pagination>
</section>
</template>
<script>
  export default {
    name: 'page',
    props: {
      pagingObj: {
        type: Object,
        default: function(){
          return {}
        }
      },
      pageStep: {
        type: Array,
        default: function(){
          return [10]
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
      sizeChange (val) {
        //console.log('pagesize+++', val)
        this.pagingObj.pageSize = val
        this.$emit('emitWay')
      },
      currentChange (val) {
        //console.log('currentPage++', val)
        this.pagingObj.pageNum = val
        this.$emit('emitWay')
      }
    }
  }
</script>
<style lang="less" scoped>
#nicePager{
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}
</style>

