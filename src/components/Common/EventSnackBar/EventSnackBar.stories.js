import React from 'react';
import EventSnackBar from './EventSnackBar';

export default {
  title: 'EventSnackBar',
  component: EventSnackBar
};

const Template = (args) => <EventSnackBar {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {};
