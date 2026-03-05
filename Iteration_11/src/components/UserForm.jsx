import React from 'react';
import { useForm, useFieldArray, FormProvider, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usersSchema } from '../validation/schemas';
import './style.css';

const UserForm = () => {
  const methods = useForm({
    resolver: yupResolver(usersSchema),
    defaultValues: {
      users: [{ 
        name: '', 
        age: '', 
        email: '', 
        phone: '', 
        children: [{ name: '', age: '' }] 
      }]
    }
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
    alert('Форма отправлена');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Список пользователей</h2>
        <UsersList />
        <button type="submit">Отправить</button>
      </form>
    </FormProvider>
  );
};

const UsersList = () => {
  const { control, register, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'users'
  });

  return (
    <>
      {fields.map((user, userIndex) => (
        <div key={user.id} className='user-block'>
          <h3>Пользователь {userIndex + 1}</h3>
          
          <div>
            <label>Имя:</label>
            <input {...register(`users.${userIndex}.name`)} />
            {errors.users?.[userIndex]?.name && 
              <p className="error-message">{errors.users[userIndex].name.message}</p>}
          </div>

          <div>
            <label>Возраст:</label>
            <input type="number" {...register(`users.${userIndex}.age`)} />
            {errors.users?.[userIndex]?.age && 
              <p className="error-message">{errors.users[userIndex].age.message}</p>}
          </div>

          <div>
            <label>Email:</label>
            <input type="email" {...register(`users.${userIndex}.email`)} />
            {errors.users?.[userIndex]?.email && 
              <p className="error-message">{errors.users[userIndex].email.message}</p>}
          </div>

          <div>
            <label>Телефон:</label>
            <input {...register(`users.${userIndex}.phone`)} />
            {errors.users?.[userIndex]?.phone && 
              <p className="error-message">{errors.users[userIndex].phone.message}</p>}
          </div>

          <h4>Дети:</h4>
          <UserChildren userIndex={userIndex} />

          {fields.length > 1 && (
            <button type="button" onClick={() => remove(userIndex)}>
              Удалить пользователя
            </button>
          )}
        </div>
      ))}
      
      <button type="button" onClick={() => 
        append({ name: '', age: '', email: '', phone: '', children: [{ name: '', age: '' }] })
      }>
        Добавить пользователя
      </button>
    </>
  );
};

const UserChildren = ({ userIndex }) => {
  const { control, register, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `users.${userIndex}.children`
  });

  return (
    <div>
      {fields.map((child, childIndex) => (
        <div key={child.id} className='child-block'>
          <div>
            <label>Имя ребенка:</label>
            <input {...register(`users.${userIndex}.children.${childIndex}.name`)} />
            {errors.users?.[userIndex]?.children?.[childIndex]?.name && 
              <p className="error-message">
                {errors.users[userIndex].children[childIndex].name.message}
              </p>}
          </div>
          <div>
            <label>Возраст ребенка:</label>
            <input type="number" {...register(`users.${userIndex}.children.${childIndex}.age`)} />
            {errors.users?.[userIndex]?.children?.[childIndex]?.age && 
              <p className="error-message">
                {errors.users[userIndex].children[childIndex].age.message}
              </p>}
          </div>
          {fields.length > 1 && (
            <button type="button" onClick={() => remove(childIndex)}>
              Удалить ребенка
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={() => append({ name: '', age: '' })}>
        Добавить ребенка
      </button>
    </div>
  );
};

export default UserForm;