<template>
  <div>
    <mu-appbar class="search-appbar">
      <mu-text-field hintText="题干精确查找，谨慎输入" class="search-field" slor="left" v-model="keywords" @input="clean"/>
      <mu-flat-button color="white" label="搜索" slot="right" @click="searching"/>
    </mu-appbar>
    <div style="height: 50px;"></div>
    <div>
      <mu-float-button class="mtRight" mini>{{results.length}}</mu-float-button>
      <!-- <h2>检索到 <span style="color:#FF4081;">{{keywords}}</span> 相关共 <span style="color:springgreen;">{{results.length}}</span> 题</h2> -->
      <question v-for="item of results" :question="item" :key="item.id" mode="recite"></question>
    </div>
  </div>
</template>
<script>
import Question from '@/components/Question'
export default {
  data() {
    return {
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
    clean: function() {
      this.results = [];
    },
    searching: function() {
      if(this.keywords) {
        var words = this.keywords;
        this.results = this.questions.filter(function(q){
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
.search-field {
  text-align: left !important;
}
.mu-text-field-focus-line {
    background-color: #fff !important;
}

  .mtRight {
    position: fixed;
    top: 50%;
    opacity: 0.5;
    right: 15px;
  }
</style>
