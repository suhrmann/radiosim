import {defineStore} from 'pinia';

export const useAppSettingsStore = defineStore('settings', {
    state: () => ({
        modalTimer: null as NodeJS.Timeout | null,
        modalPostAction: null as Function | null,
        modalTimeout: 5, // Standard Timeout von 5 Sekunden
    }),
    actions: {
        setModalTimeout(timeout: number) {
            this.modalTimeout = timeout;
        },
        startModalTimer(postAction: Function) {
            this.modalPostAction = postAction;

            if (this.timer) {
                clearTimeout(this.timer);
            }

            this.timer = setTimeout(() => {
                console.info("Running postAction for modal...");
                postAction();
            }, this.modalTimeout * 1000); // 5 Sekunden Timer
        },
        resetModalTimer() {
            if (this.timer != null) {
                this.startModalTimer(this.modalPostAction); // Setzt den Timer zurück und startet ihn neu
            }
        },
        stopModalTimer() {
            if (this.timer) {
                console.info('clearing timer...');
                clearTimeout(this.timer);
                this.timer = null;
            }
        },
    },
});
