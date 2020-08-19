import React from 'react';
import { withFormik } from 'formik';
import { NavigationScreenProp } from 'react-navigation';

import { ObjectSchema } from 'yup';

interface initMapPropsInterface {
  [key: string]: any;
}

export interface handleSubmitFormikInterface {
  (values: any, action?: any): any
}

export interface ConnectFormikParamaters {
  displayName: string;
  Component: any;
  customSchema?: ObjectSchema;
  initMapProps: initMapPropsInterface;
  onSubmit: handleSubmitFormikInterface

}

interface Props {
  [key: string]: any;
  formSchema: any,
  relay?:any
}

export const withConnectFormik = ({
  Component, displayName, customSchema, initMapProps, onSubmit
}: ConnectFormikParamaters) => (props: Props) => {
  const RenderComponent = withFormik<Props, any>({
    enableReinitialize: false,
    validationSchema: customSchema,
    validateOnBlur: false,
    validateOnChange: false,
    mapPropsToValues: () => initMapProps,
    handleSubmit: (values) => {

      onSubmit(values);
    },
    displayName,
  })(Component);

  return <RenderComponent {...props} />;
};
