<template>
  <div class="tab-control">
    <div v-for="(item,index) in title" :key="index" class = "tab-control-item" 
    :class="{active: index == currentIndex}" @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    title: Array,
    default(){
      return []
    }
  },
  components: {

  },
  methods: {
    tabClick(index){
      this.currentIndex = index

      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped >
  .tab-control {
    display: flex;
    text-align: center;

    font-size: 15px;
    line-height: 40px;

    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {

    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
    
  }
  .active span {

    border-bottom: 3px solid var(--color-tint);
  }
</style>
