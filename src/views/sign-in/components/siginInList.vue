<template>
  <div class="createPost-container">
    <el-row>
      <el-col :span="24">
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="sign_time"
            label="日期"
            width="180"
            :formatter="dateFormat"
          >
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
          >
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import moment from 'moment'

export default {
  name: 'SiginInList',
  data() {
    return {
      total: 0,
      loading: false,
      tableData: [{
        sign_time: '',
        username: '',
        state: ''
      }]
    }
  },
  mounted() {
    this.getSignList()
  },
  methods: {
    getSignList() {
      this.loading = true
      this.$store.dispatch('sign/signList').then((response) => {
        console.log('dispatch-signList')
        console.log(response)
        this.tableData = response.list
        this.total = response.pager.total_rows
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    dateFormat: function(row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>

</style>
