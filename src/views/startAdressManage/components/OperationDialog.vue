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
            label="出发地名称："
            prop="outset_name"
          >
            <el-input
              v-model="formData.outset_name"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="联系人："
            prop="outset_p_name"
          >
            <el-input
              v-model="formData.outset_p_name"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="电话："
            prop="outset_p_phone"
          >
            <el-input
              v-model="formData.outset_p_phone"
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
import { addStartadress,editeStartadress } from '@/api/startAdressManage'
import utils from '@/utils/index'

@Component({
})
export default class OperationDialog extends Vue {
  formRules = {
    outset_name:[{required: true, message: '必填项，请输入出发地',trigger: 'blur'}],
    outset_p_name:[{max: 20, message: '输入最多20个字', trigger: 'change'}],
    outset_p_phone: [
      {
        pattern: utils.regexp.phone,
        message: '请输入正确手机号',
        trigger: 'change'
      }
    ]
  }
  formData: { outset_name: string;outset_p_name: string;outset_p_phone: string } = {
    outset_name: '',
    outset_p_name:'',
    outset_p_phone: ''
  }
  sumitLoading = false
  dialogVisible = false
  item: {[key:string]: string|number}= {}
  submitApi:typeof addStartadress| typeof editeStartadress = addStartadress

  handlOpen (item?:{[key:string]: string}) {
    this.dialogVisible = true
    if(item) {
      this.item = item
      this.formData = JSON.parse(JSON.stringify(this.item))
      this.submitApi = editeStartadress
    }
    else {
      this.formData = {
        outset_name: '',
        outset_p_name:'',
        outset_p_phone: ''
      }
      this.submitApi = addStartadress
    }

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
