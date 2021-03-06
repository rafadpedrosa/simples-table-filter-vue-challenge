<template>
  <b-table selectable
           :select-mode="'multi'"
           @row-selected="onRowSelected"
           ref="memberTable"
           :fields="membersFields" class="mt-3 members-table" hover :items="membersList" show-empty caption-bottom empty-html="empty">

    <template #head(selected)>
      <b-checkbox :checked="allRowsSelected" @change="selectAllRows" ></b-checkbox>
    </template>

    <template #cell(selected)="{rowSelected, index}">
      <b-checkbox :checked="rowSelected" @change="selectRow(index)" ></b-checkbox>
    </template>

    <template #cell(name)="{item: { name }}">
      <b-img v-bind="{ blank: true, blankColor: '#18cf6b', width: 30, height: 30, class: 'mx-2' }" rounded="circle" alt="Circle image"></b-img> {{ name }}
    </template>

    <template #cell(role)="{item: { role }}">
      <p class="editable-cell" >{{ role }}<b-icon class="pencil-icon mx-2" scale="1.2" icon="pencil" ></b-icon> </p>
    </template>

    <template #cell(projects)="{item: { projects }}">
      <p class="editable-cell" >{{ projects }}<b-icon class="pencil-icon mx-2" scale="1.2" icon="pencil" ></b-icon> </p>
    </template>

    <template #cell(payment)="{item: { payment, paymentDescription }}">
      <p class="editable-cell m-0" :class="{'emptyDescriptionValue' : !payment }">{{ paymentDescription }}<b-icon class="pencil-icon mx-2" scale="1.2"  icon="pencil" ></b-icon></p>
    </template>

    <template #cell(limits)="{item: { limits }}">
      <div class="d-flex editable-cell">
        <div>
          <p class="m-0" :class="{'emptyDescriptionValue' : !limits.weekly }">{{ limits.weeklyDescription }}</p>
          <p class="m-0" :class="{'emptyDescriptionValue' : !limits.daily }">{{ limits.dailyDescription }}</p>
        </div>
        <b-icon class="pencil-icon mx-2" scale="1.2"  icon="pencil" ></b-icon>
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
      <h4>{{ scope.emptyText }} </h4>
    </template>

    <template #table-caption>
      <p v-if="membersList.length">Showing {{ membersList.length }} of {{ totalMembers }} members</p>
    </template>
  </b-table>
</template>

<script>
export default {
  name: 'MembersList',
  props: {
    members: {
      type: Array
    },
    totalMembers: {
      type: Number
    }
  },
  data () {
    return {
      selectedMember: null,
      allRowsSelected: false
    }
  },
  methods: {
    selectRow (index) {
      this.$refs.memberTable.selectRow(index)
      this.allRowsSelected = this.$refs.memberTable.selectedRows.length === this.totalMembers
    },
    selectAllRows () {
      this.allRowsSelected ? this.$refs.memberTable.clearSelected() : this.$refs.memberTable.selectAllRows()
      this.allRowsSelected = this.$refs.memberTable.selectedRows.length === this.totalMembers
    },
    onRowSelected (items) {
      this.selectedMember = items
    },
    getTimeTrackingMessageType (timeTracking) {
      return timeTracking === 'enabled' ? 'success' : 'danger'
    },
    resolveMembersDataAfterFetch (member) {
      const weeklyDescription = member.limits.weekly ? `${member.limits.weekly}:00 / Weekly` : 'No weekly limit'
      const dailyDescription = member.limits.daily ? `${member.limits.daily}:00 / Daily` : 'No daily limit'

      member.limits = { ...member.limits, weeklyDescription, dailyDescription }

      member.paymentDescription = member.payment || 'No pay rate / No bill rate'

      return member
    }
  },
  computed: {
    membersFields () {
      return [
        'selected',
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
      return (this.members || []).map(this.resolveMembersDataAfterFetch)
    }
  }
}
</script>

<style lang="scss">
.members-table > thead > tr > th {
    border-top: 0;
}

.members-table {
  .editable-cell > div > .emptyDescriptionValue, .editable-cell.emptyDescriptionValue {
    color: $gray-600;
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

  tr:hover {
    .editable-cell:hover {
      color: $primary;
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
