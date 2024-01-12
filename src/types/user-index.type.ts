import { ChangeEvent } from 'react';
import { IUserDocument } from 'src/models/user.model';
export type TIndexUser = {
  onChangeFormData: (Event: any) => void;
  deleteUser: (user: IUserDocument) => void;
  users: IUserDocument[];
  onsubmit: () => Promise<void>;
};
