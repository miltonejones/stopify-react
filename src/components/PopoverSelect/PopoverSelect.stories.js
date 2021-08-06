import React from 'react';
import PopoverSelect from './PopoverSelect';
import tracks from "../../stories/assets/stories-play-list.json"
import { Search } from '@material-ui/icons';
export default {
  title: 'PopoverSelect',
  component: PopoverSelect
};

const Template = (args) => <PopoverSelect {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {
  onSelect: u => alert(u.value),
  icon: <Search />,
  options: 
    tracks.map(track=>({
      value: track.Title,
      secondary: track.artistName,
      avatar: {
        src: track.albumImage,
        alt: track.Title
      }
    }))
  
};
