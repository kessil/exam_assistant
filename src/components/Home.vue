<template>
  <div class="home">
    <category v-if="activeNav === 'category'"></category>
    <exercise v-show="activeNav === 'exercise'"></exercise>
    <practice v-if="activeNav === 'practice'" @handin="changeShow"></practice>
    <search-bar v-if="activeNav === 'searchbar'"></search-bar>
    <about-us v-if="activeNav === 'aboutus'"></about-us>
    <stars v-show="activeNav === 'stars'"></stars>
    <div class="foobar"></div>
    <common-footer v-show="show" @navChange="activeNavChange"></common-footer>
  </div>
</template>
<script>
import CommonFooter from "@/components/CommonFooter"
import Category from "@/components/Category"
import Exercise from "@/components/Exercise"
import Practice from "@/components/Practice"
import SearchBar from "@/components/SearchBar"
import AboutUs from "@/components/AboutUs"
import Stars from "@/components/Stars"
export default {
  data() {
    return {
      activeNav: "category",
      show: true
    }
  },
  components: {
    CommonFooter,
    Category,
    Exercise,
    Practice,
    SearchBar,
    AboutUs,
    Stars
  },
  methods: {
    activeNavChange: function(val) {
      this.activeNav = val;
    },
    changeShow: function(val) {
      this.show = val;
    }
  }
}
</script>
<style scoped>
  div.foobar {
    height: 3rem;
  }
</style>
