import Echo from '@merit-systems/echo-next-sdk';
console.log(process.env.ECHO_APP_ID)
export const { handlers, isSignedIn, openai, anthropic, google } = Echo({
  appId: process.env.ECHO_APP_ID!,
});
