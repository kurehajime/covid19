<template>
  <div class="EventList">
    <h2 class="EventList-Heading">
      {{ $t('イベント一覧') }}
    </h2>
    <div class ="radio_box">
    <input type="radio" class="event_type" name="event_type" value="all"  v-model="event_type" checked> すべて　
    <input type="radio" class="event_type" name="event_type" value="go"   v-model="event_type"> 開催予定　
    <input type="radio" class="event_type" name="event_type" value="stop" v-model="event_type"> 中止
    </div>
    <div v-for="(item, i) in items" :key="i">
      <TextCard :title="item.title" :body="item.body"
        v-if="event_type === 'all' || item.event_type ===event_type"
        />
    </div>
  </div>
</template>

<i18n src="./eventlist.i18n.json"></i18n>

<script>
import TextCard from '@/components/TextCard.vue'
import Data from '@/data/events.json'

export default {
  components: {
    TextCard
  },
  data() {
    var items = [];
    for (let i = 0; i < Data.events.length; i++) {
      const element = Data.events[i];
      items.push(        
        {
          title: element.title,
          body: [
            element.description,
            element.url,
          ].join('<br />'),
          event_type:element.stop == false ?  'go' : 'stop'
        });
    }
    return {
      items: items,
      event_type:'all'
    }
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
.radio_box{
  margin: 15px 5px;
}

</style>
