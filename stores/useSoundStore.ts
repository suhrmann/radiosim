export const useSoundStore = defineStore('sound', {
    state: () => ({
        isSoundPlaying: false,
        currentAudio: null as HTMLAudioElement | null,
        lockTimeout: null as NodeJS.Timeout | null,
    })
});


