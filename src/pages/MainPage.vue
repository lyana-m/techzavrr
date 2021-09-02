<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> 152 товара </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :priceFrom.sync="filterPriceFrom"
        :priceTo.sync="filterPriceTo"
        :categoryId.sync="filterCategoryId"
        :colors="filterColors"
        :color.sync="filterColor"
      />

      <section class="catalog">
        <ProductList :products="products" />
        <BasePagination
          v-model="page"
          :total-count="countProducts"
          :items-per-page="productsPerPage"
          class="catalog__pagination"
        />
      </section>
    </div>
  </main>
</template>

<script>
import productsItems from '../data/products';
import ProductList from '../components/ProductList.vue';
import BasePagination from '../components/BasePagination.vue';
import ProductFilter from '../components/ProductFilter.vue';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: null,

      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = productsItems;

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price > this.filterPriceFrom,
        );
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price < this.filterPriceTo,
        );
      }

      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoryId === this.filterCategoryId,
        );
      }

      if (this.filterColor) {
        filteredProducts = filteredProducts.filter((product) =>
          product.colors.includes(this.filterColor),
        );
      }

      return filteredProducts;
    },
    products() {
      const offcet = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offcet, offcet + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
    filterColors() {
      return [...new Set(productsItems.flatMap((product) => product.colors))];
    },
  },
};
</script>

<style>
</style>
