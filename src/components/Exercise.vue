<template>
  <div class="exercise-content">
    <mu-appbar :title="desc" class="content">
      <!-- <mu-flat-button icon="star" mini @click="starQuestion" slot="right" secondary/> -->
      <mu-chip backgroundColor="white" slot="right" @click="openBottomSheet">
        <mu-avatar :size="32" icon="face" backgroundColor="#a4c639" />
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
    <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
      <mu-list @itemClick="closeBottomSheet">
        <mu-content-block class="demo-grid" style="max-height: 7rem;">
          <mu-row gutter>
            <mu-col width="20" tablet="10" desktop="10" v-for="n in questions.length" :key="n" :style="{backgroundColor: '#eee', borderWidth: '2px', borderColor: questions[n-1].result === ''?'':questions[n-1].result === questions[n-1].answer? 'springgreen' :'red'}"><a @click="flyTo(n)">{{n}}</a></mu-col>
          </mu-row>
        </mu-content-block>
      </mu-list>
    </mu-bottom-sheet>
    <mu-toast v-if="toast" :message="msg" style="text-align: center;" @close="hideToast" />
    <div class="fixed-right">
      <ul>
        <div>
          <mu-float-button v-if="currpos > 0" mini secondary icon="chevron_left" class="mt-left" @click="prevQuestion" />
        </div>
        <div>
          <mu-float-button v-if="currpos < total-1" icon="chevron_right" class="mt-right" @click="nextQuestion" />
        </div>
      </ul>
    </div>
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
      bottomSheet: false,
      current: null
    }
  },
  components: {
    Question
  },
  computed: {
    desc: function () {
      return `${this.currpos + 1} / ${this.total}`;
    }
  },
  created() {
    this.questions = JSON.parse(this.userData).sort(function () {
      return Math.random() - 0.5;
    });
    this.total = this.questions.length;
    this.current = this.questions[this.currpos];
    console.log("created in Exercise.vue");
  },
  methods: {
    nextQuestion: function () {
      if (this.currpos < this.total) {
        this.currpos++;
        this.current = this.questions[this.currpos];
      }
    },
    flyTo: function(n) {
      this.currpos = n -1;
      this.current = this.questions[this.currpos];
      this.bottomSheet = false;
    },
    prevQuestion: function () {
      if (this.currpos > 0) {
        this.currpos--;
        this.current = this.questions[this.currpos];
      }
    },
    closeBottomSheet() {
      this.bottomSheet = false
    },
    openBottomSheet() {
      this.bottomSheet = true
    },
    starQuestion: function () {
      var index = this.current.id;
      if (!this.myStars.some(function (s) {
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
    hideToast() {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    },
    checkResult: function (ans) {
      console.log(ans, "in Exercise.vue");
      this.current.result = ans;
      if (this.current.result === this.current.answer) {
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

a {
  color: #000;
}


/* .content {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
  } */

.fixed-right {
  position: fixed;
  display: flex;
  bottom: 3.5rem;
  right: 0.5rem;
  text-align: right;
  opacity: 0.5;
}

.demo-grid div[class*="col-"] {
  background: #fff;
  text-align: center;
  color: #000;
  border: 1px solid #ddd;
  padding: 8px;
  margin-bottom: 8px;
}

/* .mt-left {
  position: fixed;
  bottom: 4.5rem;
  opacity: 0.5;
  right: 0.5rem;
}

.mt-right {
  position: fixed;
  bottom: 3.5rem;
  opacity: 0.5;
  right: 0.5rem;
} */
</style>

