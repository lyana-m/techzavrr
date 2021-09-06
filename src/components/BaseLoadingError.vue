<template>
  <div>
    При загрузке данных произошла ошибка
    <button class="button button--primery" @click="$emit('retry')">
      Попробовать еще раз
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.button--primery {
  display: block;
  margin-top: 20px;
}
.button--primery:not(:disabled):focus,
.button--primery:not(:disabled):hover {
  background-color: #000;
  color: #fff;
  border: 1px solid #000;
}
</style>
