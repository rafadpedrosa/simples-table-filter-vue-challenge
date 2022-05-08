<template>
  <div class="members">
    <p class="mb-4">1 of 2 members counts towards your pricing plan <b-icon icon="exclamation-circle-fill" variant="secondary" v-b-tooltip.hover  title="Viewers don't count towards your Team of 10 (Premium) plan"></b-icon> </p>

    <members-filter></members-filter>

    <b-table :fields="membersFields" class="mt-3 members-table" hover :items="membersList" caption-bottom>
      <template #table-caption>
        <p v-if="membersList.length">Showing {{ membersList.length }} of {{ totalMembers }} members</p>
      </template>

      <template #cell(role)="{item: { role }}">
        <p class="editable-cell" >{{ role }}<b-icon class="pencil-icon px-2" scale="1.2" icon="pencil" ></b-icon> </p>
      </template>

      <template #cell(projects)="{item: { projects }}">
        <p class="editable-cell" >{{ projects }}<b-icon class="pencil-icon px-2" scale="1.2" icon="pencil" ></b-icon> </p>
      </template>

      <template #cell(payment)="{item: { payment }}">
        <p class="editable-cell m-0" :class="{'emptyDescriptionValue' : !payment.value }">{{ payment.paymentDescription }}<b-icon class="pencil-icon px-2" scale="1.2"  icon="pencil" ></b-icon></p>
      </template>

      <template #cell(limits)="{item: { limits }}">
        <div class="d-flex editable-cell">
          <div>
            <p class="m-0" :class="{'emptyDescriptionValue' : !limits.weekly }">{{ limits.weeklyDescription }}</p>
            <p class="m-0" :class="{'emptyDescriptionValue' : !limits.daily }">{{ limits.dailyDescription }}</p>
          </div>
           <b-icon class="pencil-icon px-2" scale="1.2"  icon="pencil" ></b-icon>

        </div>
      </template>

      <template #cell(time_tracking)="{item: { time_tracking }}">
        <h5><b-badge :variant="getTimeTrackingMessageType(time_tracking)">{{time_tracking}}</b-badge></h5>
      </template>

      <template #cell(actions) class="d-flex justify-content-end">
       <!-- actions are doing nothing -->
        <b-select class="table-select-actions"
                  :options="[{ text: 'Actions', value: true },{ text: 'action 001', value: false }, { text: 'action 002', value: false }]"
                  :value="true"></b-select>
      </template>

      <template #empty="scope">
        <h4>{{ scope }} test </h4>
      </template>
      <template #emptyfiltered="scope">
        <h4>{{ scope }} test 2</h4>
      </template>
    </b-table>

  </div>
</template>

<script>
import MembersFilter from '@/components/members/MembersFilter'
import axios from 'axios'

export default {
  name: 'Members',
  components: {
    MembersFilter
  },
  mounted () {
    this.fetchMembers()
  },
  data () {
    return {
      totalMembers: 0,
      members: []
    }
  },
  methods: {
    getTimeTrackingMessageType (timeTracking) {
      return timeTracking === 'enabled' ? 'success' : 'danger'
    },
    resolveMembersDataAfterFetch (member) {
      const weeklyDescription = member.limits.weekly ? `${member.limits.weekly}:00 / Weekly` : 'No weekly limit'
      const dailyDescription = member.limits.daily ? `${member.limits.daily}:00 / Daily` : 'No daily limit'

      member.limits = { ...member.limits, weeklyDescription, dailyDescription }

      const paymentDescription = member.payment || 'No pay rat / No bill rate'
      member.payment = { value: member.payment, paymentDescription }

      member.actions = ''

      return member
    },
    async fetchMembers () {
      const { data } = await axios.get('https://run.mocky.io/v3/34234632-e36c-450d-a0a5-63249d1fa3ad')

      console.log(data.members)

      this.totalMembers = data.count || []
      this.members = (data.members || []).map(this.resolveMembersDataAfterFetch)
    }
  },
  computed: {
    membersFields () {
      return [
        { key: 'name', label: 'Member' },
        'role',
        'projects',
        'payment',
        'limits',
        'time_tracking',
        { key: 'actions', label: '' }
      ]
    },
    membersList () {
      return this.members
    }
  }
}
</script>

<style lang="scss">
.members-table > thead > tr > th {
    border-top: 0;
}

.members-table {
  .emptyDescriptionValue {
    color: $gray-600 default;
  }

  .table-select-actions {
    text-align: center;
    width: 10rem;
    min-width: 10rem;
    min-height: 20px;
    padding: 0 1.5rem 0 1rem;
    background-position-x: 83%;
    border-radius: 5px;
  }

  .editable-cell > .pencil-icon {
    display: none;
  }

  tr:hover{
    .editable-cell:hover {
      color: $primary;
      font-weight: bolder;
      cursor: pointer;
    }
    .editable-cell {
      .pencil-icon {
        display: inline;
      }
    }
  }
}

</style>
