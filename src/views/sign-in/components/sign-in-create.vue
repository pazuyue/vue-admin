<template>
  <div class="createPost-container">
    <el-row :gutter="20">
      <el-col :span="3">
        <el-button type="primary" @click="dialogVisible = true">添加信息</el-button>
      </el-col>
    </el-row>
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
      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-row>
        <el-col :span="24">
          <el-form ref="signFrom" :model="signFrom" :rules="signRules" label-width="80px" class="form-container" autocomplete="on" label-position="left">
            <el-form-item label="值班人员" prop="user_id">
              <el-select v-model="signFrom.user_id" placeholder="请选择用户">
                <el-option
                  ref="user_id"
                  v-for="item in users"
                  :key="item.user_id"
                  :label="item.username"
                  :value="item.user_id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="值班时间" prop="sign_time">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" ref="sign_time" v-model="signFrom.sign_time" value-format="yyyy-MM-dd HH:mm:ss"/>
              </el-col>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click.native.prevent="onSubmit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import moment from 'moment'

export default {
  name: 'SignInCreate',
  data() {
    const validateSignTime = (rule, value, callback) => {
      console.log('validateSignTime')
      console.log(value)
      if (value == null || value === '') {
        callback(new Error('Please enter the correct SignTime'))
      } else {
        callback()
      }
    }

    return {
      users: [],
      dialogVisible: false,
      signFrom: {
        created_by: this.$store.getters.name,
        token: getToken(),
        sign_time: '',
        user_id: ''
      },
      loading: false,
      signRules: {
        user_id: [{ required: true, message: '请选择用户', trigger: 'change' }],
        sign_time: [{ required: true, trigger: 'blur', validator: validateSignTime }]
      },
      tableData: [{
        sign_time: '',
        username: '',
        state: ''
      }]
    }
  },
  mounted() {
    this.getSignList()
    this.userList()
  },
  methods: {
    onSubmit() {
      this.$refs.signFrom.validate(valid => {
        if (valid) {
          console.log('sign-1')
          this.loading = true
          console.log(this.signFrom)
          this.$store.dispatch('sign/sign', this.signFrom)
            .then(() => {
              this.$message({
                message: '恭喜你，信息保存成功',
                type: 'success'
              })
              this.loading = false
              this.dialogVisible = false
              this.getSignList()
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getSignList() {
      this.loading = true
      this.$store.dispatch('sign/signList').then((response) => {
        console.log('dispatch-signList')
        console.log(response)
        this.tableData = response.list
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    userList() {
      this.$store.dispatch('user/userList').then((response) => {
        this.users = response
      })
    },
    dateFormat: function(row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    }
  }
}
</script>

<style lang="scss" scoped>

.createPost-container {
  position: relative;
  padding: 40px 45px 20px 50px;

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
