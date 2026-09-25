const translations = {
  sr: {
    documentTitle: 'Tražimo Jušu - novi važan trag',
    languageSwitchLabel: 'Izbor jezika',
    eyebrow: 'TRAŽIMO',
    name: 'JUŠU',
    heroLine: 'Pomozite mu da se vrati kući',
    portraitAlt: 'Juša, veliki srebrno-sivi dugodlaki mačak',
    lastSeenLabel: 'Poslednje poznate informacije',
    lastSeenDate: '14. ili 15. septembra 2026.',
    lastSeenPlace: 'Premium Pet - Južni bulevar 102, Beograd',
    updateKicker: 'NOVI VAŽAN TRAG',
    updateTitle: 'Šta sada znamo',
    updateOne: 'Prema svedokinji, oko 23.55 Juša je još bio u transporteru ispred prodavnice, zajedno sa pasošem, hranom i svojim stvarima.',
    updateTwo: 'Svedokinja je pozvala dežurnog veterinara, koji je pokušao da kontaktira vlasnika. Kasnije se udaljila na približno pet minuta. Kada se vratila, nepoznata osoba je već preuzela Jušu zajedno sa transporterom i svim stvarima.',
    updateAppeal: 'Tražimo tu osobu ili bilo koga ko zna gde se Juša sada nalazi. Ako ste ga uzeli da biste mu pomogli, molimo vas da se javite.',
    identityLabel: 'Podaci iz pasoša',
    identityTitle: 'Podaci iz pasoša',
    identityText: 'Eugene - mužjak, Maine Coon, rođen 16.03.2024. Juša nema mikročip.',
    storyTitle: 'Šta se dogodilo',
    storyOne: 'Posle smrti vlasnice, Juša je ostavljen u transporteru ispred prodavnice Premium Pet, na adresi Južni bulevar 102.',
    storyTwo: 'Porodica njegove vlasnice traži ga i želi da ga vrati kući.',
    storyAppeal: 'Ako ste preuzeli Jušu, ako je kod vas ili znate gde se nalazi, molimo vas da se javite.',
    reward: 'Nagrada za pronalazak',
    contactLabel: 'Kontakt',
    call: 'Pozovite',
    shareButton: 'Podelite ovu stranicu',
    shareTitle: 'Tražimo Jušu',
    shareText: 'Pomozite da se Juša vrati kući. Pojavio se novi važan trag.',
    shareCopied: 'Link je kopiran.',
    shareFallback: 'Kopirajte adresu stranice iz pregledača.',
    updated: 'Ažurirano 25.09.2026.',
  },
  ru: {
    documentTitle: 'Ищем Юшу - появился важный след',
    languageSwitchLabel: 'Выбор языка',
    eyebrow: 'ИЩЕМ',
    name: 'ЮШУ',
    heroLine: 'Помогите ему вернуться домой',
    portraitAlt: 'Юша, крупный серебристо-серый длинношерстный кот',
    lastSeenLabel: 'Последняя известная информация',
    lastSeenDate: '14 или 15 сентября 2026 года',
    lastSeenPlace: 'Premium Pet - Južni bulevar 102, Белград',
    updateKicker: 'НОВЫЙ ВАЖНЫЙ СЛЕД',
    updateTitle: 'Что теперь известно',
    updateOne: 'По словам свидетельницы, около 23:55 Юша еще находился в переноске у магазина вместе с паспортом, кормом и своими вещами.',
    updateTwo: 'Свидетельница позвонила дежурному ветеринару, который попытался связаться с владельцем. Позже она отошла примерно на пять минут. Когда она вернулась, неизвестный человек уже забрал Юшу вместе с переноской и всеми вещами.',
    updateAppeal: 'Мы ищем этого человека или любого, кто знает, где сейчас находится Юша. Если вы забрали его, чтобы помочь, пожалуйста, свяжитесь с нами.',
    identityLabel: 'Данные из паспорта',
    identityTitle: 'Данные из паспорта',
    identityText: 'Eugene - самец, мейн-кун, родился 16.03.2024. У Юши нет микрочипа.',
    storyTitle: 'Что произошло',
    storyOne: 'После смерти хозяйки Юшу оставили в переноске перед магазином Premium Pet по адресу Južni bulevar 102.',
    storyTwo: 'Семья его хозяйки ищет Юшу и хочет вернуть его домой.',
    storyAppeal: 'Если вы забрали Юшу, он находится у вас или вы знаете, где он, пожалуйста, свяжитесь с нами.',
    reward: 'Вознаграждение за нахождение',
    contactLabel: 'Контакт',
    call: 'Позвонить',
    shareButton: 'Поделиться этой страницей',
    shareTitle: 'Ищем Юшу',
    shareText: 'Помогите Юше вернуться домой. Появился новый важный след.',
    shareCopied: 'Ссылка скопирована.',
    shareFallback: 'Скопируйте адрес страницы из браузера.',
    updated: 'Обновлено 25.09.2026.',
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
