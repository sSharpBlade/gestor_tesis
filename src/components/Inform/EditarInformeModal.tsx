import React, { useState } from 'react';
import { Button, Modal, Input, DatePicker, InputNumber, Form } from 'antd';
import ActivityTable from '../Activities/table';
import DownloadButtonAnexo5 from '../FileAnexo5/DownloadButton5';

interface Student {
  career: string;
  name: string;
  issue: string;
  id: string;
  approvalDate: string;
  state: string;
  percentage: number;
  idThesis: number;
}

interface Inform {
  idReport: number;
  date: Date;
  issue: string;
  percentage: number;
}

interface EditarInformeProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  student: Student;
  dataReport: Inform;
}

const EditarInforme: React.FC<EditarInformeProps> = ({ isModalOpen, handleOk, handleCancel, student, dataReport }) => {
  const [form] = Form.useForm();
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const onFinish = async (values: any) => {
    const formattedDate = values.date.format('YYYY-MM-DD');
    const payload = {
      signedAt: formattedDate,
      percentage: values.percentage,
      title: values.title,
    };

    try {
      const response = await fetch(`http://localhost:3000/reports/${dataReport.idReport}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccessModalVisible(true);
      } else {
        setErrorModalVisible(true);
      }
    } catch (error) {
      setErrorModalVisible(true);
    }
  };

  const handleSuccessOk = () => {
    setSuccessModalVisible(false);
    handleOk();
  };

  const handleErrorOk = () => {
    setErrorModalVisible(false);
  };

  return (
    <>
      <Modal
        title={<div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14.5px' }}>INFORME MENSUAL DEL AVANCE DEL TRABAJO DE TITULACIÓN</div>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <p style={{ fontWeight: 'bold' }}>{student.career.toUpperCase()}</p>
        </div>
        <div style={{ textAlign: 'left', marginBottom: '14px' }}>
          <p style={{ fontWeight: '' }}><b>ESTUDIANTE:</b> {student.name.toUpperCase()}</p>
          <p style={{ fontWeight: '' }}><b>TEMA DE INVESTIGACION:</b> {student.issue.toUpperCase()}</p>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish} style={{ gap: '8px' }}>
          <Form.Item 
            label="Fecha" 
            name="date" 
            rules={[{ required: true, message: 'Por favor selecciona la fecha' }]}
            style={{ marginBottom: '8px' }}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item 
            label="Porcentaje de Avance" 
            name="percentage" 
            rules={[{ required: true, message: 'Por favor ingresa el porcentaje de avance' }]}
            style={{ marginBottom: '8px' }}
          >
            <InputNumber<number>
              defaultValue={dataReport.percentage}
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value?.replace('%', '') as unknown as number}
            />
          </Form.Item>
          <Form.Item 
            label="Titulo" 
            name="title" 
            rules={[{ required: true, message: 'Por favor ingresa el título' }]}
            style={{ marginBottom: '8px' }}
          >
            <Input defaultValue={dataReport.issue} />
          </Form.Item>
          <Form.Item>
            <b>ACTIVIDADES</b>
            <ActivityTable id={dataReport.idReport} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <DownloadButtonAnexo5 student={student} idReport={dataReport.idReport} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={<span style={{ color: 'green' }}>Éxito</span>}
        visible={successModalVisible}
        onOk={handleSuccessOk}
        onCancel={() => setSuccessModalVisible(false)}
        footer={[
          <Button key="ok" type="primary" onClick={handleSuccessOk}>
            OK
          </Button>
        ]}
        width={300}
      >
        <p>Informe enviado exitosamente</p>
      </Modal>

      <Modal
        title={<span style={{ color: 'orange' }}>Error</span>}
        visible={errorModalVisible}
        onOk={handleErrorOk}
        onCancel={() => setErrorModalVisible(false)}
        footer={[
          <Button key="ok" type="primary" onClick={handleErrorOk}>
            OK
          </Button>
        ]}
        width={300}
      >
        <p>Error al enviar el informe</p>
      </Modal>
    </>
  );
};

export default EditarInforme;
