import { useState } from 'react';
import {
  Form,
  Input,
  Checkbox,
  PhoneInput,
  SubmitBtn,
  validators,
} from 'ui/components/form';
import requests from 'config/requests.instance';

export default function ContactForm({
  buttonChildren = 'Envoyer',
  classNames = {
    container: '',
    button: '',
  },
}) {
  const [submited, setSubmited] = useState(false);

  return submited ? (
    <div
      className={`text-center text-first min-[470px]:text-[1.3rem] min-[1100px]:mb-[50px] min-[1100px]:text-[1.5rem] ${classNames.container}`}>
      <p>Votre message à bien été envoyé!</p>
    </div>
  ) : (
    <Form
      onSubmit={async ({ values }) => {
        const phoneSplit = values.phone.split(' ');
        if (phoneSplit[0] !== '+33') phoneSplit.unshift('+33');
        if (phoneSplit[1].length === 2) {
          let firstNumber = phoneSplit[1].split('');
          if (firstNumber[0] === '0') {
            firstNumber = firstNumber[1];
            phoneSplit[1] = firstNumber;
          }
        }
        values.phone = phoneSplit.join(' ');
        const { consent, ...formatedValues } = values;
        try {
          const response = await requests.post('/contact/message', formatedValues);
          const res = await response.json();

          if (res?.result) {
            setSubmited(true);
            return;
          }

          throw new Error(res?.message);
        } catch (err) {
          console.log(err);
          setSubmited(false);
        }
      }}
      defaultValues={{
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        message: '',
      }}
      className={`mt-0 flex w-full max-w-[600px] flex-col items-center gap-[20px] min-[560px]:gap-[20px] min-[630px]:mt-[30px] min-[730px]:mt-0 ${classNames.container}`}>
      <div
        wrapper
        className='flex w-full flex-col gap-[20px] min-[560px]:flex-row min-[560px]:gap-[10px]'>
        <Input
          controlled
          name='firstname'
          type='text'
          label='Prenom *'
          rules={validators.name}
          classNames={{
            input: 'h-[50px]',
          }}
        />
        <Input
          controlled
          name='lastname'
          type='text'
          label='Nom *'
          rules={validators.name}
          classNames={{
            input: 'h-[50px]',
          }}
        />
      </div>
      <div
        wrapper
        className='flex w-full flex-col gap-[20px] min-[560px]:flex-row min-[560px]:gap-[10px]'>
        <Input
          controlled
          name='email'
          type='email'
          label='Email *'
          rules={validators.email}
          classNames={{
            input: 'h-[50px]',
          }}
        />
        <PhoneInput
          controlled
          name='phone'
          type='tel'
          label='Téléphone *'
          disableDropdown
          defaultCountry='FR'
          langOfCountryName='fr'
          rules={validators.phone}
          forceCallingCode
          flagSize='small'
          classNames={{
            input: 'h-[50px]',
          }}
        />
      </div>
      <Input
        controlled
        name='message'
        type='text'
        label='Message ?'
        multiline
        minRows={4}
        rules={validators.message}
        classNames={{
          input: 'min-h-[50px]',
        }}
      />
      <Checkbox
        controlled
        name='consent'
        type='checkbox'
        label="En cochant cette case, j'affirme avoir pris connaissance de la politique de confidentialaté de Yasha."
        rules={validators.consent}
        classNames={{
          container: 'pb-[30px]',
          label: 'w-full max-w-[400px]',
        }}
      />
      <SubmitBtn
        classNames={{
          button: `mx-auto h-[50px] w-full max-w-[170px] min-[600px]:max-w-[150px] mt-[50px] text-[0.85rem] font-medium rounded-full text-first ${classNames.button}`,
        }}
        withGradient>
        {buttonChildren}
      </SubmitBtn>
    </Form>
  );
}
