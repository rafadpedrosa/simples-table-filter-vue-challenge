import { shallowMount } from '@vue/test-utils'
import MembersFilter from '@/components/members/MembersFilter'

describe('MembersFilter.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(MembersFilter, {
      propsData: { msg }
    })

    expect(wrapper.text()).toMatch(msg)
  })
})
