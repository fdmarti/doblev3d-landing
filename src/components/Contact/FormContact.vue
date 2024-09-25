<template>
  <form
    class="w-full flex flex-col gap-4 relative"
    @submit.prevent="handleFormContactSubmit"
    id="formContact"
  >
    <section class="flex gap-3 sm:flex-row flex-col">
      <input
        type="text"
        class="p-2 bg-slate-200 outline-none focus:bg-slate-300 rounded w-full"
        autocomplete="given-name"
        placeholder="Nombre completo"
        v-model="formContact.user_name"
        id="user_name"
        name="user_name"
        :disabled="isSending"
      />
      <input
        type="email"
        class="p-2 bg-slate-200 outline-none focus:bg-slate-300 rounded w-full"
        autocomplete="email"
        placeholder="Correo electrónico"
        v-model="formContact.user_email"
        id="user_email"
        name="user_email"
        :disabled="isSending"
      />
    </section>
    <section>
      <textarea
        class="p-2 bg-slate-200 outline-none focus:bg-slate-300 rounded w-full"
        placeholder="Tu mensaje aqui..."
        rows="10"
        v-model="formContact.message"
        id="message"
        name="message"
        :disabled="isSending"
      ></textarea>
    </section>
    <section class="flex justify-between items-center">
      <button
        type="submit"
        :disabled="isSending"
        class="bg-slate-600 text-slate-100 px-4 py-3 rounded hover:opacity-80 shadow"
      >
        <span v-if="isSending" class="flex items-center"><Spinner /> Enviando...</span>
        <span v-else>Enviar mensaje</span>
      </button>
    </section>
  </form>
</template>
<script lang="ts" setup>
import { useSendMail } from 'src/composables/useSendEmail';
import { Spinner } from '@components/Loading';

const { formContact, isSending, handleFormContactSubmit } = useSendMail('formContact');
</script>
