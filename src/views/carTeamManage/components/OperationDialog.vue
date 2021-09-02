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
            label="车队名称："
            prop="c_name"
          >
            <el-input
              v-model="formData.c_name"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="负责人："
            prop="p_name"
          >
            <el-input
              v-model="formData.p_name"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="电话："
            prop="p_phone"
          >
            <el-input
              v-model="formData.p_phone"
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
import { addCarTeam,editeCarTeam } from '@/api/carTeamManage'
import utils from '@/utils/index'

@Component({
})
export default class OperationDialog extends Vue {
  formRules = {
    c_name:[{required: true, message: '必填项，请输入车队',trigger: 'blur'}],
    p_name:[{max: 20, message: '输入最多20个字', trigger: 'change'}],
    p_phone: [
      {
        pattern: utils.regexp.phone,
        message: '请输入正确手机号',
        trigger: 'change'
      }
    ]
  }
  formData: { c_name: string;p_name: string;p_phone: string } = {
    c_name: '',
    p_name:'',
    p_phone: ''
  }
  sumitLoading = false
  dialogVisible = false
  item: {[key:string]: string|number}= {}
  submitApi:typeof addCarTeam| typeof editeCarTeam = addCarTeam

  handlOpen (item?:{[key:string]: string}) {
    this.dialogVisible = true
    if(item) {
      this.item = item
      this.formData = JSON.parse(JSON.stringify(this.item))
      this.submitApi = editeCarTeam
    }
    else {
      this.formData = {
        c_name: '',
        p_name:'',
        p_phone: ''
      }
      this.submitApi = addCarTeam
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
