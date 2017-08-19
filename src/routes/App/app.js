import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Layout } from 'antd'
import QueueAnim from 'rc-queue-anim'

import styles from './app.less'
import Header from '../../components/Header/header'
import Sider from '../../components/Sider/sider'
import menus from '../../utils/menu'

const { Content, Footer } = Layout

class App extends React.Component {

  getChildContext() {
    return {
      currentLanguage: this.props.app.currentLanguage
    }
  }

  get siderProps() {
    return {
      breakpoint: 'lg',
      menus,
      collapsed: this.props.app.collapsed,
      darkTheme: this.props.app.darkTheme,
      currentLanguage: this.props.app.currentLanguage,
      pathname: this.props.location.pathname,
      toIndex: this.props.toIndex,
      onCollapse: this.props.onCollapse,
      onChangeTheme: this.props.onChangeTheme
    }
  }

  get headerProps() {
    const headerMenusFunc = {
      logout: this.props.onLogout
    }

    const headerMenus = [
      {
        key: 'logout',
        name: 'logoutText'
      }
    ]

    return {
      isNavbar: this.props.app.isNavbar,
      collapsed: this.props.app.collapsed,
      username: this.props.app.username,
      pathname: this.props.location.pathname,
      currentLanguage: this.props.app.currentLanguage,
      supportLanguages: this.props.app.supportLanguages,
      menus,
      headerMenus,
      headerMenusFunc,
      onSwitchSider: this.props.onCollapse,
      onChangeLanguage: this.props.onChangeLanguage
    }
  }

  get content() {
    return this.props.children
      && React.cloneElement(this.props.children, { key: this.props.location.pathname })
  }

  get layout() {
    return (
      <Layout className={styles.layout}>
        <Header {...this.headerProps} />
        <Content className={styles.content}>
          <QueueAnim delay={[450, 0]} type={['right', 'left']} appear={false}>
            { this.content }
          </QueueAnim>
        </Content>
        <Footer />
      </Layout>
    )
  }

  hasSider(children) {
    return (
      <Layout className={styles.normal}>
        <Sider {...this.siderProps} />
        {children}
      </Layout>
    )
  }

  render() {
    return this.props.app.isNavbar ? this.layout : this.hasSider(this.layout)
  }
}

App.childContextTypes = {
  currentLanguage: PropTypes.string
}

App.propTypes = {
  app: PropTypes.object.isRequired,
  onCollapse: PropTypes.func.isRequired,
  onChangeTheme: PropTypes.func.isRequired,
  toIndex: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onChangeLanguage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = (dispatch) => {
  return {
    onCollapse: () => dispatch({ type: 'app/toggleCollapse' }),
    onChangeTheme: checked => dispatch({ type: 'app/changeTheme', darkTheme: checked }),
    toIndex: () => dispatch(routerRedux.push('/')),
    onLogout: () => dispatch({ type: 'app/logout' }),
    onChangeLanguage: language => dispatch({ type: 'app/changeLanguage', currentLanguage: language })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
