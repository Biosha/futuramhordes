<template>
  <br />
  <table>
    <tbody>
      <tr>
        <th>ID</th>
        <th>Question</th>
        <th>Image</th>
        <th>Réponse 1</th>
        <th>Réponse 2</th>
        <th>Réponse 3</th>
        <th>Réponse 4</th>
        <th>Preuve</th>
      </tr>
      <tr v-for="questions in batchQuestions" :key="questions.id">
        <td>{{ questions.id }}</td>
        <td>{{ questions.question }}</td>
        <td>
          <img
            v-if="questions.image"
            :src="`data:image/webp;base64,${transformImage(
              questions.image.data
            )}`"
          />
        </td>
        <td :class="questions.answer === 1 ? 'answer' : ''">
          {{ questions.first }}
        </td>
        <td :class="questions.answer === 2 ? 'answer' : ''">
          {{ questions.second }}
        </td>
        <td :class="questions.answer === 3 ? 'answer' : ''">
          {{ questions.third }}
        </td>
        <td :class="questions.answer === 4 ? 'answer' : ''">
          {{ questions.fourth }}
        </td>
        <td>{{ questions.proof }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import type { Question } from "@/models/character";
import { AdminService } from "@/service/adminServices";
import { defineComponent } from "vue";

export default defineComponent({
  name: "allQuestion",
  data() {
    return {
      batchQuestions: [] as Array<Question>,
    };
  },
  methods: {
    transformImage(image: Array<number>): string {
      return btoa(
        image.reduce(
          (data: string, byte: number) => data + String.fromCharCode(byte),
          ""
        )
      );
    },
  },
  async mounted(): Promise<void> {
    try {
      this.batchQuestions = await AdminService.getAllQuestions();
    } catch (err) {
      return;
    }
  },
});
</script>

<style lang="scss" scoped>
.answer {
  background-color: rgb(134, 197, 134);
}
table {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 2px solid #bc683c;
  background-color: #ecbd84;
  border-collapse: separate;
  border-spacing: 1px;
  tr {
    display: table-row;
    th {
      font-size: 8pt;
      text-shadow: 1px 1px 0px #356847;
      padding-left: 4px;
      padding-right: 4px;
      padding-bottom: 8px;
      height: 41px;
      vertical-align: bottom;
      color: #fffdba;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 1pt;
      text-align: left;
      white-space: nowrap;
      border: 1px solid #356847;
      background-color: #c64e36;
      // background-image: url('@/assets/background/table_header.webp');
      background-position: left bottom;
      max-width: 222px;
    }
    td {
      font-size: 9pt;
      padding: 1px 5px;
      color: #710;
      background-color: #f3ca92;
      border: 1px solid #c88f44;
      img {
        max-width: 256px;
      }
    }
  }
}
</style>
