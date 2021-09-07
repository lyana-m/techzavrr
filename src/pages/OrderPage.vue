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

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> {{ totalAmount }} товара </span>
    </div>

    <section class="cart">
      <form
        class="cart__form form"
        action="#"
        method="POST"
        @submit.prevent="order"
      >
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
              v-model="formData.name"
              title="ФИО"
              :error="formError.name"
              placeholder="Введите ваше полное имя"
            />

            <BaseFormText
              v-model="formData.address"
              title="Адрес доставки"
              :error="formError.address"
              placeholder="Введите ваш адрес"
            />

            <BaseFormText
              v-model="formData.phone"
              title="Телефон"
              :error="formError.phone"
              placeholder="Введите ваш телефон"
              type="tel"
            />

            <BaseFormText
              v-model="formData.email"
              title="Email"
              :error="formError.email"
              placeholder="Введите ваш Email"
              type="email"
            />

            <BaseFormTextarea
              v-model="formData.comment"
              title="Комментарий к заказу"
              placeholder="Ваши пожелания"
              :error="formError.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked=""
                  />
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="500"
                  />
                  <span class="options__value"> Курьером <b>500 ₽</b> </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="card"
                  />
                  <span class="options__value"> Картой при получении </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="cash"
                  />
                  <span class="options__value"> Наличными при получении </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

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

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div v-if="formErrorMessage" class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import BaseFormText from '../components/BaseFormText.vue';
import BaseFormTextarea from '../components/BaseFormTextarea.vue';
import OrderItem from '../components/OrderItem.vue';
import numberFormat from '../helpers/numberFormat';
import API_BASE_URL from '../config';

export default {
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
    };
  },
  components: { BaseFormText, BaseFormTextarea, OrderItem },
  filters: {
    numberFormat,
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';

      axios
        .post(
          `${API_BASE_URL}/api/orders`,
          {
            ...this.formData,
          },
          {
            params: {
              userAccessKey: this.$store.state.userAccessKey,
            },
          },
        )
        .then(() => {
          this.$store.commit('resetCart');
          this.formData = {};
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message || '';
        });
    },
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
      totalAmount: 'cartTotalAmount',
    }),
  },
};
</script>

<style>
</style>
