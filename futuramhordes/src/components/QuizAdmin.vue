<template>
  <div>
    <div>
      <label for="news">Select a question to edit : </label>
      <select id="news" v-model="questionEdit" @change="newSelect = true">
        <template v-for="(news, index) in batchQuestions" :key="index">
          <option :value="news">{{ news.id }}</option>
        </template></select
      ><br />
      <label for="createNews">Or type the name to create a news : </label>
      <input id="createNews" v-model="questionEdit.id" type="text" />
    </div>
    <form @submit.prevent="submit()">
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Texte</th>
          </tr>
          <tr>
            <td>Question</td>
            <td><textarea v-model="questionEdit.question" /></td>
          </tr>
          <tr>
            <td>Réponse 1</td>
            <td><textarea v-model="questionEdit.first" /></td>
          </tr>
          <tr>
            <td>Réponse 2</td>
            <td><textarea v-model="questionEdit.second" /></td>
          </tr>
          <tr>
            <td>Réponse 3</td>
            <td><textarea v-model="questionEdit.third" /></td>
          </tr>
          <tr>
            <td>Réponse 4</td>
            <td><textarea v-model="questionEdit.fourth" /></td>
          </tr>
          <tr>
            <td>Bonne réponse</td>
            <td>
              <select v-model="questionEdit.answer">
                <option disabled value="">Please select one</option>
                <template v-for="i in 4" :key="i">
                  <option>
                    {{ i }}
                  </option>
                </template>
              </select>
            </td>
          </tr>
          <tr>
            <td>Preuve</td>
            <td><textarea v-model="questionEdit.proof" /></td>
          </tr>
		  <tr>
			<td>Image</td>
			<td><img
            v-if="questionEdit.image"
            :src="`data:image/webp;base64,${transformImage(
              questionEdit.image.data
            )}`"
          /></td>
		  </tr>
        </tbody>
      </table>
      <input type="file" ref="file" @change="upfile" />
      <input type="submit" />
    </form>
  </div>
</template>

<script lang="ts">
import type { Question } from "@/models/character";
import { AdminService } from "@/service/adminServices";
import { defineComponent } from "vue";

export default defineComponent({
  name: "questionEdit",
  data() {
    return {
      batchQuestions: [] as Array<Question>,
      questionEdit: {} as Partial<Question>,
      formData: new FormData(),
      newSelect: false as boolean,
    };
  },
  methods: {
    async submit(): Promise<void> {
      if (this.questionEdit.question) {
        this.formData.delete("question");
        this.formData.append("question", this.questionEdit.question);
      }
      if (this.questionEdit.first) {
        this.formData.delete("first");
        this.formData.append("first", this.questionEdit.first);
      }
      if (this.questionEdit.second) {
        this.formData.delete("second");
        this.formData.append("second", this.questionEdit.second);
      }
      if (this.questionEdit.third) {
        this.formData.delete("third");
        this.formData.append("third", this.questionEdit.third);
      }
      if (this.questionEdit.fourth) {
        this.formData.delete("fourth");
        this.formData.append("fourth", this.questionEdit.fourth);
      }
      if (this.questionEdit.answer) {
        this.formData.delete("answer");
        this.formData.append("answer", this.questionEdit.answer.toString());
      }
      if (this.questionEdit.proof) {
        this.formData.delete("proof");
        this.formData.append("proof", this.questionEdit.proof);
      }
      if (this.batchQuestions.find((q) => q.id === this.questionEdit.id)) {
        if (this.newSelect) {
          await AdminService.updateQuestion(
            this.formData,
            this.questionEdit.id!
          );
          this.batchQuestions = await AdminService.getAllQuestions();
        } else {
          alert(
            "A recent news with this title already exist. If you wish to edit this existing news, please select it in the drop-down menu."
          );
          return;
        }
      } else {
        await AdminService.postQuestion(this.formData, this.questionEdit.id!);
        this.batchQuestions = await AdminService.getAllQuestions();
      }
    },
    upfile(): void {
      const image = this.$refs.file! as HTMLInputElement;
      this.formData.delete("file");
      this.formData.append("file", image!.files![0]);
    },
	transformImage(image: Array<number>): string {
      return btoa(
        image.reduce(
          (data: string, byte: number) => data + String.fromCharCode(byte),
          ""
        )
      );
    }
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
      height: 75px;
	  img {
        max-width: 256px;
      }
    }
  }
}
</style>
