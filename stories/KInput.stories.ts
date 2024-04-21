import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import KInput from '@components/materials/inputs/KInput.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Inputs/KInput',
  component: KInput,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
  args: {
    label: 'Label',
    modelValue: 'Test'
  }
} satisfies Meta<typeof KInput>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'Label'
  }
}
