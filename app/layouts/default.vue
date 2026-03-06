<template>
  <main :deployment-id="status?.deploymentId">
    <slot />
    <UiDebug>
      <div
        class="fixed bottom-4 left-0 bg-slate-950 border border-slate-800 border-l-0 p-4 rounded-r-lg shadow-lg shadow-slate-900 text-white text-sm opacity-75 hover:opacity-100 transition"
      >
        <div class="flex items-center gap-2">
          <strong>Online users:</strong>
          <div class="text-green-400">
            {{ status?.total?.users || 0 }}
          </div>
        </div>
        <div class="flex items-center gap-2">
          <strong>Active rooms:</strong>
          <div class="text-green-400">
            {{ status?.total?.quizRooms || 0 }}
          </div>
        </div>
        <div class="flex items-center gap-2">
          <strong>Socket connected:</strong>
          <div
            class="size-3 rounded-full mb-0.5 border"
            :class="{
              'bg-green-400 animate-pulse border-green-300': isConnected,
              'bg-red-400 border-red-300': !isConnected,
            }"
          />
        </div>
        <div class="flex items-center gap-2">
          <strong>Error:</strong>
          <div
            v-if="!error"
            class="text-green-400"
          >
            None
          </div>
          <pre v-else>
        {{ error }}
      </pre>
        </div>
      </div>
    </UiDebug>
  </main>
</template>

<script lang="ts" setup>
import { useSocketStore } from '~/stores/socketStore'

const { onConnect, error, isConnected } = useSocket()

const socketStore = useSocketStore()

const { data: status, execute } = useFetch('/api/status', {
  key: 'status',
})

onMounted(async () => {
  onConnect()
  await nextTick()
  await execute()
})

onUnmounted(() => {
  socketStore.socket?.close()
})
</script>
