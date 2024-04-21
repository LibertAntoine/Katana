<template>
  <button class="bg-blue-500 text-xl" @click="onClick" :style="style">{{ label }}</button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    primary?: boolean
    size?: 'small' | 'medium' | 'large'
    backgroundColor?: string
  }>(),
  { primary: false }
)

const emit = defineEmits<{
  (e: 'click', id: number): void
}>()

const style = computed(() => ({
  backgroundColor: props.backgroundColor
}))

const onClick = () => {
  emit('click', 1)
}
</script>
