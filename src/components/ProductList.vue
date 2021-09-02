<template>
  <ul class="catalog__list">
    <ProductItem
      v-for="product in products"
      :key="product.ID"
      :product="product"
      @goToPage="(pageName, pageParams) => $emit('goToPage', pageName, pageParams)"
    ></ProductItem>
  </ul>
</template>

<script>
import ProductItem from "./ProductItem.vue";

export default {
  components: { ProductItem },
  props: ["products"],
};
</script>

<style></style>
