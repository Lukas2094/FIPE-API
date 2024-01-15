
import * as Yup from 'yup';

export const CarFormValidation = Yup.object({
  brand: Yup.string().required('Campo obrigatório'),
  model: Yup.string().required('Campo obrigatório'),
  year: Yup.string().required('Campo obrigatório'),
});
