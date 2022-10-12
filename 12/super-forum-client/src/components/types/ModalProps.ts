import React from "react";

export interface ModalProps {
    isOpen: boolean;
    onClickToggle: (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
}