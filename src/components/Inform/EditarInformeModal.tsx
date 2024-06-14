import React, { useRef, useState } from 'react';
import { Button, Modal, Input, DatePicker, Space, InputNumber, Switch } from 'antd';
import type { DatePickerProps, InputNumberProps, InputRef } from 'antd';
import ActivityTable from '../Activities/table';


const EditarInforme: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [input, setInput] = useState(true);
    const inputRef = useRef<InputRef>(null);

    const onNumberChange: InputNumberProps['onChange'] = (value) => {
        console.log('changed', value);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const sharedProps = {
        style: { width: '100%', marginTop: '16px' },
        defaultValue: '',
        ref: inputRef,
      }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal
                title={<div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14.5px' }}>INFORME MENSUAL DEL AVANCE DEL TRABAJO DE TITULACIÓN</div>}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                    <p style={{ fontWeight: 'bold'}}>{/**/}CARRERA QUE SE RECIBIRA</p>
                </div>
                <div style={{ textAlign: 'left', marginBottom: '14px' }}>
                    <p style={{ fontWeight: '' }}>{/*ESTUDIANTE QUE SE RECIBIRA*/}1</p>
                    <p style={{ fontWeight: '' }}>{/*TEMA INVESTIGACION QUE SE RECIBIRA*/}2</p>
                    <p style={{ fontWeight: 'bold ' }}>{/*TITULO DEL INFORME QUE SE RECIBIRA*/}3</p>
                </div>
                <Space direction="vertical" style={{ width: '100%', marginTop: '14px' }}>
                    <p>Fecha</p>
                    <DatePicker onChange={onDateChange} />
                    <p>Título</p>
                    <Switch
                        checked={input}
                        checkedChildren="Small"
                        unCheckedChildren="Large"
                        onChange={() => {
                            setInput(!input);
                        }}
                    />
                    {input ? <Input {...sharedProps} /> : <Input.TextArea rows={3} {...sharedProps} />}
                    <p>Porcentaje de Avance: </p>
                    <InputNumber<number>
                        defaultValue={100}
                        min={0}
                        max={100}
                        formatter={(value) => `${value}%`}
                        parser={(value) => value?.replace('%', '') as unknown as number}
                        onChange={onNumberChange}
                    />
                    <b>ACTIVIDADES</b>
                    <ActivityTable id={2} />
                </Space>
            </Modal>
        </>
    );
};

export default EditarInforme;
