<template>
  <div class="List">
    <h2 class="List-Heading">
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

<i18n src="./list.i18n.json"></i18n>

<script>
import TextCard from '@/components/TextCard.vue'

export default {
  components: {
    TextCard
  },
  data() {
    return {
      items: [
        {
          title: `1. ${this.$t('絵画鑑賞会')}`,
          body: [
            this.$t('2020/04/31'),
            this.$t('〇〇ホール２F'),
          ].join('<br />'),
          event_type:'go'
        },
        {
          title: `2. ${this.$t('[中止] 腕相撲大会')}`,
          body: [
            this.$t('2020/03/31'),
            this.$t('腕相撲大会は中止となりました'),
          ].join('<br />'),
          event_type:'stop'
        },
        {
          title: `3. ${this.$t('リモート会議セミナー')}`,
          body: [
            this.$t('2020/03/31'),
            this.$t('○○会館４F会議室'),
          ].join('<br />'),
          event_type:'go'
        },
      ],
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
