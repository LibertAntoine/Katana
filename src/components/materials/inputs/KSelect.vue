<template>
  <div ref="selectFieldElement" class="relative">
    <span v-if="label" class="label">
      {{ label.toUpperCase() }}
    </span>
    <div
      contenteditable="true"
      :class="
        cn(
          `custom-shadow relative flex h-fit min-h-[32px] w-full appearance-none flex-row
            flex-wrap items-center rounded bg-clip-padding px-2 pr-[25px] text-sm
            font-normal leading-5 text-gray-700 outline-none transition-all ease-in
            placeholder:italic placeholder:text-gray-500 focus:outline-none dark:bg-gray-700
            dark:text-gray-100 dark:placeholder-gray-400`,
          $attrs.class ?? ''
        )
      "
      @focusin="isOpen = true"
      @focusout="close"
      @keydown="preventDelete"
      @input="updateSearch"
      v-bind="$attrs"
    >
      <div
        contenteditable="false"
        class="flex flex-wrap"
        :class="{
          'mr-1': autocomplete
        }"
      >
        <slot name="input" :selection="selection">
          <template v-if="multiple">
            <Chip
              :text="getTitle(item)"
              v-for="item of selection"
              :key="getTitle(item)"
              @delete="select(item)"
            />
          </template>
          <span v-else>{{ selection }}</span>
        </slot>
      </div>
      <div
        ref="searchElement"
        v-if="autocomplete"
        class="flex h-full min-h-[24px] min-w-[80px] flex-grow items-end"
      ></div>
      <div class="absolute right-0 top-0 float-right m-auto flex h-full items-center">
        <SvgIcon
          type="mdi"
          :path="mdiClose"
          v-if="clearable && ((multiple && modelValue?.length) || (!multiple && modelValue))"
          @click="modelValue = props.multiple ? [] : null"
          class="clickable-text h-5 w-5 text-gray-400 dark:text-gray-300"
        />
        <SvgIcon
          v-if="!isOpen"
          type="mdi"
          @click="isOpen = true"
          :path="mdiMenuDown"
          class="m-auto mr-1 h-6 w-6 cursor-pointer text-gray-400 dark:text-gray-300"
        />
        <SvgIcon
          v-if="isOpen"
          type="mdi"
          @click="isOpen = false"
          :path="mdiMenuUp"
          class="m-auto mr-1 h-6 w-6 cursor-pointer text-gray-400 dark:text-gray-300"
        />
      </div>
    </div>
    <div
      v-if="isOpen && items"
      id="select-items"
      ref="listElement"
      class="custom-shadow fixed z-40 mt-1 flex max-h-[220px] flex-col overflow-y-auto rounded bg-white dark:bg-gray-700"
      :style="{ width: `${width}px` }"
    >
      <button
        v-for="item in filteredItems"
        :key="item"
        @click.prevent="select(item)"
        @focusout="close"
        class="w-full"
      >
        <slot :item="item" :itemTitle="getTitle(item)">
          <div
            class="flex h-8 items-center border-l-2 px-2 hover:bg-gray-100"
            :class="{
              'border-primary-600 dark:border-primary-300': multiple
                ? modelValue && modelValue.includes(getValue(item))
                : modelValue === getValue(item)
            }"
            :title="getTitle(item)"
          >
            <p class="line-clamp-1 text-ellipsis text-left">
              {{ getTitle(item) }}
            </p>
          </div>
        </slot>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: improve infocus experience to be more like a real select
import { cn } from '@/services/tw/utils'
import { isEqual } from 'lodash'
import { computed, ref, watchEffect } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiMenuDown, mdiMenuUp, mdiClose } from '@mdi/js'
import { useElementSize } from '@vueuse/core'
import Chip from '@/components/materials/containers/Chip.vue'

const emits = defineEmits(['input'])
const modelValue = defineModel<any>()
const isOpen = ref<boolean>(false)
const listElement = ref<HTMLElement | null>(null)
const selectFieldElement = ref<HTMLElement | null>(null)
const searchContent = ref<string>('')
const searchElement = ref<HTMLElement | null>(null)

const { width } = useElementSize(selectFieldElement)

interface Props {
  label?: string
  items?: any[]
  title?: string | ((item: any) => string)
  value?: string | ((item: any) => any)
  multiple?: boolean
  autocomplete?: boolean
  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  autocomplete: false,
  clearable: false
})

const preventDelete = (event: KeyboardEvent) => {
  if (event.code === 'Backspace' && !searchContent.value.length) event.preventDefault()
}

const updateSearch = () => {
  isOpen.value = true
  searchContent.value = searchElement.value?.textContent ?? ''
}
const getValue = (item: any) => {
  if (typeof props.value === 'function') return props.value(item)
  return props.value ? item[props.value] : item ?? null
}
const getTitle = (item: any) => {
  if (typeof props.title === 'function') return props.title(item)
  return item ? (props.title ? item[props.title] : item ?? '') : ''
}
const findItem = (value: any) => props.items?.find((item) => getValue(item) === value) ?? null
const selection = computed(() => {
  if (!props.multiple) return getTitle(findItem(modelValue.value))
  return modelValue.value?.map((value: any) => findItem(value))
})

const select = (item: any) => {
  const itemValue = getValue(item)
  if (!props.multiple) {
    modelValue.value = itemValue
    isOpen.value = false
  } else {
    if (!Array.isArray(modelValue.value)) return
    const isSelected = modelValue.value.find((value: any) => isEqual(value, itemValue))
    if (isSelected) modelValue.value = modelValue.value.filter((value: any) => value !== itemValue)
    else modelValue.value = [...modelValue.value, itemValue]
  }
  if (searchElement.value) {
    searchElement.value.textContent = ''
    searchContent.value = ''
  }
}

const close = (event: FocusEvent) => {
  if (event.relatedTarget && listElement.value?.contains(event.relatedTarget as Node)) return
  isOpen.value = false
}

const filteredItems = computed(() => {
  if (!props.items) return []
  return props.items.filter((item) => {
    return getTitle(item).toLowerCase().includes(searchContent.value.toLowerCase())
  })
})

watchEffect(() => emits('input', modelValue.value))
</script>

<style>
.test {
  width: inherit;
  max-width: inherit;
}
</style>
