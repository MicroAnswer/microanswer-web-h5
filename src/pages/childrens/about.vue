<template>
    <div>

        <!-- 顶部说明 -->
        <md-card style="margin: 8px">
            <md-card-header>
                <div class="md-title">Microanswer的个人网站</div>
                <div class="md-subhead">移动web版</div>
            </md-card-header>

            <md-card-content>
                <p>本站内容均为博主原创，若发现存在恶意抄袭情况，请邮箱博主，博主将第一时间删除并致歉。本站提供了博客、专题、产品版块，记录了博主的涉猎范围以及作品展示。</p>
                <p class="md-caption"><span class="md-title">博客</span>：新知识博文、疑难解决方案博文通常将出现在此版块下，每一个博客，除非未特别指定，均默认允许所有已登录用户进行评论，允许所有浏览用户点赞。博主希望每一位浏览过博客的人都留下一个赞，每次赞的冷却 时间为20小时，必须等待20小时后才能再一次进行赞。比起赞，博主更喜欢评论，因为这样可以为站点带来用户量。</p>
                <p class="md-caption"><span class="md-title">专题</span>：有一套完整体系、提供全面的知识或技能介绍的版块，每一个专题都有其介绍的完整功能，它的具体内容本质上也是博文，不过这些博文不会展现在博文列表里，而是只能在专题里寻找到。专题支持点赞评论。</p>
                <p class="md-caption"><span class="md-title">产品</span>：博主个人产出的作品代表，包含但不限于公示的所有内容。</p>
                <p class="md-caption"><span class="md-title">留言</span>：本站不提供留言功能，但你仍然可以发表你的意见，博主建议你可以到下方[更新历史]版块里，发表对本站的观点和评论。</p>
                <p>博主能力有限，若发现站内出现或存在BUG，请邮箱至博主，邮箱地址见本页末尾处。本站欢迎友链加入，你可以直接邮箱博主，注明你的网址和网站名称，博主很快便会处理。</p>
            </md-card-content>
        </md-card>

        <!-- 更新记录 -->
        <md-card style="margin: 8px">
            <md-card-header>
                <div class="md-title">更新历史</div>
            </md-card-header>

            <md-card-content>
                <md-button class="md-raised md-dense" href="">点击查看更新历史记录</md-button>
            </md-card-content>
        </md-card>

        <!-- 友情链接 -->
        <md-card style="margin: 8px">
            <md-card-header>
                <div class="md-title">友情链接</div>
            </md-card-header>

            <md-card-content>
                <a href=";">少司命</a>、
                <a href=";">程序猿童先森</a>
            </md-card-content>
        </md-card>

        <!-- 邮箱 -->
        <md-card style="margin: 8px">
            <md-card-header>
                <div class="md-title">博主邮箱</div>
            </md-card-header>

            <md-card-content>
                <a href="mailto:374288225@qq.com">374288225@qq.com</a>、
                <a href="mailto:microanswer@outlook.com">microanswer@outlook.com</a>
            </md-card-content>
        </md-card>
        <p>
            <a href="http://beian.miit.gov.cn/" target="_blank">蜀ICP备17035828号</a>
            · Page width <a href="https://vuematerial.io" target="_blank">vue-material</a> by Microanswer。
        </p>
    </div>
</template>
<style scoped>
    p{
        margin-top: 8px;
    }
</style>