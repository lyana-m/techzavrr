<template>
  <div>
    <BaseHeader />
    <router-view />
    <BaseFooter />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import BaseHeader from './components/BaseHeader.vue';
import BaseFooter from './components/BaseFooter.vue';

export default {
  components: { BaseHeader, BaseFooter },
  created() {
    const userAccessKey = localStorage.getItem('accessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart();
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey']),
  },
};
</script>
