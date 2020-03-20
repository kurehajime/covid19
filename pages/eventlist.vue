<template>
  <div class="EventList">
    <h2 class="EventList-Heading">
      {{ $t('イベント一覧') }}
    </h2>
    <div class="radio_box">
      <input
        v-model="event_type"
        type="radio"
        class="event_type"
        name="event_type"
        value="all"
        checked
      />
      すべて
      <input
        v-model="event_type"
        type="radio"
        class="event_type"
        name="event_type"
        value="go"
      />
      開催予定
      <input
        v-model="event_type"
        type="radio"
        class="event_type"
        name="event_type"
        value="stop"
      />
      中止
    </div>
    <div v-for="(item, i) in items" :key="i">
      <TextCard
        v-if="event_type === 'all' || item.event_type === event_type"
        :title="item.title"
        :body="item.body"
      />
    </div>
  </div>
</template>

<i18n src="./eventlist.i18n.json"></i18n>

<script>
import TextCard from '@/components/TextCard.vue'

export default {
  components: {
    TextCard
  },
  data() {
    return {
      items: [],
      event_type: 'all'
    }
  },
  created() {
    const url = './api/events'
    const thisVue = this
    fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      redirect: 'follow'
    })
      .then(function(response) {
        return response.json()
      })
      .then(function(events) {
        const items = []
        for (let i = 0; i < events.length; i++) {
          const element = events[i]
          items.push({
            title: element.title,
            body: [
              element.description,
              '<a href="' + element.url + '">' + element.url + '</a>'
            ].join('<br />'),
            event_type: element.stop === 'false' ? 'go' : 'stop'
          })
        }
        thisVue.items = items
      })
  },
  head() {
    return {
      title: 'イベント一覧'
    }
  }
}
</script>

<style lang="scss">
.Parent {
  &-Heading {
    @include font-size(30);
    font-weight: normal;
    color: $gray-2;
    margin-bottom: 12px;
  }
}
.radio_box {
  margin: 15px 5px;
}
</style>
