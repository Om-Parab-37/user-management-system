import { IUser } from "../../lib/types/userTypes";
import ModalComponent from "../GobalComponents/ModalComponent";
import EditUserForm from "./EditUserForm";

type EditUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
};

const EditUserModal = ({ isOpen, onClose, user }: EditUserModalProps) => {
  const handleUserEdited = () => {
    onClose();
  };
  return (
    <ModalComponent title="Create New User" isOpen={isOpen} onClose={onClose}>
      <EditUserForm user={user} onUserEdited={handleUserEdited} />
    </ModalComponent>
  );
};

export default EditUserModal;
