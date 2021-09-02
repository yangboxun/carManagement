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
            label="车牌号："
            prop="number_plate"
          >
            <el-input
              v-model="formData.number_plate"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="所属车牌号："
            prop="motorcade_id"
          >
            <el-select
              v-model="formData.motorcade_id"
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
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="司机："
            prop="driver_name"
          >
            <el-input
              v-model="formData.driver_name"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="电话："
            prop="driver_phone"
          >
            <el-input
              v-model="formData.driver_phone"
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
      <el-button @click="handleClose()">取 消</el-button>
      <el-button
        type="primary"
        :loading="sumitLoading"
        @click="handleSubmit"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { ElForm } from 'element-ui/types/form'
import { Vue, Component } from 'vue-property-decorator'
import { addCar,editeCar } from '@/api/carManage'
import { getCarTeamOptions } from '@/api/carTeamManage'
import utils from '@/utils/index'

@Component({
})
export default class OperationDialog extends Vue {
  brandOptions = []
  formRules = {
    number_plate:[{required: true, message: '必填项，请输入车牌号',trigger: 'blur'}],
    motorcade_id:[{required: true, message: '必填项，请选择车队',trigger: 'blur'}],
    driver_name:[{max: 20, message: '输入最多20个字', trigger: 'change'}],
    driver_phone: [
      {
        pattern: utils.regexp.phone,
        message: '请输入正确手机号',
        trigger: 'change'
      }
    ]
  }
  formData: { number_plate: string;motorcade_id: string|number;driver_name: string;driver_phone: string } = {
    number_plate: '',
    driver_name:'',
    driver_phone: '',
    motorcade_id: ''
  }
  sumitLoading = false
  dialogVisible = false
  item: {[key:string]: string|number}= {}
  submitApi:typeof addCar| typeof editeCar = addCar

  handlOpen (item?:{[key:string]: string|number}) {
    this.dialogVisible = true
    if(item) {
      this.item = item
      this.formData = JSON.parse(JSON.stringify(this.item))
      this.submitApi = editeCar
    }
    else {
      this.formData = {
        number_plate: '',
        driver_name:'',
        driver_phone: '',
        motorcade_id: ''
      }
      this.submitApi = addCar
    }
    this.getCarTeamOptions()
  }

  async getCarTeamOptions() {
    const { result } = await getCarTeamOptions()
    this.brandOptions = result.map((elm: {c_name: string; id: number})=>(
      {
        label: elm.c_name,
        value: elm.id
      }
    ))
  }

  async handleSubmit() {
    (this.$refs.formDom as ElForm).validate(async (valaid)=>{
      if(valaid) {
        this.sumitLoading = true
        try {
          const { message, code } = await this.submitApi(Object.assign({},this.formData, { id: this.item?.id }))
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

