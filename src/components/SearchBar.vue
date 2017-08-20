<template>
  <div>
    <mu-flexbox class="mt8" orient="vertical">
      <mu-flexbox-item class="flex-demo">
        <mu-text-field v-show="flag" hintText="精确匹配模式，请谨慎输入"  class="search-field" v-model="keywords"/>
      </mu-flexbox-item>
      <mu-flexbox-item class="flex-demo">
        <mu-float-button v-if="flag" class="mtRight" icon="add" @click="searching" secondary/>
        <mu-float-button v-else class="mtRight" @click="clean" secondary>{{results.length}}</mu-float-button>
      </mu-flexbox-item>
    </mu-flexbox>
    <question v-for="item of results" :question="item" :key="item.id" mode="recite"></question>
  </div>
</template>
<script>
import Question from '@/components/Question'
export default {
  data() {
    return {
      flag: true,
      questions: [],
      results: [],
      keywords: ""
    }
  },
  components: {
    Question
  },
  created() {
    this.questions = JSON.parse(this.userData);
  },
  methods: {
    clean: function () {
      this.keywords = "";
      this.results = [];
      this.flag = true;
    },
    searching: function () {
      this.flag = false;
      if (this.keywords) {
        var words = this.keywords;
        this.results = this.questions.filter(function (q) {
          return q.content.indexOf(words) >= 0;
        });
      } else {
        console.log("keywords is none");
      }
    }
  }
}
</script>
<style scoped>
.search-appbar {
  position: fixed;
  width: 100%;
  height: 50px;
  top: 0;
  left: 0;
}

h2 {
  line-height: 1.5rem;
  font-size: 1.2rem;
}
.mt8 {
  text-align: center;
  position: fixed;
  bottom: 3rem;
}
 .search-field {
  width: 80%;
  opacity: 0.5;
}

.mtRight {
  opacity: 0.5;
  z-index:999;
}
</style>
