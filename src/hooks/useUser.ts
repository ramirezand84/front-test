import { config } from 'core/config';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { IUserDocument } from 'src/models/user.model';
const useUser = () => {
  const router = useRouter();
  const [users, setUsers] = useState<IUserDocument[]>([]);
  const [formData, setFormData] = useState<IUserDocument>({
    name: '',
    birthday: new Date(),
    gender: '',
  });
  const [editUser, setEditUser] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSendUser = async () => {
    const newErrors = {};

    if (formData.name === '' || !formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    if (formData.name === undefined ||  !formData.birthday) {
      newErrors.birthday = 'La fecha de nacimiento es obligatoria';
    }
    if (!formData.gender || formData.gender === '') {
      newErrors.gender = 'El género es obligatorio';
    }
    // Verificar si hay errores
    if (Object.keys(newErrors).length === 0) {
      try {
        const monthNumber = formData && formData.birthday ? formData.birthday?.getMonth() + 1:'01';
        const formattedMonth = monthNumber?.toString().slice(-2) || '01';
        const formatBirthday = `${formData.birthday?.getFullYear()}/${formattedMonth}/${formData.birthday?.getDate()}`
        const dataForm = { ...formData, ['birthday']: formatBirthday};
        const url = editUser?`${config.API_URL}api/updateUser`:`${config.API_URL}api/createUser`;
        const response = await fetch(url, {
          method: editUser?'PUT':'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataForm),
        });
    
        if (response.ok) {
          router.push('/usuario/consulta');
        } else {
          // La solicitud falló, manejar el error
          newErrors.error = 'Error al enviar el formulario:', response.statusText;
          setErrors(newErrors);
        }
      } catch (error:any) {
        console.error('Error al enviar el formulario:', error.message);
      }
    } else {
      // Hay errores, actualiza el estado de los errores
      setErrors(newErrors);
    }
  };

  const onChangeFormData = ({ target }: any) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleDateChange = (date:any) => {
    setFormData({ ...formData, ['birthday']: date });
  };

  const deleteUser = async (indexUser:number) => {
    // Muestra una confirmación antes de borrar
    const shouldDelete = window.confirm('¿Estás seguro de que deseas borrar?');
    if (shouldDelete) {
      try {
        // Realizar la solicitud POST a la API
        const url = `${config.API_URL}api/deleteUser`;
        formData.birthday = formData.birthday
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"id": users[indexUser].id}),
        });

        if (response.ok) {
          // Borra el usuario directamente desde el array users
          setUsers((prevUsers) => {
            const newUsers = [...prevUsers];
            newUsers.splice(indexUser, 1);
            return newUsers;
          });
          
        } else {
          console.log("Ocurrio un error al borrar el usuario")
        }
      } catch (error:any) {
        console.error('Error al enviar el formulario:', error.message);
      }
      
    }
  };
  
  const callEditUser = (user: IUserDocument) => {
    router.push({
      pathname: '/usuario/edit',
      query: { userId: user.id },
    });
  };

  const handleUpdateUser = () => handleSendUser();

  const getUsers = async () => {
    try {
      const url = `${config.API_URL}api/viewAllUsers`;
      const response = await fetch(url); // Ajusta la URL según tu configuración
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  
  return {
    formData,
    onChangeFormData,
    handleDateChange,
    errors,
    deleteUser,
    callEditUser,
    setEditUser,
    editUser,
    handleSendUser,
    handleUpdateUser,
    setFormData,
    getUsers,
    users,
  };
};

export default useUser;
