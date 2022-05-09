import { members } from '@/../tests/dataMocks/members.mock.js'

import Vuex from 'vuex'
import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home'

/**
 * COMPONENT CONTRACT
 *
 * 1- It should render the tabs
 * 1.1 - Should call the method to fetch the data
 * 2 - It Should filter the data to be used in the components
 * 2.1 bySearchText
 * 2.2 byTimeTracking
 * 2.3 byRoles
 **/

fdescribe('Home.vue', () => {
  const factory = (options = {}) => shallowMount(Home, {
    store: new Vuex.Store({
      getters: {
        membersList: jest.fn().mockReturnValue(members)
      },
      state: {
        totalMembers: members.length
      }
    }),
    ...options
  })

  it('should render the tabs', function () {
    const spyFetchMembers = jest.spyOn(Home.methods, 'fetchMembers').mockReturnValue(Promise.resolve())
    const wrapper = factory()

    expect(spyFetchMembers).toHaveBeenCalledTimes(1)
    expect(wrapper).toMatchSnapshot()
  })

  it('Should filter the data to be used in the components', function () {
    const wrapper = factory()

    wrapper.vm.setFilters({ filters: { role: 'viewer' } })
    expect(wrapper.vm.filters).toMatchObject({ role: 'viewer' })
    expect(wrapper.vm.membersFiltered.length).toBe(2)

    wrapper.vm.setFilters({ filters: { search: 'Cod' } })
    expect(wrapper.vm.filters).toMatchObject({ search: 'Cod', role: 'viewer' })
    expect(wrapper.vm.membersFiltered.length).toBe(1)

    wrapper.vm.setFilters({ filters: { timeTrack: 'disabled' } })
    expect(wrapper.vm.filters).toMatchObject({ search: 'Cod', role: 'viewer', timeTrack: 'disabled' })
    expect(wrapper.vm.membersFiltered.length).toBe(0)

    wrapper.vm.setFilters({ filters: { search: '', role: '', timeTrack: 'enabled' } })
    expect(wrapper.vm.membersFiltered.length).toBe(3)
  })
})
