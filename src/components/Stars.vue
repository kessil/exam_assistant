<template>
  <div>
    <div v-if="this.myStars.length === 0" @click="console.log(this.myStars)">收藏簿暂时为空，快去收藏一些吧!</div>
    <div v-else>
      <question v-for="item of this.myStars" :question="item" :recite="true" :key="item.id"><mu-divider/></question>
    </div>
  </div>
</template>
<script>
import Question from '@/components/Question'
export default {
  components: {
    Question
  }
}
</script>
