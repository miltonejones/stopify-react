import React from 'react';
import DynamicGrid from './DynamicGrid';

export default {
  title: 'DynamicGrid',
  component: DynamicGrid
};

const Template = (args) => <DynamicGrid {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {};
