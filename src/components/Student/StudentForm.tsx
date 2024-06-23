import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { Input, Button, Select, Form, DatePicker } from 'antd';
import dayjs from 'dayjs';

interface StudentFormProps {
  onSubmit: (data: any) => Promise<boolean>;
  TeacherID: number;
}

interface FormData {
  cedula: string;
  firstname: string;
  lastname: string;
  idCareer: string;
  issue: string;
  approvalDate: string;
}

const { TextArea } = Input;
const { Option } = Select;

const StudentForm: React.FC<StudentFormProps> = ({ TeacherID, onSubmit }) => {
  const { control, formState: { errors }, handleSubmit,  reset } = useForm<FormData>();

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    const formattedData = {
      student: {
        cedula: data.cedula,
        firstname: data.firstname,
        lastname: data.lastname,
        career: parseInt(data.idCareer), // Convertir a número entero
        teacher: TeacherID // Asignar un valor predeterminado para idTeacher
      },
      thesis: {
        issue: data.issue,
        approvalDate: data.approvalDate
      }
    };
    console.log(formattedData)
    const isSuccess = await onSubmit(formattedData);
    if (isSuccess) {
      reset(); // Reset form if the request was successful
    }
  };

  const handleNumericInput = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    return numericValue.slice(0, 10); // Limita a 10 dígitos
  };
  const disabledDate = (current:  dayjs.Dayjs) => {
    return current && current >= dayjs().endOf('day');
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <ToastContainer />
      <Form 
        layout="vertical" 
        onFinish={handleSubmit(handleFormSubmit)}
        style={{ fontSize: '16px' }} // Aumenta el tamaño de letra general
      >
        <Form.Item 
          label={<span style={{ display: 'block', textAlign: 'center' }}>Cédula</span>} 
          required
          validateStatus={errors.cedula ? 'error' : ''}
          help={errors.cedula?.message}
        >
          <Controller
            name="cedula"
            control={control}
            rules={{ 
              required: "Cédula es requerida", 
              pattern: {
                value: /^\d{10}$/,
                message: "Cédula debe tener 10 dígitos numéricos"
              }
            }}
            render={({ field }) => (
              <Input
                {...field}
                onChange={(e) => field.onChange(handleNumericInput(e.target.value))}
                placeholder="Ingrese la cédula"
              />
            )}
          />
        </Form.Item>
        <Form.Item 
          label={<span style={{ display: 'block', textAlign: 'center' }}>Nombre</span>} 
          required
          validateStatus={errors.firstname ? 'error' : ''}
          help={errors.firstname ? 'Nombre es requerido' : ''}
        >
          <Controller
            name="firstname"
            control={control}
            rules={{ required: 'Nombre es requerido' }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Ingrese el nombre"
              />
            )}
          />
        </Form.Item>
        <Form.Item 
          label={<span style={{ display: 'block', textAlign: 'center' }}>Apellido</span>} 
          required
          validateStatus={errors.lastname ? 'error' : ''}
          help={errors.lastname ? 'Apellido es requerido' : ''}
        >
          <Controller
            name="lastname"
            control={control}
            rules={{ required: 'Apellido es requerido' }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Ingrese el apellido"
              />
            )}
          />
        </Form.Item>
        <Form.Item 
          label={<span style={{ display: 'block', textAlign: 'center' }}>Carrera</span>}
          required
          validateStatus={errors.idCareer ? 'error' : ''}
          help={errors.idCareer ? 'Carrera es requerida' : ''}
        >
          <Controller
          defaultValue='1'
            name="idCareer"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="Seleccione la carrera" >
                <Option value="1">Software</Option>
                <Option value="2">Industrial</Option>
                <Option value="3">Telecomunicaciones</Option>
                <Option value="4">Tecnologías de la Comunicación</Option>
                <Option value="5">Automatización y Robótica</Option>
              </Select>
            )}
          />
        </Form.Item>
        <Form.Item 
          label={<span style={{ display: 'block', textAlign: 'center' }}>Tema</span>} 
          required
          validateStatus={errors.issue ? 'error' : ''}
          help={errors.issue ? 'Tema es requerido' : ''}
        >
          <Controller
            name="issue"
            control={control}
            rules={{ required: 'Tema es requerido' }}
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="Ingrese el tema"
                rows={2}
              />
            )}
          />
        </Form.Item>
        <Form.Item 
          label={<span style={{ display: 'block', textAlign: 'center' }}>Fecha Aprobado</span>}
          required
          validateStatus={errors.approvalDate ? 'error' : ''}
          help={errors.approvalDate ? 'Fecha es requerida' : ''}
        >
          <Controller
            name="approvalDate"
            control={control}
            render={({ field }) => (
              <DatePicker 
                {...field} 
                style={{ width: '100%' }}
                placeholder="Seleccione la fecha"
                disabledDate={disabledDate}
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Asignar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default StudentForm;
