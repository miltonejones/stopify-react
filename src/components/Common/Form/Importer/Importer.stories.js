import React from "react";
import Importer from "./Importer";

export default {
  title: "Common/Form/Importer",
  component: Importer,
};

const Template = (args) => <Importer {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {
  complete: () => alert("COMPLETE"),
};
