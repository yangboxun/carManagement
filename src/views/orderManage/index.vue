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
              <el-form-item label="货单时间：">
                <el-date-picker
                  v-model="queryForm.date"
                  style="width: 100%"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车牌号：">
                <el-select
                  v-model="queryForm.number_plate"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in carOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="车队：">
                <el-select
                  v-model="queryForm.motorcade"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in carTeamOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出发地：">
                <el-select
                  v-model="queryForm.site_outset"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in startAdressOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="目的地：">
                <el-select
                  v-model="queryForm.site_end"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in endAdressOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="收货人：">
                <el-select
                  v-model="queryForm.brand"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in brandOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="货品类型：">
                <el-select
                  v-model="queryForm.goods_name"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in goodOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
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
      <div class="statics_box">
        <div class="module_li">
          <div class="img_box">
            <img
              src="@/assets/img/count.png"
              alt=""
            >
          </div>
          <div class="count_box">
            <p>总车数</p>
            <span>{{ orderCount.sum_bout }}</span>
          </div>
        </div>
        <div class="module_li">
          <div class="img_box">
            <img
              src="@/assets/img/T.png"
              alt=""
            >
          </div>
          <div class="count_box">
            <p>总吨数</p>
            <span>{{ orderCount.sum_capacity }}</span>
          </div>
        </div>
        <div class="module_li">
          <div class="img_box">
            <img
              src="@/assets/img/count1.png"
              alt=""
            >
          </div>
          <div class="count_box">
            <p>总价格</p>
            <span>{{ orderCount.sum_price }}</span>
          </div>
        </div>
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
        <el-button
          type="success"
          plain
          @click="handleExport"
        >
          导出
        </el-button>
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="number"
            label="编号"
          />
          <el-table-column
            prop="bill_time"
            label="货单日期"
          />
          <el-table-column
            prop="site_outset"
            label="出发地"
          />
          <el-table-column
            prop="site_end"
            label="目的地"
          />
          <el-table-column
            prop="goods_name"
            label="货品类型"
          />
          <el-table-column
            prop="capacity"
            label="单价"
          />
          <el-table-column
            prop="unit_price"
            label="吨数（t）"
          />
          <el-table-column
            prop="total_price"
            label="总价"
          />
          <el-table-column
            prop="number_plate"
            label="车牌号"
          />
          <el-table-column
            prop="motorcade"
            label="所属车队"
          />
          <el-table-column
            prop="driver_name"
            label="车主"
          />
          <el-table-column
            prop="driver_phone"
            label="车主电话"
          />
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
        layout="prev, pager, next"
        :total="total"
      />
    </Pagelayout>
    <OperationDialog
      ref="OperationDialogDom"
      @freshData="handleReset"
    />
  </div>
</template>

<script lang="ts">
import {
  getCarOptions
} from '@/api/carManage'
import utils from '@/utils'
import { getCarTeamOptions } from '@/api/carTeamManage'
import { getStartAdressOptions } from '@/api/startAdressManage'
import { getEndAdressOptions } from '@/api/endAdressManage'
import { getGoodOptions } from '@/api/goodManage'
import {
  getOrderList,
  deleteOrder,
  getOrderCount,
  postExporTable
} from '@/api/orderManage'
import { Vue, Component } from 'vue-property-decorator'
import Pagelayout from '@/components/Pagelayout.vue'
import OperationDialog from './components/OperationDialog.vue'
import axios from 'axios'
@Component({
  components: {
    Pagelayout,
    OperationDialog
  }
})
export default class Ordermanage extends Vue {
  carOptions = []

  carTeamOptions = []

  startAdressOptions = []
  endAdressOptions = []
  goodOptions = []

  pagination = {
    limit: 20,
    page: 1
  }

  queryForm = {
    date:[],
    number_plate: '',
    motorcade: '',
    site_outset: '',
    site_end: '',
    goods_name: '',
    bill_time_start: '',
    bill_time_end: ''
  }

  tableData = []
  total = 0

  orderCount = {}

  created() {
    this.loadData()
    this.getlist()
  }

  loadData() {
    this.getCarOptions()
    this.getCarTeamOptions()
    this.getStartAdressOptions()
    this.getEndAdressOptions()
    this.getGoodOptions()
    this.getOrderCount()
  }

  async getOrderCount() {
    const { result } = await getOrderCount(Object.assign({},this.queryForm, { bill_time_start: this.queryForm?.date[0], bill_time_end: this.queryForm?.date[1] }))
    this.orderCount = result[0]
  }


  async getCarOptions() {
    const { result } = await getCarOptions()
    this.carOptions = result.map((elm: {number_plate: string; id: number})=>(
      {
        label: elm.number_plate,
        value: elm.id
      }
    ))
  }

  async getCarTeamOptions() {
    const { result } = await getCarTeamOptions()
    this.carTeamOptions = result.map((elm: {c_name: string; id: number})=>(
      {
        label: elm.c_name,
        value: elm.id
      }
    ))
  }
  async getStartAdressOptions() {
    const { result } = await getStartAdressOptions()
    this.startAdressOptions = result.map((elm: {outset_name: string; id: number})=>(
      {
        label: elm.outset_name,
        value: elm.id
      }
    ))
  }

  async getEndAdressOptions() {
    const { result } = await getEndAdressOptions()
    this.endAdressOptions = result.map((elm: {end_name: string; id: number})=>(
      {
        label: elm.end_name,
        value: elm.id
      }
    ))
  }

  async getGoodOptions() {
    const { result } = await getGoodOptions()
    this.goodOptions = result.map((elm: {goods_name: string; id: number})=>(
      {
        label: elm.goods_name,
        value: elm.id
      }
    ))
  }

  async getlist() {
    const { result:{ res, count } } = await getOrderList(Object.assign({}, this.pagination, this.queryForm, { bill_time_start: this.queryForm?.date[0], bill_time_end: this.queryForm?.date[1] }))
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
    this.getOrderCount()
    this.getlist()
  }

  handleReset() {
    this.pagination.page = 1
    this.pagination.limit = 20
    this.queryForm = {
      date: [],
      number_plate: '',
      motorcade: '',
      site_outset: '',
      site_end: '',
      goods_name: '',
      bill_time_start: '',
      bill_time_end: ''
    }
    this.getOrderCount()
    this.getlist()
  }

  handleDelete (id: string|number) {
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const { code, message } = await deleteOrder({id:JSON.stringify([id])})
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

  handleAdd () {
    (this.$refs.OperationDialogDom as OperationDialog).handlOpen()
  }

  handleEdite (item:{id: string|number;umber_plate: string|number;unit_price: string|number; capacity: string|number;site_outset: string|number;site_end: string|number;goods_name: string|number;bill_time:string|number; }) {
    (this.$refs.OperationDialogDom as OperationDialog).handlOpen(item)
  }

  async handleExport(){
    const data = await postExporTable(Object.assign({},this.queryForm, { bill_time_start: this.queryForm?.date[0], bill_time_end: this.queryForm?.date[1] }))
    const bolb = new Blob([data], {type: 'applicationnd.ms-excel;charset=utf-8'})
    const url = window.URL.createObjectURL(bolb)
    const a = document.createElement('a')
    a.style.display = 'none'
    document.body.appendChild(a)
    a.href = url
    a.download = '货单.xlsx'
    a.click()
    a.parentNode?.removeChild(a)
    window.URL.revokeObjectURL(url)
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
