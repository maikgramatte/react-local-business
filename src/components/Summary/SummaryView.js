import React, {Component} from 'react';
import { Form, Button, Radio, DatePicker } from 'antd';
import { Table } from 'antd';
import { getSummary } from '../../services/table';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

const columns = [
    {
      title: 'Index',
      dataIndex: 'title',
    },
    {
      title: 'Value',
      dataIndex: 'value'
    }
];    

class SummaryView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'inline',
            loading: false,
            data: [],
        };
    }

    componentDidMount() {
        this.fetchResults({});
    }

    fetchResults(values) {
        this.setState(
            {
                loading: true
            }
        );

        getSummary(values).then((response) => {
            return response.json();
          }).then((json) => {
            this.setState({
                data: json,
                loading: false
            });
          });
    }

    submitForm(e) {
        e.preventDefault();

        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
              return;
            }
            
            var values = {};
            if(fieldsValue.type) {
                values.type = fieldsValue['type'];
            }

            if(fieldsValue['date'] && fieldsValue['date'][0]) {
                values.date_start = fieldsValue['date'][0].format('YYYY-MM-DD')
                values.date_end = fieldsValue['date'][1].format('YYYY-MM-DD')
            }

            this.fetchResults(values);
          });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form layout="inline" onSubmit={(e) => this.submitForm(e)}>
                <FormItem
                label="Type"
                >
                {getFieldDecorator('type', {
                    rules: [{ required: false}],
                    option: {
                        initialValue: 'all' 
                    }
                })(
                    <Radio.Group>
                        <Radio.Button value="all">All</Radio.Button>
                        <Radio.Button value="income">Income</Radio.Button>
                        <Radio.Button value="costs">Costs</Radio.Button>
                </Radio.Group>
                )}
                </FormItem>

                <FormItem
                label="Date"
                >
                {getFieldDecorator('date', {
                    rules: [{ required: false}]
                })(
                    <RangePicker />
                )}    
                </FormItem>
                
                <FormItem>
                <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
            <br /><br />
            <h3>Summary</h3>
            <Table loading={this.state.loading} dataSource={this.state.data} columns={columns} />  
        </div>
        );
    }
}

export default Form.create()(SummaryView);