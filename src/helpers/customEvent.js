export function dispatchCustomEvent(type, detail) {
  let event;

  if (typeof CustomEvent === 'function') {
    event = new CustomEvent(type, {
      detail
    });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, true, true, detail);
  }

  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(event);
}

export function listenCustomEvent(event, handler) {
  const events = Array.isArray(event) ? event : [event];

  events.forEach(eventName => {
    window.addEventListener(eventName, handler);
  });
}

export function unlistenCustomEvent(event, handler) {
  const events = Array.isArray(event) ? event : [event];

  events.forEach(eventName => {
    window.removeEventListener(eventName, handler);
  });
}
