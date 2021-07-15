<template>
	<view>
		<view class="home_tab">
		    <view class="home_tab_title">
		        <view class="title_inner">
					<!-- 分页器 -->
					 <uni-segmented-control
						:values="items.map( x=> x.title)"
						:current="current"
						@clickItem="changeBar"
						style-type="text"
						active-color="#d4237a">
					</uni-segmented-control>
				</view>
		        <view class="iconfont iconsearch"></view>
		    </view>
		    <view class="home_tab_content">
		        <view v-if="current === 0">
					<home-recommend></home-recommend>	
		        </view>
		        <view v-if="current === 1">
					<home-category></home-category>
		        </view>
		        <view v-if="current === 2">
					<home-new></home-new>
		        </view>
				<view v-if="current === 3">
					<home-album></home-album>			
				</view>
		    </view>
		</view>
	</view>
</template>

<script>
	import homeAlbum from "./home-album/home-album";
	import homeCategory from "./home-category/home-category";
	import homeNew from "./home-new/home-new";
	import homeRecommend from "./home-recommend/home-recommend";
	
	export default {
		components: {
			homeAlbum,
			homeCategory,
			homeNew,
			homeRecommend
		},
		data() {
			return {
				items: [
					{
						title: "推荐"
					},
					{
						title: "分类"
					},
					{
						title: "最新"
					},
					{
						title: "专辑"
					}
				],
				current: 0
			}
		},
		
		methods: {
			changeBar (e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		}
	}
</script>

<style lang="scss" >
.home_tab{
  .home_tab_title{
    position: relative;
    .title_inner{
      width: 60%;
      margin: 0 auto;
    }
    .iconsearch{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 5%;
    }
  }
  .home_tab_content{}
}
</style>
