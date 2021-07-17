import React from 'react';
import LinkButton from '../components/Common/LinkButton';

export default {
  title: 'LinkButton',
  component: LinkButton
};

const Template = (args) => <LinkButton {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
