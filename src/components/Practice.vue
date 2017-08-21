<template>
  <div class="practice">
    <mu-appbar :title="remainTime" class="practice-appbar">
      <!-- <mu-flat-button v-if="testing" label="立即交卷" slot="right" @click="handin" />
      <mu-flat-button v-else label="重考" slot="right" @click="reTry" /> -->
      <mu-icon-menu icon="more_vert" slot="right">
        <mu-menu-item title="立即交卷" :disabled="!testing" @click="handin"/>
        <mu-divider/>
        <mu-menu-item title="重新考试" :disabled="testing" @click="reTry"/>
        <mu-menu-item title="换份试题" :disabled="testing" @click="reTry"/>
      </mu-icon-menu>
    </mu-appbar>
    <div style="height: 2.5rem;"></div>
    <mu-dialog :open="dialog" title="模拟测试">
      <mu-divider/>
      <mu-list>
        <mu-list-item title="单选题">
          <mu-badge content="35题,每题2分" slot="after"/>
        </mu-list-item>
        <mu-list-item title="判断题">
          <mu-badge content="30题,每题1分" slot="after"/>
        </mu-list-item>
        <mu-list-item title="时间">
          <mu-badge content="60分钟" slot="after"/>
        </mu-list-item>
        <mu-list-item title="总分">
          <mu-badge content="100分" slot="after"/>
        </mu-list-item>
      </mu-list>
      <mu-divider/>
      <!-- <mu-flat-button label="取消" slot="actions" primary @click="cancel" /> -->
      <mu-flat-button label="开始测试" slot="actions" primary @click="close" />
    </mu-dialog>

    <div v-if="testing">
      <div v-if="finished" class="empty-content">
        <p>答题结束，不给你检查的机会</p>
        <mu-raised-button label="我要交卷" @click="handin" secondary/>
      </div>
      <question v-if="current && !finished" :question="current" mode="exercise" @childClicked="checkResult"></question>
    </div>
    <div v-if="!testing">
      <mu-paper class="demo-paper" :zDepth="3">
        <h2>测试结束，成绩: <span v-if="score>60" style="color: springgreen;">{{score}}</span><span v-else style="color: red;">{{score}}</span></h2>
      </mu-paper>
      <question v-if="item.result !== item.answer" v-for="item of questions" :question="item" :key="item.id" mode="recite" ><mu-divider/></question>
    </div>
  </div>
</template>
<script>
import Question from '@/components/Question'
export default {
  data() {
    return {
      currpos: 0,
      score: 0,
      testing: true,
      finished: false,
      dialog: true,
      questiosn: [],
      current: null,
      totalTime: 3600,
      interval: null
    }
  },
  components: {
    Question
  },
  computed: {
    hours: function () {
      return this.formatTime(Math.floor(this.totalTime / 3600));
    },
    minutes: function () {
      return this.formatTime(Math.floor(this.totalTime / 60) % 60);
    },
    seconds: function () {
      return this.formatTime(this.totalTime % 60);
    },
    remainTime: function () {
      return `${this.hours}:${this.minutes}:${this.seconds}`
    }
  },
  methods: {
    nextQuestion: function() {
      if(this.currpos < this.questions.length - 1) {
        this.current = this.questions[++this.currpos];
      } else {
        this.finished = true;
        console.log("最后一题了");
      }
    },
    testOver: function() {
      this.questions.map(function(q){
        if(q.result === "")
          q.result="foo";
      });
    },
    handin: function () {
      console.log("我要交卷");
      clearInterval(this.interval);
      this.$emit("handin", true);
      this.testOver();
      this.testing = false;
    },
    passTime: function () {
      if (this.totalTime > 0) {
        this.totalTime--;
        // console.log(this.totalTime);
      } else {
        console.log("考试时间到");
        clearInterval(this.interval);
        this.$emit("handin", true);
        this.testOver();
        this.testing = false;
      }
    },
    formatTime: function (num) {
      return num > 9 ? `${num}` : `0${num}`;
    },
    cancel () {
      this.dialog = false;
    },
    close () {
      this.interval = setInterval(this.passTime, 1000);
      this.current = this.questions[this.currpos];
      this.$emit("handin", false);
      this.dialog = false;
    },
    reTry: function() {
      this.questions.map(function(q) {
        q.result = "";
      });
      this.$emit("handin", false);
      this.finished = false;
      this.currpos = 0;
      this.totalTime = 3600;
      this.interval = setInterval(this.passTime, 1000);
      this.current = this.questions[this.currpos];
      this.score = 0;
      this.testing = true;
    },
    checkResult: function(ans) {
      console.log(ans, "in Practice.vue");
      this.current.result = ans;
      if(ans === this.current.answer) {
        this.score += this.current.type === "判断题"? 1 : 2;
        // setTimeout(this.nextQuestion, 2000);
      }
      this.nextQuestion();
    }
  },
  created() {
    var ques0 = JSON.parse(this.userData).sort(function () {
      return Math.random() - 0.5;
    });
    var ques1 = ques0.filter(function (q) {
      return q.type === "单选题";
    }).slice(0, 35);
    var ques2 = ques0.filter(function (q) {
      return q.type === "判断题";
    }).slice(0, 30);
    this.questions = ques1.concat(ques2);
    console.log("created in Practice.vue");
  }
}
</script>
<style scoped>
.practice-appbar {
  position: fixed;
  top: 0;
  left: 0;
}
.demo-paper {
  width: 80%;
  height: 2rem;
  line-height: 2rem;
  margin-top: 1rem;
  margin-left: 10%;
}
  .empty-content {
    margin-top: 40%;
    text-align: center;
  }
    .empty-content > p {
    opacity: 0.5;
    margin-bottom: 2rem;
  }
</style>
