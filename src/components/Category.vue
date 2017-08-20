<template>
<div class="category">
  <mu-tabs :value="activeTab" @change="handleTabChange" class="category-tabs">
    <mu-tab value="tab1" title="单选题"/>
    <mu-tab value="tab2" title="判断题"/>
    <mu-tab value="tab3" title="多选题"/>
  </mu-tabs>
  <div style="height: 50px;"></div>
  <div>
    <div v-if="afterSort.length">
      <question v-for="item of currents" :question="item" mode="recite" :key="item.id"><mu-divider/></question>
      <div v-if="currents.length < afterSort.length"><a @click="loadMore">点我加载更多</a></div>
      <div v-else>已无更多</div>
      <mu-back-top/>
    </div>
    <div v-else>
      <h2>你看不到我</h2>
      <p>抱歉，没有获取到数据</p>
    </div>
  </div>
</div>
</template>

<script>
import Question from '@/components/Question'
export default {
  data () {
    return {
      activeTab: 'tab1',
      questions: [],
      afterSort: [],
      currents: [],
      loading: false,
      scroller: null
    }
  },
  components: {
    Question
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val;
      switch(val) {
        case "tab1":
          this.afterSort = this.questions.filter(function(q){
            return q.type === "单选题";
          });
          this.currents = this.afterSort.slice(0, 25);
          break;
        case "tab2":
          this.afterSort = this.questions.filter(function(q){
            return q.type === "判断题";
          });
          this.currents = this.afterSort.slice(0, 25);
          break;
        case "tab3":
          this.afterSort = this.questions.filter(function(q){
            return q.type === "多选题";
          });
          this.currents = this.afterSort.slice(0, 25);
          break;
      }
    },
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        this.currents = this.afterSort.slice(0, this.currents.length+25);
        this.loading = false
      }, 500)
    }
  },
  created() {
    // console.log(this.questions);
    this.questions = JSON.parse(this.userData);
    this.afterSort = this.questions.filter(function(q){
      return q.type === "单选题";
    });
    this.currents = this.afterSort.slice(0, 25);
    window.scrollTo(0,0);
  }
}
</script>
<style scoped>
  .category-tabs {
    position: fixed;
    height: 50px;
    top: 0;
    left: 0;
  }

</style>



