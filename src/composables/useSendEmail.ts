import { reactive, ref } from 'vue';
import emailjs from '@emailjs/browser';
import { Toast } from 'src/utils/ToastificationAstro';

const mailInitialState = {
  user_name: '',
  user_email: '',
  message: '',
};

export const useSendMail = (formContactElementID: string) => {
  const formContact = reactive({
    ...mailInitialState,
  });

  const isSending = ref(false);

  const toast = Toast();

  const handleFormContactSubmit = async () => {
    const formContactElement = document.getElementById(formContactElementID) as HTMLFormElement;

    if (!formContact.user_name.trim()) {
      toast.error('Debe ingresar un nombre');
      return;
    }

    if (!formContact.user_email.trim()) {
      toast.error('Debe ingresar un email');
      return;
    }

    if (!formContact.message.trim()) {
      toast.error('Debe ingresar un mensaje');
      return;
    }

    isSending.value = true;

    const response = await emailjs.sendForm(
      'service_sa7sy4n',
      'template_landing_page_2d',
      formContactElement,
      'user_S6Gcqh3Q604CbKC1KtM0I',
    );

    if (response.text !== 'OK') {
      toast.error('Ocurrio un error al querer enviar el email.');
      isSending.value = false;
      return;
    }

    isSending.value = false;
    Object.assign(formContact, mailInitialState);
    toast.success('Su mensaje ha sido enviado. Agradecemos su paciencia mientras le respondemos');
    return;
  };

  return {
    formContact,
    isSending,

    handleFormContactSubmit,
  };
};
