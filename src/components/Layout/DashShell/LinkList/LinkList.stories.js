import React from 'react';
import LinkList from './LinkList';

export default {
  title: 'LinkList',
  component: LinkList
};

const Template = (args) => <LinkList {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {};
