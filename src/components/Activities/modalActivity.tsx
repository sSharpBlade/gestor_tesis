import React, { useState, useEffect } from "react";
import { Modal, DatePicker, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { ActivityType } from "./activityType";
import { saveActivities, updateActivities } from "./activity.hooks";
import TextArea from "antd/es/input/TextArea";

interface MyModalProps {
  visible: boolean;
  onSaveActivity: (newActivity: ActivityType) => void;
  selectedActivity: ActivityType | null;
  onClose: () => void;
  idReport: number;
  defaultDate: string; // La fecha que se pasa como prop
}

const MyModal: React.FC<MyModalProps> = ({ idReport, visible, onSaveActivity, selectedActivity, onClose, defaultDate }) => {
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [activityValue, setActivityValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);

  useEffect(() => {
    if (selectedActivity) {
      setDateValue(selectedActivity.dateActivity ? dayjs(selectedActivity.dateActivity) : null);
      setActivityValue(selectedActivity.description || "");
    } else {
      setDateValue(null); // No establecer un valor por defecto si no hay actividad seleccionada
      setActivityValue("");
    }
  }, [selectedActivity]);

  const handleOk = async () => {
    if (!activityValue.trim()) {
      setError(true);
      message.error("El campo de actividad es requerido.");
      return;
    }
    if (!dateValue) { // Verificar si se ha seleccionado una fecha
      setDateError(true);
      message.error("Fecha requerida");
      return;
    }

    const newActivity: ActivityType = {
      idActivity: selectedActivity?.idActivity,
      dateActivity: dateValue?.format("YYYY-MM-DD") || "",
      description: activityValue,
      idReport: idReport,
    };

    try {
      if (selectedActivity?.idActivity) {
        await updateActivities(newActivity);
        onSaveActivity(newActivity); // Llamada para actualizar la tabla después de editar
      } else {
        const savedActivity = await saveActivities(newActivity);
        onSaveActivity(savedActivity); // Llamada para actualizar la tabla después de guardar
      }
      onClose();
    } catch (error) {
      message.error("Error al guardar la actividad");
    }
  };

  const disabledDate = (current: Dayjs) => {
    const defaultDayjs = dayjs(defaultDate);
    return current && (current.month() !== defaultDayjs.month() || current.year() !== defaultDayjs.year());
  };

  return (
    <Modal
      title={<span className="text-xl font-semibold">Actividad</span>}
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      width={600}
      className="custom-modal"
      okText="Guardar"
      cancelText="Cancelar"
      styles={{
        body: {
          padding: '24px',
          maxHeight: '70vh',
          overflowY: 'auto'
        },
        footer: {
          borderTop: '1px solid #f0f0f0',
          padding: '10px 24px'
        }
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" >Fecha Actividad:</label>
          <DatePicker
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            format="YYYY-MM-DD"
            placeholder="Seleccione una fecha"
            onChange={(date) => {
              setDateValue(date);
              setDateError(false); // Restablecer el estado de error de la fecha al seleccionar una fecha
            }}
            value={dateValue}
            disabledDate={disabledDate}
            />
            {dateError && <span className="text-red-500">Debe seleccionar una fecha.</span>} {/* Mostrar el mensaje de error si no se ha seleccionado una fecha */}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Actividad:</label>
          <TextArea
            className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Escribe la actividad"
            onChange={(e) => {
              setActivityValue(e.target.value);
              if (e.target.value.trim()) {
                setError(false);
              }
            }}
            value={activityValue}
            rows={4}
            required
          />
          {error && <p className="mt-2 text-sm text-red-600">El campo de actividad es requerido.</p>}
        </div>
      </div>
    </Modal>
  );
};

export default MyModal;
