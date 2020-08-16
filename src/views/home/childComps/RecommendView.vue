<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
      <img :src="item.image" alt="">
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },

  props: {
    recommends: {
      type: Array,
      default(){
        return []
      }
    }
  },
  components: {

  }
}
</script>

<style scoped >
  .recommend {
    display: flex;
    text-align: center;
    font-size: 12px;

    padding: 15px 0 30px;

    border-bottom: 8px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 65px;
    height: 65px;

    margin-bottom: 10px;
  }
</style>
