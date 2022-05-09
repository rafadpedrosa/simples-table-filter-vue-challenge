import { mount } from '@vue/test-utils'
import MembersFilter from '@/components/members/MembersFilter'

/**
 * COMPONENT CONTRACT
 *
 * 1- It Should be rendered with the all roles and enabled already selected
 * 2- It should emit an event called filters when the data is changed
 **/

const EMPTY_STRING = ''
const ENABLED = 'enabled'

describe('MembersFilter.vue', () => {
  let wrapper

  beforeAll(() => {
    wrapper = mount(MembersFilter, {})
  })

  it('should be rendered with the all roles and enabled already selected', () => {
    const filters = wrapper.vm.filters

    expect(wrapper).toMatchSnapshot()
    expect(filters.role).toBe(EMPTY_STRING)
    expect(filters.timeTrack).toBe(ENABLED)
  })

  it('should emit an event called filters when the data is changed', async () => {
    const roleElement = wrapper.find('select[data-test=role]').findAll('option')
    const timeTrackElement = wrapper.find('select[data-test=timeTrack]').findAll('option')

    const { role, timeTrack } = wrapper.vm.filters

    await roleElement.at(2).setSelected()
    await timeTrackElement.at(1).setSelected()

    const { role: newRole, timeTrack: newTimeTrack } = wrapper.vm.filters

    expect(role).not.toBe(newRole)
    expect(timeTrack).not.toBe(newTimeTrack)
    expect(wrapper.emitted().filters).toHaveLength(2)
    expect(wrapper).toMatchSnapshot()
  })
})
