/*
 * @Author: HHG
 * @Date: 2022-09-01 10:58:19
 * @LastEditTime: 2022-09-10 19:43:23
 * @LastEditors: 韩宏广
 * @FilePath: /个人财务/web/src/components/Aside.js
 * @文件说明: 
 */
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Routers from '@/routers';
import { setLocalStorage, getLocalStorage } from '@/utils'
const { Sider } = Layout;
const rootSubmenuKeys = ['/consumptiontype', '/incometype', '/balancepayments'];

const Aside = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [routerItem, setRouterItem] = useState([])
  const [openKeys, setOpenKeys] = useState([]);
  const [defaultSelectedKeys, setdefaultSelectedKeys] = useState(['']);
  const { pathname } = useLocation()

  //注意不要使用openKeys这个api，因为为了解决导航菜单收回的时候无法同时收回二级菜单。
  const defaultProps = collapsed ? {} : { openKeys: openKeys };
  //将路由表转化成要使用的格式，组Aside
  useEffect(() => {
    // console.log(Routers);
    const Router = []
    Routers.map((item) => {
      if (item.subs) {
        const childrens = []
        item.subs.map((children) => {
          childrens.push({
            label: <Link to={children.key}>{children.title}</Link>,
            key: children.key,
            icon: children.icon,
          })
          return childrens
        })
        Router.push({
          label: item.title,
          key: item.key,
          icon: item.icon,
          children: childrens,
          className: "aside-icon"
        })
      } else {
        Router.push({
          label: <Link to={item.key}>{item.title}</Link>,
          key: item.key,
          icon: item.icon,
          className: "aside-icon"
        })
      }
      return Router
    })
    setRouterItem(Router)
  }, [])

  //根据当前路由设置选中导航菜单
  useEffect(() => {
    setdefaultSelectedKeys([pathname])
  }, [pathname])

  //解决刷新页面之后导航菜单会丢失展开菜单
  useEffect(() => {
    if (pathname.indexOf(getLocalStorage('OpenKeys')) !== -1) {
      //坑,注意一定是数组
      setOpenKeys([openKeys === '' ? openKeys : getLocalStorage('OpenKeys')]);
    }
  }, [pathname])

  //这个地方是只展开一个父级菜单，onOpenChange只在打开有子级导航的时候,以及收回侧边栏会触发。
  const onOpenChange = (keys) => {
    console.log('执行了子菜单收回');
    // console.log(keys);
    // console.log(openKeys);
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      if (collapsed === false) {
        setOpenKeys(keys);
        setLocalStorage("OpenKeys", keys)
      }
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      setLocalStorage("OpenKeys", latestOpenKey ? [latestOpenKey] : [])
    }
  };

  const onClick = (e) => {
    //这里是为了，点击没有子菜单的导航可以将已经展开的导航关闭
    if (e.keyPath.length < 2) {
      setOpenKeys([])
    }
  }

  return (
    <>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => { setCollapsed(value) }}>
        {/* <div className="logo" > </div> */}
        <Menu theme="dark" defaultSelectedKeys={'/home'} selectedKeys={defaultSelectedKeys} mode="inline" items={routerItem} onClick={onClick} onOpenChange={onOpenChange} 
        // 为了解决二级菜单展开无法展开的问题
        {...defaultProps} />
      </Sider>
    </>
  )
}

export default Aside 