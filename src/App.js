import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import AddForm from './components/Form/entry.js';
import TableOverview from './components/Table/TableListing'; 
import Summary from './components/Summary/SummaryView';
import TestUI from './components/UITest/UITest';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
  } from 'react-router-dom';
  
const { Header, Sider, Content } = Layout;

class SiderDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Router>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo">
            <img src={logo} alt="no" />
          </div>  
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}>
            <Menu.Item key="home">
              <Link to="/home">
                <Icon type="user" />
                <span>Overview</span>
              </Link>  
            </Menu.Item>
            <Menu.Item key="add">
              <Link to="/add">
                <Icon type="plus" />
                <span>Add new entry</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="summary">
              <Link to="/summary">
                <Icon type="plus" />
                <span>Overview</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="test">
              <Link to="/test">
                <Icon type="plus" />
                <span>Test-UI</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 500 }}>
            <Switch>
                <Route exact path="/home" component={TableOverview}/>
                <Route exact path="/add" component={AddForm}/>
                <Route exact path="/summary" component={Summary}/>
                <Route exact path="/test" component={TestUI}/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
      </Router>
    );
  }
}




export default SiderDemo;
