<template>
  <scroll-view
    @scrolltolower="handleToLower"
    class="recommend_view"
    scroll-y
    v-if="recommends.length > 0">
    <!-- 推荐 开始 -->
    <view class="recommend_wrap">
      <navigator
        class="recommend_item"
        v-for="(item, index) of recommends"
		:key="item.id"
        :url="`/pages/album/album?id=${item.target}`"
      >
        <image
          mode="widthFix"
          :src="item.thumb"
        ></image>

      </navigator>
    </view>
    <!-- 推荐 结束 -->
   <view class="time_wrap">
      <view class="time_title">
        <view class="time_title_info">
          <view class="time_info">
            <text> {{time.day}} / </text>
            {{time.month}} 月
          </view>
          <view class="time_text"> {{time.title}} </view>
        </view>
        <view class="time_title_more" @click="getMore">更多 > </view>
      </view>
      <view class="time_content">
        <view
          class="time_item"
          v-for="(item, index) of time.items"
          :key="item.id"  
        >
        <go-detail :list="time.items" :index="index" >
          <image
            mode="aspectFill"
            :src="item.thumb+item.rule.replace('$<Height>',360)"
          ></image>
          </go-detail>
        </view>
      </view>
    </view>

    <!-- 热门 开始 -->
    <view class="hots_wrap">
      <view class="hots_title">
        <text> 热门 </text>
      </view>
      <view class="hots_content">
        <view
          class="hot_item"
          v-for="(item,index) in hots"
          :key="item.id"
        >
        <go-detail :list="hots" :index="index">
          <image
            mode="widthFix"
            :src="item.thumb"
          ></image>
          </go-detail>
        </view>
      </view>
    </view>
    <!-- 热门 结束 -->
  </scroll-view>
</template>

<script>
import goDetail from "@/components/goDetail";
export default {
  components:{
		goDetail
  },
  data() {
    return {
		// 推荐列表
		recommends: [],
		// 时间
		time: {},
		// 热门
		hots: [],
		// 请求的参数
		params: {
			// 要获取几条
			limit: 30,
			// 关键字
			order: "hot",
			// 要跳过几条
			skip: 0
		},
		// 是否还有下一页
		hasMore: true
    };
  },
  mounted() {
	this.getList();
	uni.setNavigationBarTitle({
		title:"推荐"
	})
  },
  methods: {
    // 获取接口的数据
    getList() {
      this.request({
		// url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
        url: "http://service.picasso.adesk.com/v3/homepage/vertical",
        data: this.params
      }).then(result => {
        // 判断还有没有下一页数据
        if (result.res.vertical.length === 0) {
			this.hasMore = false;
			uni.showToast({
				title: "没有更多数据了",
				icon: "none"
			});
			return;
        }

        if (this.recommends.length === 0) {     // 第一次发送的请求
          this.recommends = result.res.homepage[1].items;
		  
          this.time = result.res.homepage[2];
		  
		  let times = new Date(this.time.stime);
		  let month = times.getMonth();
		  let day = times.getDate();
		  
		  
		  this.time.month = month < 9 ? '0' + (month + 1) : (month + 1);
		  this.time.day = day < 10 ? '0' + day : day;
        }

		// 获取热门数据的列表
        this.hots = [...this.hots, ...result.res.vertical];
      });
    },

    // 滚动条触底事件
    handleToLower() {
		 /* 
		 1 修改参数  skip+=limit;
		 2 重新发送请求 getList()
		 3 请求回来成功  hots 数据的叠加 
		 */

		if (this.hasMore) {
			this.params.skip += this.params.limit;
			this.getList();
		} else {
        // 弹窗提示用户
			uni.showToast({
				title: "没有数据了",
				icon: "none"
			});
		}
    },
	getMore () {
		
	}
  }
};
</script>

<style lang="scss" scoped >
.recommend_view {
  // height：屏幕的高度 -  头部标题的高度
  height: calc(100vh - 36px);
}
.recommend_wrap {
  // flex布局
  display: flex;
  flex-wrap: wrap;
  .recommend_item {
    width: 50%;
    border: 5rpx solid #fff;
  }
}
.time_wrap {
  .time_title {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    .time_title_info {
      color: $color;
      font-size: 30rpx;
      font-weight: 600;
      display: flex;
      .time_info {
        text {
          font-size: 36rpx;
        }
      }

      .time_text {
        font-size: 34rpx;
        color: #666;
        margin-left: 30rpx;
      }
    }

    .time_title_more {
      font-size: 24rpx;
      color: $color;
    }
  }

  .time_content {
    display: flex;
    flex-wrap: wrap;
    .time_item {
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
}
.hots_wrap {
  .hots_title {
    padding: 20rpx;
    text {
      border-left: 20rpx solid $color;
      padding-left: 20rpx;
      font-size: 34rpx;
      font-weight: 600;
    }
  }

  .hots_content {
    display: flex;
    flex-wrap: wrap;
    .hot_item {
      width: 33.33%;
      border: 5rpx solid #fff;
      image {
      }
    }
  }
}
</style>
