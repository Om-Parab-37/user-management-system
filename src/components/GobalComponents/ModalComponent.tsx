import React from "react";
import { Modal } from "antd";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalComponent = ({ title, isOpen, onClose, children }: ModalProps) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      className="!rounded-2xl"
    >
      <div className="p-4">{children}</div>
    </Modal>
  );
};

export default ModalComponent;
