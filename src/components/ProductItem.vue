<template>
  <li class="catalog__item">
    <a
      class="catalog__pic"
      href="#"
      @click.prevent="goToPage('product', { id: product.id })"
    >
      <img :src="product.image" :alt="product.title" />
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }}
    </span>

    <ul class="colors colors--black">
      <li v-for="(color, i) in product.colors" :key="i" class="colors__item">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="color"
            v-model="selectedColor"
          />
          <span class="colors__value" :style="{ 'background-color': color }">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import goToPage from '../helpers/goToPage';
import numberFormat from '../helpers/numberFormat';

export default {
  data() {
    return { selectedColor: '#73B6EA' };
  },
  props: {
    product: Object,
  },
  filters: {
    numberFormat,
  },
  methods: {
    goToPage,
  },
};
</script>

<style></style>
