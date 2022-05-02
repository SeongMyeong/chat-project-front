import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from 'store/auth';
import { faker } from '@faker-js/faker';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
const Main = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const router = useRouter();

  const dispatch = useDispatch();
  const [id, setId] = useState(faker.datatype.uuid());
  const [name, setName] = useState(faker.name.firstName());
  const onSubmit = (data) => {
    console.log(data);
    dispatch(authActions.setMyInfo({ id: data.id, name: data.name }));
    router.push('/chat/room');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...(register('id'), { required: true })} value={id} />
        <input {...register('nick_name', { required: true })} value={name} />
        {errors.lastName && <p>nick_name is required.</p>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default Main;
