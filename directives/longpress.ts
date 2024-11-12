import type {Directive} from "@vue/runtime-core";

const longpress: Directive = {
    mounted(el, binding) {
        let pressTimer: ReturnType<typeof setTimeout> | null = null

        const start = (event: MouseEvent | TouchEvent) => {
            if (event.type === 'click' && event.button !== 0) {
                return
            }

            if (pressTimer === null) {
                pressTimer = setTimeout(() => {
                    binding.value()
                }, 1000) // Dauer für langen Klick: 1 Sekunde
            }
        }

        const cancel = () => {
            if (pressTimer !== null) {
                clearTimeout(pressTimer)
                pressTimer = null
            }
        }

        // Event Listener hinzufügen
        el.addEventListener('mousedown', start)
        el.addEventListener('touchstart', start)
        el.addEventListener('click', cancel)
        el.addEventListener('mouseup', cancel)
        el.addEventListener('mouseleave', cancel)
        el.addEventListener('touchend', cancel)
    },
    unmounted(el) {
        // Event Listener entfernen, wenn das Element entfernt wird
        el.removeEventListener('mousedown', start)
        el.removeEventListener('touchstart', start)
        el.removeEventListener('click', cancel)
        el.removeEventListener('mouseup', cancel)
        el.removeEventListener('mouseleave', cancel)
        el.removeEventListener('touchend', cancel)
    },
}

export default longpress