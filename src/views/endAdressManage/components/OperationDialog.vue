<template>
  <el-dialog
    :title="item.id?'编辑':'新增'"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <el-form
      ref="formDom"
      label-width="100px"
      :model="formData"
      :rules="formRules"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="目的名称："
            prop="end_name"
          >
            <el-input
              v-model="formData.end_name"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="联系人："
            prop="end_p_name"
          >
            <el-input
              v-model="formData.end_p_name"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="电话："
            prop="end_p_phone"
          >
            <el-input
              v-model="formData.end_p_phone"
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
import { addEndadress,editeEndadress } from '@/api/endAdressManage'
import utils from '@/utils/index'

@Component({
})
export default class OperationDialog extends Vue {
  formRules = {
    end_name:[{required: true, message: '必填项，请输入目的地',trigger: 'blur'}],
    end_p_name:[{max: 20, message: '输入最多20个字', trigger: 'change'}],
    end_p_phone: [
      {
        pattern: utils.regexp.phone,
        message: '请输入正确手机号',
        trigger: 'change'
      }
    ]
  }
  formData: { end_name: string;end_p_name: string;end_p_phone: string } = {
    end_name: '',
    end_p_name:'',
    end_p_phone: ''
  }
  sumitLoading = false
  dialogVisible = false
  item: {[key:string]: string|number}= {}
  submitApi:typeof addEndadress| typeof editeEndadress = addEndadress

  handlOpen (item?:{[key:string]: string}) {
    this.dialogVisible = true
    if(item) {
      this.item = item
      this.formData = JSON.parse(JSON.stringify(this.item))
      this.submitApi = editeEndadress
    }
    else {
      this.formData = {
        end_name: '',
        end_p_name:'',
        end_p_phone: ''
      }
      this.submitApi = addEndadress
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
