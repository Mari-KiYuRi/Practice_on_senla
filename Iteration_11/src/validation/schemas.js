import * as yup from 'yup';

const childSchema = yup.object().shape({
  name: yup.string()
    .required('Имя ребенка обязательно')
    .min(2, 'Минимум 2 символа'),
  age: yup.number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .typeError('Возраст должен быть числом')
    .required('Возраст ребенка обязателен')
    .positive('Возраст должен быть положительным')
    .integer('Возраст должен быть целым числом'),
});

const userSchema = yup.object().shape({
  name: yup.string()
    .required('Имя обязательно')
    .min(2, 'Минимум 2 символа'),
  age: yup.number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .typeError('Возраст должен быть числом')
    .required('Возраст обязателен')
    .positive('Возраст должен быть положительным')
    .integer('Возраст должен быть целым числом'),
  email: yup.string()
    .required('Email обязателен')
    .email('Некорректный email'),
  phone: yup.string()
    .required('Телефон обязателен'),
  children: yup.array().of(childSchema),
});

export const usersSchema = yup.object().shape({
  users: yup.array()
    .of(userSchema)
    .min(1, 'Добавьте хотя бы одного пользователя'),
});