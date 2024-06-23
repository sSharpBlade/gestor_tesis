import React, { useRef, useState, useEffect } from 'react';
import { Button, Modal, Input, DatePicker, Space, Switch, Form } from 'antd';
import type { DatePickerProps, InputRef, FormProps } from 'antd';
import dayjs from 'dayjs';

interface Informe {
  date: string;
  title: string;
  idThesis: number;
  additionalNotes?: string;
}

interface CrearInformeProps {
  idThesis: number;
  isModalOpen: boolean;
  handleCancel: () => void;
}

const CrearInforme: React.FC<CrearInformeProps> = ({ idThesis, isModalOpen, handleCancel }) => {
  const [input, setInput] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [titleValue, setTitleValue] = useState('');
  const [form] = Form.useForm();
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (!isModalOpen) {
      setTitleValue('');
      form.resetFields();
      setIsDirty(false);
    } else {
      const lastDayOfMonth = dayjs().endOf('month');
      form.setFieldsValue({ date: lastDayOfMonth });
    }
  }, [isModalOpen]);

  const onChange: DatePickerProps['onChange'] = (dateString) => {
    form.setFieldsValue({ date: dateString });
    setIsDirty(true);
  };

  const sharedProps = {
    style: { width: '100%', marginTop: '16px' },
    ref: inputRef,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTitleValue(e.target.value);
      setIsDirty(true);
    },
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
        title={<div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>CREAR INFORME</div>}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={400}
      >
        <Form
          form={form}
          name="basic"
          style={{ marginTop: '16px' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Space direction="vertical" style={{ width: '100%', marginTop: '10px' }}>
            <Form.Item
              name="date"
              rules={[{ required: true, message: 'Por favor seleccione una fecha' }]}
            >
              <p style={{ fontSize: '14px', fontWeight: 'bold', padding: '5px' }}>Fecha :</p>
              <DatePicker onChange={onChange} defaultValue={dayjs().endOf('month')} />
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
              {input ? <Input {...sharedProps} value={titleValue} /> : <Input.TextArea rows={3} {...sharedProps} value={titleValue} />}
            </Form.Item>
            <Form.Item
              name="additionalNotes"
            >
              <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Notas Adicionales :</p>
              <Input.TextArea rows={3} style={{ width: '100%', marginTop: '10px' }} />
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
