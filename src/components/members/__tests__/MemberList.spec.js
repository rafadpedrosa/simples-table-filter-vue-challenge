import { members, expected_member_modifications } from '@/../tests/dataMocks/members.mock.js'
import { mount } from '@vue/test-utils'
import MembersList from '@/components/members/MembersList'

const getMembersMock = () => members
/**
 * COMPONENT CONTRACT
 *
 * 1- It should render a table with a list of members
 * 1.1 - call the resolveMembersDataAfterFetch X times
 * 2- It should render a message if the table is empty
 * 2.1 - It should not call the resolveMembersDataAfterFetch
 * 3- It should have an resolvedObject
 **/

const spyOnResolveMembersDataAfterFetch = jest.spyOn(MembersList.methods, 'resolveMembersDataAfterFetch')

describe('MembersList.vue', () => {
  it('should NOT call the resolveMembersDataAfterFetch ', function () {
    const memberJared = getMembersMock()[0]

    const wrapper = mount(MembersList, { })

    const changedMemberJared = wrapper.vm.resolveMembersDataAfterFetch(memberJared)

    expect(changedMemberJared.limits.dailyDescription).toBe(expected_member_modifications.dailyDescription)
    expect(changedMemberJared.limits.weeklyDescription).toBe(expected_member_modifications.weeklyDescription)
    expect(changedMemberJared.paymentDescription).toBe(expected_member_modifications.paymentDescription)
  })

  it('should render a table with a list of members ', function () {
    spyOnResolveMembersDataAfterFetch.mockClear()

    const wrapper = mount(MembersList, { propsData: { members: getMembersMock() } })

    expect(spyOnResolveMembersDataAfterFetch).toHaveBeenCalledTimes(3)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render a message if the table is empty ', function () {
    spyOnResolveMembersDataAfterFetch.mockReset()

    const wrapper = mount(MembersList, { propsData: { members: [] } })

    expect(spyOnResolveMembersDataAfterFetch).not.toBeCalled()
    expect(wrapper).toMatchSnapshot()
  })
})
