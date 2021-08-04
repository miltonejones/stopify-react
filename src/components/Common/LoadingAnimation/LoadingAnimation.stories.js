import React from 'react';
import LoadingAnimation from './LoadingAnimation';

export default {
  title: 'LoadingAnimation',
  component: LoadingAnimation
};

const Template = (args) => <LoadingAnimation {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {};
