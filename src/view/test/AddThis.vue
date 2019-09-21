<template>
  <div>
    <div class="addthis_inline_share_toolbox" @click="toShow($event)"></div>
    <!--<div @click="text()">11111</div>-->
  </div>
</template>

<script>
  import qs from 'qs'
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
    mounted(){
      if (process.browser) {
        // console.log('77777', window.addthis)
        if (document.getElementById('addthis-share') !== null) {
          return window.addthis.layers.refresh();
        }
        const el = document.createElement('script');
        el.setAttribute('id', 'addthis-share')
        el.setAttribute('src', `${this.cdn}#pubid=${this.publicId}`)
        document.body.appendChild(el);
      }
      // window.addEventListener('click', this.eventHandler)
      // window.addEventListener("scroll", this.showIcon);
    },
    // mounted() {
    //   window.addEventListener("scroll", this.showIcon);
    // },
    created(){
      // console.log('6666666',  window.location.hash)
      // window.addEventListener('text', this.eventHandler);
    },
    methods: {
      toShow: function (e) {
        var that = this
        // var route = window.location.hash
        // var routeList = route.split('#')
        // console.log('uuuuu', routeList[1])
        var obj = qs.stringify({
          score: 5,
          source: '分享得积分'
        })
        that.$axios.post('api/updatescore', obj).then(res => {
          // console.log('ddddd', res)
          if (res.code === 2001) {
            // that.$store.state.fromUrl = routeList[1]
            // that.$router.push('/login')
          }
        })
      },
      eventHandler: function (evt) {
        // console.log('hhhhh', evt)
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
