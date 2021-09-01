<template>
  <section class="catalog">
    <ProductList :products="products" />
    <BasePagination v-model="page" :total-count="countProducts" :items-per-page="productsPerPage" />
  </section>
</template>

<script>
import productsItems from "./data/products";
import ProductList from "./components/ProductList.vue";
import BasePagination from "./components/BasePagination.vue";

export default {
  name: "App",
  components: { ProductList, BasePagination },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
      productsItems
    };
  },
  computed: {
    products() {
      const offcet = (this.page - 1) * this.productsPerPage;
      return productsItems.slice(offcet, offcet + this.productsPerPage);
    },
    countProducts() {
      return productsItems.length;
    }
  }
};
</script>
