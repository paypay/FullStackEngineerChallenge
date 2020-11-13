<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="inline-block;float:right;padding-bottom:10px">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="success"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        Add
      </el-button>
      <el-button
        :loading="downloadLoading"
        class="filter-item"
        type="warning"
        icon="el-icon-download"
        @click="handleDownload"
      >
        export
      </el-button>
    </div>
      </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        label="id"
        prop="id"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
     <el-table-column
        label="name"
        prop="name"
        align="center"
      >
        <template slot-scope="{row}">
          <span class="link" @click="handleUpdate(row)">{{ row.name }}</span>
        </template>
      </el-table-column>

       <el-table-column
        label="comment count"
        prop="commentCount"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{row.commentCount}}</span>
        </template>
      </el-table-column>

      <!-- operation -->
      <el-table-column
        align="center"
        width="230"
        label="operation"
        class-name="fixed-width"
      >
        <template slot-scope="{row}">
          <el-button
            type="primary"
            size="mini"
            @click="handleComment(row)"
          >
            Comment
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="confirmDelete(row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="changePage"
    />

    <!-- employee dialog -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="tempEmployeeData"
        label-position="left"
        label-width="400px"
        style="width:600px; margin-left:50px;"
      >

      <!-- id -->
        <el-form-item v-if="dialogStatus==='update'" label-width="150px"  label="employee id">
          <el-input
            v-model="tempEmployeeData.id"
            type="input"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item label="employee name" label-width="150px">
          <el-input
            v-model="tempEmployeeData.name"
            type="input"
            size="medium"
            placeholder="Please input name"
          />
        </el-form-item>

      </el-form>

       <el-table
      :key="tableKey"
      v-loading="listLoading"
      v-if="dialogStatus==='update'"
      :data="comments"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        label="id"
        prop="id"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
     <el-table-column
        label="Content"
        prop="Content"
        align="center"
      >
        <template slot-scope="{row}">
          {{ row.content }}
        </template>
      </el-table-column>

       <el-table-column
        label="comment count"
        prop="commentCount"
        align="center"
      >
        <template slot-scope="{row}">
         <el-rate
            v-model="row.star"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="5"
            style="margin-top:8px;"
          />
        </template>
      </el-table-column>

       <el-table-column
        label="Comment By"
        prop="Commentby"
        align="center"
      >
        <template slot-scope="{row}">
          {{ row.commentBy }}
        </template>
      </el-table-column>

    </el-table>

      <div
        slot="footer"
        class="dialog-footer"
      >
       <el-button v-if="dialogStatus==='update'" type="warning" style="float:left" @click="handleDownloadComments">
          Export
        </el-button>
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>

     <el-dialog
      title="Comment Employee"
      :visible.sync="dialogCommentVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="tempCommentData"
        label-position="left"
        label-width="400px"
        style="width:400px; margin-left:50px;"
      >

      <el-form-item label-width="150px"  label="Employee Id">
          <span>{{tempEmployeeData.id}}</span>
        </el-form-item>
      <el-form-item label-width="150px" label="Employee Name">
          <span>{{tempEmployeeData.name}}</span>
        </el-form-item>

      <!-- comment content -->
        <el-form-item label-width="150px"  label="Comment">
          <el-input
            style="width:600px"
            v-model="tempCommentData.content"
            :autosize="{minRows: 5, maxRows: 10}"
            type="textarea"
            size="medium"
            placeholder="Please input comment content"
          />
        </el-form-item>

      <!-- score -->
        <el-form-item label="Rate" label-width="150px">
          <el-rate
            v-model="tempCommentData.star"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="5"
            style="margin-top:8px;"
          />
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogCommentVisible = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="commentEmployee"
        >
          Comment
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { cloneDeep } from 'lodash'
import { getEmployees, createEmployee, updateEmployee, defaultEmployeeData, defaultCommentData, commentEmployee, deleteEmployee, findEmployeeComments } from '@/api/employees'
import { IComment, IEmployee } from '@/api/types'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson } from '@/utils'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'EmployeeTable',
  components: {
    Pagination
  }
})
export default class extends Vue {
  private tableKey = 0
  private list: IEmployee[] = []
  private comments : IComment[] = []
  private total = 0
  private listLoading = true
  private listQuery = {
    page: 1,
    limit: 10,
    name: undefined
  }

