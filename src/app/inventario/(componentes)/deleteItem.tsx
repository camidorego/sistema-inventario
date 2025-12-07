import React from 'react'

type DeleteDialogProps = {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => Promise<void> | void;
  itemId: number;
};

export default function deleteItem({ message, isOpen, onClose, onDelete, itemId }: DeleteDialogProps){
    const dialogRef = React.useRef<HTMLDivElement>(null);
    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            aria-modal="true"
            role="dialog"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#10002b]/70"
                onClick={onClose}
                aria-hidden="true"
            />
            {/* Dialog */}
            <div
                ref={dialogRef}
                className="relative z-10 w-60 max-w-md rounded-xl bg-white p-5 shadow-xl"
            >
                <header className="mb-4">
                <h2 className="text-lg font-medium text-gray-900">{message}</h2>
                </header>
                <div className="flex gap-2">
                    <button
                        onClick={onClose}
                        className="rounded-md bg-[#8b8c89] px-4 py-2 text-sm font-medium text-white hover:bg-[#787977]"
                    >Cancelar</button>
                    <button
                        onClick={async () => {
                            await onDelete(itemId);
                            onClose();
                        }}
                        className="rounded-md border px-4 py-2 text-sm bg-red-600 text-white hover:bg-red-800"
                    >
                        Eliminar
                    </button>
                </div>  
            </div>
        </div>
    )
}
