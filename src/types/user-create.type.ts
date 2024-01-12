import { IUserDocument } from 'src/models/user.model';
export type TCreateUser = {
  onChangeFormData: (Event: any) => void;
  handleDateChange: (Event: any) => void;
  formData: IUserDocument;
  errors:{};
  editUser:boolean
  onsubmit: () => Promise<void>;
};
