<template>
  <BaseFormField :title="title" :error="error">
    <input
      v-model="dataValue"
      class="form__input"
      :placeholder="placeholder"
      :type="type"
    />
  </BaseFormField>
</template>

<script>
import FormFieldMixin from '../mixins/FormFieldMixin';

export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
  },
  mixins: [FormFieldMixin],
};
</script>

<style>
</style>
