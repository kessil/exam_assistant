<template>
  <mu-content-block class="question">
    <div class="question-content">
       <span class="question-type" v-text="question.type"></span>
      {{question.content}}
    </div>
    <div v-if="mode === 'recite'" class="question-list">
      <div v-show="question.A">
        <i v-if="question.answer === 'A'" class="fa fa-check-square-o" key="correctA"></i>
        <i v-else class="fa fa-square-o" key="defaultA"></i>
        <span> A. </span>
        <span v-text="question.A" :class="{wrong: question.result === 'A', correct: question.answer === 'A'}"></span>
      </div>
      <div v-show="question.B">
        <i v-if="question.answer === 'B'" class="fa fa-check-square-o" key="correctB"></i>
        <i v-else class="fa fa-square-o" key="defaultB"></i>
        <span> B. </span>
        <span v-text="question.B" :class="{wrong: question.result === 'B', correct: question.answer === 'B'}"></span>
      </div>
      <div v-show="question.C">
        <i v-if="question.answer === 'C'" class="fa fa-check-square-o" key="correctC"></i>
        <i v-else class="fa fa-square-o" key="defaultC"></i>
        <span> C. </span>
        <span v-text="question.C" :class="{wrong: question.result === 'C', correct: question.answer === 'C'}"></span>
      </div>
      <div v-show="question.D">
        <i v-if="question.answer === 'D'" class="fa fa-check-square-o" key="correctD"></i>
        <i v-else class="fa fa-square-o" key="defaultD"></i>
        <span> D. </span>
        <span v-text="question.D" :class="{wrong: question.result === 'D', correct: question.answer === 'D'}"></span>
      </div>
    </div>
    <!-- <mu-list v-if="mode === 'recite'" class="question-list">
      <mu-list-item v-show="question.A">
        <div>
          <i v-if="question.answer === 'A'" class="fa fa-check-square-o" key="correctA"></i>
          <i v-else class="fa fa-square-o" key="defaultA"></i>
          <span> A. </span>
          <span v-text="question.A"></span>
        </div>
      </mu-list-item>
      <mu-list-item v-show="question.B">
        <div>
          <i v-if="question.answer === 'B'" class="fa fa-check-square-o" key="correctB"></i>
          <i v-else class="fa fa-square-o" key="defaultB"></i>
          <span> B. </span>
          <span v-text="question.B"></span>
        </div>
      </mu-list-item>
      <mu-list-item v-show="question.C">
        <div>
          <i v-if="question.answer === 'C'" class="fa fa-check-square-o" key="correctC"></i>
          <i v-else class="fa fa-square-o" key="defaultC"></i>
          <span> C. </span>
          <span v-text="question.C"></span>
        </div>
      </mu-list-item>
      <mu-list-item v-show="question.D">
        <div>
          <i v-if="question.answer === 'D'" class="fa fa-check-square-o" key="correctD"></i>
          <i v-else class="fa fa-square-o" key="defaultD"></i>
          <span> D. </span>
          <span v-text="question.D"></span>
        </div>
      </mu-list-item>
    </mu-list> -->
    <mu-list v-else-if="mode === 'exercise'" class="question-list">
      <mu-list-item v-show="question.A">
        <a href="javascript:;" @click="checkAnswer('A')">
          <i v-if="isCorrect('A')" class="fa fa-check-square-o" key="correctA"></i>
          <i v-else-if="isWrong('A')" class="fa fa-window-close-o" key="wrongA"></i>
          <i v-else class="fa fa-square-o" key="defaultA"></i>
          <span> A. </span>
          <span v-text="question.A"></span>
        </a>
      </mu-list-item>
      <mu-list-item v-show="question.B">
        <a href="javascript:;" @click="checkAnswer('B')">
          <i v-if="isCorrect('B')" class="fa fa-check-square-o" key="correctB"></i>
          <i v-else-if="isWrong('B')" class="fa fa-window-close-o" key="wrongB"></i>
          <i v-else class="fa fa-square-o" key="defaultB"></i>
          <span> B. </span>
          <span v-text="question.B"></span>
        </a>
      </mu-list-item>
      <mu-list-item v-show="question.C">
        <a href="javascript:;" @click="checkAnswer('C')">
          <i v-if="isCorrect('C')" class="fa fa-check-square-o" key="correctC"></i>
          <i v-else-if="isWrong('C')" class="fa fa-window-close-o" key="wrongC"></i>
          <i v-else class="fa fa-square-o" key="defaultC"></i>
          <span> C. </span>
          <span v-text="question.C"></span>
        </a>
      </mu-list-item>
      <mu-list-item v-show="question.D">
        <a href="javascript:;" @click="checkAnswer('D')">
          <i v-if="isCorrect('D')" class="fa fa-check-square-o" key="correctD"></i>
          <i v-else-if="isWrong('D')" class="fa fa-window-close-o" key="wrongD"></i>
          <i v-else class="fa fa-square-o" key="defaultD"></i>
          <span> D. </span>
          <span v-text="question.D"></span>
        </a>
      </mu-list-item>
    </mu-list>
    <slot></slot>
  </mu-content-block>
</template>
<script>
export default {
  props: ["question", "mode"],
  methods: {
    isCorrect: function (ans) {
      // console.log(`${this.question.result} <> ${this.question.answer} <> ${ans}`);
      return this.question.result && ans === this.question.answer;
    },
    isWrong: function (ans) {
      // console.log(`${this.question.result} <> ${this.question.answer} <> ${ans}`);
      return ans === this.question.result;
    },
    checkAnswer: function (ans) {
      console.log(ans, "in Question.vue")
      // console.log(`${this.question.result} in ExerciseQuestion.vue`);
      if (this.question.result) {
        console.log("已经作答的题目无法修改答案");
      } else {
        this.$emit("childClicked", ans);
      }
    }
  }
}
</script>
<style scoped>
.question {
  text-align: left;
}

.question-content {
  /* height: 2rem; */
  line-height: 1.5rem;
  font-size: 1.0rem;
}

.practice-content {
  text-align: left;
}

.question-type {
  width: 10%;
  left: 0;
  color: #fff;
  margin-right: 0.5rem;
  background-color: #FF4081;
}

.container {
  display: flex;
  flex-wrap: wrap;
}

.question-list div,
.question-list a {
  color: black;
  line-height: 1.5rem;
  font-size: 0.9rem;
}

.fa-check-square-o, .correct {
  color: #4caf50;
}

.fa-window-close-o, .wrong {
  color: #ff0000;
}
</style>

