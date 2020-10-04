import React from "react";

export const markedDownContent = (content: string) => {
  content = content.replace(/</g, "&lt;");
  content = content.replace(/>/g, "&gt;");

  content = content.replace(
    /!!![ ].+[ ]?/g,
    (x) => `<h3 class="text-xl">${x.substr(3, x.length)}</h1>`
  );

  content = content.replace(
    /!![ ].+[ ]?/g,
    (x) => `<h2 class="text-2xl">${x.substr(2, x.length)}</h1>`
  );

  content = content.replace(
    /![ ].+[ ]?/g,
    (x) => `<h1 class="text-3xl">${x.substr(1, x.length)}</h1>`
  );

  content = content.replace(
    /~~.+?~~/g,
    (x) => `<span class="line-through">${x.substr(2, x.length - 4)}</span>`
  );

  content = content.replace(
    /__.+?__/g,
    (x) => `<span class="underline">${x.trim().substr(2, x.length - 4)}</span>`
  );

  content = content.replace(
    /''.+?''/g,
    (x) => `<span class="font-bold">${x.trim().substr(2, x.length - 4)}</span>`
  );
  content = content.replace(/\[\[.+?\|.+?\]\]/g, (x) => {
    let [hypertext, url] = x.split("|");
    hypertext = hypertext.substr(2, hypertext.length);
    url = url.substr(0, url.length - 2);
    return `<a title="${url}" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline" href="${url}" target="_blank">${hypertext}</a>`;
  });

  content = content.replace(/\r\n|\r|\n/g, "<br>");

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </>
  );
};
