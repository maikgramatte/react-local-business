import React, {Component} from 'react';
import { Table, Button, Popconfirm  } from 'antd';
import { removeEntry, getEntries as RechnungGetService } from '../../services/table';
  
class RemoveHandler extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visibile: false 
    };
  } 

  confirmDialog() {
    return (
      <Popconfirm visible={this.state.visibile} title="Are you sure delete this task?" onConfirm={() => this.confirm()} onCancel={() => this.cancel()} okText="Yes" cancelText="No">
       
      </Popconfirm>
    );
  }

  confirm() {
    removeEntry(this.props.record.id).then((response) => {
      return response.json();
    }).then((json) => {
      console.log(json);
      this.props.onDeleted();
    });
  }

  cancel() {
    this.setState(
      {
        visibile: false
      }
    );
  }

  show() {
    this.setState(
      {
        visibile: true
      }
    );
  }

  render() {
    return (
      <div onClick={() => this.show()}>
        
        <Button type="primary" icon="delete">
          Remove
          {this.confirmDialog()}
        </Button>
      </div>  
    );
  }

}


export default class App extends Component {
    
    columns = [
      {
        title: 'Date',
        dataIndex: 'pos_date',
      },
      {
        title: 'Title',
        dataIndex: 'pos_title',
        render: (text, record) => (
            <div><strong>{record.pos_title}</strong><br /><small>{record.pos_desc}</small></div>  
        ),
      },
      {
        title: 'Type',
        dataIndex: 'pos_category',
        render: (text, record) => (
            <div>{record.pos_category[0].toUpperCase()}{record.pos_category.substring(1)}</div>  
        ),
      },
      {
        title: 'Amount',
        dataIndex: 'pos_amount',
        render: (text, record) => (
            <div><strong>{record.pos_amount} EUR</strong>
            <br />{record.pos_vat}% = {record.pos_vat_amount} EUR</div>  
        ),
      },
      {
        title: 'Action',
        dataIndex: 'id',
        render: (text, record) => (
          <RemoveHandler onDeleted={() => this.refresh()} record={record}></RemoveHandler>
        )
      }
    ];;

    constructor(props) {
        super(props);

        this.state = {
          entries: [],
          loading: true,
          pagination: {
            showSizeChanger: true,
          },
        };
    }

    componentWillMount() {
      this.fetch({offset: 1});
    }

    refresh = () => {
      this.setState(
        {
          loading: true
        }
      )

      this.fetch({offset: this.state.pagination.current});
    }

    fetch = (values) => {
        this.setState({loading: true});

        RechnungGetService(values).then((response) => {
            return response.json();
        }).then((json) => {
            console.log(json);

            const pagination = { ...this.state.pagination };
            pagination.total = json.count;
            
            this.setState({
                entries: json.data,
                loading: false
            });
        });
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
        });

        this.fetch({offset: pagination.current});
      }

    render() {    
      return (
        <div>
            <h1>Overview</h1>  
           
            <Table 
                columns={this.columns} 
                loading={this.state.loading}
                dataSource={this.state.entries} 
                size="small"
                onChange={this.handleTableChange}
                pagination={this.state.pagination} 
            />
        </div>
      );
    }
  }