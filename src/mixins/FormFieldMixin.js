import BaseFormField from '../components/BaseFormField.vue';

export default {
  components: { BaseFormField },
  props: {
    title: String,
    error: String,
    placeholder: String,
    value: String,
  },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
