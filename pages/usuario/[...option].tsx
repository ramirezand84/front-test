import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useUser from '../../src/hooks/useUser';
import styles from '../../styles/Home.module.css'
import { config } from '../../core/config';
import Link from 'next/link';
import UserForm from '../../src/components/userForm';
import Footer from '../../src/components/footer';
const CreateCompany = () => {
  const router = useRouter();
  const {
    handleSendUser,
    formData,
    setFormData,
    errors,
    onChangeFormData,
    handleDateChange,
    setEditUser,
    editUser,
  } = useUser();

  
  useEffect(() => {
    const { option } = router.query;
    
    if (Array.isArray(option) && option[0] === 'edit') {
      setEditUser(true)
      getUser();
    } else {
      router.push('/usuario/consulta');
    }
  }, [router.query]);

  const getUser = async () => {
    try {
      const url = `${config.API_URL}api/user/${router.query.userId}`;
      const response = await fetch(url); // Ajusta la URL según tu configuración
      const data = await response.json();
      if(data.user) {
        setFormData({ ...data.user, ['birthday']: new Date(data.user.birthday) });
      }

    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Usuario
        </h1>
        <Link className={styles.return} href="/usuario/consulta">{'>>'}Volver</Link>
        <UserForm editUser={editUser} onsubmit={handleSendUser} handleDateChange={handleDateChange} onChangeFormData={onChangeFormData} errors={errors} formData={formData}/>
      </main>
      <Footer />
    </div>
  );
};

export default CreateCompany;
