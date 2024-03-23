import { Form } from 'antd';
import { BrowserView, MobileView } from 'react-device-detect';

import { Alert } from '../../components';
import { useCategoriesData } from '../../hooks';
import CategoriesMobileView from './CategoriesMobileView';
import CategoriesBrowserView from './CategoriesBrowserView';

const Categories = () => {
  const [newCategoryForm] = Form.useForm();

  const {
    data,
    error,
    isError,
    columns,
    onDelete,
    onSubmit,
    isLoading,
    showProgress,
    isLoadingOnAdd,
    allowPopConfirm,
    setAllowPopConfirm,
  } = useCategoriesData({ newCategoryForm });

  const validateMessages = {
    required: 'Անունը պարտադիր է!',
    types: {
      email: '${label}֊ի ֆորմատը սխալ է',
      number: '${label} is not a valid number!',
    },
  };

  if (isError) {
    return <Alert message={error.message} />;
  }

  return (
    <>
      <BrowserView>
        <CategoriesBrowserView
          data={data}
          columns={columns}
          onFinish={onSubmit}
          isLoading={isLoading}
          isLoadingOnAdd={isLoadingOnAdd}
          newCategoryForm={newCategoryForm}
          validateMessages={validateMessages}
        />
      </BrowserView>
      <MobileView>
        <CategoriesMobileView
          data={data}
          onFinish={onSubmit}
          onDelete={onDelete}
          isLoading={isLoading}
          showProgress={showProgress}
          isLoadingOnAdd={isLoadingOnAdd}
          allowPopConfirm={allowPopConfirm}
          newCategoryForm={newCategoryForm}
          validateMessages={validateMessages}
          setAllowPopConfirm={setAllowPopConfirm}
        />
      </MobileView>
    </>
  );
};

export default Categories;
