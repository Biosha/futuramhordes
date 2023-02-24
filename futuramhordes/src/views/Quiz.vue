<template>
  <div class="quiz-container">
    <button
      v-if="!isStarted && !isFinished"
      class="button button--start"
      type="button"
      @click="startQuiz()"
    >
      Start
    </button>
    <div v-if="isStarted">
      <LoadingQuiz
        v-if="questions.length == 0"
        text="Thinking of questions..."
      />
      <div
        class="quiz"
        v-else-if="currentQuestionIndex < questions.length"
        :key="currentQuestionIndex"
      >
        <h2>{{ questions[currentQuestionIndex].question }}</h2>
        <img
          v-if="questions[currentQuestionIndex].image"
          :src="`data:image/webp;base64,${transformImage(
            questions[currentQuestionIndex].image!.data
          )}`"
        />
        <div class="answers-container">
          <div
            class="answer answer--option"
            v-for="(answer, index) in questions[currentQuestionIndex].answers"
            @click="
              selectAnswer(
                answer,
                currentQuestionIndex,
                questions[currentQuestionIndex].id,
                index
              )
            "
            :class="{
              'is-selected': selectedAnswer == answer,
            }"
            :key="answer"
          >
            {{ answer }}
          </div>
          <FooterNav
            :questions="questions"
            :chosenAnswers="chosenAnswers"
            :currentQuestionIndex="currentQuestionIndex"
            :timer="timer"
            v-on:update-question-index="currentQuestionIndex = $event"
            v-on:submit-response="sendResponses()"
          />
        </div>
      </div>
    </div>

    <div v-if="isFinished">
      <QuizResult :result="result" />
    </div>
  </div>
</template>

<script lang="ts">
import LoadingQuiz from "./Loading.vue";
import FooterNav from "./FooterNav.vue";
import QuizResult from "../components/quiReponse.vue";
import { defineComponent } from "vue";
import { PlayerService } from "@/service/playerServices";
import type {
  Correction,
  QuestionDisplayed,
  reponse,
} from "@/models/character";

export default defineComponent({
  name: "QuizComp",
  components: {
    LoadingQuiz,
    FooterNav,
    QuizResult,
  },
  data() {
    return {
      isStarted: false,
      isFinished: false,
      result: undefined as Array<Correction> | undefined,
      questions: [] as Array<QuestionDisplayed>,
      chosenAnswers: [
        { answer: undefined, id: undefined, answerId: null },
        { answer: undefined, id: undefined, answerId: null },
        { answer: undefined, id: undefined, answerId: null },
        { answer: undefined, id: undefined, answerId: null },
        { answer: undefined, id: undefined, answerId: null },
      ] as Array<reponse>,
      currentQuestionIndex: 0,
      timer: 0 as number
    };
  },
  methods: {
    // Fetch question data from Open Trivia DB and call populateQuestions()
    async startQuiz() {
      this.isStarted = true;
      this.questions = await PlayerService.getQuiz();
      this.initializeClock();
    },
    // Set user's chosen answer
    selectAnswer(
      answer: string,
      index: number,
      questionId: number,
      reponseIndex: number
    ) {
      if (this.chosenAnswers.length > index) {
        this.chosenAnswers.splice(index, 1, {
          answer: answer,
          id: questionId,
          answerId: reponseIndex,
        });
      } else {
        this.chosenAnswers.push({
          answer: answer,
          id: questionId,
          answerId: reponseIndex,
        });
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
    async sendResponses(): Promise<void> {
      this.result = await PlayerService.quiz(this.chosenAnswers);
      this.isStarted = false;
      this.isFinished = true;
    },
    initializeClock() {
      this.timer = 60;
      const timer = setInterval(() => this.timer -= 1, 1000)
      setTimeout(() => clearInterval(timer), 61000)
    }
  },
  computed: {
    selectedAnswer(): string | undefined {
      return this.chosenAnswers[this.currentQuestionIndex].answer;
    },
  },
  watch: {
    async timer(newTimer, oldTimer) {
      if (newTimer === 0) await this.sendResponses()
    }
  }
});
</script>

<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
.quiz-container {
  display: flex;
  position: relative;
  justify-content: center;
  max-width: 50rem;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @media screen and (min-width: 768px) {
    padding: 3rem 1rem;
  }
  @media screen and (min-width: 1200px) {
    max-width: 70rem;
  }
}
.setup-container {
  h1 {
    margin-top: 0;
  }
  h2 {
    font-size: 1.5rem;
    margin: 3rem auto 2rem;
    &::after {
      content: "";
      display: block;
      border-bottom: 5px solid #fff;
      width: 100px;
      margin: 1rem auto 0;
    }
  }
}
.categories-container,
.difficulties-container {
  display: flex;
  justify-content: space-evenly;
  flex-flow: row wrap;
}
.setup-option {
  flex: 1 1 auto;
  min-width: 100px;
  margin: 0.5rem;
  padding: 0.875rem;
  font-size: 1.125rem;
  color: #313030;
  background-color: $option-bg;
  border-radius: 1px;
  cursor: pointer;
  transition: all 0.1s;
  &:hover {
    color: #fff;
    background-color: $option-hover;
  }
  &.is-selected {
    background-color: $option-bg--active;
    color: #fff;
  }
}
.button--start {
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
}
.quiz {
  display: flex;
  flex-flow: row wrap;
  max-width: 40rem;
  width: 100%;
  justify-content: center;
  img {
    max-width: 256px;
  }
  & > * {
    flex: 1 1 100%;
  }
}
.answers-container {
  margin-top: 1rem;
  @media screen and (min-width: 768px) {
    margin-top: 3rem;
  }
}
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
.completion-message {
  font-size: 2.5rem;
}
.quiz-answers {
  margin-top: 3rem;
  border-top: 2px solid;
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
</style>
