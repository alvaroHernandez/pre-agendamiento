const environment = window._env_.REACT_APP_ENVIRONMENT;

let toggles = undefined;
switch (environment) {
  case 'development':
    toggles = {
      DISPLAY_USERNAME_HEADER: true,
    };
    break;
  case 'qa':
    toggles = {
      DISPLAY_USERNAME_HEADER: true,
    };
    break;
  case 'staging':
    toggles = {
      DISPLAY_USERNAME_HEADER: true,
    };
    break;
  case 'production':
    toggles = {
      DISPLAY_USERNAME_HEADER: true,
    };
    break;
  case 'local':
    toggles = {
      DISPLAY_USERNAME_HEADER: true,
    };
    break;
  default:
    toggles = undefined;
}

export default toggles;
