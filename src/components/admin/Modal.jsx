export function Modal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-sky-950 bg-opacity-90 flex justify-center items-center">
      <div className="bg-sky-100 rounded shadow-lg p-11">
        <h2 className="text-xl font-light mb-4">{message}</h2>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-800 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
