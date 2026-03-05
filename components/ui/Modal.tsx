interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-[400px]">
                {children}

                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-gray-200 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    )
}