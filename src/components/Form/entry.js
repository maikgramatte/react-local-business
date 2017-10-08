import React from 'react';
import { Form, DatePicker, Input, Button, InputNumber } from 'antd';
import { Radio, Cascader } from 'antd';
import RechnungAddService from '../../services/position';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

const CascadeOptions = [{
    value: 'ausgabe',
    label: 'Ausgaben',
    children: [{
      value: 'sonstiges',
      label: 'Sonstiges',
    },
    {
      value: 'porto',
      label: 'Porto',
    },
    {
      value: 'telefon',
      label: 'Telefon',
    },
    {
      value: 'hosting',
      label: 'Hosting',
    },
    {
      value: 'buero',
      label: 'Bueromaterial',
    },
    {
      value: 'reise',
      label: 'Reisekosten',
    },
    {
      value: 'books',
      label: 'Buecher',
    }
  ],
  }, {
    value: 'einnahme',
    label: 'Einnahme',
    children: [{
        value: 'einnahme',
        label: 'Einnahme',
      }],
  }];


class TimeRelatedForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      const values = {
        ...fieldsValue,
        date: fieldsValue['date'].format('YYYY-MM-DD')
      }  

      RechnungAddService(values);
    });
  }

  constructor(props) {
    super(props);

    this.state = {
        table: [],    
    };
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>

        <FormItem
          {...formItemLayout}
          label="Position"
        >
        {getFieldDecorator('title', {
            rules: [{ required: true}],
          })(
            <Input placeholder="Brief position desciption" />
        )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Type"
        >
        {getFieldDecorator('type', {
            rules: [{ required: true}]
          })(
            <Cascader options={CascadeOptions} placeholder="Please select" />
        )}   
        </FormItem>
    
        <FormItem
          {...formItemLayout}
          label="Date"
        >
        {getFieldDecorator('date', {
            rules: [{ required: true}],
          })(
            <DatePicker  />
        )}  
        </FormItem>
        
        <FormItem
          {...formItemLayout}
          label="Amount"
        >
        {getFieldDecorator('amount', {
            rules: [{ required: true}],
          })(
            <InputNumber min={0} step={0.1} />
        )}             
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="VAT Type"
        >
        {getFieldDecorator('vat', {
            rules: [{ required: true}],
          })(
            <RadioGroup initialValue="19">
                <RadioButton value="19">19 %</RadioButton>
                <RadioButton value="7">7 %</RadioButton>
                <RadioButton value="0">Without</RadioButton>
            </RadioGroup>
        )}    
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="VAT"
        >
        {getFieldDecorator('amount_vat', {
            rules: [{ required: false}],
          })(
            <InputNumber min={0} step={0.1} initialValue={0}/>
        )}    
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Comment"
        >
        {getFieldDecorator('desc', {
            rules: [{ required: false}],
          })(
            <TextArea rows={4} />
        )}   
        </FormItem>
        
        <FormItem
            {...formItemLayout}
        >
          <Button
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(TimeRelatedForm);
