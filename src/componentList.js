
import MdApp           from 'vue-material/dist/components/MdApp'
import MdButton        from 'vue-material/dist/components/MdButton'
import MdToolbar       from 'vue-material/dist/components/MdToolbar'
import MdIcon          from 'vue-material/dist/components/MdIcon'
import MdDrawer        from 'vue-material/dist/components/MdDrawer'
import MdList          from 'vue-material/dist/components/MdList'
import MdContent       from 'vue-material/dist/components/MdContent'
import MdCard          from 'vue-material/dist/components/MdCard'
import MdAvatar        from 'vue-material/dist/components/MdAvatar'
import MdSubheader     from 'vue-material/dist/components/MdSubheader'
import MdDivider       from 'vue-material/dist/components/MdDivider'
import MdMenu          from 'vue-material/dist/components/MdMenu'
import MdRipple        from 'vue-material/dist/components/MdRipple'
import MdTabs          from 'vue-material/dist/components/MdTabs'
import MdProgress      from 'vue-material/dist/components/MdProgress'
import MdField         from 'vue-material/dist/components/MdField'


const componentList = [
    MdButton, MdToolbar, MdIcon, MdDrawer, MdList,MdContent, MdCard,MdAvatar,MdSubheader,MdDivider,
    MdApp, MdMenu, MdRipple,MdTabs,MdProgress, MdField
];

export default {
    install (Vue) {
        for (let i = 0; i < componentList.length; i++) Vue.use(componentList[i]);
    }
}