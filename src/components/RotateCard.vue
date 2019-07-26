<template>
  <div ref="room" class="zxz-ui-rotate-card" :style="`height:${radius*2}px;width:${radius*3}px`">
    <div class="drag-container" :style="drag()">
      <div
        class="spin-container"
        :style="`width:${cardWidth}px;height:${cardHeight}px;animation:${spin}`"
      >
        <div
          v-for="(cardUrl,index) in cardsUrl"
          :key="index"
          class="card-container"
          :style="init?transform(index):null"
          @click="cardClickEvent(cardUrl,index)"
        >
          <div class="card" :style="`backgroundImage:url(${cardUrl});`"></div>
        </div>
      </div>
      <div class="ground" :style="`height:${radius*4}px;width:${radius*4}px`"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "rotate-card",
  props: {
    cardsUrl: {
      type: Array,
      default: () => ["", "", "", "", ""]
      // required: true
    },
    radius: {
      //半径
      type: Number,
      default: 200
    },
    cardWidth: {
      //卡片宽
      type: Number,
      default: 120
    },
    cardHeight: {
      //卡片高
      type: Number,
      default: 180
    },
    clockwise: {
      //顺时针？
      type: Boolean,
      default: false
    },
    cycle: {
      //旋转周期，秒
      type: Number,
      default: 60
    },
    isSpin: {
      //是否自旋
      type: Boolean,
      default: true
    },
    isDrag: {
      //是否可拖动
      type: Boolean,
      default: false
    },
    cardClickEvent: {
      //卡片点击事件
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      tX: 0,
      tY: 20,
      timer: null,
      init: false
    };
  },
  computed: {
    spin() {
      let clockwise = this.clockwise ? "reverse" : "normal";
      let isSpin = this.isSpin ? "running" : "stopping";
      return `${this.cycle}s linear 0s infinite ${clockwise} none ${isSpin} rotate-card-spin;`;
    }
  },
  methods: {
    transform: function(i) {
      let len = this.cardsUrl.length;
      let style = `transform: rotateY(${(360 * i) / len}deg) translateZ(${
        this.radius
      }px);
    transition: transform 1s ease ${0.25 * (len - i)}s;`;
      return style;
    },
    drag: function() {
      this.tY = this.tY > 180 ? 180 : this.tY;
      this.tY = this.tY < 0 ? 0 : this.tY;
      return `transform: rotateX(${-this.tY}deg) rotateY(${
        this.tX
      }deg) translateZ(0)`;
    }
  },
  mounted() {
    let that = this;
    setTimeout(function() {
      that.init = true;
    }, 0);
    let room = this.$refs["room"];
    if (this.isDrag) {
      room.onmousedown = function(e) {
        clearInterval(that.timer);
        e = e || window.event;
        var desX = 0,
          desY = 0,
          sX = e.clientX,
          sY = e.clientY;
        //拖动函数
        this.onmousemove = function(e) {
          e = e || window.event;
          var nX = e.clientX,
            nY = e.clientY;
          desX = nX - sX;
          desY = nY - sY;
          that.tX += desX * 0.1;
          that.tY += desY * 0.1;
          sX = nX;
          sY = nY;
        };
        //惯性函数
        this.onmouseup = this.onmouseleave = function(e) {
          this.onmousemove = this.onmouseup = this.onmouseleave = null;
          that.timer = setInterval(function() {
            desX *= 0.95;
            desY *= 0.95;
            that.tX += desX * 0.1;
            that.tY += desY * 0.1;
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
              clearInterval(that.timer);
            }
          }, 16);
        };
        return false;
      };
    }
  }
};
</script>

<style lang="scss">
.zxz-ui-rotate-card {
  overflow: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;
  /* 拖拽旋转容器 */
  .drag-container {
    transform-style: preserve-3d;
    position: relative;
    top: 20%;
    margin: auto;
    /* 卡片自旋容器 */
    .spin-container {
      transform-style: preserve-3d;
      position: relative;
      margin: auto;
      /* 卡片尺寸容器 */
      .card-container {
        transform-style: preserve-3d;
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        .card {
          width: 100%;
          height: 100%;
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center;
          border-radius: 4px;
          -webkit-box-reflect: below 10px
            linear-gradient(transparent, transparent, #0005);
          transition: 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
          transform: translateZ(0);
          &:hover {
            transform: scale(1.1);
          }
          &:after {
            content: "";
            background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/13471/sparkles.gif);
            background-position: center;
            background-size: 100%;
            mix-blend-mode: color-dodge;
            border-radius: 8px;
            opacity: 1;
            z-index: 2;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
          }
        }
      }
    }
    .ground {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translate(-50%, -50%) rotateX(90deg);
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='%23aaaaaa' fill-opacity='0.18'%3E%3Cpath fill-rule='evenodd' d='M5 3.59L1.46.05.05 1.46 3.59 5 .05 8.54l1.41 1.41L5 6.41l3.54 3.54 1.41-1.41L6.41 5l3.54-3.54L8.54.05 5 3.59zM17 2h24v2H17V2zm0 4h24v2H17V6zM2 17h2v24H2V17zm4 0h2v24H6V17z'/%3E%3C/g%3E%3C/svg%3E");
    }
  }
  @keyframes rotate-card-spin {
    from {
      transform: rotateY(0deg);
    }

    to {
      transform: rotateY(360deg);
    }
  }
}
</style>
