<template>
	<!-- 屏幕触屏事件 -->
  <view
    @touchstart="handleTouchstart"
    @touchend="handleTouchend">
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 按下的时间
      startTime: 0,
      // 按下的坐标
      startX: 0,
      startY: 0
    };
  },
  methods: {
    // 用户手指按下屏幕
    handleTouchstart(event) {
      this.startTime = Date.now();
      this.startX = event.changedTouches[0].clientX;
      this.startY = event.changedTouches[0].clientY;
    },
	// 用户手指离开屏幕
    handleTouchend(event) {

      const endTime = Date.now();
      const endX = event.changedTouches[0].clientX;
      const endY = event.changedTouches[0].clientY;

      // 判断按下的时长
      if (endTime - this.startTime > 3000) {
		    // 时间过长，直接退出，不进行滑动方向判断
			return;
      }

      // 滑动的方向
      let direction = "";

      // 先判断用户滑动的距离 是否合法 合法：判断滑动的方向  注意 距离要加上绝对值
      if (Math.abs(endX - this.startX) > 15&&Math.abs(endY-this.startY)<15) {
        // 滑动方向！！！
        direction = endX - this.startX > 0 ? "right" : "left";
      } else {
        return;
      }

      // 用户做了合法的滑动操作
      this.$emit("swiperAction", { direction });
    }
  }
};
</script>

<style>
</style>