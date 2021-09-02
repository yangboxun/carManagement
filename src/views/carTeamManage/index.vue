<template>
  <div>
    <Pagelayout mb_16>
      <div class="query_form_box">
        <el-form
          label-width="100px"
          :model="queryForm"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="车队名称:">
                <el-input
                  v-model="queryForm.c_name"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <div style="display: flex; justify-content: flex-end">
            <el-button
              type="primary"
              @click="handleSearch"
            >
              查询
            </el-button>
            <el-button
              type="info"
              @click="handleReset"
            >
              重置
            </el-button>
          </div>
        </el-form>
      </div>
    </Pagelayout>
    <Pagelayout mb_16>
      <div class="table_box">
        <el-button
          type="primary"
          @click="handleAdd"
        >
          新增
        </el-button>
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="create_time"
            label="创建日期"
          />
          <el-table-column
            prop="c_name"
            label="车队名称"
          />
          <el-table-column
            prop="p_name"
            label="负责人"
          />
          <el-table-column
            prop="p_phone"
            label="电话"
          />
          <el-table-column
            label="所含车辆"
          >
            <template slot-scope="{row}">
              <span
                v-for="item of row.cars"
                :key="item.id"
              >{{ `${item.number_plate}、` }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="150"
          >
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                size="small"
                @click="handleEdite(row)"
              >
                编辑
              </el-button>
              <el-button
                type="danger"
                size="small"
                danger
                @click="handleDelete(row.id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </Pagelayout>
    <Pagelayout>
      <el-pagination
        style="display: flex; justify-content: flex-end;"
        background
        :current-page="pagination.page"
        :page-size="pagination.limit"
        :page-sizes="[20,40,60,80,100]"
        layout="sizes,prev, pager, next, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </Pagelayout>
    <OperationDialog
      ref="OperationDialogDom"
      @freshData="handleReset"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Pagelayout from '@/components/Pagelayout.vue'
import OperationDialog from './components/OperationDialog.vue'
import { getCarTeamList,deleteCarTeam } from '@/api/carTeamManage'
@Component({
  components: {
    Pagelayout,
    OperationDialog
  }
})
export default class Ordermanage extends Vue {
  pagination = {
    limit: 20,
    page: 1
  }

  queryForm = {
    c_name: ''
  }

  tableData = []
  total = 0

  created() {
    this.loadData()
  }

  loadData() {
    this.getlist()
  }

  async getlist() {
    const { result:{ res, count } } = await getCarTeamList(Object.assign({}, this.pagination, this.queryForm))
    this.tableData = res
    this.total = count
  }

  handlePageChange(page: number) {
    this.pagination.page  = page
  }

  handleSizeChange(pageSize: number) {
    this.pagination.page = 1
    this.pagination.limit = pageSize
    this.getlist()
  }

  handleSearch() {
    this.getlist()
  }

  handleReset() {
    this.pagination.page = 1
    this.pagination.limit = 20
    this.queryForm = { c_name: '' }
    this.getlist()
  }

  handleAdd () {
    (this.$refs.OperationDialogDom as OperationDialog).handlOpen()
  }

  handleEdite (item: { c_name: string,
      p_name:string,
      p_phone: string }) {
    (this.$refs.OperationDialogDom as OperationDialog).handlOpen(item)
  }

  handleDelete (id: string|number) {
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const { code, message } = await deleteCarTeam({id:JSON.stringify([id])})
      if(code === 1) {
        this.$message({
          type: 'success',
          message: message || '删除成功!'
        })
        this.resetDelete()
        this.getlist()
      } else {
        this.$message({
          type: 'error',
          message: message || '删除失败'
        })
      }

    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }
  resetDelete(){
    const deleteNum = 1
    const totalPage = Math.ceil((this.total-deleteNum)/this.pagination.limit)
    this.pagination.page = this.pagination.page>totalPage?totalPage:this.pagination.page
    this.pagination.page = this.pagination.page<1?1:this.pagination.page
  }
}
</script>

<style lang="postcss">
 [mb_16]{
   margin-bottom: 16px;
 }
 .statics_box{
  display: flex;
  justify-content: space-between;
  padding: 16px 16px;
  .module_li{
    display: flex;
    align-items: center;
    .img_box{
      margin-right: 16px;
      img{
        width: 40px;
      }
    }
    .count_box{
      p{
        font-size: 14px;
        margin: 0px;
        margin-bottom: 8px;
      }
      span{
        font-size: 20px;
        font-weight: bolder;
      }
    }
  }
 }
</style>
