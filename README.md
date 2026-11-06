# Sem_website

Website for **SEM Group**: exhibition stall design, fabrication, events and interiors.
Built with plain HTML, CSS and JavaScript (no frameworks or build step).

## Structure

```
index.html          Homepage (overview of every section)
about.html          Company story, numbers and how we work
services.html       Each service in detail, stall layout picker and process
projects.html       Exhibition projects page (filterable grid + details for each event)
industries.html     Industries served and what each one needs
infrastructure.html Workshop, machinery, storage and installation
locations.html      One page for all locations; the content comes from js/locations.js
contact.html        Quote form, next steps and FAQ
css/style.css       Styles and responsive layout
js/main.js          Menu, scroll effects, counters, testimonial slider, lightbox, project filter, quote form
js/locations.js     Location data (venues, projects, map, WhatsApp number) and page logic
images/             Site images (WebP); event posters in images/projects/
docs/               Website plan and image prompts
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 5500
```

then visit http://localhost:5500.

## Quote form

Enquiries are emailed through [Web3Forms](https://web3forms.com). The access key is set in `js/main.js`
(`WEB3FORMS_ACCESS_KEY`). To change the receiving email, update it in the Web3Forms dashboard.

## Still to replace

- Real phone, email, addresses, WhatsApp number and social links
- Company story and page copy, to review against what SEM Group actually offers
- Each regional office's address and phone number
- Client logos and testimonials
- Project names, events and photos of real completed work
