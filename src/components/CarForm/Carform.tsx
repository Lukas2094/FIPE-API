import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios, { AxiosResponse } from 'axios';
import { fetchCarData } from '../../../redux/actions/carActions';
import { CarFormValidation } from './car';
import { RootState } from '../../../redux/store/configureStore';
import * as S from './styles';
import { CarResult } from '../CarResult';
import { CarData } from '@/interfaces/CarData';
import { Brand } from '@/interfaces/Brands';

const CarForm: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const carDatas = useSelector((state: RootState) => state.car.data);

  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Brand[]>([]);
  const [years, setYears] = useState<Brand[]>([]);
  const [carData, setCarData] = useState<CarData | null>(null);
  const [showCarData, setShowCarData] = useState<boolean>(false);
  const [allFieldsSelected, setAllFieldsSelected] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      brand: { name: '', code: '' },
      model: '',
      year: '',
    },
    validationSchema: CarFormValidation,
    onSubmit: async (values) => {
      try {
        const { brand, model, year } = values;
  
        if (!brand || !brand.code || !model || !year) {
          console.error('Invalid form data');
          return;
        }
  
        const brandId = brand.code;
  
        const modelResponse = await axios.get(`https://parallelum.com.br/fipe/api/v2/cars/brands/${brandId}/models`);
        const selectedModelObject = modelResponse.data.find((m: any) => m.name === model);
  
        if (selectedModelObject) {
          const modelCode = selectedModelObject.code;
  
          const yearsResponse = await axios.get(`https://parallelum.com.br/fipe/api/v2/cars/brands/${brandId}/models/${modelCode}/years`);
          const selectedYearObject = yearsResponse.data.find((y: any) => y.name === year);
  
          if (selectedYearObject) {
            const yearCode = selectedYearObject.code;
            const apiUrl = `https://parallelum.com.br/fipe/api/v2/cars/brands/${brandId}/models/${modelCode}/years/${yearCode}`;
            dispatch(fetchCarData(apiUrl));

          } else {
            dispatch(fetchCarData(carDatas));
          }
        } else {
          console.error('Selected model not found');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });
   
  useEffect(() => {
    axios.get<Brand[]>('https://parallelum.com.br/fipe/api/v2/cars/brands')
      .then((response: AxiosResponse<Brand[]>) => {
        setBrands(response.data);
      })
      .catch((error) => console.error('Error fetching brands:', error));
  }, []);


  useEffect(() => {
    setAllFieldsSelected(!!formik.values.brand && !!formik.values.model && !!formik.values.year);
  }, [formik.values.brand, formik.values.model, formik.values.year]);

  const handleBrandChange = async (selectedBrand: Brand | null) => {
    formik.setFieldValue('brand', selectedBrand);
    setModels([]);
    setYears([]);
    setShowCarData(false);
    try {
        if (selectedBrand) {
          const response = await axios.get(`https://parallelum.com.br/fipe/api/v2/cars/brands/${selectedBrand.code}/models`);
          const modelsData: Brand[] = response.data;  // Ajuste aqui para refletir a estrutura real da resposta
  
          if (modelsData && Array.isArray(modelsData)) {
            setModels(modelsData);
          } else {
            console.warn('No models found for the selected brand:', selectedBrand.name);
          }
        } else {
          console.warn('No brand selected');
        }
      } catch (error) {
        console.error('Error fetching models:', error);
      }
  };

  const handleModelChange = async (selectedModel: string) => {
    formik.setFieldValue('model', selectedModel);

    const selectedBrand = formik.values.brand;

    if (selectedBrand) {
      try {
        const brandId = selectedBrand.code;

        if (brandId) {
          const response = await axios.get(`https://parallelum.com.br/fipe/api/v2/cars/brands/${brandId}/models`);
          const models: any[] = response.data;

          const selectedModelObject = models.find((model) => model.code === selectedModel);

          if (selectedModelObject) {
            const modelCode = selectedModelObject.code;

            const yearsResponse = await axios.get(`https://parallelum.com.br/fipe/api/v2/cars/brands/${brandId}/models/${modelCode}/years`);
            const years: any[] = yearsResponse.data;

            if (years && Array.isArray(years) && years.length > 0) {
              setYears(years);
            } else {
              console.warn('No years found for the selected model:', selectedModel);
            }
          } else {
            console.error('Selected model not found');
          }
        } else {
          console.error('Invalid brand id');
        }
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    } else {
      console.warn('Brand is null. Skipping model and year fetch.');
    }
  };
  
  const handleYearChange = async (selectedYear: { code: string } | string) => {
    let yearCode: string;

    if (typeof selectedYear === 'string') {
      yearCode = selectedYear;
    } else {
      yearCode = (selectedYear as { code: string }).code;

      if (!yearCode) {
        console.error('Invalid year object:', selectedYear);
        return;
      }
    }

    formik.setFieldValue('year', yearCode);


    const selectedBrand = formik.values.brand;
    const selectedModel = formik.values.model;

    if (selectedBrand && selectedModel) {
      try {
        const brandId = selectedBrand.code;
        const modelCode =
          typeof selectedModel === 'string'
            ? selectedModel
            : typeof selectedModel === 'object'
            ? (selectedModel as { code: string }).code || ''
            : '';

        const apiUrl = `https://parallelum.com.br/fipe/api/v2/cars/brands/${brandId}/models/${modelCode}/years/${yearCode}`;
        const carDataResponse = await axios.get<CarData>(apiUrl);
        setCarData(carDataResponse.data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    } else {
      console.warn('Brand or model is null. Skipping car data fetch.');
    }
  };
 
  const handleSubmit = async () => {
    if (allFieldsSelected) {
      setShowCarData(true);
    }
  };

return (
  <>
    <S.Container>      
         <form onSubmit={formik.handleSubmit}>
          <S.Content>

          <S.SelectForm
              size='lg'
              name="brand"
              value={formik.values.brand?.code || ''}
              onChange={(e) => {
                const selectedBrand = brands.find((b) => b.code === e.target.value) || null;
                handleBrandChange(selectedBrand);
              }}
            >
              <option key="default" value="">
                Marca
              </option>
              {brands.map((brand) => (
                <option key={brand.code} value={brand.code}>
                  {brand.name}
                </option>
              ))}
            </S.SelectForm>
          </S.Content>

      {formik.values.brand && (
        <S.Content>
            <S.SelectForm
            size='lg'
            name="model"
            value={formik.values.model}
            onChange={(e) => handleModelChange(e.target.value)}
          >
            <option key="default" value="">
              Modelo
            </option>
            {models.map((model) => (
              <option key={model.code} value={model.code}>
                {model.name}
              </option>
            ))}
          </S.SelectForm>
        </S.Content>
      )}

      {formik.values.model && (
        <S.Content>
            <S.SelectForm
            size='lg'
            name="year"
            value={formik.values.year}
            onChange={(e) => handleYearChange(e.target.value)}
          >
            <option key="default" value="">
              Ano
            </option>
            {years.map((year) => (
              <option key={year.code} value={year.code}>
                {year.name}
              </option>
            ))}
          </S.SelectForm>
        </S.Content>
      )}

<S.ButtonSubmit
        type="submit"
        onClick={handleSubmit}
        disabled={!allFieldsSelected}
        bg={allFieldsSelected ? 'purple.500' : 'gray.400'}
        _hover={{ bg: allFieldsSelected ? 'purple.600' : 'gray.500' }}
        _active={{ bg: allFieldsSelected ? 'purple.600' : 'gray.500' }}
        style={{ cursor: allFieldsSelected ? 'pointer' : 'not-allowed' }}
      >
        Consultar Preço
      </S.ButtonSubmit>
     
      {showCarData == true ? (
        <>
           {formik.values.year &&   (
            <div>
              {carData && (
                <>
                  <CarResult carResult={carData}/>
                </>
              )}
              </div>         
           )}
        </>
        ) : null}
          
    </form>
    </S.Container>
 
  </>
);

};

export default CarForm;
