<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">
          Surveys
        </h1>
        <router-link :to="{name:'SurveyCreate'}" class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add new Survey
        </router-link>
      </div>
    </template>
    <div class="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3">
      <div v-for="survey in surveys" :key="survey.id"
           class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">

        <img :src="survey.image" alt="" class="w-full h-48 object-cover">
        <h4 class="mt-4 text-lg font-bold">{{survey.title}}</h4>
        <div v-html="survey.description" class="overflow-hidden flex-1"></div>
        <div class="flex justify-between items-center mt-3">
          <router-link :to="{name: 'SurveyView', params : {id:survey.id}}" class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
            </svg>
            Edit
          </router-link>
          <button v-if="survey.id" type="button" @click="deleteSurvey(survey)" class="h-8 w8 flex items-center justify-center rounded-full border border-transparent text-sm text-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import store from "../store";
import {computed} from "vue";

const surveys = computed(()=>store.state.surveys)

function deleteSurvey(survey){
  if(confirm("Are you sure you want to delete this survey!")){
    //delete survey

  }
}

</script>
