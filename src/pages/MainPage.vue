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
        :color.sync="filterColor"
      />

      <section class="catalog" style="position: relative">
        <BasePreloader v-if="isLoading" />
        <BaseLoadingError v-if="isLoadingFailed" @retry="loadProducts" />

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
import axios from 'axios';
import ProductList from '../components/ProductList.vue';
import BasePagination from '../components/BasePagination.vue';
import ProductFilter from '../components/ProductFilter.vue';
import BasePreloader from '../components/BasePreloader.vue';
import BaseLoadingError from '../components/BaseLoadingError.vue';
import API_BASE_URL from '../config';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    BasePreloader,
    BaseLoadingError,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: null,

      page: 1,
      productsPerPage: 3,
      productsData: null,

      isLoading: false,
      isLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((item) => ({
            ...item,
            image: item.image.file.url,
          }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.isLoading = true;
      this.isLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              colorId: this.filterColor,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
            },
          })
          .then((response) => {
            this.productsData = response.data;
          })
          .catch(() => {
            this.isLoadingFailed = true;
          })
          .then(() => {
            this.isLoading = false;
          });
      }, 0);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style>
</style>