  private dialogFormVisible = false
  private dialogCommentVisible = false
  private dialogStatus = ''
  private textMap = {
    update: 'Edit',
    create: 'Create'
  }

  private rules = {
    name: [{ required: true, message: 'name is required', trigger: 'blur' }]
  }

  private downloadLoading = false
  private tempEmployeeData = defaultEmployeeData
  private tempCommentData = defaultCommentData

  created() {
    this.getList()
  }

  private async changePage(data : any) {
    this.listQuery.page = data.page
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getEmployees(this.listQuery)
    this.list = data.records
    this.total = data.total
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  private handleFilter() {
    this.listQuery.page = 1
    this.getList()
  }

  private resetTempEmployeeData() {
    this.tempEmployeeData = cloneDeep(defaultEmployeeData)
  }

  private resetTempCommentData() {
    this.tempCommentData = cloneDeep(defaultCommentData)
  }

  private commentEmployee() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        const commentData = this.tempCommentData
        // FIXME: get current user after real user system ready!
        commentData.commentBy = 'houko'
        const { data } = await commentEmployee(this.tempEmployeeData.id, commentData)
        this.getList()
        if (data) {
          this.dialogCommentVisible = false
          this.$notify({
            title: 'success',
            message: 'create succss',
            type: 'success',
            duration: 2000
          })
        }
      }
    })
  }

  private handleCreate() {
    this.resetTempEmployeeData()
    this.comments = []
    this.dialogStatus = 'create'
    this.dialogFormVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  private createData() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        const employeeData = this.tempEmployeeData
        const { data } = await createEmployee(employeeData)
        if (data) {
          this.getList()
          this.dialogFormVisible = false
          this.$notify({
            title: 'success',
            message: 'create employee succss',
            type: 'success',
            duration: 2000
          })
        }
      }
    })
  }

  private handleComment(row: IEmployee) {
    this.tempEmployeeData = Object.assign({}, row)
    this.tempCommentData = Object.assign({}, defaultCommentData)
    console.log(this.tempCommentData)
    this.dialogCommentVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  /**
   * update
   */
  private async handleUpdate(row: IEmployee) {
    const { data } = await findEmployeeComments(row.id)
    if (data) {
      this.comments = data
    }
    this.tempEmployeeData = Object.assign({}, row)
    this.dialogStatus = 'update'
    this.dialogFormVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  private updateData() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        const tempData = Object.assign({}, this.tempEmployeeData)
        const { data } = await updateEmployee(tempData.id, tempData)
        if (data) {
          this.dialogFormVisible = false
          this.getList()
          this.$notify({
            title: 'success',
            message: 'update success',
            type: 'success',
            duration: 2000
          })
        }
      }
    })
  }

  private async confirmDelete(row: IEmployee) {
    this.$confirm('this operation will delte the data, continue?', 'tips', {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      this.handleDelete(row)
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'Canceld!'
      })
    })
  }

  private async handleDelete(row: IEmployee) {
    const { data } = await deleteEmployee(row.id)
    if (data) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.getList()
    }
  }

  private handleDownloadComments() {
    if (!this.comments || this.comments.length === 0) {
      this.$message.error('no data to export,please check')
      return
    }
    this.downloadLoading = true
    const tHeader = ['id', 'content', 'star']
    const filterVal = ['id', 'content', 'star']
    const data = formatJson(filterVal, this.comments)
    exportJson2Excel(tHeader, data, 'employeeComments')
    this.downloadLoading = false
  }

  private handleDownload() {
    this.downloadLoading = true
    const tHeader = ['id', 'name', 'commentCount']
    const filterVal = ['id', 'name', 'commentCount']
    const data = formatJson(filterVal, this.list)
    exportJson2Excel(tHeader, data, 'employeeData')
    this.downloadLoading = false
  }
}
</script>

<style scoped>
  .link {
    cursor: pointer;
    color:rgb(24, 66, 236);
    border-bottom :1px;
  }
</style>
