export const Toast = () => {
  const toastBlock = document.getElementById('toast');
  const messageToastBlock = document.getElementById('toast-message');

  const error = (message: string) => {
    toastBlock?.classList.add('bg-red-500');
    showBlockMessage();
    messageToastBlock!.textContent = message;

    clearMessage();
  };

  const success = (message: string) => {
    toastBlock?.classList.add('bg-green-500');
    showBlockMessage();
    messageToastBlock!.textContent = message;

    clearMessage();
  };

  const showBlockMessage = () => {
    toastBlock?.classList.remove('hidden');
  };

  const clearMessage = () => {
    toastBlock?.classList.remove('hidden');

    setTimeout(() => {
      toastBlock?.classList.remove('bg-red-500', 'bg-green-500');
      toastBlock?.classList.add('hidden');
      messageToastBlock!.textContent = '';
    }, 2000);
  };

  return {
    error,
    success,
  };
};
