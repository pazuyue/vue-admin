<template>
  <div class="createPost-container">
    <el-row>
      <el-col :span="24">
        <el-form ref="signFrom" :model="signFrom" :rules="signRules" label-width="80px" class="form-container" autocomplete="on" label-position="left">
          <el-form-item label="值班人员" prop="created_by">
            <el-input
              ref="created_by"
              v-model="signFrom.created_by"
              name="created_by"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
            <el-input
              ref="user_id"
              v-model="signFrom.user_id"
              name="user_id"
              type="text"
              tabindex="1"
              autocomplete="on"
              v-show="false"
            />
          </el-form-item>
          <el-form-item label="值班时间" prop="sign_time">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期"  ref="sign_time" v-model="signFrom.sign_time" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="onSubmit">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

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

    const validateCreatedBy = (rule, value, callback) => {
      console.log('validateCreatedBy')
      if (value.length <= 0) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    return {
      signFrom: {
        created_by: '',
        token: getToken(),
        sign_time: '',
        user_id: 1
      },
      loading: false,
      signRules: {

        created_by: [{ required: true, trigger: 'blur', validator: validateCreatedBy }],
        sign_time: [{ required: true, trigger: 'blur', validator: validateSignTime }]
      }
    }
  },
  mounted() {
    if (this.signFrom.created_by === '') {
      this.$refs.created_by.focus()
    } else if (this.signFrom.sign_time === '') {
      this.$refs.sign_time.focus()
    }
  },
  methods: {
    onSubmit() {
      this.$refs.signFrom.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('sign/sign', this.signFrom)
            .then(() => {
              this.$message({
                message: '恭喜你，信息保存成功',
                type: 'success'
              })
              this.loading = false
            })
            .catch(() => {
              console.log('sign-2')
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
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
