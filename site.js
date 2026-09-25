const shareButton = document.querySelector('#share-button');
const shareStatus = document.querySelector('#share-status');

shareButton.addEventListener('click', async () => {
  const data = {
    title: 'Tražimo Jušu',
    text: 'Pomozite da se Juša vrati kući.',
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(data);
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    shareStatus.textContent = 'Link je kopiran.';
  } catch (error) {
    if (error.name !== 'AbortError') {
      shareStatus.textContent = 'Kopirajte adresu stranice iz pregledača.';
    }
  }
});
