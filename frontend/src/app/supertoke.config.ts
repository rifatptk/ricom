import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword';

export function initSupertokens() {
  SuperTokens.init({
    appInfo: {
      apiDomain: 'http://localhost:5000',
      apiBasePath: '/api/auth',
      appName: 'neduai',
    },
    recipeList: [Session.init(), EmailPassword.init()],
  });
}
