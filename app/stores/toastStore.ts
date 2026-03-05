import { defineStore } from "pinia";

type TToastStatus = "info" | "success" | "warning" | "error";

type TToast = {
  id: string;
  text: string;
  status: TToastStatus;
  time?: number;
  timeLeft?: number;
};

type TToastPayload = { timeout?: number; text: string };
export const useToastStore = defineStore("toast", () => {
  const toasts = reactive<{ data: TToast[] }>({
    data: [],
  });
  const defaultTimeout: number = 3000;

  const createToast = (text: string, status: TToastStatus): TToast => ({
    text,
    status,
    id: `${Math.random() * 1000}`,
  });

  const updateState = (payload: TToastPayload, status: TToastStatus) => {
    // Get text and timeout from payload
    const { text, timeout } = payload;
    // We create the toast with function above
    const toast = createToast(text, status);
    // We push toasts to the state
    toasts.data.push({
      ...toast,
      time: timeout ?? defaultTimeout,
      timeLeft: timeout ?? defaultTimeout,
    });
  };

  const { pause, resume, isActive } = useIntervalFn(async () => {
    // We are reducing timeLeft by 1000 which is 1 second
    toasts.data.forEach((obj) => {
      if (obj.timeLeft) {
        obj.timeLeft -= 100;
      }
    });
    // If there is no time left then remove toast from data
    await nextTick(() => {
      toasts.data = toasts.data.filter((obj) => obj.timeLeft);
    });
  }, 100);

  watch(toasts, (val: { data: TToast[] }) => {
    if (val.data.length) {
      if (!isActive.value) {
        resume();
      }
    } else if (isActive.value) {
      pause();
    }
  });

  const info = (payload: TToastPayload) => {
    updateState(payload, "info");
  };

  const success = (payload: TToastPayload) => {
    updateState(payload, "success");
  };
  const warning = (payload: TToastPayload) => {
    updateState(payload, "warning");
  };
  const error = (payload: TToastPayload) => {
    updateState(payload, "error");
  };

  return { toasts, info, success, warning, error };
});
