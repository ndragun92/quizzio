<template>
  <Teleport to="body">
    <!-- Global notification live region, render this permanently at the end of the document -->
    <div
      aria-live="assertive"
      class="pointer-events-none fixed z-60 inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
        <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
        <template v-if="toastStore.toasts.data.length">
          <div
            v-for="toast in toastStore.toasts.data"
            :key="`${toast.text}--${toast.id}`"
            class="pointer-events-auto relative overflow-hidden w-full max-w-sm translate-y-0 transform rounded-lg bg-primary-900 opacity-100 shadow-lg outline-1 outline-primary-800 transition duration-300 ease-out sm:translate-x-0 starting:translate-y-2 starting:opacity-0 starting:sm:translate-x-2 starting:sm:translate-y-0"
          >
            <div class="p-4">
              <div class="flex items-start">
                <div class="shrink-0">
                  <Icon
                    :class="{
                      'text-blue-500': toast.status === 'info',
                      'text-green-500': toast.status === 'success',
                      'text-yellow-500': toast.status === 'warning',
                      'text-red-500': toast.status === 'error',
                    }"
                    size="24"
                    :name="`mdi:${toast.status}`"
                  />
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                  <p class="text-sm font-medium text-primary-50 capitalize">
                    {{ toast.status }}
                  </p>
                  <p class="mt-1 text-sm text-primary-400">
                    {{ toast.text }}
                  </p>
                </div>
                <div
                  class="absolute bottom-0 h-0.5 left-0 right-0"
                  :class="{
                    'bg-blue-500': toast.status === 'info',
                    'bg-green-500': toast.status === 'success',
                    'bg-yellow-500': toast.status === 'warning',
                    'bg-red-500': toast.status === 'error',
                  }"
                  :style="{
                    transition: 'width 0.2s linear',
                    width: `${((toast.timeLeft || 0) / (toast.time || 0)) * 100}%`,
                  }"
                />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
const toastStore = useToastStore();
</script>
