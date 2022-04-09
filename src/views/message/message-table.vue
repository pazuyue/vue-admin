<template>
    <dev class="app-container">
      <div class="filter-container">
        <el-input v-model="listQuery.title" :placeholder="$t('table.title')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />

        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          {{ $t('table.search') }}
        </el-button>
      </div>
      <el-table
       v-loading="listLoading"
        :data="list"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="tag_id"
          label="标签"
          width="180">
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容"
          width="180">
        </el-table-column>
        <el-table-column
          prop="created_by"
          label="创建人">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="{row}">
            <el-tag :type="row.state | statusFilter">
              {{ row.state | statusFilter }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间">
          <template slot-scope="{row}">
            <span>{{ row.created_on | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.page_size" @pagination="getList" />
    </dev>

  </template>

  <script>
    import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
    import Pagination from '@/components/Pagination' // secondary package based on el-pagination
    import { parseTime } from '@/utils'
    export default {
      components: { Pagination },
      filters: {
        statusFilter(status) {
          console.log(status)
          const statusMap = {
            0: '未通知',
            1: '已通知'
          }
          return statusMap[status]
        },
        typeFilter(type) {
          return calendarTypeKeyValue[type]
        }
      },
      data() {
        return {
          listLoading: true,
          list: null,
          total: 0,
          listQuery: {
            page: 1,
            page_size: 10,
            importance: undefined,
            title: undefined,
            type: undefined
          },
        }
      },
      created() {
        this.getList()
      },
      methods: {
        getList() {
              this.listLoading = true
              fetchList(this.listQuery).then(response => {
                this.list = response.data.list
                this.total = response.data.pager.total_rows
                console.log(this.total)
                // Just to simulate the time of the request
                setTimeout(() => {
                  this.listLoading = false
                }, 1.5 * 1000)
              })
            },
      handleFilter() {
              this.listQuery.page = 1
              this.getList()
            },
      },

    }
  </script>
