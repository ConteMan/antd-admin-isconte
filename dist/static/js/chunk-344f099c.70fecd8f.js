(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-344f099c"],{"270f":function(t,e,i){},"2da7":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("page-view-slot",{staticClass:"no-page-header",attrs:{"show-header":!1},scopedSlots:t._u([{key:"router-view",fn:function(){return[i("div",{staticClass:"movie-container",style:{height:t.worldlineContainerHeight}},[i("div",{staticClass:"bar"},[i("div",{staticClass:"type"},[t.types.length>0?[t._l(t.types,(function(e){return[i("div",{key:e.key,staticClass:"item",class:{active:e.key===t.type&&"list"===t.showType},on:{click:function(i){return t.changeType(e.key)}}},[t._v(" "+t._s(e.value)+" "),i("p",[t._v(t._s(e.total))])])]}))]:t._e()],2),i("div",{staticClass:"action"},[i("div",{staticClass:"item",class:{active:"action"===t.showType},on:{click:function(e){return t.changeShowType()}}},[t._v(" More ")])])]),i("div",{staticClass:"list-container",style:{height:t.listContainerHeight}},[i("div",{directives:[{name:"show",rawName:"v-show",value:"list"===t.showType,expression:"showType === 'list'"},{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],staticClass:"list-content",style:{height:t.listContainerHeight},attrs:{"infinite-scroll-delay":"1000","infinite-scroll-disabled":t.busy,"infinite-scroll-distance":"50","infinite-scroll-immediate-check":"true"}},[t.items.length?[t._l(t.items,(function(e){return[i("div",{key:e.id,staticClass:"list-item"},["yuque_note"===e.platform_type?i("div",{domProps:{innerHTML:t._s(e.content)}}):t._e(),["douban_movie","douban_movie_wish","douban_movie_do"].includes(e.platform_type)?i("div",[t._v(" "+t._s(e.content)+" ")]):t._e(),i("div",{staticClass:"info"},[i("span",{staticClass:"time"},["douban"===e.platform?[t._v(" "+t._s(t.dayjs(e.platform_created_at).format("YYYY-MM-DD"))+" ")]:[t._v(" "+t._s(t.dayjs(e.platform_created_at).format("YYYY-MM-DD HH:mm:ss"))+" ")]],2),i("span",{staticClass:"platform-type"},[t._v(t._s(e.platform_type_des.value))])])])]}))]:t._e()],2),i("div",{directives:[{name:"show",rawName:"v-show",value:"action"===t.showType,expression:"showType === 'action'"}],staticClass:"action-content"},[i("div",{staticClass:"action-item"},[i("div",{staticClass:"left"},[t._v(" 同步数据 ")]),i("div",{staticClass:"right"},[i("a-button",{attrs:{size:"small",loading:t.syncLoading},on:{click:function(e){return t.sync()}}},[t._v(" 确定 ")])],1)])])])])]},proxy:!0}])})},a=[],s=(i("99af"),i("96cf"),i("c964")),o=i("2ef0"),r=i.n(o),c=i("5a0c"),l=i.n(c),u=i("487a"),d=i.n(u),f=i("c5de"),p=i("dde5"),h={name:"Movie",i18n:i("f7ae"),directives:{infiniteScroll:d.a},components:{PageViewSlot:f["a"]},data:function(){return{items:[],offset:0,type:"",limit:20,busy:!1,total:0,dayjs:l.a,types:[],pageHeight:document.body.clientHeight,showType:"list",syncLoading:!1}},computed:{worldlineContainerHeight:function(){return this.pageHeight-64+"px"},listContainerHeight:function(){return this.pageHeight-64+"px"}},created:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getTypes();case 2:return e.next=4,t.index();case 4:i=t,window.onresize=function(){return function(){i.pageHeight=document.body.clientHeight}()};case 6:case"end":return e.stop()}}),e)})))()},methods:{init:function(){this.items=[],this.offset=0,this.busy=!1},index:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var i,n,a,s,o,c,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=t.offset,n=t.limit,a=t.type,e.next=3,p["b"].index({offset:i,limit:n,type:a});case 3:s=e.sent,0===s.data.code&&(o=s.data.data,c=o.items,l=o.totalCount,t.total=l,c.length>0?(t.items=r.a.concat(t.items,c),t.busy=!1):t.busy=!0);case 5:case"end":return e.stop()}}),e)})))()},loadMore:function(){this.offset+=this.limit,this.index()},getTypes:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p["b"].types();case 2:i=e.sent,0===i.data.code&&(t.types=i.data.data.items,t.type=i.data.data.items[0].key);case 4:case"end":return e.stop()}}),e)})))()},changeType:function(t){if(this.changeShowType("list"),t===this.type)return!0;this.type=t,this.init(),this.index()},changeShowType:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"action";this.showType=t},sync:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.syncLoading=!0,e.next=3,p["b"].sync();case 3:i=e.sent,t.syncLoading=!1,0===i.data.code?t.$message.success("搞定！（"+i.data.data.totalCount+"）"):t.$message.error("有点问题！");case 6:case"end":return e.stop()}}),e)})))()}}},m=h,y=(i("70a4"),i("2877")),v=Object(y["a"])(m,n,a,!1,null,"1c15efe8",null),g=v.exports;e["default"]=g},"70a4":function(t,e,i){"use strict";i("270f")},f7ae:function(t,e){t.exports={messages:{CN:{form:{platform:"平台",tags:"标签",title:"标题",published_at:"发布时间",info_at:"信息时间"}},HK:{form:{platform:"平台",title:"标题",tags:"标签",published_at:"发布时间",info_at:"信息时间"}},US:{form:{platform:"Platform",title:"Title",tags:"Tag",published_at:"Publish Time",info_at:"Information Time"}}}}}}]);