import React from 'react';
import { connect } from 'dva';
import { Layout, Menu } from 'antd';

import styles from './App.css';

const { Header, Content, Footer, Sider } = Layout;

const App = ({ app, dispatch, children }) => {
    const { collapsed, mode, theme } = app;
    const onCollapse = (c) => {
        const data = {
            collapsed: c,
            mode: c ? 'vertical' : 'inline',
        };
        dispatch({ type: 'app/toggleCollapse', payload: data });
    };

    const siderProps = {
        collapsible: true,
        collapsed,
        onCollapse,
        breakpoint: 'lg',
    };

    return (
        <Layout className={styles.normal}>
            <Sider {...siderProps} >
                <div className={styles.logo}>
                    <img alt="logo" src="/dva.ico" className={styles.dva} />
                    {collapsed ? '' : <span className={styles.title}>Dva Admin</span>}
                </div>
                <Menu theme={theme} mode={mode}>
                    <Menu.Item>test</Menu.Item>
                    <Menu.Item>test</Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff' }} />
                <Content>
                    {children}
                </Content>
                <Footer />
            </Layout>
        </Layout>
    );
};

const mapStateToProps = state => ({
    app: state.app,
});

export default connect(mapStateToProps)(App);
