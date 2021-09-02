<template>
  <el-container>
    <div class="layout_box">
      <el-aside
        :width="isCollapse?'64px':'200px'"
        style="background:#333"
      >
        <el-menu
          v-model="isCollapse"
          :collapse="isCollapse"
          default-active="2"
          class="el-menu-vertical"
          background-color="#333"
          text-color="#fff"
          active-text-color="#1989fa"
        >
          <div
            class="cllopse"
            @click="isCollapse=!isCollapse"
          >
            <i class="el-icon-s-unfold" />
          </div>
          <el-menu-item
            index="2"
            @click.native="$router.push('/orderManage')"
          >
            <i class="el-icon-document" />
            <span slot="title">货单管理</span>
          </el-menu-item>
          <el-menu-item
            index="3"
            @click.native="$router.push('/goodManage')"
          >
            <i class="el-icon-goods" />
            <span slot="title">货品管理</span>
          </el-menu-item>
          <el-menu-item
            index="4"
            @click.native="$router.push('/carTeamManage')"
          >
            <i class="el-icon-truck" />
            <span slot="title">车队管理</span>
          </el-menu-item>
          <el-menu-item
            index="5"
            @click.native="$router.push('/carManage')"
          >
            <i class="el-icon-bicycle" />
            <span slot="title">车辆管理</span>
          </el-menu-item>
          <el-menu-item
            index="6"
            @click.native="$router.push('/startAdressManage')"
          >
            <i class="el-icon-school" />
            <span slot="title">出发地管理</span>
          </el-menu-item>
          <el-menu-item
            index="7"
            @click.native="$router.push('/endAdressManage')"
          >
            <i class="el-icon-office-building" />
            <span slot="title">目的地管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container :style="{width: isCollapse?'calc(100vw - 64px)':'calc(100vw - 200px)'}">
        <el-header style="height: 45px; line-height: 45px; background:#333">
          Header
        </el-header>
        <el-main style="background: #f5f5f5">
          <router-view />
        </el-main>
      </el-container>
    </div>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class Layout extends Vue {
  isCollapse = false
}
</script>

<style lang="postcss" scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .layout_box{
    display: flex;
  }
  .cllopse{
    height: 45px;
    line-height: 45px;
    color: #fff;
    border-bottom: 1px solid #f5f5f5;
    i {
      cursor: pointer;
    }
  }

  .el-aside {
    height: 100%;
    color: #333;
    text-align: center;
    line-height: 200px;
    .el-menu-vertical{
      height: 100vh;
    }
  }
</style>
