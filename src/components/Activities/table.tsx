import React, { useEffect, useState } from "react";
import { Table, Button, message, Modal } from "antd";
import { EditFilled, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import MyModal from "./modalActivity";
import { ActivityType } from "./activityType";
import { deleteActivities, request, saveActivities, updateActivities } from "./activity.hooks";

interface ActivityTableProps {
  id: number; 
  defaultDate: string; 
}

const ActivityTable: React.FC<ActivityTableProps> = ({ id, defaultDate }) => {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);

  const [deleteTarget, setDeleteTarget] = useState<ActivityType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await request(id);
      setActivities(data);
    };

    fetchData();
  }, [id]);

  const handleSaveActivity = async (newActivity: ActivityType) => {
    try {
      if (selectedActivity) {
        await updateActivities(newActivity);
        setActivities(activities.map(activity => activity.idActivity === selectedActivity.idActivity ? newActivity : activity));
        message.success("Actividad actualizada con éxito");
      } else {
        const savedActivity = await saveActivities(newActivity);
        setActivities([...activities, savedActivity]);
        message.success("Actividad guardada con éxito");
      }
      setSelectedActivity(null);
      setIsModalVisible(false);
    } catch (error) {
      message.error("Error al guardar la actividad");
    }
  };

  const handleEditClick = (record: ActivityType) => {
    setSelectedActivity(record);
    setIsModalVisible(true);
  };

  const handleAddClick = () => {
    setSelectedActivity(null);
    setIsModalVisible(true);
  };

  const handleDeleteClick = async (record: ActivityType) => {
    setDeleteTarget(record);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteActivities(deleteTarget.idActivity);
      setActivities(activities.filter(activity => activity.idActivity !== deleteTarget.idActivity));
      message.success("Actividad eliminada con éxito");
    } catch (error) {
      message.error("Error al eliminar la actividad");
    }

    setIsDeleteModalVisible(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  const columns = [
    {
      title: "Fecha",
      dataIndex: "dateActivity",
      key: "dateActivity",
    },
    {
      title: "Actividad",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (record: ActivityType) => (
        <div>
          <Button icon={<EditFilled />} onClick={() => handleEditClick(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteClick(record)} />
        </div>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button icon={<PlusCircleOutlined />} onClick={handleAddClick} style={{ marginRight: 8 }}>Agregar Actividad</Button>
      </div>
      <MyModal
        idReport={id}
        visible={isModalVisible}
        onSaveActivity={handleSaveActivity}
        selectedActivity={selectedActivity}
        defaultDate={defaultDate}
        onClose={() => setIsModalVisible(false)}
      />
      <Modal
        title="Confirmar eliminación"
        visible={isDeleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      >
        <p>¿Estás seguro de que deseas eliminar esta actividad?</p>
      </Modal>
      <Table columns={columns} dataSource={activities}  
        pagination={{
          pageSize: 3,
          hideOnSinglePage: true,
        }}
        rowKey="idActivity" />
    </>
  );
};

export default ActivityTable;
