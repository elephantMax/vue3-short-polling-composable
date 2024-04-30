<script setup lang="ts">
const app = useNuxtApp();
const { pushLog } = usePollerLogs();

const intervalOptions = [
  500,
  1_000,
  5_000,
  15_000,
];

const intervalMs = ref(intervalOptions[0]);

const { start, stop } = useShortPoller(async () => app.$api.polling.getPollingStatus(), {
  cb(res) {
    if (!res) {
      pushLog(false);
      return false;
    }

    const { success } = res;

    if (success) {
      pushLog(res.data.success);
      return res.data.success;
    }

    pushLog(false);
    return false;
  },
  timeoutEnd() {
    console.log('timeout end');
  },
  interval : intervalMs,
  timeout  : 10_000,
});
</script>

<template>
  <div class="page">
    <h1>short polling mechanism</h1>
    <p>
      To stop polling click "Stop polling" button or trigger onScopeDispose hook by redirecting to the "Second page"
    </p>
    <div class="actions">
      <button @click="start">
        Start polling
      </button>
      <button @click="stop">
        Stop polling
      </button>
      <div>
        <label>Short polling interval:</label>
        <select v-model="intervalMs">
          <option v-for="option in intervalOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.actions {
  display: flex;
  gap: 10px;
}
</style>
