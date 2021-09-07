<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <OrderItem
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>0 ₽</b></p>
      <p>
        Итого: <b>{{ totalAmount }}</b> товара на сумму
        <b>{{ totalPrice | numberFormat }} ₽</b>
      </p>
    </div>

    <button
      v-if="isCart"
      class="cart__button button button--primery"
      type="submit"
    >
      Оформить заказ
    </button>
  </div>
</template>

<script>
import OrderItem from './OrderItem.vue';
import numberFormat from '../helpers/numberFormat';

export default {
  components: { OrderItem },
  props: {
    products: Array,
    totalPrice: Number,
    totalAmount: Number,
    isCart: Boolean,
  },
  filters: {
    numberFormat,
  },
};
</script>

<style>
</style>
