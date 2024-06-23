import React, { useState, useEffect } from "react";
import { Modal, DatePicker, Input, message } from "antd";
import dayjs from "dayjs";
import { ActivityType } from "./activityType";
import { saveActivities, updateActivities } from "./activity.hooks";

interface MyModalProps {
  visible: boolean;
  onSaveActivity: (newActivity: ActivityType) => void;
  selectedActivity: ActivityType | null;
  onClose: () => void;
  idReport: number;
  defaultDate: string; // La fecha que se pasa como prop
}

const MyModal: React.FC<MyModalProps> = ({ idReport, visible, onSaveActivity, selectedActivity, onClose, defaultDate }) => {
  const [dateValue, setDateValue] = useState<string | null>(defaultDate);
  const [activityValue, setActivityValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (selectedActivity) {
      setDateValue(selectedActivity.dateActivity || defaultDate);
      setActivityValue(selectedActivity.description || "");
    } else {
      setDateValue(defaultDate);
      setActivityValue("");
    }
  }, [selectedActivity, defaultDate]);

  const handleOk = async () => {
    if (!activityValue.trim()) {
      setError(true);
      message.error("El campo de actividad es requerido.");
      return;
    }

    const newActivity: ActivityType = {
      idActivity: selectedActivity?.idActivity,
      dateActivity: dateValue,
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

  const disabledDate = (current: dayjs.Dayjs) => {
    const defaultDayjs = dayjs(defaultDate);
    return (
      current && (current.month() !== defaultDayjs.month() || current.year() !== defaultDayjs.year())
    );
  };

  return (
    <>
      <Modal
        title="Actividad"
        open={visible}
        onOk={handleOk}
        onCancel={onClose}
        className="flex justify-center items-center"
        width={800} // Aumenta el ancho del modal (en píxeles)
        bodyStyle={{
          height: '650px', // Aumenta la altura del contenido del modal
          overflowY: 'auto' // Añade scroll vertical si el contenido es muy largo
        }}
      >
        <div className="w-full max-w-md bg-white p-8 rounded-lg">
          <div className="mb-4">
            <label className="block mb-2">Fecha Actividad:</label>
            <DatePicker
              className="w-full mb-4"
              format="YYYY-MM-DD"
              placeholder="Seleccione una fecha"
              value={dateValue ? dayjs(dateValue, "YYYY-MM-DD") : null}
              disabledDate={disabledDate}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Actividad:</label>
            <Input
              className="w-full"
              placeholder="Escribe la actividad"
              onChange={(e) => {
                setActivityValue(e.target.value);
                if (e.target.value.trim()) {
                  setError(false);
                }
              }}
              value={activityValue}
              required
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MyModal;
