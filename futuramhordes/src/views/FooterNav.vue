<template>
  <footer>
    <nav
      class="nav-container"
      role="navigation"
      aria-label="Navigation buttons"
    >
      <button
        class="button"
        type="button"
        @click="prevQuestion()"
        :disabled="currentQuestionIndex! < 1"
      >
        Back
      </button>
      <div id="clockdiv">
        <div>
          <span class="seconds">{{ timer }}</span>
          <div class="smalltext">Seconds</div>
        </div>
      </div>
      <button
        class="button button--next"
        type="button"
        @click="nextQuestion()"
        :disabled="chosenAnswers[currentQuestionIndex!].answerId === null || currentQuestionIndex! >= questions!.length"
      >
        {{ currentQuestionIndex == questions!.length - 1 ? "Submit" : "Next" }}
      </button>
      <ul class="nav-steps">
        <li
          class="nav-step"
          v-for="(question, index) in questions"
          :key="index"
          @click="selectQuestion(index)"
        >
          <button
            class="button"
            type="button"
            :disabled="
              chosenAnswers.filter((i) => i.answerId !== null).length < index
            "
            :class="{ 'is-active': currentQuestionIndex == index }"
          >
            {{ index + 1 }}
          </button>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script lang="ts">
import type { reponse } from "@/models/character";
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "FooterNav",
  emits: ["update-question-index", "submit-response"],
  props: {
    questions: Array,
    chosenAnswers: { type: Array as PropType<Array<reponse>>, required: true },
    currentQuestionIndex: Number,
    timer: Number
  },
  methods: {
    // Decrement currentQuestionIndex
    prevQuestion() {
      if (this.questions!.length > 0 && this.currentQuestionIndex! > 0) {
        this.$emit("update-question-index", this.currentQuestionIndex! - 1);
      }
    },
    // Increment currentQuestionIndex
    nextQuestion() {
      if (this.currentQuestionIndex! + 1 < this.questions!.length) {
        this.$emit("update-question-index", this.currentQuestionIndex! + 1);
      } else {
        this.$emit("submit-response");
      }
    },
    // Update currentQuestionIndex to given index
    selectQuestion(index: number) {
      if (this.chosenAnswers!.length >= index) {
        this.$emit("update-question-index", index);
      }
    }
  },
});
</script>

<style lang="scss" scoped>
.smalltext{
	padding-top: 5px;
	font-size: 16px;
}
#clockdiv{
	font-family: sans-serif;
	color: #fff;
	display: inline-block;
	font-weight: 100;
	text-align: center;
	font-size: 30px;
}

#clockdiv > div{
	padding: 10px;
	border-radius: 3px;
	background: $btn-bg--active;
	display: inline-block;
}

#clockdiv div > span{
	padding: 15px;
	border-radius: 3px;
	background: #00816A;
	display: inline-block;
}
.button {
  margin-top: 3rem;
  color: #fff;
  background-color: $btn-bg--active;
  border-style: none;
  padding: 0;
  min-width: 140px;
  padding: 1.25rem 2rem;
  font-family: -system-ui, sans-serif;
  font-size: 1.125rem;
  line-height: 1.2;
  border: 0;
  border-radius: 1px;
  white-space: nowrap;
  text-decoration: none;
  text-transform: capitalize;
  transition: all 0.1s;
  cursor: pointer;
  &:hover {
    background-color: $btn-hover;
  }
  &[disabled] {
    color: #313030;
    background-color: #a9aaac;
    pointer-events: none;
  }
  &--next {
    color: #fff;
    background-color: $btn-bg--active;
    &:hover {
      background-color: $btn-hover;
    }
  }
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
}
.nav-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-top: 3rem;
  .nav-steps {
    flex: 1 0 100%;
    margin-top: 2rem;
    .nav-step {
      margin: 10px 6px;
    }
    .button {
      width: 3rem;
      height: 3rem;
      min-width: auto;
      padding: 0;
    }
    .is-active {
      color: #fff;
      background-color: $btn-bg--active;
    }
  }
}
</style>
