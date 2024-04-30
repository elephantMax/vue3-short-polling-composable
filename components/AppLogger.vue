<script setup lang="ts" generic="T">
import type { Log } from '~/types';

type LogWithGeneric = Log<T>;

const props = defineProps<{
  logs: LogWithGeneric[],
  itemKey: string | ((log: LogWithGeneric) => string)
}>();

defineSlots<{
  item(props: { log: LogWithGeneric }): any
}>();

const getItemKey = (log: LogWithGeneric): string => {
  if (typeof props.itemKey === 'string') {
    return props.itemKey;
  }
  return props.itemKey(log);
};

</script>

<template>
  <div class="app-logger">
    <ul>
      <li v-for="log in logs" :key="getItemKey(log)">
        <slot name="item" :log="log" />
      </li>
    </ul>
  </div>
</template>
