import type { NextPage } from 'next'
import styles from '../../../styles/Home.module.css'
import { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { IUserDocument } from '../../../src/models/user.model'
import useUser from '../../../src/hooks/useUser'
import Footer from '../../../src/components/footer'
import Header from '../../../src/components/header'
import Link from 'next/link';

const ViewUser: NextPage = () => {

  const { deleteUser, getUsers, users, callEditUser } =
  useUser();
  
  useEffect(() => {
    const fetchData = async () => {
      getUsers();
    };

    fetchData();
    
  }, []);
  
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Consulta Usuarios
        </h1>
        <div className={styles.container_user}>
          <div className={styles.container_link}>
            <Link className={styles.return} href="/">
              {'>>'}Volver
            </Link>
            <Link className={styles.return} href="/usuario">
              {'>>'}Crear Usuario
            </Link>
          </div>
          <div>
            {users.map((user, index) => (
              <div key={index} className={styles.user_item}>
                <div className={styles.user_name}>{user.name}</div>
                <div className={styles.user_birthday}>{user.birthday ? user.birthday.toString() : ''}</div>
                <div className={styles.user_gender}>{user.gender}</div>
                <div className={styles.user_actions}>
                  <button className={styles.delete_button} onClick={() => deleteUser(index)}>
                    Borrar
                  </button>
                  <button className={styles.edit_button} onClick={() => callEditUser(user)}>
                    Actualizar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ViewUser
