<template>
  <div class="quiz-completed">
    <p class="score">
      {{ result?.filter((r) => r.result === true).length }} / 5
    </p>
    <div class="quiz-answers">
      <div class="quiz-answer" v-for="(question, index) in result" :key="index">
        <h3 class="question">{{ question.question }}</h3>
        <img
          v-if="question.image"
          :src="`data:image/webp;base64,${transformImage(question.image.data)}`"
        />
        <p class="answer answer--correct">
          Correct answer: {{ question.answer }}
        </p>
        <p v-if="!answerCorrect(question)" class="answer answer--incorrect">
          Your answer: {{ question.playerChoice }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Correction } from "@/models/character";
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "QuizResult",
  props: {
    result: Object as PropType<Array<Correction>>,
  },
  methods: {
    answerCorrect(question: Correction) {
      if (question.playerChoice === question.answer) {
        return true;
      } else {
        return false;
      }
    },
    transformImage(image: Array<number>): string {
      return btoa(
        image.reduce(
          (data: string, byte: number) => data + String.fromCharCode(byte),
          ""
        )
      );
    },
  },
});
</script>

<style lang="scss" scoped>
.answer {
  margin-left: auto;
  margin-right: auto;
  font-size: 1.125rem;
  font-weight: 600;
  color: #313030;
  background-color: #fff;
  border-radius: 1px;
  &--option {
    max-width: 100%;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.1s;
    &:hover {
      color: #fff;
      background-color: $option-hover;
    }
    &.is-selected {
      color: #fff;
      background-color: $option-bg--active;
    }
    & + * {
      margin-top: 0.75rem;
    }
  }
  &--correct,
  &--incorrect {
    margin-top: 0.75rem;
    margin-bottom: 0.25rem;
    padding: 1.25rem 1.5rem;
    color: #fff;
    @media screen and (min-width: 768px) {
      max-width: 50%;
    }
  }
  &--correct {
    background-color: #11b352;
  }
  &--incorrect {
    background-color: #d41f22;
  }
}
.score {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 10rem;
  margin: 0 auto;
  font-size: 3rem;
  font-weight: 600;
  border: 0.375rem solid;
  border-radius: 50%;
}
.restart-buttons {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  .button {
    min-width: 290px;
    margin: 1rem 0.5rem 0;
  }
}
.quiz-answers {
  margin-top: 3rem;
  border-top: 2px solid;
  justify-content: center;
  img {
    max-width: 256px;
  }
}
.quiz-answer {
  margin: 4rem 2rem 6rem;
  .question {
    margin-bottom: 2.5rem;
    font-size: 1.5rem;
    &::after {
      content: "";
      display: block;
      border-bottom: 5px solid #fff;
      width: 100px;
      margin: 2rem auto 0;
    }
  }
}
</style>
