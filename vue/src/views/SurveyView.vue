<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">
          {{route.params.id ? model.title : "Create a survey"}}
        </h1>
        <button v-if="route.params.id" type="button" @click="deleteSurvey()"
        class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-600">
          Delete Survey
        </button>
      </div>
    </template>
    <div v-if="surveyLoading" class="flex justify-center">
      <button disabled type="button" class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
        <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
        Loading...
      </button>
    </div>
    <form v-else @submit.prevent="saveSurvey">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div class="mt-1 flex items-center">
              <img v-if="model.image_url" :src="model.image_url" :alt="model.title" class="w-64 h-48 object-cover">
              <span v-else class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                </svg>
              </span>
              <button type="button" class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <input @change="OnImageChoose" type="file" class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer">
                Change
              </button>
            </div>
          </div>

          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input type="text" name="title" id="title" v-model="model.title" autocomplete="survey_title" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">
              Title
            </label>
            <div class="mt-1">
              <textarea type="text" name="description" id="description" v-model="model.description" autocomplete="survey_description" placeholder="Describe your survey" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"/>
            </div>
          </div>

          <div>
            <label for="expire_date" class="block text-sm font-medium text-gray-700">
              Expire Date
            </label>
            <input type="date" name="expire_date" id="expire_date" v-model="model.expire_date" autocomplete="survey_title" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>

          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input id="status" name="status" type="checkbox" v-model="model.status" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
            </div>
            <div class="ml-1 text-sm">
              <label for="status" class="font-medium text-gray-700">Active</label>
            </div>
          </div>

        </div>

        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <h3 class="text-2xl font-semibold flex items-center justify-between">
            Questions

            <!-- Add new question -->
            <button
              type="button"
              @click="addQuestion()"
              class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Add Question
            </button>
            <!--/ Add new question -->
          </h3>
          <div v-if="!model.questions.length" class="text-center text-gray-600">
            You don't have any questions created
          </div>
          <div v-for="(question, index) in model.questions" :key="question.id">
            <QuestionEditor
              :question="question"
              :index="index"
              @change="questionChange"
              @addQuestion="addQuestion"
              @deleteQuestion="deleteQuestion"
            />
          </div>
        </div>

        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import {computed, ref, watch} from "vue";
import store from "../store";
import {useRoute, useRouter} from "vue-router";
import QuestionEditor from "../components/Editors/QuestionEditor.vue";
import {v4 as uuidv4} from "uuid"

const route = useRoute();

const router = useRouter();

const surveyLoading = computed(()=> store.state.currentSurvey.loading);


let model = ref({
  title: "",
  slug: "",
  status: false,
  image: null,
  image_url: null,
  description: null,
  expire_date: null,
  questions: []
});

watch(
  ()=> store.state.currentSurvey.data,
  (newVal, oldVal)=>{
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status: newVal.status !== "draft",
    }
  }
)

if (route.params.id){
  store.dispatch('getSurvey',route.params.id);
  //model.value = store.state.surveys.find((s)=>s.id === parseInt(route.params.id))
}

function OnImageChoose(ev){
  const file = ev.target.files[0];

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = ()=>{
    model.value.image = reader.result;

    model.value.image_url = reader.result;
  }
}

function addQuestion(index){
  const newQuestion ={
    id:uuidv4(),
    type:"text",
    question:"",
    description:null,
    data: {}
  }

  model.value.questions.splice(index, 0, newQuestion);

}

function deleteQuestion(question){

  model.value.questions = model.value.questions.filter((q)=> q !== question);

}

function questionChange(question){
  model.value.questions = model.value.questions.map((q)=>{
    if(q.id === question.id){
      return JSON.parse(JSON.stringify(question))
    }
    return q;
  });
}

function saveSurvey(){
  store.dispatch("saveSurvey", model.value).then(
    ({data})=>{
      router.push({
        name:"SurveyView",
        params:{
          id: data.data.id
        }
      })
    }
  );
}

function deleteSurvey(){
  if (confirm("want to delete the survey!")){
    store.dispatch("deleteSurvey", model.value.id).then(()=>{
      router.push({
       name:"Surveys"
      });
    });
  }
}

</script>

<style scoped>

</style>
