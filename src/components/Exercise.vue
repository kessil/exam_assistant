<template>
  <div class="exercise-content">
    <mu-appbar :title="desc" class="content">
      <!-- <mu-flat-button icon="star" mini @click="starQuestion" slot="right" secondary/> -->
      <mu-chip backgroundColor="white" slot="right">
        <mu-avatar :size="32" icon="face" backgroundColor="#FF4081"/>
        <span style="color: springgreen;">{{corrects}}</span>
        -
        <span style="color: red;">{{wrongs}}</span>
        -
        <span style="color: #878787;">{{total - corrects - wrongs}}</span>
      </mu-chip>
    </mu-appbar>
      <!-- <div style="height: 2.5rem;"></div> -->
      <div v-if="current">
        <question :question="current" mode="exercise" @childClicked="checkResult"></question>
      </div>
      <div v-else>
        <h2>你看不到我</h2>
        <p>抱歉，没有获取到数据</p>
      </div>
      <mu-toast v-if="toast" :message="msg" style="text-align: center;" @close="hideToast"/>
      <mu-float-button v-if="currpos < total-1" icon="chevron_right" class="mtRight" @click="nextQuestion"/>
  </div>
</template>
<script>
import Question from '@/components/Question'
export default {
  data() {
    return {
      total: 0,
      currpos: 0,
      corrects: 0,
      wrongs: 0,
      questions: [],
      mirrorBtn: true,
      toast: false,
      msg: "",
      current: null
    }
  },
  components: {
    Question
  },
  computed: {
    desc: function() {
      return `${this.currpos+1} / ${this.total}`;
    }
  },
  created() {
    this.questions = JSON.parse(this.userData).sort(function(){
      return Math.random() - 0.5;
    });
    this.total = this.questions.length;
    this.current = this.questions[this.currpos];
  },
  methods: {
    nextQuestion: function() {
      if(this.currpos < this.total) {
        this.currpos++;
        this.current = this.questions[this.currpos];
      }
    },
    prevQuestion: function() {
      if(this.currpos > 0) {
        this.currpos--;
        this.current = this.questions[this.currpos];
      }
    },
    starQuestion: function() {
      var index = this.current.id;
      if(!this.myStars.some(function(s) {
        return s.id === index;
      })) {
        this.myStars.push(this.current);
        this.msg = "收藏成功";
      } else {
        this.msg = "收藏簿中已存在";
      }
      // console.log(this.myStars);
      this.toast = true
      if (this.toastTimer) clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
    },
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    },
    checkResult: function(ans) {
      console.log(ans, "in Exercise.vue");
      this.current.result = ans;
      if(this.current.result === this.current.answer) {
        this.corrects++;
        setTimeout(this.nextQuestion, 2000);
      } else {
        this.wrongs++;
      }
    }
  }
}
</script>
<style scoped>
  .exercise-content {
    text-align: left;
  }
  /* .content {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
  } */
  .mtRight {
    position: fixed;
    bottom: 3.5rem;
    opacity: 0.5;
    text-align: right;
    right: 0.5rem;
  }
</style>

