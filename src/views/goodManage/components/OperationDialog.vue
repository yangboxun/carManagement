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
            label="商品名称："
            prop="goods_name"
          >
            <el-input
              v-model="formData.goods_name"
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
import { addGoods,editeGoods } from '@/api/goodManage'
import utils from '@/utils/index'

@Component({
})
export default class OperationDialog extends Vue {
  formRules = {
    goods_name:[{required: true, message: '必填项，请输入商品',trigger: 'blur'}],
  }
  formData: { goods_name: string;} = {
    goods_name: '',
  }
  sumitLoading = false
  dialogVisible = false
  item: {[key:string]: string|number}= {}
  submitApi:typeof addGoods| typeof editeGoods = addGoods

  handlOpen (item?:{[key:string]: string}) {
    this.dialogVisible = true
    if(item) {
      this.item = item
      this.formData = JSON.parse(JSON.stringify(this.item))
      this.submitApi = editeGoods
    }
    else {
      this.formData = {
        goods_name: '',
      }
      this.submitApi = addGoods
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
