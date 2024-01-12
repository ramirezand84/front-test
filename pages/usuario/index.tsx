import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import 'react-datepicker/dist/react-datepicker.css';
import useUser from '../../src/hooks/useUser'
import Footer from '../../src/components/footer'
import UserForm from '../../src/components/userForm';
import Link from 'next/link';

const UserPage: NextPage = () => {

  const { onChangeFormData,handleDateChange, handleSendUser,formData,errors } =
  useUser();
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Usuario
        </h1>
        <Link className={styles.return} href="/">{'>>'}Volver</Link>
        <UserForm editUser={false} onsubmit={handleSendUser} handleDateChange={handleDateChange} onChangeFormData={onChangeFormData} errors={errors} formData={formData}/>
      </main>
      <Footer />
    </div>
  )
}

export default UserPage
