<template>
  <el-dialog
    :title="item.id?'编辑':'新增'"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <el-form
      ref="formDom"
      label-width="120px"
      :model="formData"
      :rules="formRules"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="货单时间："
            prop="bill_time"
          >
            <el-date-picker
              v-model="formData.bill_time"
              style="width: 100%"
              type="date"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="车牌号："
            prop="number_plate"
          >
            <el-select
              v-model="formData.number_plate"
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
        <el-col :span="24">
          <el-form-item
            label="货品类型："
            prop="goods_name"
          >
            <el-select
              v-model="formData.goods_name"
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
        <el-col :span="24">
          <el-form-item
            label="单价："
            prop="unit_price"
          >
            <el-input
              v-model="formData.unit_price"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="吨数："
            prop="capacity"
          >
            <el-input
              v-model="formData.capacity"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="出发地："
            prop="site_outset"
          >
            <el-select
              v-model="formData.site_outset"
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
        <el-col :span="24">
          <el-form-item
            label="目的地："
            prop="site_end"
          >
            <el-select
              v-model="formData.site_end"
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
        <el-col :span="24">
          <el-form-item label="收货人：">
            <el-input
              v-model="formData.receiver"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="handleClose">取 消</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { ElForm } from 'element-ui/types/form'
import { Vue, Component } from 'vue-property-decorator'
import {
  getCarOptions
} from '@/api/carManage'
import { getStartAdressOptions } from '@/api/startAdressManage'
import { getEndAdressOptions } from '@/api/endAdressManage'
import { getGoodOptions } from '@/api/goodManage'
import {
  addOrder,
  editeOrder
} from '@/api/orderManage'
@Component({
})
export default class OperationDialog extends Vue {
  orderDate = []
  carOptions = []
  startAdressOptions = []
  endAdressOptions = []
  goodOptions = []
  formRules = {
    bill_time: [{required: true, message: '必填项，请选择货单时间',trigger: 'blur'}],
    number_plate:[{required: true, message: '必填项，请输入车牌号',trigger: 'blur'}],
    goods_name:[{required: true, message: '必填项，请选择货品类型',trigger: 'blur'}],
    unit_price:[{required: true,  message: '必填项，请输入单价', trigger: 'blur'}],
    capacity:[{required: true,  message: '必填项，请输入吨数', trigger: 'blur'}],
    site_outset:[{required: true,  message: '必填项，请输入出发地', trigger: 'blur'}],
    site_end:[{required: true,  message: '必填项，请输入目的地', trigger: 'blur'}],
  }
  formData: {receiver?: string; number_plate: string|number;unit_price: string|number; capacity: string|number;site_outset: string|number;site_end: string|number;goods_name: string|number;bill_time:string|number; } = {
    number_plate: '',
    unit_price: '',
    capacity: '',
    site_outset: '',
    site_end: '',
    goods_name:'',
    bill_time: '',
    receiver: ''
  }
  sumitLoading = false
  dialogVisible = false
  item: {[key:string]: string|number}= {}
  submitApi:typeof addOrder| typeof editeOrder = addOrder

  handlOpen (item?:{[key:string]: string|number}) {
    this.dialogVisible = true
    this.loadData()
    if(item) {
      this.item = item
      this.formData = JSON.parse(JSON.stringify(this.item))
      this.submitApi = editeOrder
    }
    else {
      this.formData = {
        number_plate: '',
        unit_price: '',
        capacity: '',
        site_outset: '',
        site_end: '',
        goods_name:'',
        bill_time: '',
        receiver: ''
      }
      this.submitApi = addOrder
    }
  }

  loadData() {
    this.getCarOptions()
    this.getStartAdressOptions()
    this.getEndAdressOptions()
    this.getGoodOptions()
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

  async handleSubmit() {
    let postParams = {
      number_plate: this.formData.number_plate,
      unit_price: this.formData.unit_price,
      capacity: this.formData.capacity,
      site_outset: this.formData.site_outset,
      site_end: this.formData.site_end,
      goods_name:this.formData.goods_name,
      bill_time: this.formData.bill_time,
      receiver: this.formData.receiver
    };
    (this.$refs.formDom as ElForm).validate(async (valaid)=>{
      if(valaid) {
        this.sumitLoading = true
        try {
          const { message, code } = await this.submitApi(Object.assign({},postParams, { id: this.item?.id }))
          if(code===1) {
            this.$message({
              type: 'success',
              message: message || '操作成功'
            })
          }else {
            this.$message({
              type: 'error',
              message: message || '操作失败'
            })
          }
        } catch {
          this.sumitLoading = false
        }
        this.sumitLoading = false
        this.handleClose()
      }
    })

  }

  handleClose () {
    (this.$refs.formDom as ElForm).resetFields()
    this.item = {}
    this.$emit('freshData')
    this.dialogVisible = false
  }
}
</script>
