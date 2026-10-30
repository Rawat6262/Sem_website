# Sem_website

Website for **SEM Group**: exhibition stall design, fabrication, events and interiors.
Built with plain HTML, CSS and JavaScript (no frameworks or build step).

## Structure

```
index.html          Homepage (all sections)
projects.html       Exhibition projects page (filterable grid + details for each event)
css/style.css       Styles and responsive layout
js/main.js          Menu, scroll effects, counters, testimonial slider, lightbox, project filter, quote form
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

- Logo (currently text)
- Real phone, email, addresses, WhatsApp number and social links
- Client logos and testimonials
- Project names, events and photos of real completed work
