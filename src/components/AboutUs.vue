<template>
<div class="demo-vsteper-container">
  <h2>技术栈</h2>
  <mu-stepper :activeStep="activeStep" orientation="vertical">
    <mu-step>
      <mu-step-label>
        学习<a target="_blank" href="http://www.runoob.com/html/html-tutorial.html">HTML</a>
      </mu-step-label>
      <mu-step-content>
        <p>
           超文本标记语言（英语：HyperText Markup Language，简称：HTML）是一种用于创建网页的标准标记语言。您可以使用 HTML 来建立自己的 WEB 站点，HTML 运行在浏览器上，由浏览器来解析。
        </p>
        <mu-raised-button label="下一步" class="demo-step-button" @click="handleNext" primary/>
      </mu-step-content>
    </mu-step>
    <mu-step>
      <mu-step-label>
        学习<a target="_blank" href="http://www.runoob.com/css/css-tutorial.html">CSS</a>
      </mu-step-label>
      <mu-step-content>
        <p>
          层叠样式表(英文全称：Cascading Style Sheets)是一种用来表现HTML（标准通用标记语言的一个应用）或XML（标准通用标记语言的一个子集）等文件样式的计算机语言。CSS不仅可以静态地修饰网页，还可以配合各种脚本语言动态地对网页各元素进行格式化。
        </p>
        <mu-raised-button label="下一步" class="demo-step-button" @click="handleNext" primary/>
        <mu-flat-button label="上一步" class="demo-step-button" @click="handlePrev"/>
      </mu-step-content>
    </mu-step>
    <mu-step>
      <mu-step-label>
        学习<a target="_blank" href="http://www.runoob.com/js/js-tutorial.html">Javascript</a>
      </mu-step-label>
      <mu-step-content>
        <p>
          JavaScript一种直译式脚本语言，是一种动态类型、弱类型、基于原型的语言，内置支持类型。它的解释器被称为JavaScript引擎，为浏览器的一部分，广泛用于客户端的脚本语言，最早是在HTML（标准通用标记语言下的一个应用）网页上使用，用来给HTML网页增加动态功能。
        </p>
        <mu-raised-button label="下一步" class="demo-step-button" @click="handleNext" primary/>
        <mu-flat-button label="上一步" class="demo-step-button" @click="handlePrev"/>
      </mu-step-content>
    </mu-step>
    <mu-step>
      <mu-step-label>
        学习<a target="_blank" href="https://cn.vuejs.org/">Vue</a>
      </mu-step-label>
      <mu-step-content>
        <p>
          Vue.js（读音 /vjuː/，类似于 view） 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与单文件组件和 Vue 生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。
        </p>
        <mu-raised-button label="下一步" class="demo-step-button" @click="handleNext" primary/>
        <mu-flat-button label="上一步" class="demo-step-button" @click="handlePrev"/>
      </mu-step-content>
    </mu-step>
    <mu-step>
      <mu-step-label>
        学习<a target="_blank" href="http://www.muse-ui.org/#/index">Muse-UI</a>
      </mu-step-label>
      <mu-step-content>
        <p>
          Muse UI 是一套 Material Design 风格开源组件库，旨在快速搭建页面。它基于 Vue 2.0 开发，并提供了自定义主题，充分满足可定制化的需求。
        </p>
        <mu-raised-button label="下一步" class="demo-step-button" @click="handleNext" primary/>
        <mu-flat-button label="上一步" class="demo-step-button" @click="handlePrev"/>
      </mu-step-content>
    </mu-step>
    <mu-step>
      <mu-step-label>
        完成<a target="_blank" href="https://github.com/kessil/exam_assistant">考试助手</a>
      </mu-step-label>
      <mu-step-content>
        <p>
          信号工苦，信号工累，信号工还要答题对。信号工考试助手神器在手，答题再也不累！
        </p>
        <mu-raised-button label="完成" class="demo-step-button" @click="handleNext" primary/>
        <mu-flat-button label="上一步" class="demo-step-button" @click="handlePrev"/>
      </mu-step-content>
    </mu-step>
  </mu-stepper>
  <h3 v-if="finished">
    都完成啦!<a href="javascript:;" @click="reset">再看一遍</a>
  </h3>
</div>
</template>

<script>
export default {
  data() {
    return {
      activeStep: 0,
      linkerImg: [
        { name: "https://cn.vuejs.org/", src: require('../assets/logo_vue.png') },
        { name: "http://www.muse-ui.org/#/index", src: require('../assets/logo_muse-ui.png') },
        { name: "https://github.com/kessil/exam_assistant", src: require('../assets/logo_github.png') }
      ]
    }
  },
  computed: {
    finished () {
      return this.activeStep > 5
    }
  },
  methods: {
    handleNext () {
      this.activeStep++
    },
    handlePrev () {
      this.activeStep--
    },
    reset () {
      this.activeStep = 0
    }
  }
}
</script>

<style lang="css" scoped>
.demo-vsteper-container{
  max-width: 380px;
  /* max-height: 400px; */
  margin: auto;
}

.demo-step-button {
  margin-top: 12px;
  margin-right: 12px;
}
p {
  text-align: left;
}
</style>

