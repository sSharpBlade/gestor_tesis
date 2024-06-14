import React, { useRef, useState } from 'react';
import { Button, Modal, Input, DatePicker, Space, Switch, Form } from 'antd';
import type { DatePickerProps, InputRef, FormProps } from 'antd';

const CrearInforme: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const inputRef = useRef<InputRef>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    if (isDirty) {
      Modal.confirm({
        title: 'Warning',
        content: 'No ha guardado sus cambios, ¿desea salir sin guardar?',
        onOk: () => {
          setIsModalOpen(false);
          setIsDirty(false);
        },
      });
    } else {
      setIsModalOpen(false);
    }
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setIsDirty(true);
  };

  const sharedProps = {
    style: { width: '100%', marginTop: '16px' },
    ref: inputRef,
    onChange: () => setIsDirty(true),
  };

  const onFinish: FormProps['onFinish'] = (values) => {
    console.log('Success:', values);
    setIsModalOpen(false);
    setIsDirty(false);
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title={<div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>ANEXO 5</div>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={400}
      >
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <p style={{ fontWeight: 'bold' }}>Agregar Informe</p>
        </div>
        <Space direction="vertical" style={{ width: '100%', marginTop: '16px' }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Fecha :</p>
          <DatePicker onChange={onChange} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold', marginLeft: '8px' }}>Título :</p>
            <Switch
              checked={input}
              checkedChildren="Input"
              unCheckedChildren="TextArea"
              onChange={() => {
                setInput(!input);
                setIsDirty(true);
              }}
            />
            
          </div>
          {input ? <Input {...sharedProps} /> : <Input.TextArea rows={3} {...sharedProps} />}
        </Space>
        <Form
          name="basic"
          style={{ marginTop: '16px' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CrearInforme;
