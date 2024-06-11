import React, { useState, useEffect } from "react";
import { Modal, DatePicker, Input, message } from "antd";
import moment from "moment";
import { ActivityType } from "./activityType";  // Asegúrate de importar la interfaz
import { saveActivities, updateActivities } from "./activity.hooks";

interface MyModalProps {
  visible: boolean;
  onSaveActivity: (newActivity: ActivityType) => void;
  selectedActivity: ActivityType | null;
  onClose: () => void;
  idReport: number;
}

const MyModal: React.FC<MyModalProps> = ({ idReport, visible, onSaveActivity, selectedActivity, onClose }) => {
  const [dateValue, setDateValue] = useState<string | null>(moment().format("YYYY-MM-DD"));
  const [activityValue, setActivityValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (selectedActivity) {
      setDateValue(selectedActivity.dateActivity || moment().format("YYYY-MM-DD"));
      setActivityValue(selectedActivity.description || "");
    } else {
      setDateValue(moment().format("YYYY-MM-DD"));
      setActivityValue("");
    }
  }, [selectedActivity]);

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
        onSaveActivity(newActivity);  // Llamada para actualizar la tabla después de editar
      } else {
        const savedActivity = await saveActivities(newActivity);
        onSaveActivity(savedActivity);  // Llamada para actualizar la tabla después de guardar
      }
      onClose();
    } catch (error) {
      message.error("Error al guardar la actividad");
    }
  };

  return (
    <>
      <Modal
        title="Actividad"
        open={visible}
        onOk={handleOk}
        onCancel={onClose}
        className="flex justify-center items-center"
      >
        <div className="w-full max-w-md bg-white p-8 rounded-lg">
          <div className="mb-4">
            <label className="block mb-2">Fecha Actividad:</label>
            <DatePicker
              className="w-full mb-4"
              format="YYYY-MM-DD"
              placeholder="Seleccione una fecha"
              onChange={(date, dateString) => setDateValue(dateString)}
              value={dateValue ? moment(dateValue, "YYYY-MM-DD") : null}
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
