<script setup lang="ts">
const { logs, clearLogs } = usePollerLogs();
</script>

<template>
  <main>
    <div class="links">
      <NuxtLink to="/">
        Index page
      </NuxtLink>
      <NuxtLink to="/second">
        Second page
      </NuxtLink>
    </div>
    <div class="page">
      <NuxtPage />
    </div>
    <h2>
      Short polling logs
    </h2>
    <button :disabled="!logs.length" @click="clearLogs">
      clear logs
    </button>
    <AppLogger :logs="logs" :item-key="(log) => log.timestamp.toString()">
      <template #item="{log}">
        <span>
          Time: {{ new Date(log.timestamp).toLocaleTimeString('RU-ru') }}
        </span>
        <span>
          res: {{ log.data.success }}
        </span>
      </template>
    </AppLogger>
  </main>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.links {
  display: flex;
  justify-content: center;
  gap: 10px;

  margin: 50px auto;

  a {
    font-size: 30px;

    color: inherit;
  }
}
</style>
