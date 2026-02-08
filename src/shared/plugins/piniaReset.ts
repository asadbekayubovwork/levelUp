import type { PiniaPluginContext } from 'pinia'

export function piniaResetPlugin({ store }: PiniaPluginContext) {

    const initialState = JSON.parse(JSON.stringify(store.$state))

    store.$reset = () => {
        store.$patch(JSON.parse(JSON.stringify(initialState)))
    }
}