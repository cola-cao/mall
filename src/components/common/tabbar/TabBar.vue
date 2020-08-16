<template>
  <div id="tab-bar" >
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style>
  #tab-bar {
  display: flex;

  text-align: center;

  background: #f6f6f6;
  height: 49px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  box-shadow: 0 -3px 1px rgba(100,100,100,0.08);
  }




</style>
