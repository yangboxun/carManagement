<template>
  <div>
    <Pagelayout mb_16>
      <div class="query_form_box">
        <el-form
          label-width="100px"
          :model="formData"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="车牌号:">
                <el-input
                  v-model="formData.input"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属车队:">
                <el-select
                  v-model="formData.brand"
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
          <div style="display: flex; justify-content: flex-end">
            <el-button type="primary">
              查询
            </el-button>
            <el-button type="info">
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
            prop="date"
            label="创建日期"
          />
          <el-table-column
            prop="name"
            label="车牌号"
          />
          <el-table-column
            prop="name"
            label="司机"
          />
          <el-table-column
            prop="name"
            label="电话"
          />
          <el-table-column
            prop="name"
            label="所属车队"
          />
          <el-table-column
            label="操作"
            width="150"
          >
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                size="small"
                @click="handleEdite(row.id)"
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
        style="display: flex; justify-content: flex-end"
        background
        layout="prev, pager, next"
        :total="1000"
      />
    </Pagelayout>
    <OperationDialog ref="OperationDialogDom" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Pagelayout from "@/components/Pagelayout.vue";
import OperationDialog from "./components/OperationDialog.vue";
@Component({
  components: {
    Pagelayout,
    OperationDialog,
  },
})
export default class Ordermanage extends Vue {
  brandOptions = [
    {
      value: "选项1",
      label: "黄金糕",
    },
    {
      value: "选项2",
      label: "双皮奶",
    },
    {
      value: "选项3",
      label: "蚵仔煎",
    },
    {
      value: "选项4",
      label: "龙须面",
    },
    {
      value: "选项5",
      label: "北京烤鸭",
    },
  ];

  formData = {};
  tableData = [
    {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普",
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      address: "上海市普",
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      address: "上海市",
    },
    {
      date: "2016-05-03",
      name: "王小虎",
      address: "上海市普陀",
    },
  ];

  handleAdd() {
    (this.$refs.OperationDialogDom as OperationDialog).handlOpen();
  }

  handleEdite(id: string | number) {
    (this.$refs.OperationDialogDom as OperationDialog).handlOpen(id);
  }

  handleDelete(id: string | number) {
    this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
  }
}
</script>

<style lang="postcss">
[mb_16] {
  margin-bottom: 16px;
}
.statics_box {
  display: flex;
  justify-content: space-between;
  padding: 16px 16px;
  .module_li {
    display: flex;
    align-items: center;
    .img_box {
      margin-right: 16px;
      img {
        width: 40px;
      }
    }
    .count_box {
      p {
        font-size: 14px;
        margin: 0px;
        margin-bottom: 8px;
      }
      span {
        font-size: 20px;
        font-weight: bolder;
      }
    }
  }
}
</style>
