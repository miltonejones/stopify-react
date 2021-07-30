import React from 'react';
import GenreMenu from './GenreMenu';

export default {
  title: 'GenreMenu',
  component: GenreMenu
};

const Template = (args) => <GenreMenu {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {};
