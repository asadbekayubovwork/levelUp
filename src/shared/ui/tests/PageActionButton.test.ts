import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import PageActionButton from '../PageActionButton.vue'

describe('PageActionButton', () => {
    const NButtonFake = {
        template: '<button @click="$emit(\'click\')"><slot /></button>'
    }
    const options = {
        global: {
            stubs: {
                NButton: NButtonFake
            }
        }
    }
    it('label berilganda matn ko\'rinadi', () => {
        const wrapper = mount(PageActionButton, {
            ...options,
            props: {
                label: 'Saqlash'
            }
        })

        expect(wrapper.text()).toContain('Saqlash')
    })

    it('tugma bosilganda signal (emit) beradi', async () => {
        const wrapper = mount(PageActionButton, {
            ...options
        })

        await wrapper.find('button').trigger('click')

        expect(wrapper.emitted('click')).toBeTruthy()
    })
})