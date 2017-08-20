<template>
  <div>
      <div style="height: 2rem;"></div>
    <mu-flexbox orient="vertical" class="flexbox-demo">
      <mu-flexbox-item v-for="img in linkerImg" :key="img.name" ><a :href="img.name" target="_blank"><img :src="img.src" :alt="img.name" :title="img.name" width="100px" height="100px"></a></mu-flexbox-item>
    </mu-flexbox>
    <p>信号工苦，信号工累，信号工还要答题对</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      linkerImg: [
        { name: "https://cn.vuejs.org/", src: require('../assets/logo_vue.png') },
        { name: "http://www.muse-ui.org/#/index", src: require('../assets/logo_muse-ui.png') },
        { name: "https://github.com/kessil/exam_assistant", src: require('../assets/logo_github.png') }
      ]
    }
  }
}
</script>

<style scoped>
  .flexbox-demo {
    text-align: center;
  }
  h2 {
    text-align: left;
  }
  p {
    color: white;
  }
</style>
