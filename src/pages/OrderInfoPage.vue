<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'main' }" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'cart' }" class="breadcrumbs__link">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderInfo ? orderInfo.id : '' }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет
            письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами
            в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul v-if="orderInfo" class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key"> Получатель </span>
              <span class="dictionary__value">
                {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Адрес доставки </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Телефон </span>
              <span class="dictionary__value">
                {{ orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Email </span>
              <span class="dictionary__value">
                {{ orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Способ оплаты </span>
              <span class="dictionary__value"> картой при получении </span>
            </li>
          </ul>
        </div>

        <OrderList
          v-if="orderInfo"
          :products="orderInfo.basket.items"
          :totalAmount="orderInfo.basket.items.length"
          :totalPrice="orderInfo.totalPrice"
          :isCart="false"
        />
      </form>
    </section>
  </main>
</template>

<script>
import OrderList from '../components/OrderList.vue';

export default {
  components: { OrderList },
  created() {
    if (
      this.$store.state.orderInfo
      && this.$store.state.orderInfo.id === this.$route.params.id
    ) {
      return;
    }

    this.$store.dispatch('loadOrderInfo', this.$route.params.id);
  },
  computed: {
    orderInfo() {
      return this.$store.state.orderInfo;
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.$store.dispatch('loadOrderInfo', this.$route.params.id);
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>
