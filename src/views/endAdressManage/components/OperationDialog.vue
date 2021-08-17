<template>
  <el-dialog
    title="新增"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <el-form
      label-width="100px"
      :model="formData"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="目的名称：">
            <el-input
              v-model="formData.name"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="联系人：">
            <el-input
              v-model="formData.name"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="电话：">
            <el-input
              v-model="formData.name"
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
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="dialogVisible = false"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
})
export default class OperationDialog extends Vue {
  formData = {}
  dialogVisible = false
  brandOptions = []

  handlOpen (id?: string|number) {
    this.dialogVisible = true
  }

  handleClose () {
    this.dialogVisible = false
  }
}
</script>
