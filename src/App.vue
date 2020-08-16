<template>
  <div id="app">
    <keep-alive exclude="Detail,Profile" class="detail">
      <router-view v-if="isRouterAlive"/>
    </keep-alive>
    <router-view name="loginRegister"/>
    <main-tab-bar/>
  </div>
</template>

<script>

import MainTabBar from 'components/content/MainTabBar/MainTabBar'

  export default {
    name: 'App',
    provide () {
    return {
      reload: this.reload
    }
    },
    data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
    components: {
      MainTabBar
    },
  }
</script>
<style>
  @import url('assets/css/base.css');
</style>
