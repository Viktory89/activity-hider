(function () {
  // Настройка: от кого скрывать (ID текущего пользователя) → массив ID пользователей, чьи действия скрывать
  const SETTINGS = {
    32056974: [32056974] // Дмитрий не видит действия Менеджера 2 (ID 32056974)
  };

  const currentUserId = AMOCRM.constant("user").id;

  const hideActivities = () => {
    const authorsToHide = SETTINGS[currentUserId] || [];
    if (!authorsToHide.length) return;

    const activities = document.querySelectorAll('.feed-note');

    activities.forEach(note => {
      const authorId = parseInt(note.getAttribute('data-user_id'));
      if (authorsToHide.includes(authorId)) {
        note.style.display = 'none';
      }
    });
  };

  const observeFeed = () => {
    const feed = document.querySelector('.feed');
    if (!feed) return;

    const observer = new MutationObserver(hideActivities);
    observer.observe(feed, { childList: true, subtree: true });

    hideActivities();
  };

  setTimeout(observeFeed, 2000);
})();