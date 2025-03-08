import ModalComponent from "../GobalComponents/ModalComponent";
import NewUserForm from "./NewUserForm";

type CreateNewUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateUserModal = ({ isOpen, onClose }: CreateNewUserModalProps) => {
  const handleUserAdded = () => {
    onClose();
  };
  return (
    <ModalComponent title="Create New User" isOpen={isOpen} onClose={onClose}>
      <NewUserForm onUserAdded={handleUserAdded} />
    </ModalComponent>
  );
};

export default CreateUserModal;
