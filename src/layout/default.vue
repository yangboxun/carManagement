<template>
  <el-container>
    <div class="layout_box">
      <el-aside
        :width="isCollapse?'64px':'200px'"
        style="background:#333"
      >
        <el-menu
          v-model="isCollapse"
          router
          :collapse="isCollapse"
          :default-active="defaultActive"
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

            v-for="item of menuList"
            :key="item.link"
            :index="item.link"
          >
            <i :class="item.icon" />
            <span slot="title">{{ item.menuName }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container :style="{width: isCollapse?'calc(100vw - 64px)':'calc(100vw - 200px)'}">
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

  menuList = [
    {
      code: 'orderManage',
      menuName: '货单管理',
      link: '/orderManage',
      icon: 'el-icon-s-unfold'
    },
    {
      code: 'goodManage',
      menuName: '货品管理',
      link: '/goodManage',
      icon: 'el-icon-goods'
    },
    {
      code: 'carTeamManage',
      menuName: '车队管理',
      link: '/carTeamManage',
      icon: 'el-icon-truck'
    },
    {
      code: 'carManage',
      menuName: '车辆管理',
      link: '/carManage',
      icon: 'el-icon-bicycle'
    },{
      code: 'startAdressManage',
      menuName: '出发地管理',
      link: '/startAdressManage',
      icon: 'el-icon-school'
    },{
      code: 'endAdressManage',
      menuName: '目的地管理',
      link: '/endAdressManage',
      icon: 'el-icon-office-building'
    }
  ]

  get defaultActive(){
    return this.$route.path
  }
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
    border-bottom: 1px solid #666;
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
