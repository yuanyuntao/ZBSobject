<template>
  <div class="divtool">
    <div>
    <span v-text="rule_name"></span>
    <br/>
    <span v-text="rule_time"></span>
    <br>
    <span v-text="rule_range"></span>
    </div>

  </div>
</template>
<script>
export default {
  name: "divtool",
  props: {
    rule_name: { type: String },
    rule_time: { type: String },
    rule_range: { type: String },
  },
  computed: {
  },

};
</script>
<style scoped>
.divtool {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

}
.itemWarp span {
  font-size: 12px;
}
</style>
