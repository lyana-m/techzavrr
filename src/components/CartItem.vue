<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.image"
        width="120"
        height="120"
        :alt="item.product.title"
      />
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <p class="product__info">Объем: <span>128GB</span></p>
    <span class="product__code"> {{ item.productId }} </span>

    <div class="product__counter form__counter">
      <button
        type="button"
        aria-label="Убрать один товар"
        @click="amount > 0 ? amount-- : amount"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model="amount" name="count" />

      <button type="button" aria-label="Добавить один товар" @click="amount++">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ (item.product.price * item.amount) | numberFormat }} ₽
    </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click="deleteCartProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapActions } from 'vuex';
import numberFormat from '../helpers/numberFormat';

export default {
  filters: {
    numberFormat,
  },
  props: {
    item: Object,
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.updateCartProductAmount({
          productId: this.item.productId,
          amount: value,
        });
      },
    },
  },
  methods: {
    // ...mapMutations({ deleteProduct: 'deleteCartProduct' }),
    ...mapActions(['updateCartProductAmount', 'deleteCartProduct']),
  },
};
</script>

<style>
</style>
