# Bible Search

A web frontend for the [ESV Bible API](https://api.esv.org/) written in Vue. Search Bible verses by word or phrase!

This is a work in progress.

## Setup

Usage of the [ESV API](https://api.esv.org/) requires an API key. Bible Search's ESV API key is not included in this repository. If you wish to run this project yourself you must obtain an API key by doing the following:

1. Create a new Crossway account or (sign in to an existing one) on the [ESV API Website](https://api.esv.org/).
2. Fill out the form to [Create an API application](https://api.esv.org/account/create-application/). Some intended usages will require Crossway staff approval, and you must abide by the API guidlines which cover copyright, text redistrubtion, commercialization, etc.
3. You should receive an email telling you whether you have been approved or not. Be warned: this may take a while. I did not hear back from them until a week after I submitted my request.

Once you have your API key:

1. Clone this repository (or your fork of it).
2. Create a `.env` file at the root of the project.
3. Place the following into your `.env` file:

```
VITE_ESV_TOKEN=YOUR_ESV_API_TOKEN
```

Finally, use `npm run dev` to start the development server.

## ESV Copyright Notice:

Unless otherwise indicated, all Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), copyright © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved. The ESV text may not be quoted in any publication made available to the public by a Creative Commons license. The ESV may not be translated into any other language.

Users may not copy or download more than 500 verses of the ESV Bible or more than one half of any book of the ESV Bible.
