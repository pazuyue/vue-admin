<template>
  <div class="createPost-container">
    <el-row>
      <el-col :span="24">
        <el-form ref="signFrom" :model="signFrom" :rules="signRules" label-width="80px" class="form-container" autocomplete="on" label-position="left">
          <el-form-item label="值班人员">
            <el-input v-model="signFrom.created_by"></el-input>
            <el-input v-model="signFrom.token" v-show="false"></el-input>
          </el-form-item>
          <el-form-item label="值班时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="signFrom.sign_time" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'Sign',
  data() {
    const validateSignTime = (rule, value, callback) => {
      if (value == null) {
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
        loading: false
      },
      signRules: {
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
          this.$store.dispatch('sign', this.signFrom)
            .then(() => {
              console.log('success')
              this.loading = false
            })
            .catch(() => {
              console.log('fail')
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
