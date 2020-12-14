/**
 * 该插件可根据菜单配置自动生成 ANTD menu组件
 * menuOptions示例：
 * [
 *  {
 *    name: '菜单名称',
 *    path: '菜单路由',
 *    meta: {
 *      icon: '菜单图标',
 *      invisible: 'boolean, 是否不可见, 默认 false',
 *    },
 *    children: [子菜单配置]
 *  },
 *  {
 *    name: '菜单名称',
 *    path: '菜单路由',
 *    meta: {
 *      icon: '菜单图标',
 *      invisible: 'boolean, 是否不可见, 默认 false',
 *    },
 *    children: [子菜单配置]
 *  }
 * ]
 *
 * i18n: 国际化配置。系统默认会根据 options route配置的 path 和 name 生成英文以及中文的国际化配置，如需自定义或增加其他语言，配置
 * 此项即可。如：
 * i18n: {
 *   messages: {
 *     CN: {dashboard: {name: '监控中心'}}
 *     HK: {dashboard: {name: '監控中心'}}
 *   }
 * }
 **/
import Menu from 'ant-design-vue/es/menu'
import Icon from 'ant-design-vue/es/icon'
import fastEqual from 'fast-deep-equal'
import { getI18nKey } from '@/utils/routerUtil'

const { Item, SubMenu } = Menu

export default {
  name: 'IMenu',
  props: {
    options: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    i18n: Object,
    openKeys: Array
  },
  data() {
    return {
      selectedKeys: [],
      sOpenKeys: [],
      cachedOpenKeys: []
    }
  },
  computed: {
    menuTheme() {
      return this.theme === 'light' ? this.theme : 'dark'
    }
  },
  created() {
    this.updateMenu()
    if (this.options.length > 0 && !this.options[0].fullPath) {
      this.formatOptions(this.options, '')
    }
    // 自定义国际化配置
    if (this.i18n && this.i18n.messages) {
      const messages = this.i18n.messages
      Object.keys(messages).forEach(key => {
        this.$i18n.mergeLocaleMessage(key, messages[key])
      })
    }
  },
  watch: {
    options(val) {
      if (val.length > 0 && !val[0].fullPath) {
        this.formatOptions(this.options, '')
      }
    },
    i18n(val) {
      if (val && val.messages) {
        const messages = this.i18n.messages
        Object.keys(messages).forEach(key => {
          this.$i18n.mergeLocaleMessage(key, messages[key])
        })
      }
    },
    collapsed(val) {
      if (val) {
        this.cachedOpenKeys = this.sOpenKeys
        this.sOpenKeys = []
      } else {
        this.sOpenKeys = this.cachedOpenKeys
      }
    },
    '$route': function() {
      this.updateMenu()
    },
    sOpenKeys(val) {
      this.$emit('openChange', val)
      this.$emit('update:openKeys', val)
    }
  },
  methods: {
    renderIcon: function(h, icon, key) {
      if (this.$scopedSlots.icon && icon && icon !== 'none') {
        const vnodes = this.$scopedSlots.icon({ icon, key })
        vnodes.forEach(vnode => {
          vnode.data.class = vnode.data.class ? vnode.data.class : []
          vnode.data.class.push('anticon')
        })
        return vnodes
      }
      return !icon || icon === 'none' ? null : h(Icon, { props: { type: icon }})
    },
    renderMenuItem: function(h, menu) {
      return h(
        Item, { key: menu.fullPath },
        [
          h('router-link', {
            props: { to: menu.fullPath },
            attrs: { style: 'overflow:hidden;white-space:normal;text-overflow:clip;' }
          },
          [
            this.renderIcon(h, menu.meta ? menu.meta.icon : 'none', menu.fullPath),
            this.$t(getI18nKey(menu.fullPath))
          ]
          )
        ]
      )
    },
    renderSubMenu: function(h, menu) {
      const this_ = this
      const subItem = [h('span', {
        slot: 'title',
        attrs: { style: 'overflow:hidden;white-space:normal;text-overflow:clip;' }
      },
      [
        this.renderIcon(h, menu.meta ? menu.meta.icon : 'none', menu.fullPath),
        this.$t(getI18nKey(menu.fullPath))
      ]
      )]
      const itemArr = []
      menu.children.forEach(function(item) {
        itemArr.push(this_.renderItem(h, item))
      })
      return h(SubMenu, { key: menu.fullPath },
        subItem.concat(itemArr)
      )
    },
    renderItem: function(h, menu) {
      const meta = menu.meta
      if (!meta || !meta.invisible) {
        let renderChildren = false
        const children = menu.children
        if (children !== undefined) {
          for (let i = 0; i < children.length; i++) {
            const childMeta = children[i].meta
            if (!childMeta || !childMeta.invisible) {
              renderChildren = true
              break
            }
          }
        }
        return (menu.children && renderChildren) ? this.renderSubMenu(h, menu) : this.renderMenuItem(h, menu)
      }
    },
    renderMenu: function(h, menuTree) {
      const this_ = this
      const menuArr = []
      menuTree.forEach(function(menu, i) {
        menuArr.push(this_.renderItem(h, menu, '0', i))
      })
      return menuArr
    },
    formatOptions(options, parentPath) {
      options.forEach(route => {
        const isFullPath = route.path.substring(0, 1) === '/'
        route.fullPath = isFullPath ? route.path : parentPath + '/' + route.path
        if (route.children) {
          this.formatOptions(route.children, route.fullPath)
        }
      })
    },
    updateMenu() {
      const menuRoutes = this.$route.matched.filter(item => item.path !== '')
      this.selectedKeys = this.getSelectedKey(this.$route)
      const openKeys = menuRoutes.map(item => item.path)
      if (!fastEqual(openKeys, this.sOpenKeys)) {
        this.collapsed || this.mode === 'horizontal' ? this.cachedOpenKeys = openKeys : this.sOpenKeys = openKeys
      }
    },
    getSelectedKey(route) {
      const selectedKeys = route.matched.map(item => item.path)
      if (typeof (route.meta.selectPath) !== 'undefined') {
        selectedKeys.push(route.meta.selectPath)
      }
      return selectedKeys
    }
  },
  render(h) {
    return h(
      Menu,
      {
        props: {
          theme: this.menuTheme,
          mode: this.$props.mode,
          selectedKeys: this.selectedKeys,
          openKeys: this.openKeys ? this.openKeys : this.sOpenKeys
        },
        on: {
          'update:openKeys': (val) => {
            this.sOpenKeys = val
          },
          click: (obj) => {
            obj.selectedKeys = [obj.key]
            this.$emit('select', obj)
          }
        }
      }, this.renderMenu(h, this.options)
    )
  }
}
