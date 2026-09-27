const translations = {
  sr: {
    documentTitle: 'Juša je pronađen',
    languageSwitchLabel: 'Izbor jezika',
    eyebrow: 'PRONAĐEN',
    name: 'JUŠA',
    heroLine: 'Hvala svima na pomoći',
    portraitAlt: 'Juša, veliki srebrno-sivi dugodlaki mačak',
    lastSeenLabel: 'Ažuriranje',
    lastSeenDate: '27. septembra 2026.',
    lastSeenPlace: 'Juša je pronađen i sada je na sigurnom',
    updateKicker: 'AŽURIRANJE',
    updateTitle: 'Juša je pronađen',
    updateOne: 'Juša je pronađen 27.09.2026. i sada je na sigurnom.',
    updateAppeal: 'Hvala svima koji su pomagali u potrazi. Stare objave o potrazi više nisu aktuelne.',
    contactLabel: 'Ažuriranje',
    shareButton: 'Podelite ažuriranje',
    shareTitle: 'Juša je pronađen',
    shareText: 'Juša je pronađen i sada je na sigurnom. Hvala svima koji su pomagali u potrazi.',
    shareCopied: 'Link je kopiran.',
    shareFallback: 'Kopirajte adresu stranice iz pregledača.',
    updated: 'Ažurirano 27.09.2026.',
  },
  ru: {
    documentTitle: 'Юша найден',
    languageSwitchLabel: 'Выбор языка',
    eyebrow: 'НАЙДЕН',
    name: 'ЮША',
    heroLine: 'Спасибо всем за помощь',
    portraitAlt: 'Юша, крупный серебристо-серый длинношерстный кот',
    lastSeenLabel: 'Обновление',
    lastSeenDate: '27 сентября 2026 года',
    lastSeenPlace: 'Юша найден и сейчас в безопасности',
    updateKicker: 'ОБНОВЛЕНИЕ',
    updateTitle: 'Юша найден',
    updateOne: 'Юшу нашли 27.09.2026, сейчас он в безопасности.',
    updateAppeal: 'Спасибо всем, кто помогал в поиске. Старые объявления о поиске больше не актуальны.',
    contactLabel: 'Обновление',
    shareButton: 'Поделиться обновлением',
    shareTitle: 'Юша найден',
    shareText: 'Юша найден и сейчас в безопасности. Спасибо всем, кто помогал в поиске.',
    shareCopied: 'Ссылка скопирована.',
    shareFallback: 'Скопируйте адрес страницы из браузера.',
    updated: 'Обновлено 27.09.2026.',
  },
};

const shareButton = document.querySelector('#share-button');
const shareStatus = document.querySelector('#share-status');
const portrait = document.querySelector('#portrait');
const languageSr = document.querySelector('#language-sr');
const languageRu = document.querySelector('#language-ru');
let currentLanguage = 'sr';

function applyLanguage(language, updateAddress = true) {
  currentLanguage = language === 'ru' ? 'ru' : 'sr';
  const copy = translations[currentLanguage];

  document.documentElement.lang = currentLanguage === 'ru' ? 'ru' : 'sr-Latn';
  document.title = copy.documentTitle;
  portrait.alt = copy.portraitAlt;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = copy[element.dataset.i18n];
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    element.setAttribute('aria-label', copy[element.dataset.i18nAriaLabel]);
  });

  languageSr.setAttribute('aria-pressed', String(currentLanguage === 'sr'));
  languageRu.setAttribute('aria-pressed', String(currentLanguage === 'ru'));
  shareStatus.textContent = '';

  if (updateAddress) {
    const nextAddress = currentLanguage === 'ru'
      ? `${window.location.pathname}${window.location.search}#ru`
      : `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, '', nextAddress);
  }
}

languageSr.addEventListener('click', () => applyLanguage('sr'));
languageRu.addEventListener('click', () => applyLanguage('ru'));
window.addEventListener('hashchange', () => applyLanguage(window.location.hash === '#ru' ? 'ru' : 'sr', false));

applyLanguage(window.location.hash === '#ru' ? 'ru' : 'sr', false);

shareButton.addEventListener('click', async () => {
  const copy = translations[currentLanguage];
  const data = {
    title: copy.shareTitle,
    text: copy.shareText,
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(data);
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    shareStatus.textContent = copy.shareCopied;
  } catch (error) {
    if (error.name !== 'AbortError') {
      shareStatus.textContent = copy.shareFallback;
    }
  }
});
