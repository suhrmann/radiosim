import type {Config} from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
        extend: {
            fontFamily: {
                sans: 'Figtree',
                serif: 'Inria Serif',
                mono: 'JetBrains Mono'
            },
        }
    }
}