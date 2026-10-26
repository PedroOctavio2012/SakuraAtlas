const places = [
  {
    id: 'pequim',
    name: 'Pequim',
    country: 'China',
    coords: [39.9042, 116.4074],
    region: 'China',
    emoji: '🏯',
    title: 'Pequim',
    location: 'China • Pequim',
    category: 'CIDADE HISTÓRICA',
    description:
      'Pequim reúne palácios imperiais, avenidas monumentais e uma paisagem urbana marcada pela tradição e pela modernidade. É um ponto central para compreender a geopolítica e a arquitetura civil do país.'
  },
  {
    id: 'xian',
    name: 'Xian',
    country: 'China',
    coords: [34.3416, 108.9398],
    region: 'China',
    emoji: '🧭',
    title: 'Xian',
    location: 'China • Xian',
    category: 'CULTURA ANTIGA',
    description:
      'Com suas muralhas milenares e cidades históricas, Xian representa a continuidade do passado chinês e a importância de rotas comerciais antigas, como a Rota da Seda.'
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japão',
    coords: [35.0116, 135.7681],
    region: 'Japão',
    emoji: '⛩️',
    title: 'Kyoto',
    location: 'Japão • Kyoto',
    category: 'ARQUITETURA TRADICIONAL',
    description:
      'Kyoto conserva templos, jardins e ruas de madeira que expressam a estética japonesa clássica. A cidade conecta espiritualidade, tradição e paisagem natural em equilíbrio.'
  },
  {
    id: 'hiroshima',
    name: 'Hiroshima',
    country: 'Japão',
    coords: [34.3853, 132.4553],
    region: 'Japão',
    emoji: '🌊',
    title: 'Hiroshima',
    location: 'Japão • Hiroshima',
    category: 'MEMÓRIA E RENASCIMENTO',
    description:
      'Hiroshima é um marco de memória histórica e de recuperação urbana. A cidade combina a força do passado com a visão de uma metrópole contemporânea e resiliente.'
  },
  {
    id: 'seul',
    name: 'Seul',
    country: 'Coreia do Sul',
    coords: [37.5665, 126.978],
    region: 'Coreia do Sul',
    emoji: '🌃',
    title: 'Seul',
    location: 'Coreia do Sul • Seul',
    category: 'METRÓPOLE MODERNA',
    description:
      'Seul dilui tecnologia, cultura pop e tradições históricas em uma paisagem urbana dinâmica. O contraste entre palácios antigos e arranha-céus define a identidade da cidade.'
  },
  {
    id: 'busan',
    name: 'Busan',
    country: 'Coreia do Sul',
    coords: [35.1796, 129.0756],
    region: 'Coreia do Sul',
    emoji: '🌅',
    title: 'Busan',
    location: 'Coreia do Sul • Busan',
    category: 'PORTO E COSTA',
    description:
      'Busan é um importante porto marítimo, conhecido por suas encostas, praias e conexão com rotas comerciais do leste asiático. Sua arquitetura costeira revela grande presença urbanística.'
  },
  {
    id: 'taipei',
    name: 'Taipei',
    country: 'Taiwan',
    coords: [25.033, 121.5654],
    region: 'Taiwan',
    emoji: '🏙️',
    title: 'Taipei',
    location: 'Taiwan • Taipei',
    category: 'CIDADE CULTURAL',
    description:
      'Taipei é um polo de cultura, tecnologia e presença histórica. Sua paisagem reúne mercados tradicionais, templos e uma dinâmica urbana que reflete a diversidade do território taiwanês.'
  },
  {
    id: 'ulaanbaatar',
    name: 'Ulaanbaatar',
    country: 'Mongólia',
    coords: [47.8864, 106.9057],
    region: 'Mongólia',
    emoji: '🐎',
    title: 'Ulaanbaatar',
    location: 'Mongólia • Ulaanbaatar',
    category: 'ESTEPES E CIDADE',
    description:
      'Ulaanbaatar ocupa o centro da cultura mongol e da paisagem montanhosa do norte da Ásia. O contraste entre o ambiente da estepe e a cidade moderna é essencial para entender a região.'
  }
];

