"use client";

import { Button, Modal as FlowbiteModal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function Modal({ children, openModal, setOpenModal }: { children: React.ReactNode, openModal: boolean, setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <>
            <FlowbiteModal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <FlowbiteModal.Header />
                <FlowbiteModal.Body>
                    <div className="text-center">
                        {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
                        {children}
                    </div>
                </FlowbiteModal.Body>
            </FlowbiteModal>
        </>
    );
}
