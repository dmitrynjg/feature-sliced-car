export const saveJwt = (jwt: string): void => {
  localStorage.setItem('jwt', jwt);
};
