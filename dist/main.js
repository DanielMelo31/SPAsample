(() => {
	'use strict';
	const n = () =>
			location.hash.slice(1).toLocaleLowerCase().split('/')[1] || '/',
		a = 'https://rickandmortyapi.com/api/character/',
		e = async (n) => {
			const e = n ? `${a}${n}` : a;
			try {
				const n = await fetch(e);
				return await n.json();
			} catch (n) {
				console.log('Fetch error', n);
			}
		},
		t = () =>
			'\n    <div class="Error404">\n        <h2>Error 404</h2>\n    </div>\n    ',
		c = {
			'/': async () =>
				`\n        <div class="characters">\n            ${(await e()).results
					.map(
						(n) =>
							`\n                <article class="character__item">\n                    <a href="#/${n.id}">\n                        <img src="${n.image}" alt="${n.name}">\n                        <h2>${n.name}</h2>\n                    </a>\n                </article>\n            `
					)
					.join('')}\n\n        </div>\n    `,
			'/:id': async () => {
				const a = n(),
					t = await e(a);
				return `\n        <div class="character-inner">\n            <article class="character_inner__card">\n                <img src="${t.image}" alt="${t.name}">\n                <h2>${t.name}</h2>\n            </article>\n\n            <article class="character-card">\n                <h3>Episodes: <span>${t.episode.length}</span></h3>\n                <h3>Status: ${t.status}</h3>\n                <h3>Species: ${t.species}</h3>\n                <h3>Gender: ${t.gender}</h3>\n                <h3> Origin: ${t.origin.name}</h3>\n                <h3> Last Location: ${t.location.name}</h3>\n            </article>\n        </div>\n    `;
			},
			'/contact': 'Contact',
		},
		i = async () => {
			const a = document.getElementById('header'),
				e = document.getElementById('content');
			a.innerHTML =
				await '\n        <div class="header-main">\n            <div class="header-main__logo">\n                <h1>\n                    <a href="/">101tifi.co</a>\n                </h1>\n            </div>\n\n            <div class="header-nav">\n                <a href="#/about/"> About </a>\n            </div>\n        </div>\n    ';
			let i = n(),
				r = await ((n) => (n.length <= 3 ? ('/' === n ? n : '/:id') : n))(i),
				s = c[r] ? c[r] : t;
			e.innerHTML = await s();
		};
	window.addEventListener('load', i), window.addEventListener('hashchange', i);
})();
