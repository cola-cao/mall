<template>
  <div class="cart-list">
    <cart-list-item v-for="(item,index) in list" 
                    :key="index" 
                    :itemInfo = "item"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import CartListItem from './CartListItem'

export default {
  
  name: 'CartList',
  data() {
    return {

    }
  },
  components: {
    CartListItem
  },
  computed: {
    ...mapGetters({
      list: 'cartList'
    })
  },
}
</script>

<style scoped >
</style>
