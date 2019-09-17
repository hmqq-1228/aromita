<template>
  <div>
    <div
      v-bind="$attrs"
      class="addthis_inline_share_toolbox"
    ></div>
    <!--<div @click="text()">11111</div>-->
  </div>
</template>

<script>
  export default {
    name: "AddThis",
    props: {
      publicId: {
        type: String,
        required: true
      },
      cdn: {
        type: String,
        default: '//s7.addthis.com/js/300/addthis_widget.js'
      },
    },
    mounted() {
      if (process.browser) {
        if (document.getElementById('addthis-share') !== null) {
          return window.addthis.layers.refresh();
        }
        const el = document.createElement('script');
        el.setAttribute('id', 'addthis-share')
        el.setAttribute('src', `${this.cdn}#pubid=${this.publicId}`)
        document.body.appendChild(el);
      }
      // console.log('7777777', window.addEventListener)
    },
    created(){
      // console.log('6666666', this.$attrs)
      // window.addEventListener('text', this.eventHandler);
    },
    methods: {
      eventHandler: function (evt) {
        console.log('hhhhh', evt)
        switch (evt.type) {
          case "addthis.menu.open":
            console.log('menu opened; surface=' + evt.data.pane);
            break;
          case "addthis.menu.close":
            console.log('menu closed; surface=' + evt.data.pane);
            break;
          case "addthis.menu.share":
            console.log('user shared to ' + evt.data.service);
            break;
          default:
            console.log('received an unexpected event', evt);
        }

        if (evt.type == 'addthis.menu.share') {
          alert(typeof(evt.data)); // evt.data is an object hash containing all event data
          alert(evt.data.service); // evt.data.service is specific to the "addthis.menu.share" event
        }
      }

    }
  }
</script>

<style scoped>

</style>
