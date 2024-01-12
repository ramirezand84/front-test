import styles from '../../styles/Home.module.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TCreateUser } from '../../src/types/user-create.type';
const UserForm = ({
  editUser,
  onsubmit,
  onChangeFormData,
  handleDateChange,
  formData,
  errors,
}: TCreateUser) => {
  return (
    <div className={styles.cont_form}>
          <label className={styles.cont_field}>
          Nombre:
          <input className={styles.input} type="text" name="name" value={formData.name} onChange={onChangeFormData} />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
      </label>
      <label className={styles.cont_field}>
        Fecha de nacimiento:
        <DatePicker className={styles.input} name="birthday" selected={formData.birthday} yearDropdownItemNumber={15} onChange={handleDateChange} />
        {errors.birthday && <span className={styles.error}>{errors.birthday}</span>}
      </label>
      <label>
        Género:
        <select className={styles.input} name="gender" value={formData.gender} onChange={onChangeFormData}>
          <option value="">Selecciona una opción</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </select>
        {errors.gender && <span className={styles.error}>{errors.gender}</span>}
      </label>
      {errors.error && <span className={styles.error}>{errors.error}</span>}
      <button onClick={onsubmit}>{editUser ? 'Actualizar' : 'Agregar'}</button>
    </div>
  );
};

export default UserForm;
