import React, { useRef, useState } from 'react';
import { Button, Modal, Input, DatePicker, Space, Switch, Form } from 'antd';
import type { DatePickerProps, InputRef, FormProps } from 'antd';

interface Informe {
  date: string;
  title: string;
  idThesis: number;
}

interface CrearInformeProps {
  idThesis: number;
  isModalOpen: boolean;
  handleCancel: () => void;
}

const CrearInforme: React.FC<CrearInformeProps> = ({ idThesis, isModalOpen, handleCancel }) => {
  const [input, setInput] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [form] = Form.useForm();
  const inputRef = useRef<InputRef>(null);

  const onChange: DatePickerProps['onChange'] = ( dateString) => {
    form.setFieldsValue({ date: dateString });
    setIsDirty(true);
  };

  const sharedProps = {
    style: { width: '100%', marginTop: '16px' },
    ref: inputRef,
    onChange: () => setIsDirty(true),
  };

  const onFinish: FormProps['onFinish'] = async (values) => {
    const informe: Informe = {
      ...values,
      idThesis,
    };
    console.log('Success:', informe);

    try {
      const response = await fetch('http://localhost:3000/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(informe),
      });

      if (response.ok) {
        Modal.success({
          title: 'Éxito',
          content: 'Su informe se ha creado correctamente',
        });
        handleCancel();
        setIsDirty(false);
      } else {
        throw new Error('Error en la creación del informe');
      }
    } catch (error) {
      Modal.error({
        title: 'Error',
        content: 'No se pudo crear su informe',
      });
    }
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleModalClose = () => {
    if (isDirty) {
      Modal.confirm({
        title: 'Confirmar salida',
        content: 'Hay cambios no guardados, ¿está seguro de que desea salir?',
        okText: 'Sí',
        cancelText: 'No',
        onOk: () => {
          setIsDirty(false);
          handleCancel();
        },
      });
    } else {
      handleCancel();
    }
  };

  return (
    <>
      <Modal
        title={<div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>ANEXO 5</div>}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={400}
      >
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <p style={{ fontWeight: 'bold' }}>Agregar Informe</p>
        </div>
        <Form
          form={form}
          name="basic"
          style={{ marginTop: '16px' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Space direction="vertical" style={{ width: '100%', marginTop: '16px' }}>
            <Form.Item
              name="date"
              rules={[{ required: true, message: 'Por favor seleccione una fecha' }]}
            >
              <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Fecha :</p>
              <DatePicker onChange={onChange} />
            </Form.Item>
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
            <Form.Item
              name="title"
              rules={[{ required: true, message: 'Por favor ingrese un título' }]}
            >
              {input ? <Input {...sharedProps} /> : <Input.TextArea rows={3} {...sharedProps} />}
            </Form.Item>
          </Space>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              onClick={() => console.log(idThesis)}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CrearInforme;