const map = L.map('map', {
  zoomControl: true,
  attributionControl: true
}).setView([38.5, 115], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const markers = new Map();
const placeCountEl = document.getElementById('place-count');
const placesListEl = document.getElementById('places-list');
const filterSelect = document.getElementById('country-filter');
const placeTitleEl = document.getElementById('place-title');
const placeLocationEl = document.getElementById('place-location');
const placeDescriptionEl = document.getElementById('place-description');
const placeCategoryEl = document.getElementById('place-category');
const resetMapButton = document.getElementById('reset-map');

let selectedPlaceId = null;

function makeCustomIcon(emoji) {
  return L.divIcon({
    className: '',
    html: `<div class="custom-marker"><span>${emoji}</span></div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -16]
  });
}

function createMarker(place) {
  const marker = L.marker(place.coords, { icon: makeCustomIcon(place.emoji) }).addTo(map);

  marker.bindPopup(`
    <div style="font-family: 'Nunito', sans-serif; color: #552b45; line-height: 1.5; min-width: 140px;">
      <strong>${place.name}</strong><br>
      <span>${place.country}</span>
    </div>
  `);

  marker.on('click', () => selectPlace(place.id));
  markers.set(place.id, marker);
}

function getFilteredPlaces() {
  const selectedRegion = filterSelect.value;
  return selectedRegion === 'all'
    ? places
    : places.filter((place) => place.region === selectedRegion);
}

function renderPlaceList(filteredPlaces) {
  placesListEl.innerHTML = '';

  filteredPlaces.forEach((place) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'place-button';
    button.innerHTML = `
      <span class="place-emoji">${place.emoji}</span>
      <span>
        <strong>${place.name}</strong>
        <small>${place.location}</small>
      </span>
    `;

    button.addEventListener('click', () => selectPlace(place.id));

    if (selectedPlaceId === place.id) {
      button.classList.add('active');
    }

    placesListEl.appendChild(button);
  });
}

function updateSelectedInfo(place) {
  placeTitleEl.textContent = place.title;
  placeLocationEl.textContent = place.location;
  placeDescriptionEl.textContent = place.description;
  placeCategoryEl.textContent = place.category;
}

function applyFilter() {
  const filteredPlaces = getFilteredPlaces();
  const visibleIds = new Set(filteredPlaces.map((place) => place.id));

  markers.forEach((marker, id) => {
    const visible = visibleIds.has(id);
    marker.setOpacity(visible ? 1 : 0);
    marker.setZIndexOffset(visible ? 1000 : -1000);
    const el = marker.getElement();
    if (el) {
      el.style.pointerEvents = visible ? 'auto' : 'none';
    }
  });

  if (!filteredPlaces.some((place) => place.id === selectedPlaceId)) {
    selectedPlaceId = filteredPlaces[0]?.id ?? null;
  }

  if (selectedPlaceId) {
    const place = places.find((item) => item.id === selectedPlaceId);
    if (place) {
      updateSelectedInfo(place);
      map.flyTo(place.coords, 5, { duration: 1.2 });
    }
  }

  placeCountEl.textContent = filteredPlaces.length;
  renderPlaceList(filteredPlaces);
}

function selectPlace(id) {
  const place = places.find((item) => item.id === id);
  if (!place) return;

  const regionMatches = filterSelect.value === 'all' || filterSelect.value === place.region;
  if (!regionMatches) {
    filterSelect.value = place.region;
  }

  selectedPlaceId = place.id;
  updateSelectedInfo(place);
  map.flyTo(place.coords, 5, { duration: 1.2 });
  applyFilter();
  pulseMarker(place.id);
}

function pulseMarker(id) {
  const marker = markers.get(id);
  if (!marker) return;

  const el = marker.getElement();
  if (!el) return;

  el.classList.remove('pulse-marker');
  void el.offsetWidth;
  el.classList.add('pulse-marker');

  setTimeout(() => el.classList.remove('pulse-marker'), 900);
}

resetMapButton.addEventListener('click', () => {
  map.flyTo([38.5, 115], 3, { duration: 1.4 });
  const filtered = getFilteredPlaces();
  selectedPlaceId = filtered[0]?.id ?? null;
  if (selectedPlaceId) {
    const place = places.find((item) => item.id === selectedPlaceId);
    if (place) updateSelectedInfo(place);
  }
  renderPlaceList(filtered);
  placeCountEl.textContent = filtered.length;
});

filterSelect.addEventListener('change', () => {
  const filtered = getFilteredPlaces();
  selectedPlaceId = filtered[0]?.id ?? null;
  if (selectedPlaceId) {
    const place = places.find((item) => item.id === selectedPlaceId);
    if (place) {
      updateSelectedInfo(place);
      map.flyTo(place.coords, 5, { duration: 1.2 });
    }
  }
  applyFilter();
});

places.forEach(createMarker);
selectedPlaceId = places[0].id;
updateSelectedInfo(places[0]);
applyFilter();

const style = document.createElement('style');
style.textContent = `
  .pulse-marker {
    animation: pulseMarker 0.9s ease-out;
  }

  @keyframes pulseMarker {
    0% { transform: rotate(-45deg) scale(1); filter: drop-shadow(0 0 0 rgba(217,45,72,0)); }
    30% { transform: rotate(-45deg) scale(1.2); filter: drop-shadow(0 0 18px rgba(217,45,72,0.8)); }
    100% { transform: rotate(-45deg) scale(1); filter: drop-shadow(0 0 0 rgba(217,45,72,0)); }
  }
`;
document.head.appendChild(style);
