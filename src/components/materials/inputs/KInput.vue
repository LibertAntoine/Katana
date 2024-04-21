<template>
  <div>
    <input
      :class="
        cn(
          `shadow-[0px_1px_4px_rgba(0,0,0,0.16)] bg-clip-paddingpx-2 min-h-[32px] w-full appearance-none
          items-center rounded bg-white px-2 text-sm font-normal leading-5 text-gray-700
          outline-none transition-all ease-in placeholder:italic placeholder:text-gray-500
          focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400
          ring-1 before:content-['_Hello_World'] before:bg-blue-500 before:w-[20px] before:h-[20px] before:mr-[10px] before:absolute
        `,
          $attrs.class ?? ''
        )
      "
      :placeholder="label ?? ''"
      v-model="field"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/libs/tw/utils'
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false
})

const field = defineModel<string>()

const props = defineProps<{
  label?: string
  imageLeft?: string
}>()

// const inputAdditionalStyle = computed(() => {
//   if (!props.imageLeft) return {}
//   return {
//     background: `url(${props.imageLeft}) no-repeat scroll 7px`,
//     'padding-left': '32px',
//     'background-size': '20px'
//   }
// })
</script>
