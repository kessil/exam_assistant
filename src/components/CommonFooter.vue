<template>
  <mu-paper class="content">
    <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
      <mu-bottom-nav-item value="category" title="顺序浏览" icon="sort"/>
      <mu-bottom-nav-item value="exercise" title="随机练习" icon="shuffle"/>
      <mu-bottom-nav-item value="practice" title="模拟测试" icon="books"/>
      <mu-bottom-nav-item value="searchbar" title="搜题有我" icon="search"/>
      <!-- <mu-bottom-nav-item value="mistakes" title="我的错题" icon="photo"/>
      <mu-bottom-nav-item value="stars" title="我的收藏" icon="star"/> -->
      <mu-bottom-nav-item value="aboutus" title="关于我们" icon="info"/>
    </mu-bottom-nav>
  </mu-paper>

</template>

<script>
export default {
  data () {
    return {
      bottomNav: 'category'
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val;
      this.$emit("navChange", val);
    }
  }
}
</script>
<style scoped>
  .content {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    /* max-width: 376px; */
  }
</style>

