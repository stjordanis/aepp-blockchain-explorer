<template>
  <div class="field">
    <div v-if='name' class="field-name">{{name}}</div>
    <div class="field-value">
      <slot/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'field',
  props: ['name']
}
</script>
<style scoped lang='scss'>
.field {
  display:flex;
  justify-content:space-between;
  padding:8px 0;
}
.field-name {
  @include font-size(s);
  color: rgba($black, .7);
}
.field-value {
  @include font-size(m);
  font-family:'Roboto Mono', monospace;
  font-weight:500;
  display:flex;
  vertical-align:middle;
}
.field-value > a {
  color:$magaenta;
}
</style>
