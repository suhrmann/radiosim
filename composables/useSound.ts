// /composables/useSound.ts
import {useSoundStore} from '@/stores/useSoundStore';
import {storeToRefs} from 'pinia';
import {useDeviceStore} from "~/stores/useDeviceStore";

export function useSound() {
    const device = useDeviceStore();
    const store = useSoundStore();
    const {isSoundPlaying, currentAudio, lockTimeout} = storeToRefs(store);

    function playSound(soundPath: string) {
        if (!device.isPoweredOff && !device.isBooting && !isSoundPlaying.value) {
            // Falls ein Sound bereits läuft, unterbreche ihn
            if (currentAudio.value) {
                currentAudio.value.pause();
                currentAudio.value.currentTime = 0;
            }

            currentAudio.value = new Audio(soundPath);
            isSoundPlaying.value = true;

            currentAudio.value.play().then(() => {
                // Sobald der Sound abgespielt wird, setze eine Timeout-Sperre
                if (lockTimeout.value) {
                    clearTimeout(lockTimeout.value);
                }

                lockTimeout.value = setTimeout(() => {
                    isSoundPlaying.value = false;
                    currentAudio.value = null;
                }, currentAudio.value.duration * 1000 + 20); // Sperre für die Dauer des Sounds + 0.2 Sekunden
            }).catch((error) => {
                console.error("Sound konnte nicht abgespielt werden:", error);
                isSoundPlaying.value = false;
                currentAudio.value = null;
            });
        }
    }

    return {
        playSound
    };
}