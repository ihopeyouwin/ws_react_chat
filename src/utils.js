export const sendNotification = messages => {
  if (
    typeof Notification !== 'undefined' &&
    document.visibilityState !== 'visible' &&
    messages.length
  ) {
    Notification.requestPermission().then(result => {
      if (result === 'granted') {
        let title;
        let body;

        if (messages.length > 1) {
          const names = [...new Set(messages.map(el => el.from))];

          title = `You've got ${messages.length} new messages`;
          body = `From ${names.slice(0, 3).join(', ')}${
            names.length > 3 ? ' and others.' : '.'
          }`;
        } else {
          title = `You've got a message from ${messages[0].from}`;
          body = `${messages[0].message}`;
        }

        const notification = new Notification(title, { body });
        setTimeout(notification.close.bind(notification), 4000);
      }
    });
  }
};
