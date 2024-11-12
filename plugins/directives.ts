// plugins/directives.ts
import {defineNuxtPlugin} from '#app'
import longpress from '@/directives/longpress'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('longpress', longpress)
})