import { create } from "@storybook/theming";
// REF: https://storybook.js.org/docs/react/configure/theming
// REF: https://github.com/carbon-design-system/ibm-security/pull/488/files
import { version, title, repository } from "../package.json";

// For create.brandTitle and formatting with html tags we resort to a template literal
// and use vars of html tags as strings to swap in html to be processed as presentation markup.
// Becasue this approach __used to just work__:
// brandTitle: `<code>${title}</code><br/><small>v${version}</small>`,
// mvp/clunky for now. Searching for a better way in SB docs.
const code_tag_open = "<code>";
const code_tag_close = "</code>";

export default create({
  base: "light",
  brandTitle: `
    ${title}
    ${code_tag_open}
      v${version}
    ${code_tag_close} 
  `,
  brandUrl: `${repository.url}`,
  // brandImage: 'https://place-hold.it/350x150',
});
