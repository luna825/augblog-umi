import RenderAuthorized from '@/components/Authorized';

// 默认为用户guset
let Authorized = RenderAuthorized('guest'); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = role => {
  Authorized = RenderAuthorized(role);
};

export { reloadAuthorized };
export default Authorized;
